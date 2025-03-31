import { useQuery } from '@tanstack/react-query';
import { fetchPolicies } from '../services/policyService';

/**
 * Custom hook to fetch policies with React Query caching and localStorage persistence
 * @param query - Optional query string to filter policies
 * @returns The query result containing { data, error, isLoading, isFetching, etc. }
 * 
 * Features:
 * - Memory caching via React Query
 * - Persistent caching via localStorage
 * - Automatic cache invalidation after 24 hours
 * - Offline support with stale data
 * - Error retries
 */
export const usePolicies = (query?: string) => {
  return useQuery({
    // Unique key for the query - includes 'policies' and the query string
    // This ensures different queries are cached separately
    queryKey: ['policies', query],

    // The actual query function that fetches data
    queryFn: async () => {
      // 1. FIRST CHECK LOCALSTORAGE FOR CACHED DATA
      const cacheKey = query ? `policies-${query}` : 'policies';
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {
        const parsedCache = JSON.parse(cachedData);
        const cacheAge = Date.now() - parsedCache.timestamp;

        // Use cache if it's less than 24 hours old (86400000 ms)
        if (cacheAge < 86400000) {
          console.debug('[Cache] Returning cached policies');
          return parsedCache.data;
        }
        // If cache is stale, remove it
        localStorage.removeItem(cacheKey);
      }

      // 2. FETCH FRESH DATA FROM API
      console.debug('[Cache] Fetching fresh policies');
      const freshData = await fetchPolicies(
        query ? parseInt(query, 10) : undefined,
        1000 // Assuming this is pageSize
      );

      // 3. UPDATE LOCALSTORAGE CACHE
      try {
        localStorage.setItem(cacheKey, JSON.stringify({
          data: freshData,
          timestamp: Date.now() // Current time as cache timestamp
        }));
        console.debug('[Cache] Updated policies cache');
      } catch (error) {
        console.error('[Cache] Failed to update localStorage:', error);
        // Continue even if cache fails
      }

      return freshData;
    },

    // React Query configuration:
    staleTime: 86400000,   // 24 hours - data is fresh for 24 hours
    gcTime: 86400000,    // 24 hours - keep in memory cache
    retry: 2,            // Retry failed requests twice
    retryDelay: 1000,    // Wait 1 second between retries
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnReconnect: true,    // Do refetch when network reconnects
    refetchOnMount: true,        // Refetch when component mounts

    // If offline, return cached data if available
    networkMode: 'offlineFirst',

    // Use cached data while fetching in background
    placeholderData: (previousData) => {
      const cacheKey = query ? `policies-${query}` : 'policies';
      const cachedData = localStorage.getItem(cacheKey);
      return cachedData ? JSON.parse(cachedData).data : previousData;
    }
  });
};
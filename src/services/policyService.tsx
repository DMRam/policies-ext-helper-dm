import { apiClient } from '../api/client';

export const fetchPolicies = async (page = 1, pageSize = 100) => {
  const response = await apiClient.get('/api/policies', {
    params: {
      page,
      pageSize,
      q: 'SELECT * FROM [Policy]'
    }
  });

  console.log('--------- [API] Fetched policies:', JSON.stringify(response.data));
  return response.data;
};
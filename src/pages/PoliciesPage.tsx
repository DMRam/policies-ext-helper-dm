import { useState } from 'react';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';
import { usePolicies } from '../hooks/usePolicies';
import PolicyStats from '../components/policies/PolicyStats';
import { PolicyCard } from '../components/policies/PolicyCard';
import PolicyFilters from '../components/policies/PolicyFilters';
import { EmptyState } from '../components/ui/EmptyState';
import { PolicyChart } from '../components/policies/PolicyChart';

export const PoliciesPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string[]>([]);
    const { data: policies, isLoading, error } = usePolicies() as { data: any[]; isLoading: boolean; error: any };

    const filteredPolicies = policies?.filter(policy => {
        const matchesSearch = policy['Name']?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            policy['Description']?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter.length === 0 ||
            (policy['OPSS-Pol:Approval Status'] &&
                statusFilter.some(filter => policy['OPSS-Pol:Approval Status']?.includes(filter)));

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Policy Governance</h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Manage and review all organizational policies
                    </p>
                </div>

                <PolicyStats policies={policies} />

                <div className="mt-8">
                    <PolicyFilters
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        statusFilter={statusFilter}
                        onStatusChange={setStatusFilter}
                    />

                    {isLoading ? (
                        <LoadingSkeleton />
                    ) : error ? (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
                            <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                                Failed to load policies
                            </h3>
                            <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                                {error.message}
                            </p>
                        </div>
                    ) : filteredPolicies?.length === 0 ? (
                        <EmptyState
                            title="No policies found"
                            description="Try adjusting your search or filters"
                        />
                    ) : (
                        <>
                            <div className="w-full mb-8 min-h-[300px]">
                                <PolicyChart policies={filteredPolicies} />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                                {filteredPolicies?.map((policy: any) => (
                                    <PolicyCard key={policy['Resource ID']} policy={policy} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

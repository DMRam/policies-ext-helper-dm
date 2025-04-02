import { apiClient } from '../api/client';

export interface Policy {
  id?: string;
  'Resource ID'?: string;
  'Name'?: string;
  'Description'?: string;
  'OPSS-Pol:Approval Status'?: string;
  'Creation Date'?: string;
  'Last Modification Date'?: string;
  'Location'?: string;
  
}

export const fetchPolicies = async (page = 1, pageSize = 100) => {
  const response = await apiClient.get('/api/policies', {
    params: {
      page,
      pageSize,
      q: 'SELECT * FROM [Policy]'
    }
  });

  console.debug('[API] Fetched policies:', JSON.stringify(response.data));
  return response.data;
};
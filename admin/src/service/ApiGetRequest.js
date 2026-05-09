import { ENDPOINTS } from './ApiEndPoint';

export const fetchHealthStats = async () => {
  const response = await fetch(ENDPOINTS.HEALTH);
  if (!response.ok) throw new Error('Failed to fetch health status');
  return response.json();
};

export const fetchPublicOrgs = async () => {
  const response = await fetch(ENDPOINTS.PUBLIC_ORGS);
  if (!response.ok) throw new Error('Failed to fetch public organizations');
  return response.json();
};

export const fetchSuperOrgs = async (token) => {
  const response = await fetch(ENDPOINTS.SUPER_ORGS, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch super organizations');
  return response.json();
};

export const fetchOrgFeatureFlags = async (token) => {
  const response = await fetch(ENDPOINTS.FLAGS, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch feature flags');
  return response.json();
};

export const checkFeatureFlagStatus = async (orgId, key) => {
  const response = await fetch(`${ENDPOINTS.CHECK_FLAG}?orgId=${orgId}&key=${key}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to check feature flag status');
  }
  return response.json();
};

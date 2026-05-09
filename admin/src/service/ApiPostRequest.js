import { ENDPOINTS } from './ApiEndPoint';

export const loginUser = async (email, password) => {
  const response = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Login failed');
  return data;
};

export const signupUser = async (email, password, orgId) => {
  const response = await fetch(ENDPOINTS.SIGNUP, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, orgId })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Signup failed');
  return data;
};

export const createOrg = async (name, token) => {
  const response = await fetch(ENDPOINTS.SUPER_ORGS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ name })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to create organization');
  return data;
};

export const toggleFeatureFlag = async (flagId, isEnabled, token) => {
  const response = await fetch(`${ENDPOINTS.FLAGS}/${flagId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ isEnabled })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to toggle feature flag');
  return data;
};

export const saveFeatureFlag = async (formValues, flagId, token) => {
  const method = flagId ? 'PUT' : 'POST';
  const endpoint = flagId ? `${ENDPOINTS.FLAGS}/${flagId}` : ENDPOINTS.FLAGS;
  const response = await fetch(endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(formValues)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to save feature flag');
  return data;
};

export const deleteFeatureFlag = async (flagId, token) => {
  const response = await fetch(`${ENDPOINTS.FLAGS}/${flagId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to delete feature flag');
  return data;
};

export const BASE_URL = 'http://localhost:5000/api';

export const ENDPOINTS = {
  HEALTH: `${BASE_URL}/health`,
  LOGIN: `${BASE_URL}/auth/login`,
  SIGNUP: `${BASE_URL}/auth/signup`,
  PUBLIC_ORGS: `${BASE_URL}/public/organizations`,
  SUPER_ORGS: `${BASE_URL}/super/organizations`,
  FLAGS: `${BASE_URL}/org/flags`,
  CHECK_FLAG: `${BASE_URL}/public/check-flag`
};

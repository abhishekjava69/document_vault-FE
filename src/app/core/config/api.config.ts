
export const API_CONFIG = {
  baseUrl: 'http://localhost:8080/api',
  endpoints: {
    register: '/auth/register',
    login: '/auth/login',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password'
  }
} as const;

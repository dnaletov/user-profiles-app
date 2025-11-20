export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
  },
  PROFILES: {
    LIST: '/api/profiles',
    BY_ID: (id: string | number) => `/api/profiles/${id}`,
  },
  UPLOAD: '/api/upload',
} as const;

export const APP_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILES: {
    LIST: '/profiles',
    CREATE: '/profiles/create',
    EDIT: (id: string | number) => `/profiles/${id}/edit`,
  },
} as const;

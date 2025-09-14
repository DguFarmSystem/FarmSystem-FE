export type ROUTE_TYPE = 'PRIVATE' | 'PUBLIC';

/* 페이지 경로 정의 */
export const PATH = {
  ROOT: '/',
  AUTH_LOGIN: '/auth/login',
  AUTH_SOCIAL_REDIRECT: '/auth/redirect',

  DASHBOARD: '/dashboard',
  DASHBOARD_APPLY: '/dashboard/apply',
  DASHBOARD_BLOGS: '/dashboard/blogs',
  DASHBOARD_NEWS: '/dashboard/news',
  DASHBOARD_USERS: '/dashboard/users',
} as const;

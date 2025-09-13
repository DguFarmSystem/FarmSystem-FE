export type ROUTE_TYPE = 'PRIVATE' | 'PUBLIC';

/* 페이지 경로 정의 */
export const PATH = {
  ROOT: '/',
  AUTH_LOGIN: '/auth/login',
  AUTH_SOCIAL_REDIRECT: '/auth/social-redirect',
  APPLY: '/apply',
  BLOGS: '/blogs',
  NEWS: '/news',
  USERS: '/users',
} as const;

export const queryKeys = {
  blogs: {
    all: ['blogs'] as const,
    pending: () => [...queryKeys.blogs.all, 'pending'] as const,
  },
  // 예시 쿼리 키
  // posts: {
  //   all: ['posts'] as const,
  //   lists: () => [...queryKeys.posts.all, 'list'] as const,
  //   detail: (postId: number) => [...queryKeys.posts.all, 'detail', postId] as const,
  //   rightSidebar: (postId: number) => [...queryKeys.posts.all, 'rightSidebar', postId] as const,
  //   similarPosts: (postId: number) => [...queryKeys.posts.all, 'similarPost', postId] as const,
  // },
};

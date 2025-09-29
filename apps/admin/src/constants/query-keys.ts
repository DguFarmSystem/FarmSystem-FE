export const queryKeys = {
  blogs: {
    all: ['blogs'] as const,
    pending: () => [...queryKeys.blogs.all, 'pending'] as const,
  },
  news: {
    all: ['news'] as const,
    detail: (newsId: number) => [...queryKeys.news.all, 'detail', newsId] as const,
  },
};

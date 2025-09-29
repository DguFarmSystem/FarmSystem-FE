import { useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { queryKeys } from '@/constants/query-keys';

export const deleteNews = async (newsId: number) => {
  const { data: response } = await instance.delete(`/api/admin/news/${newsId}`);
  return response.data;
};

export const useDeleteNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ newsId }: { newsId: number }) => deleteNews(newsId),
    onSuccess: () => {
      console.log('뉴스 삭제 성공');
      queryClient.invalidateQueries({ queryKey: queryKeys.news.all });
    },
  });
};

import { NewsItemMutationDto } from '@/apis/news/dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { queryKeys } from '@/constants/query-keys';

export const editNews = async (newsId: number, data: NewsItemMutationDto) => {
  const { data: response } = await instance.put(`/api/admin/news/${newsId}`, data);
  return response.data;
};

export const useEditNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ newsId, data }: { newsId: number; data: NewsItemMutationDto }) =>
      editNews(newsId, data),
    onSuccess: () => {
      console.log('뉴스 수정 성공');
      queryClient.invalidateQueries({ queryKey: queryKeys.news.all });
    },
  });
};

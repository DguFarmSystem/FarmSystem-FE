import { NewsItemMutationDto } from '@/apis/news/dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from '@/apis/instance';
import { queryKeys } from '@/constants/query-keys';

export const createNews = async (data: NewsItemMutationDto) => {
  const { data: response } = await instance.post(`/api/admin/news`, data);
  return response.data;
};

export const useCreateNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NewsItemMutationDto) => createNews(data),
    onSuccess: () => {
      console.log('뉴스 생성 성공');
      queryClient.invalidateQueries({ queryKey: queryKeys.news.all });
    },
  });
};

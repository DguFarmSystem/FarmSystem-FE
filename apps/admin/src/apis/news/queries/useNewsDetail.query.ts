import { ResponseDto } from '@/apis/dto';
import { NewsDetailResponseDto } from '@/apis/news/dto';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';
import { instance } from '@/apis/instance';

// 단일 소식 조회
export const fetchNewsDetail = async (newsId: number) => {
  const { data } = await instance.get<ResponseDto<NewsDetailResponseDto>>(`/api/news/${newsId}`);
  return data.data;
};

export const useNewsDetail = (newsId: number, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: queryKeys.news.detail(newsId),
    queryFn: () => fetchNewsDetail(newsId),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options, // enabled 같은 옵션 전달
  });
};

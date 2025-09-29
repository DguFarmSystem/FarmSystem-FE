import { ResponseDto } from '@/apis/dto';
import { NewsListResponseDto } from '@/apis/news/dto';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';
import { instance } from '@/apis/instance';

// 모든 소식 목록 조회
export const fetchAllNews = async () => {
  const { data } = await instance.get<ResponseDto<NewsListResponseDto>>('/api/news');
  return data.data;
};

export const useAllNews = () => {
  return useQuery({
    queryKey: queryKeys.news.all,
    queryFn: fetchAllNews,
    staleTime: 1000 * 60 * 5, // 5분 동안 stale 아님
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

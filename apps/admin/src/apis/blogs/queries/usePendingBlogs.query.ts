import { ResponseDto } from '@/apis/dto';
import { BlogDto } from '@/apis/blogs/dto';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';
import { instance } from '@/apis/instance';

// 승인 대기중인 블로그 목록 조회
export const fetchPendingBlogs = async () => {
  const { data } = await instance.get<ResponseDto<BlogDto[]>>('/api/admin/blogs/pending');
  return data.data;
};

export const usePendingBlogs = () => {
  return useQuery({
    queryKey: queryKeys.blogs.pending(),
    queryFn: fetchPendingBlogs,
    staleTime: 1000 * 60 * 5, // 5분 동안 stale 아님
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

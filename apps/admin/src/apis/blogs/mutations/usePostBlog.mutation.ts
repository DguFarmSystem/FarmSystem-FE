import { ResponseDto } from '@/apis/dto';
import { BlogRequestDto } from '@/apis/blogs/dto';
import { useMutation } from '@tanstack/react-query';
import { instance } from '@/apis/instance';

// 블로그 생성
export const postBlog = async (data: BlogRequestDto) => {
  const { data: response } = await instance.post('/api/admin/blogs', data);
  return response.data;
};

export const usePostBlog = () => {
  return useMutation({
    mutationFn: postBlog,
    onSuccess: () => {},
  });
};

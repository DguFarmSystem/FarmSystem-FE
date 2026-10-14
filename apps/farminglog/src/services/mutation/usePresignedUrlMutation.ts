import { useMutation } from '@tanstack/react-query';
import { usePrivateApi } from '@repo/api/hooks/usePrivateApi';

interface PresignedUrlRequest {
  directory: string;
  fileName: string;
}

interface PresignedUrlResponse {
  presignedUrl: string;
  fileUrl: string;
}

export const usePresignedUrlMutation = () => {
  const { post } = usePrivateApi();

  return useMutation({
    mutationFn: async (payload: PresignedUrlRequest): Promise<PresignedUrlResponse> => {
      const response = await post('s3/presigned-url/profile', payload);
      console.log('presigned URL : '+response);

      if (response.status !== 200) throw new Error('Presigned URL 생성 실패');
    
      const inner = response.data as PresignedUrlResponse;
      if (!inner.presignedUrl) {
        throw new Error('Presigned URL 응답이 비어 있습니다.');
      }
    
      return inner;
    },
    
    onSuccess: (data) => {
      console.log('✅ Presigned URL 생성 성공:', data.presignedUrl);
    },
  });
};

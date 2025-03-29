import { useMutation } from "@tanstack/react-query";
import { usePrivateApi } from '@repo/api/hooks/usePrivateApi';

// cheer tag enum type (optional)
export type CheerTag = "THANK" | "HUG" | "ENCOURAGE" | string;

// 요청 바디 타입
export interface CheerRequest {
  cheererId: number;
  cheeredId: number;
  tag: CheerTag;
  content: string;
}

// 응답 타입
export interface CheerResponse {
  cheerId: number;
  cheerer: {
    name: string;
    profileImageUrl: string;
    generation: number;
    track: string;
  };
  cheered: {
    name: string;
    profileImageUrl: string;
    generation: number;
    track: string;
  };
  content: string;
  tag: CheerTag;
  createdAt: string;
}



export const useCheerMutation = () => {
  const { post } = usePrivateApi();

  return useMutation<CheerResponse, Error, CheerRequest>({
    mutationFn: async (cheerData: CheerRequest): Promise<CheerResponse> => {
  const { data, status } = await post<CheerResponse>('/cheer', cheerData);
  if (status !== 200) throw new Error('응원 등록 실패');
  return data;
},
  });
};

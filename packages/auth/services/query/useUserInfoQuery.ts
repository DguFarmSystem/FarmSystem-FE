// 마이페이지 사용자 정보 조회 api

import { useQuery } from '@tanstack/react-query';
import { usePrivateApi } from '../../../api/hooks/usePrivateApi';
import { useUserStore, UserInfo } from '../../stores/userStore';
import { ApiResponse } from '../../../api/models/api'; 

export const useUserInfoQuery = (enabled: boolean = true) => {
  const { get } = usePrivateApi();
  const setUser = useUserStore((s) => s.setUser);

  return useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const res: ApiResponse<UserInfo> = await get('user/mypage');
      setUser(res.data);
       
      return res.data;
    },
    staleTime: 0, // 페이지 진입 시마다 항상 fetch 그 외에는 클라이언트 단에서 상태 관리 하도록 해놨음
    gcTime: 1000 * 60 * 5, //5분간 캐시는 유지 -> 얼마가 적당한지 나중에 알아봐야함
    retry: 1,
    enabled, 
  });
};

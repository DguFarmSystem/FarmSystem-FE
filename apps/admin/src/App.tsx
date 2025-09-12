import { AppRouter } from '@/routes/AppRouter';
import { isAxiosError } from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      throwOnError: true,
    },
    mutations: {
      onError: (error: unknown) => {
        if (isAxiosError(error)) {
          console.log(error.response?.data); // 에러 처리 로직 필요 (현재는 콘솔 출력으로만 대체하였으나 추후에 토스트 메세지를 띄우는 방법등 다른 대안 필요)
        } else {
          // 알 수 없는 에러에 대한 처리 부분
        }
      },
    },
  },
});

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </>
  );
}

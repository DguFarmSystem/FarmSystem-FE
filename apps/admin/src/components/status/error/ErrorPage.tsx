import ErrorPageLayout from '@/layouts/ErrorPageLayout';

interface IErrorPageProps {
  status: string;
  message: string;
  isUnknownError: boolean;
  onRetry: () => void;
}

const ErrorPage = ({ status, message, isUnknownError, onRetry }: IErrorPageProps) => {
  const handleHomeClick = () => {
    onRetry();
    if (isUnknownError) {
      // 알 수 없는 에러에 대한 별도의 처리
    }
  };

  return (
    <ErrorPageLayout>
      <div className={`flex flex-col gap-2 items-center justify-center mt-16`}>
        <span>{status}</span>
        <span>{message}</span>
        <button onClick={handleHomeClick}>홈으로 돌아가기</button>
      </div>
    </ErrorPageLayout>
  );
};

export default ErrorPage;

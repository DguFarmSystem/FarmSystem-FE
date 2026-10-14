import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as S from './BottomInfo.styles';
import Popup from '@/components/Popup/Popup';
import useMediaQueries from '@/hooks/useMediaQueries';

// const googleFormLink = "https://docs.google.com/forms/d/e/1FAIpQLSd1p3w5T1c1XFxM4lrqGxwCrW-L1f9Wm4bLmOmcAWcqSILpPw/viewform";
const IS_RECRUIT = false; // 모집 중인지 여부

const BottomInfo = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const { isApp, isMobile, isTablet } = useMediaQueries();

  const handleRecruitClick = () => {
    if (IS_RECRUIT) {
      navigate('/recruit');
    }
    // else {
    //   setPopupOpen(true);
    // }
  };

  return (
    <S.BottomInfoContainer id="eligibility" $isMobile={isMobile} $isTablet={isTablet}>
      <S.Title $isApp={isApp} $isMobile={isMobile} $isTablet={isTablet}>
        <S.Highlight>Farm System</S.Highlight>을 더 알아가고 싶나요?
      </S.Title>

     
      <S.RequirementsBox $isMobile={isMobile} $isTablet={isTablet}>
        <S.RequirementsTitle $isApp={isApp} $isMobile={isMobile} $isTablet={isTablet}>지원 요건</S.RequirementsTitle>
        <S.RequirementItem>
          <S.RequirementTitle $isApp={isApp} $isMobile={isMobile}>누구나 환영해요🖐️</S.RequirementTitle>
          <S.RequirementText $isApp={isApp} $isMobile={isMobile}>Farm System에 관심 있는 동국대학교 학생이라면 누구든지 참여할 수 있어요.</S.RequirementText>
        </S.RequirementItem>
        <S.RequirementItem>
          <S.RequirementTitle $isApp={isApp} $isMobile={isMobile}>월요일 저녁, 같이 성장해요.</S.RequirementTitle>
          <S.RequirementText $isApp={isApp} $isMobile={isMobile}><S.Highlight>매주 월요일 19시</S.Highlight>부터 약 2시간 동안 정기 모임이 열려요. 원활한 팀워크를 위해 필참이 원칙이에요! 함께 성장할 준비되셨나요? </S.RequirementText>
        </S.RequirementItem>
        <S.ButtonContainer $isApp={isApp} $isMobile={isMobile}>
          <S.ApplyButton 
            $isApp={isApp}
            $isMobile={isMobile}
            isRecruit={IS_RECRUIT}
            onClick={handleRecruitClick}
          >
            지원하기
          </S.ApplyButton>
        </S.ButtonContainer>
        {/*
          * 4기 모집중이라 주석 처리 했습니다!
        <S.NotificationContainer $isMobile={isMobile} $isTablet={isTablet}>
          <S.NotificationLink $isMobile={isMobile} $isTablet={isTablet} href={googleFormLink} target="_blank" rel="noopener noreferrer">
            4기 모집 오픈 알림 신청 ➝
          </S.NotificationLink>
        </S.NotificationContainer>
        */}
      </S.RequirementsBox>
      
      <Popup 
        isOpen={isPopupOpen} 
        onClose={() => setPopupOpen(false)} 
        title={"지금은 모집 기간이 아니에요."} 
        content={"다음 모집 일정은 소식에서 안내해 드릴게요."} 
      />
    </S.BottomInfoContainer>
  );
};

export default BottomInfo;

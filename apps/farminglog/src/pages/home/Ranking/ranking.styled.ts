import styled from 'styled-components';

/** 전체 배경(그라디언트) 컨테이너 */
export const MyPageContainer = styled.div<{
  $isMobile: boolean;
  $isTablet: boolean;
}>`

  /* 상하 여백(패딩)을 주어 흰색 박스를 가운데 띄우기 */
  display: flex;
  justify-content: center;
`;

/** 흰색 박스 컨테이너 */
export const ProfileWrapper = styled.div<{
  $isMobile: boolean;
  $isTablet: boolean;
}>`
  /* 모바일/태블릿이면 90%, 데스크톱이면 1200px 고정 너비 */
  width: ${({ $isMobile, $isTablet }) =>
    $isMobile || $isTablet ? '90%' : '1200px'};

  /* 내부를 흰색 박스로 표현 */
  background: white;
  border-radius:  ${({ $isMobile }) => ($isMobile ? '3px' : '10px')};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  /* 내용 배치를 위한 설정 */
  display: flex;
  flex-direction: column;
  align-items: center; /* 중앙 정렬 */
  color: black;
  position: relative;
  margin: 0 auto;
  padding-top: 10px;
  
`;

/** 상단 영역: 뒤로가기 아이콘, 제목(랭킹) 등 */
export const TitleBox = styled.div<{
  $isMobile: boolean;
  $isTablet: boolean;
}>`
  /* 흰색 박스 내부 전체 폭을 사용 */
    width: ${({ $isMobile, $isTablet }) =>
    $isMobile || $isTablet ? '100%' : '1200px'};
  background-color: white;
  padding: 16px 0; /* 위아래 여백 */
  box-sizing: border-box;

  /* 수평 중앙에 제목을 두고, 뒤로가기 아이콘을 절대 위치로 배치하기 위해 flex+position 사용 */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;

  border-radius: ${({ $isMobile }) => ($isMobile ? '3px' : '10px')};
`;

/** 뒤로가기 아이콘 */
export const BackArrow = styled.img<{$isMobile: boolean;}>`
  width: ${({ $isMobile }) => ($isMobile ? '24px' : '35px')};
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
`;

/** 제목 */
export const Title = styled.h2<{$isMobile: boolean;}>`
  font-size: ${({ $isMobile}) => $isMobile ? "24px" : "36px" };
  font-weight: 600;
  font-family: "Pretendard Variable";
  margin: 0; /* 기본 margin 제거 */
`;

/** 랭킹 문구 */
export const Phrase = styled.div<{ isApp: boolean }>`
  width: ${({ isApp }) => (isApp ? '300px' : '400px')};
  margin-top: 40px;
`;
/** 랭킹 헤더 영역 (순위/이름/전공/누적 씨앗) */
export const RankingTitle = styled.div<{ isApp: boolean }>`
  margin-top: 30px;
  display: flex;
  width: 82%;
  left: 2%;
  justify-content: ${({ isApp }) => (isApp ? 'space-between' : 'space-around')};
  align-items: center;
`;

export const RankingTitleText = styled.div<{ isApp: boolean }>`
  width: ${({ isApp }) => (isApp ? '75px' : '90px')};
  font-size: ${({ isApp }) => (isApp ? '9px' : '12px')};
  color: #2e2e2e;
  font-weight: 600;
  font-family: "Pretendard Variable";
  margin-bottom: 10px;
  text-align: center;
`;

/** 랭킹 리스트 영역 */
export const RankingList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 80%;
  margin: 0 auto;
  padding-bottom: 20px;
`;

/** 개별 랭킹 아이템 */
export const RankingItem = styled.div<{
  bgColor: string;
  isMe?: boolean;
  isApp?: boolean;
}>`
  position: relative;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: ${({ isApp }) => (isApp ? 'space-around' : 'space-around')};
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 12px;
  cursor: pointer;

  border: ${({ isMe }) => (isMe ? '3px solid #29d4a7' : 'none')};
`;

/** 랭킹 번호 영역 */
export const RankBox = styled.div`
  position: relative;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RankNumber = styled.div<{ isApp: boolean }>`
  font-weight: bold;
  font-size: ${({ isApp }) => (isApp ? '14px' : '16px')};
  font-family: "Pretendard Variable";
`;

/** 왕관 아이콘 */
export const CrownIcon = styled.img`
  position: absolute;
  left: 30px;
  width: 20px;
  height: 20px;
`;

/** 프로필 영역 */
export const ProfileSection = styled.div`
  width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding-left: 10px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  /* background-color: yellow; */
`;

export const ProfileIcon = styled.img`
  width: 32px;
  height: 32px;
  background-color: #f5f5f5;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 4px; */
`;

export const ColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; // 여기!
  padding-right: 30px;
  gap: 0px;
`;

export const Name = styled.div<{ isApp: boolean }>`
  font-weight: 600;
  font-size: ${({ isApp }) => (isApp ? '14px' : '16px')};
  font-family: "Pretendard Variable";
`;

export const Track = styled.div<{ isApp: boolean }>`
  font-size: ${({ isApp }) => (isApp ? '10px' : '11px')};
  color: #2e2e2e;
  font-weight: 600;
  font-family: "Pretendard Variable";
`;

export const Score = styled.div<{ isApp: boolean }>`
  font-weight: bold;
  font-size: ${({ isApp }) => (isApp ? '14px' : '16px')};
  font-family: "Pretendard Variable";
`;

/** 말풍선 아이콘(선택된 항목) */
export const Balloon = styled.img`
  position: absolute;
  top: -64px;
  left: -2px;
  width: 150px;
  height: auto;
  z-index: 10;
`;

export const PhaseDesc = styled.div<{ $isMobile: boolean }>`
  display: inline-flex;
  margin: 0 auto;
  justify-content: flex-start;
  font-size: ${({ $isMobile }) => ($isMobile ? '14px' : '16px')};
  font-weight: 400;
  font-family: "Pretendard Variable";
  line-height: ${({ $isMobile }) => ($isMobile ? '20px' : '30px')};
  letter-spacing: ${({ $isMobile }) => ($isMobile ? '-0.12px' : '-0.24px')};

`;

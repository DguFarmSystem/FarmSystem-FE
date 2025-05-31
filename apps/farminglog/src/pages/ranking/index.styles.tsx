import styled from 'styled-components';

interface ResponsiveProps {
  $isApp?: boolean;
  $isMobile?: boolean;
  $isTablet?: boolean;
  $isDesktop?: boolean;
}

export const MyPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background: linear-gradient(90deg, #5CD282, #29D4A7);
  padding: 40px 20px;
`;

export const FarmingLogContainerHeader = styled.div<ResponsiveProps>`
  width: 100%;
  height: ${({ $isApp }) => ($isApp ? '40px' : '80px')};
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  align-items: center;

  ${({ $isApp }) => !$isApp && `
    background: var(--FarmSystem_White, #FCFCFC);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  `}
`;

export const FarmingLogContainerTitle = styled.h1<ResponsiveProps>`
  grid-column: 2;
  color: #2E2E2E;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: ${({ $isApp, $isMobile }) =>
    $isApp ? '20px' :
    $isMobile ? '28px' :
    '36px'};
  font-style: normal;
  font-weight: 700;
  line-height: 130%;
  letter-spacing: -0.24px;
`;

export const GoBackButton = styled.button<ResponsiveProps>`
  grid-column: 1;
  width: ${({ $isApp }) => ($isApp ? '24px' : '35px')};
  height: ${({ $isApp }) => ($isApp ? '24px' : '35px')};
  flex-shrink: 0;
  margin-left: ${({ $isApp }) => ($isApp ? '15px' : '25px')};
  
`;

export const ProfileWrapper = styled.div<ResponsiveProps>`
  width: 100%;
  max-width: 75rem;
  min-height: 90vh;

  padding: ${({ $isApp }) => ($isApp ? '20px 0px 0px 0px' : '0')};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ $isApp }) => ($isApp ? '0px' : '40px')};

  border-radius: 5px;
  background: var(--FarmSystem_White, #FCFCFC);
`;

export const TitleBox = styled.div<{ isMobile: boolean }>`
  width: ${({ isMobile }) => (isMobile ? '100%' : '900px')};
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

export const EditButton = styled.button`
  margin-left: auto;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  background-color: #29d4a7;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #25be96;
  }
`;

export const SectionTitleBox = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-bottom-width: 0.5px;
  border-bottom-style: solid;
  border-bottom-color: #bebebe;
  width: ${({ isMobile }) => (isMobile ? '100%' : '900px')};
`;

export const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-top: 24px;
  margin-bottom: 12px;
`;

export const Phrase = styled.img<{ isApp: boolean }>`
  width: ${({ isApp }) => (isApp ? '300px' : '400px')};
  margin-top: 40px;
`;

export const Logo = styled.img`
  width: 40px;  
  height: 40px
`;

export const BackArrow = styled.img`
  width: 25px;  
`;

export const Icon = styled.img`
  width: 30px;  
  margin-right: 5px;
`;

export const Icon2 = styled.img`
  width: 23px;  
  margin-right: 5px;
  margin-bottom: 5px;
`;

export const RowBox = styled.div`
  height: 35px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const ColumnBox = styled.div`
  /* height: 35px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 0px;
  /* background-color: green; */
`;


export const RankingTitle = styled.div<{ isApp: boolean }>`
  margin-top: 30px;
  margin-bottom: -40px;
  display: flex;
  flex-direction: row;
  left: 2%;
  width: 82%;
  justify-content: ${({ isApp }) => (isApp ? 'space-between' : 'space-around')};
  align-items: center;
  border-radius: ${({ isApp }) => (isApp ? '3px' : '10px')};
`;

export const RankingTitleText = styled.div<{ isApp: boolean }>`
  width: ${({ isApp }) => (isApp ? '75px' : '90px')};
  font-size: ${({ isApp }) => (isApp ? '9px' : '12px')};
  margin-bottom: 10px;
  text-align: center;
`;


export const RankingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  align-items: center;
  padding-bottom: 40px;
`;

export const RankingItem = styled.div<{
  bgColor: string;
  isMe?: boolean;
  isApp?: boolean;
}>`
  position: relative;
  width: ${({ isApp }) => (isApp ? '250px' : '80%')};
  height: 60px;
  display: flex;
  justify-content: ${({ isApp }) => (isApp ? 'space-around' : 'space-around')};
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 12px;
  padding: ${({ isApp }) => (isApp ? '20px' : '16px')};
  border: ${({ isMe }) => (isMe ? '3px solid #29D4A7' : 'none')};
  cursor: pointer;
`;


export const RankBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
`;


export const RankNumber = styled.div<{ isApp: boolean }>`
  font-weight: bold;
  font-size: ${({ isApp }) => (isApp ? '14px' : '16px')};
  text-align: left;
`;

export const CrownIcon = styled.img<{ isMobile: boolean }>`
  width: ${({ isMobile }) => (isMobile ? '20px' : '18px')};
  height: ${({ isMobile }) => (isMobile ? '20px' : '18px')};
`;


export const ProfileSection = styled.div`
  width: 140px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  /* background-color: yellow; */
  padding-left: 10px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export const ProfileIcon = styled.img`
  width: 32px;
  height: 32px;
  background-color: #F5F5F5;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Name = styled.div<{ isApp: boolean }>`
  font-weight: 600;
  font-size: ${({ isApp }) => (isApp ? '12px' : '16px')};
`;

export const Track = styled.div<{ isApp: boolean }>`
  font-size: ${({ isApp }) => (isApp ? '8px' : '11px')};
  color: #2E2E2E;
  font-weight: 600;
`;

export const Score = styled.div<{ isApp: boolean }>`
  font-weight: bold;
  font-size: ${({ isApp }) => (isApp ? '14px' : '16px')};
`;

export const Crown = styled.div`
  position: absolute;
  left: 0;
`;

export const Balloon = styled.img`
  position: absolute;
  top: -64px;
  left: -2px;
  width: 150px;
  height: auto;
  z-index: 10;
`;


export const PhaseTitle = styled.div<{$isMobile: boolean }>`
  font-family: 'Pretendard Variable';
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  letter-spacing: -0.24px;

  text-align: center;          /* 가로 중앙 */
  display: flex;              
  align-items: center;         /* 세로 중앙 */
  justify-content: center;
  margin-bottom: -30px;     
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

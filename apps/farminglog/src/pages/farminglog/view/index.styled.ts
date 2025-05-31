import styled from 'styled-components';

interface ResponsiveProps {
  $isApp?: boolean;
  $isMobile?: boolean;
  $isTablet?: boolean;
  $isDesktop?: boolean;
}

export const MainContainer = styled.div<ResponsiveProps>`
  display: flex;
  padding: 20px 20px 100px;
  min-height: 100vh;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const FarmingLogContainer = styled.div<ResponsiveProps>`
  width: 100%;
  max-width: 75rem;
  min-height: 90vh;

  padding: ${({ $isApp }) => ($isApp ? '20px 16px 0px 16px' : '0')};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ $isApp }) => ($isApp ? '0px' : '40px')};

  border-radius: 5px;
  background: var(--FarmSystem_White, #FCFCFC);
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
  margin-left: ${({ $isApp }) => ($isApp ? '0px' : '25px')};
`;

export const FarmingLogCardContainer = styled.div<ResponsiveProps>`
  width : 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;

  gap: 20px;
  padding: ${({ $isApp }) => ($isApp ?  '0' : '0 20px 0 20px')};
`;

export const EndOfList = styled.div<ResponsiveProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
  padding-bottom: 150px;
`;

export const EndOfListText = styled.p<ResponsiveProps>`
  color: var(--FarmSystem_Gray, #B7B7B7);
  font-family: "Pretendard Variable";
  font-size: ${({ $isApp, $isMobile }) =>
    $isApp ? '20px' :
    $isMobile ? '24px' :
    '28px'};
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
  letter-spacing: -0.24px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const FarmingLogWriteButton = styled.button<ResponsiveProps>`
  position: fixed;
  bottom: 40px;
  right: ${({ $isApp, $isMobile, $isTablet, $isDesktop }) => {
  if ($isApp) return '16px';
  if ($isMobile) return '24px';
  if ($isTablet) return 'calc((100vw - 780px) / 2 + 20px)';
  if ($isDesktop) return 'calc((100vw - 980px) / 2 + 20px)';
  return '32px';
}};

  display: flex;
  width: ${({ $isApp, $isMobile }) => ($isApp ? '45px' : $isMobile ? '55px' : '70px')};
  height: ${({ $isApp, $isMobile }) => ($isApp ? '45px' : $isMobile ? '55px' : '70px')};
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  cursor: pointer;

  border-radius: 35px;
  background: #5CD282;
`;

export const FarmingLogWriteButtonImage = styled.img<ResponsiveProps>`
  width: 25px;
  height: 25px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  cursor: pointer;
`;
import styled from "styled-components";


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

export const ContentContainer = styled.div<ResponsiveProps>`
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
  border-radius: ${({ $isMobile }) => ($isMobile ? '3px' : '10px')};
`;


export const ContentContainerHeader = styled.div<ResponsiveProps>`
  width: 100%;
  height: ${({ $isApp }) => ($isApp ? '40px' : '80px')};
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  align-items: center;

  ${({ $isApp }) => !$isApp && `
    background: var(--FarmSystem_White, #FCFCFC);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  `}
  border-radius: ${({ $isMobile }) =>
  $isMobile ? '3px 3px 0 0' : '10px 10px 0 0'};
`;

export const ContentContainerTitle = styled.h1<ResponsiveProps>`
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
  cursor: pointer;
`;
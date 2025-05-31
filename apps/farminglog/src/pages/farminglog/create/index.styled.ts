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

export const FarmingLogEditorContainer = styled.div<ResponsiveProps>`
  width: 100%;
  max-width: 75rem;
  height: 90vh;
  padding: 15px 12px 0px 13px;
  // padding: ${({ $isApp }) => ($isApp ? '20px 15px 0px 15px' : '')};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ $isApp }) => ($isApp ? '15px' : '40px')};
  background: var(--FarmSystem_White, #FCFCFC);
  border-radius: 5px;
`;

export const FarmingLogEditorContainerHeader = styled.div<ResponsiveProps>`
  width: ${({ $isApp, $isMobile }) => ($isApp ? '220px' : $isMobile ? '400px' : '550px')};
  height: ${({ $isApp, $isMobile }) => ($isApp ? '60px' : $isMobile ? '100px' : '130px')};
  flex-shrink: 0;

  margin-top: ${({ $isApp }) => ($isApp ? '15px' : '40px')};
  margin-bottom: ${({ $isMobile }) => ($isMobile ? '20px' : '0px')};
  border-radius: 5px;
  border: 1px solid #FFF763;
  background: #FFFAA4;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: column;
`;

export const HeaderPinContainer = styled.div<ResponsiveProps>`
  width: 100%;
  height: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: top;
  z-index: 1;
`;

export const HeaderPin = styled.div<ResponsiveProps>`
  display: flex;
  width: ${({ $isApp }) => ($isApp ? '11px' : '20px')};
  height: ${({ $isApp }) => ($isApp ? '11px' : '20px')};
  padding: 2px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  margin: 3px 6px 0px 6px;

  border-radius: ${({ $isApp }) => ($isApp ? '6px' : '100px')};
  background: #FF9A4D;
  box-shadow: 0px 2px 2px 0px #FF6F00 inset;
`;

export const HeaderPinIcon = styled.img<ResponsiveProps>`
  width: ${({ $isApp }) => ($isApp ? '7px' : '10px')};
  height: ${({ $isApp }) => ($isApp ? '7px' : '10px')};
  flex-shrink: 0;
  aspect-ratio: 1/1;
`;

export const HeaderContext = styled.h3<ResponsiveProps>`
  color: #2E2E2E;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: ${({ $isApp, $isMobile }) => ($isApp ? '10px' : $isMobile ? '15px' : '20px')};
  font-style: normal;
  font-weight: 500;
  line-height: ${({ $isApp, $isMobile }) => ($isApp ? '16px' : $isMobile ? '22px' : '28px')};
  margin-top: ${({ $isApp, $isMobile  }) => ($isApp ? '0px' : $isMobile ? '10px' : '20px')};
  letter-spacing: -0.24px;
`;

export const HeaderContextBold = styled.span`
  font-weight: 700;
`;

export const FarmingLogCard = styled.div<ResponsiveProps>`
  display: flex;
  width: 100%;
  max-width: 800px;
  padding: ${({ $isApp }) => ($isApp ? '10px 5px' : '20px 10px')};
  flex-direction: column;
  align-items: center;

  border-radius: 5px;
  border: 1px solid #DBDBDB;
`;

export const Thumbnail = styled.div<ResponsiveProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  aspect-ratio: 250/167;

  border-radius: 5px;
  background: #E5E5E5;
`;

export const FilePlusIcon = styled.img`
  width: 35px;
  height: 35px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`;

export const ContentContainer = styled.div<ResponsiveProps>`
  display: flex;
  padding: 10px 5px;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ $isApp }) => ($isApp ? '5px' : '30px')};
  align-self: stretch;
`;

export const CategoryContainer = styled.div<ResponsiveProps>`
  display: flex;
  width: 100%;
  justify-content: flex-start;
`;

export const CategorySelect = styled.div<ResponsiveProps>`
  display: flex;
  padding: ${({ $isApp }) => ($isApp ? '0px 10px' : '5px 15px')};
  justify-content: center;
  align-items: center;
  gap: 5px;

  border-radius: ${({ $isApp }) => ($isApp ? '10px' : '20px')};
  background: #5CD282;
  cursor: pointer;
`;

export const CategoryOptionContainer = styled.ul<ResponsiveProps>`
  position: absolute;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  width: ${({ $isApp }) => ($isApp ? '66px' : '130px')};
  z-index: 1;
  padding: 5px 0px;
  align-items: center;
  gap: 10px;

  cursor: pointer;
  border-radius: 5px;
  border: 1px solid var(--FarmSystem_LightGrey, #E5E5E5);
  background: var(--FarmSystem_White, #FCFCFC);
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const CategoryOption = styled.li<ResponsiveProps>`
  align-self: stretch;
  cursor: pointer;

  color: #2E2E2E;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: ${({ $isApp }) => ($isApp ? '10px' : '16px')};
  font-style: normal;
  font-weight: 500;
  line-height: 30px; /* 300% */
  letter-spacing: -0.24px;
`;

export const CategoryText = styled.p<ResponsiveProps>`
  color: var(--FarmSystem_White, #FCFCFC);
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: ${({ $isApp, $isMobile }) => ($isApp ? '10px' : $isMobile ? '12px' : '15px')};
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 200% */
  letter-spacing: -0.24px;
`;

export const InputAndTextContainer = styled.div<ResponsiveProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  align-items: center;
  gap: ${({ $isApp }) => ($isApp ? '5px' : '15px')};
  align-self: stretch;
`;

export const TitleContainer = styled.div<ResponsiveProps>`
  display: flex;
  width: 100%;
  padding: 0px 5px;
  align-items: center;
  justify-content: space-between;
`;

export const TitleTextContainer = styled.div<ResponsiveProps>`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const TitleText = styled.p<ResponsiveProps>`
  color: #2E2E2E;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: ${({ $isApp, $isMobile }) => ($isApp ? '12px' : $isMobile ? '16px' : '20px')};
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 166.667% */
  letter-spacing: -0.24px;
`;

export const SmallText = styled.p<ResponsiveProps>`
  color: var(--FarmSystem_DarkGrey2, #757575);
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: ${({ $isApp, $isMobile }) => ($isApp ? '8px' : $isMobile ? '12px' : '16px')};
  font-style: normal;
  font-weight: 500;
  line-height: 14px; /* 175% */
  letter-spacing: -0.24px;
`;

export const InputBox = styled.input<ResponsiveProps>`
  display: flex;
  padding: 10px;
  align-items: center;
  width: 100%;
  outline: none;

  border-radius: 5px;
  border: 1px solid #5CD282;
  background: var(--FarmSystem_White, #FCFCFC);
  color: #2E2E2E;

  font-family: "Pretendard Variable";
  font-size: ${({ $isApp, $isMobile }) => ($isApp ? '12px' : $isMobile ? '14px' : '16px')};
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
  letter-spacing: -0.24px;
`;

export const DateContainer = styled.div<ResponsiveProps>`
  display: flex;
  width: 100%;
  padding: 5px 0px;
  align-items: center;
  align-self: stretch;
`;

export const DateText = styled.p`
  display: flex;
  justify-content: center;

  color: var(--FarmSystem_DarkGrey2, #757575);
  font-family: "Pretendard Variable";
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 200% */
  letter-spacing: -0.24px;
`;

export const TextArea = styled.textarea<ResponsiveProps>`
  display: flex;
  width: 100%;
  height: 100px;
  padding: 5px 10px;
  align-items: center;

  outline: none;
  border-radius: 5px;
  border: 1px solid #5CD282;
  background: var(--FarmSystem_White, #FCFCFC);
  resize: none;

  color: #2e2e2e;
  font-family: "Pretendard Variable";
  font-size: ${({ $isApp, $isMobile }) => ($isApp ? '12px' : $isMobile ? '14px' : '16px')};
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
  letter-spacing: -0.24px;
`;

export const ButtonContainer = styled.div<ResponsiveProps>`
  max-width: 100%;
  display: flex;
  width: 100%;
  padding: 5px 0px;
  align-items: center;
  justify-content: center;
  gap: 70px;
`;

export const GoBackButton = styled.button<ResponsiveProps>`
  display: flex;
  padding: ${({ $isApp }) => ($isApp ? '5px 17.5px 5px 18.5px' : '15px 30px')};
  justify-content: center;
  align-items: center;
  cursor: pointer;

  border-radius: ${({ $isApp }) => ($isApp ? '5px' : '10px')};
  background: var(--FarmSystem_DarkGrey, #999);
  box-shadow: 0px 2px 10px 0px rgba(25, 25, 25, 0.20);
`;

export const CreateButton = styled.button<ResponsiveProps>`
  display: flex;
  padding: ${({ $isApp }) => ($isApp ? '5px 17.5px 5px 18.5px' : '15px 30px')};
  justify-content: center;
  align-items: center;
  cursor: pointer;

  border-radius: ${({ $isApp }) => ($isApp ? '5px' : '10px')};
  background: #5CD282;
  box-shadow: 0px 2px 10px 0px rgba(25, 25, 25, 0.20);
`;

export const ButtonEnnerText = styled.p<ResponsiveProps>`
  color: var(--FarmSystem_White, #FCFCFC);
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: ${({ $isApp, $isMobile }) => ($isApp ? '12px' : $isMobile ? '14px' : '16px')};
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 166.667% */
  letter-spacing: -0.24px;
`;
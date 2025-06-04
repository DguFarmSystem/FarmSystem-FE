import styled from "styled-components";

interface LayoutProps {
  $isMobile?: boolean;
  $isTablet?: boolean;
  $isDesktop?: boolean;
}

export const DetailCard = styled.div<LayoutProps>`
  display: flex;
  width: 100%;
  max-width: 1000px;
  padding: ${({ $isMobile }) => ($isMobile ? "20px": "50px")};
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  border-radius: 20px;
  background: var(--FarmSystem_White, #FCFCFC);
  box-shadow: 0px 0px 20px 5px var(--FarmSystem_LightGrey, #E5E5E5);
  gap: ${({ $isMobile }) => ($isMobile ? "20px": "70px")};
`;

export const GoBackContainer = styled.div<LayoutProps>`
  display: flex;
  align-items: left;
  align-self: stretch;
`;

export const GoBackButton = styled.button<LayoutProps>`
  display: flex;
  align-items: center;
  align-self: stretch;
  cursor: pointer;

  color: var(--FarmSystem_Green01, #28723F);
  font-size: ${({ $isMobile }) => ($isMobile ? "16px": "24px")};

  font-style: normal;
  font-weight: 500;
  line-height: 40px; /* 166.667% */
  letter-spacing: -0.24px;
`;

export const GoBackImg = styled.img<LayoutProps>`
  width: ${({ $isMobile }) => ($isMobile ? "20px": "30px")};;
  height: ${({ $isMobile }) => ($isMobile ? "24px": "40px")};
`;

export const TitleContainer = styled.div<LayoutProps>`
  display: flex;
  max-width: 800px;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ $isMobile }) => ($isMobile ? "15px": "30px")};
`;

export const ParticipantsAndTagContainer = styled.div<LayoutProps>`
  display: flex;
  padding: 10px 0px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
  width: 100%;
`;

export const Link = styled.a<LayoutProps>`
  display: flex;
  color: var(--FarmSystem_Black, #191919);
  font-size: ${({ $isMobile }) => ($isMobile ? "12px": "16px")};
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 150% */
  letter-spacing: -0.24px;

`;

export const Tag = styled.p<LayoutProps>`
  display: flex;
  height: ${({ $isMobile }) => ($isMobile ? "32px": "40px")};
  padding: 5px 20px;
  justify-content: center;
  align-items: center;

  border-radius: 15px;
  background: var(--FarmSystem_Green06, #006811);

  color: var(--FarmSystem_White, #FCFCFC);
  text-align: center;
  font-size: ${({ $isMobile }) => ($isMobile ? "16px": "20px")};
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 100% */
  letter-spacing: -0.24px;
`;

export const Participant = styled.p<LayoutProps>`
  display: flex;
  flex-direction: row;
  gap: 10px;
  color: var(--FarmSystem_Black, #191919);
  
  
  font-size: ${({ $isMobile }) => ($isMobile ? "16px": "20px")};
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 150% */
  letter-spacing: -0.24px;
`;

export const Title = styled.h2<LayoutProps>`
  display: flex;
  padding: 10px 0px;
  justify-content: start;
  align-items: center;
  gap: 10px;
  align-self: stretch;

  color: var(--FarmSystem_Black, #191919);
  font-family: "Pretendard Variable";
  font-size: ${({ $isMobile }) => ($isMobile ? "24px": "32px")};
  font-style: normal;
  font-weight: 700;
  line-height: 40px; /* 125% */
  letter-spacing: -0.24px;

  width: 100%;
  max-width: 800px;
`;

export const ImageContainer = styled.div<LayoutProps>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Thumbnail = styled.img<LayoutProps>`
  width: 827.92px;
  // height: 533px;
  flex-shrink: 0;
  aspect-ratio: 827.92/533.00;

  border-top: 3px solid var(--FarmSystem_DarkGrey, #999);
  border-bottom: 1px solid var(--FarmSystem_DarkGrey, #999);
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
`;

export const ContentBox = styled.p<LayoutProps>`
  width: 100%;
  max-width: 800px;
  white-space: pre-wrap;

  color: var(--FarmSystem_Black, #191919);
  font-family: "Pretendard Variable";
  font-size: ${({ $isMobile }) => ($isMobile ? "18px": "20px")};
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 150% */
  letter-spacing: -0.24px;
`;

export const LinkContainer = styled.div<LayoutProps>`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: flex-start;
  max-width: 800px;
  width: 100%;
`;

export const LinkIcon = styled.img<LayoutProps>`
  width: ${({ $isMobile }) => ($isMobile ? "30px": "50px")};
  height: ${({ $isMobile }) => ($isMobile ? "30px": "50px")};
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  object-fit: cover;
  &:hover {
    transform: scale(1.1);
  }
`;
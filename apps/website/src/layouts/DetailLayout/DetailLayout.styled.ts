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

export const DateAndTagContainer = styled.div<LayoutProps>`
  display: flex;
  padding: 10px 0px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
  width: 100%;
`;

export const Date = styled.p<LayoutProps>`
  display: flex;
  color: var(--FarmSystem_Black, #191919);
  font-size: ${({ $isMobile }) => ($isMobile ? "16px": "20px")};
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

// 소식 이미지: 인스타 게시물(1:1, 4:5)이 잘리지 않도록 정사각 프레임에 contain
export const CarouselImage = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: contain;
  background: #f5f5f5;
  border-radius: 4px;
  cursor: zoom-in;
`;

export const ContentBox = styled.p<LayoutProps>`
  width: 100%;
  max-width: 800px;
  white-space: pre-wrap;

  color: var(--FarmSystem_Black, #191919);
  font-family: "Pretendard Variable";
  font-size: ${({ $isMobile }) => ($isMobile ? "18px": "20px")};;
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 150% */
  letter-spacing: -0.24px;
`;

////////////////////// 이미지 ////////////////////////
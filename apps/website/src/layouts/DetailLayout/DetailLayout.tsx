import * as S from "./DetailLayout.styled";
import { useState } from "react";
import GoBackArrow from "@/assets/LeftArrow.png";
import useMediaQueries from "@/hooks/useMediaQueries";
import ImageModal from './ImageModal';
import ImageCarousel from "./ImageCarousel";

interface DetailLayoutProps {
  title?: string;
  content?: string;
  date?: string;
  tag?: string;
  thumbnailUrl?: string;
  imageUrls?: string[];
}

export default function DetailLayout({
  title = "(임시) 제목",
  content = "(임시) 내용",
  date = "(임시) 게시일자: 2025년 03월 13일",
  tag = "(임시) 태그",
  thumbnailUrl = "",
  imageUrls = [],
}: DetailLayoutProps) {
  const { isMobile, isTablet, isDesktop } = useMediaQueries();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
      <S.DetailCard $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
        <S.GoBackContainer  $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
          <S.GoBackButton 
             $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}
            onClick={() => window.history.back()}
          >
            <S.GoBackImg
              $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop} 
              src={GoBackArrow}
              alt="Go back"
            />
            <p>돌아가기</p>
          </S.GoBackButton>
        </S.GoBackContainer >
        <S.TitleContainer $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
          <S.DateAndTagContainer  $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
            <S.Date  $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
              {date}
            </S.Date>
            <S.Tag  $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
              {tag}
            </S.Tag>
          </S.DateAndTagContainer>
          <S.Title  $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
            {title}
          </S.Title>
        </S.TitleContainer>
        <S.ImageContainer  $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
          <ImageCarousel
            images={[...new Set([thumbnailUrl, ...imageUrls].filter(Boolean))]}
            maxWidth="600px"
            renderImage={(src, i) => (
              <S.CarouselImage src={src} alt={`${title} ${i + 1}`} onClick={() => setSelectedImage(src)} />
            )}
          />
        </S.ImageContainer>
        {selectedImage && (
          <ImageModal
            imageUrl={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
        <S.ContentBox  $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
          {content}
        </S.ContentBox>
      </S.DetailCard>
  );
}
import * as S from "./ImageCarousel.styled";
import { useState, useRef, ReactNode } from "react";

interface ImageCarouselProps {
  images: string[];
  maxWidth?: string;
  renderImage: (src: string, index: number) => ReactNode;
}

// 이미지 여러 장을 좌우 버튼·점·스와이프로 넘겨 보는 캐러셀 (1장이면 버튼·점 숨김)
export default function ImageCarousel({ images, maxWidth = "827.92px", renderImage }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const go = (delta: number) => setCurrent((i) => (i + delta + images.length) % images.length);

  return (
    <S.Carousel
      $maxWidth={maxWidth}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touchStartX.current = null;
      }}
    >
      {renderImage(images[current], current)}
      {images.length > 1 && (
        <>
          <S.CarouselButton $side="left" onClick={() => go(-1)} aria-label="이전 이미지">‹</S.CarouselButton>
          <S.CarouselButton $side="right" onClick={() => go(1)} aria-label="다음 이미지">›</S.CarouselButton>
          <S.CarouselDots>
            {images.map((_, i) => (
              <S.CarouselDot key={i} $active={i === current} onClick={() => setCurrent(i)} aria-label={`${i + 1}번 이미지`} />
            ))}
          </S.CarouselDots>
        </>
      )}
    </S.Carousel>
  );
}

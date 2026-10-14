import styled from "styled-components";

export const Carousel = styled.div<{ $maxWidth: string }>`
  position: relative;
  width: 100%;
  max-width: ${(props) => props.$maxWidth};
  touch-action: pan-y;
`;

export const CarouselButton = styled.button<{ $side: "left" | "right" }>`
  position: absolute;
  top: 50%;
  ${(props) => props.$side}: 12px;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  font-size: 26px;
  line-height: 1;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.65);
  }
`;

export const CarouselDots = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
`;

export const CarouselDot = styled.button<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: ${(props) => (props.$active ? "#fff" : "rgba(255, 255, 255, 0.5)")};
  cursor: pointer;
`;

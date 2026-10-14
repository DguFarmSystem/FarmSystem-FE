import styled from 'styled-components';

// 스타일 컴포넌트 (블로그랑 같지만, 다를 수 있으니께)
// 요긴 대충 짜서 해결
export const Card = styled.a<{$isMobile: boolean; $isTablet: boolean;}>`
  width: 100%;
  height: ${(props) => (props.$isMobile ? '205px' : props.$isTablet ? '260px' : '279px')};

  border-radius: ${(props) => (props.$isMobile ? '10px' : '8px')};
  overflow: hidden;

  display: flex;
  flex-direction: column;
  gap: 10px;

  color: var(--FarmSystem_Black);
  text-decoration: none; // 링크 밑줄 제거 등
`;

export const Image = styled.div<{$isMobile: boolean; $isTablet: boolean;}>`
  width: 100%;

  overflow: hidden;
  border-radius: 8px;
  height: ${(props) => (props.$isMobile ? '87px' : props.$isTablet ? '150px' : '167px')};
  background-color: var(--FarmSystem_LightGrey);

  display: flex;
  align-items: center;
  justify-content: center;

  img{
    /* height: ${(props) => (props.$isMobile ? '87px' : props.$isTablet ? '150px' : '200px')}; */
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}
`;

export const Content = styled.div`
  padding: 0px;
`;

export const Title = styled.h3<{$isMobile: boolean; $isTablet: boolean;}>`
   margin: 0px;
   font-size: ${(props) => (props.$isMobile ? '12px' : props.$isTablet ? '16px' : '24px')};
   font-weight: 700;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

`;

export const Description = styled.p<{$isMobile: boolean; $isTablet: boolean;}>`
  font-size: ${(props) => (props.$isMobile ? '10px' : props.$isTablet ? '15px' : '15px')};
  line-height: 20px;
  font-weight: 300;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  height: ${(props) => (props.$isMobile ? '60px' : props.$isTablet ? '40px' : '40px')}; /* line-height * 2 */
`;

export const TagContainer = styled.div`
   margin-top: 10px;
   display: flex;
   gap: 10px;
`;

export const Tag = styled.span<{$isMobile: boolean; $isTablet: boolean;}>`
   background-color: var(--FarmSystem_Green06);
   color: var(--FarmSystem_White);

   padding: 5px 10px;
   border-radius: 15px;
   font-size: ${(props) => (props.$isMobile ? '10px' : props.$isTablet ? '12px' : '14px')};


   font-weight: 300;
   line-height: 1.2;
`;
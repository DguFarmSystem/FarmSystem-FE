import styled from 'styled-components';

// 전체 컨테이너
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  justify-content: flex-start;
`;

/** 필터 영역 전체 컨테이너 */
export const TableContainer = styled.div<{$isMobile: boolean; $isTablet: boolean;}>`
  display: flex;
  gap: 30px;
  width: 100%;
  justify-content: flex-start;
  flex-direction: column;
  margin-top: ${(props) => (props.$isMobile ? '0px' : props.$isTablet ? '15px' : '60px')};
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  width: 100%;
  justify-content: flex-start;
`;

/** 필터 버튼과 드롭다운을 감싸는 컨테이너 */
export const FilterWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 왼쪽 정렬 */
  margin-top: 30px;
`;

/** 기수 버튼 */
export const FilterGradeButton = styled.button<{$isMobile: boolean; $isTablet: boolean;}>`
  background-color: var(--FarmSystem_Green06);
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: ${(props) => (props.$isMobile ? '15px' : '8px')};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  font-size: ${(props) => (props.$isMobile ? '12px' : props.$isTablet ? '14px' : '16px')};
  font-weight: 500;
  width: ${(props) => (props.$isMobile ? '80px' : props.$isTablet ? '70px' : '80px')}; /* 기수 버튼은 작게 */
`;

/** 트랙 버튼 */
export const FilterTrackButton = styled.button<{$isMobile: boolean; $isTablet: boolean;}>`
  background-color: var(--FarmSystem_Green06);
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: ${(props) => (props.$isMobile ? '15px' : '8px')};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  font-size: ${(props) => (props.$isMobile ? '12px' : props.$isTablet ? '14px' : '16px')};
  font-weight: 500;
  width: ${(props) => (props.$isMobile ? '120px' : props.$isTablet ? '130px' : '150px')}; /* 트랙 버튼은 큼 */
`;

/** 기수 드롭다운 */
export const DropdownGradeMenu = styled.div<{$isMobile: boolean; $isTablet: boolean;}>`
  position: absolute;
  top: 45px;
  left: 0;
  width: ${(props) => (props.$isMobile ? '80px' : props.$isTablet ? '70px' : '80px')}; /* 기수 버튼과 동일한 크기 */
  text-align: left;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid var(--FarmSystem_LightGrey);
  box-shadow: 4px 4px 4px 0px #00000040;
  z-index: 999;
`;

/** 트랙 드롭다운 */
export const DropdownTrackMenu = styled.div<{$isMobile: boolean; $isTablet: boolean;}>`
  position: absolute;
  top: 45px;
  left: 0;
    width: ${(props) => (props.$isMobile ? '120px' : props.$isTablet ? '130px' : '150px')}; 
  text-align: left;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid var(--FarmSystem_LightGrey);
  box-shadow: 4px 4px 4px 0px #00000040;
  z-index: 999;
`;

/** 드롭다운 아이템 */
export const DropdownItem = styled.div<{$isMobile: boolean; $isTablet: boolean;}>`
  padding: ${({$isMobile})=>($isMobile ? '8px 12px' : '8px 18px')};
  cursor: pointer;
  font-size: ${(props) => (props.$isMobile ? '10px' : props.$isTablet ? '12px' : '14px')};
  color: #333;
  
  &:hover {
    background-color: #f0fff0;
    border-radius: 8px;
  }
`;


export const ListContainer = styled.div<{$isTablet: boolean; $isBig: boolean; $isMobile: boolean;}>`
  width: 100%;
  margin: 20px auto;
  min-width: ${(props) => (props.$isMobile ? '240px' : props.$isTablet ? '400px' : '800px')};


  display: grid;

  grid-template-columns: ${(props) => {
    if (props.$isMobile) return '1fr 1fr'; // 모바일: 2 컬럼
    return 'repeat(auto-fit, minmax(240px, 1fr))'; // 데스크탑: 유동 폭 컬럼
  }};
  
  /* 블로그 카드와 동일, gap을 clamp로 반응형 설정? clamp 싱기싱기 */
  gap: clamp(12px, 2vw, 24px);
  
  justify-items: ${(props) => (props.$isMobile || props.$isTablet ? 'start' : 'start')};
  
  
`;

export const SkeletonListContainer = styled(ListContainer)``;

export const SkeletonCard = styled.div<{$isMobile: boolean;}>`
  width: 100%;
  /* 반응형 높이: 최소 150px, 화면 커지면 증가, 최대 200px */
  height: clamp(150px, 14vw, 200px);
  border-radius: ${(props) => (props.$isMobile ? '10px' : '16px')};
  background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
  background-size: 400% 100%;
  animation: skeleton-shimmer 1.2s ease-in-out infinite;

  @keyframes skeleton-shimmer {
    0% { background-position: 100% 50%; }
    100% { background-position: 0 50%; }
  }
`;

/* 비어 있을 떄 출력하는 레이아웃 잡는 컨테이너 */
export const DescriptionContainer = styled.div`
  width: 100%;
  margin: 20px auto;
  display: flex;
  margin-bottom: 100px; 
`;

/* 텍스트 컨테이너*/
export const TextContainer = styled.div<{$isMobile: boolean;}>`
  padding-top: 20vh;
  height: 100px;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  color: black;
  font-size: ${(props) => (props.$isMobile ? "20px" : "32px")};
  font-weight: 600;
  margin-bottom: 200px;

  a {
    font-size: ${(props) => (props.$isMobile ? "10px" : "14px")};
    font-weight: 300;
  }
  gap: 10px;
`;

export const Wrapper = styled.div`
  margin-top: 100px;
`;

export const ProjectListContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start; /* 왼쪽 정렬 */
  margin-top: 30px;
`;

/** 페이지네이션 컨테이너 */
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;

/** 페이지네이션 버튼 컨테이너 */
export const PaginationButton = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

/** 페이지네이션 버튼 텍스트 */
export const PaginationButtonText = styled.span<{
  $active?: boolean;
  $disabled?: boolean;
  $isMobile?: boolean;
  $isTablet?: boolean;
}>`
  border-radius: 6px;
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  /* 사이즈 조절 */
  img[alt="nextArrow"]{
    width: ${(props) => (props.$isMobile ? '6px' : props.$isTablet ? '12px' : '15px')};
    height: ${(props) => (props.$isMobile ? '12px' : props.$isTablet ? '24px' : '30px')};
    margin-right: 10px;
  }

  img[alt="jumpArrow"]{
    width: ${(props) => (props.$isMobile ? '24px' : props.$isTablet ? '48px' : '60px')};
    height: ${(props) => (props.$isMobile ? '24px' : props.$isTablet ? '48px' : '60px')};
  }

  /* nextArrow 이미지 회전 */
  img[alt="nextArrow_right"] {
    width: ${(props) => (props.$isMobile ? '6px' : props.$isTablet ? '12px' : '15px')};
    height: ${(props) => (props.$isMobile ? '12px' : props.$isTablet ? '24px' : '30px')};
    transform: rotate(180deg);
    margin-left: 10px;
  }

  img[alt="jumpArrow_right"] {
    width: ${(props) => (props.$isMobile ? '24px' : props.$isTablet ? '48px' : '60px')};
    height: ${(props) => (props.$isMobile ? '24px' : props.$isTablet ? '48px' : '60px')};
    transform: rotate(180deg);
  }
  
  &:hover {
    ${(props) => !props.$disabled && `
      background-color: ${props.$active ? 'var(--FarmSystem_Green06)' : '#f0f0f0'};
      transform: translateY(-1px);
    `}
  }
  
  &:active {
    ${(props) => !props.$disabled && `
      transform: translateY(0);
    `}
  }
`;

export const PaginationPageButton = styled.span<{
  $active?: boolean;
  $disabled?: boolean;
  $isMobile?: boolean;
  $isTablet?: boolean;
}>`
  width: ${(props) => (props.$isMobile ? '20px' : props.$isTablet ? '26px' : '40px')};
  height: ${(props) => (props.$isMobile ? '20px' : props.$isTablet ? '26px' : '40px')};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => (props.$isMobile ? '10px' : props.$isTablet ? '13px' : '20px')};
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};

  background-color: ${(props) => (props.$active ? 'var(--FarmSystem_Green06)' : 'var(--FarmSystem_DarkGrey)')};
  color: white;
  font-size: ${(props) => (props.$isMobile ? '8px' : props.$isTablet ? '12px' : '14px')};
  font-weight: 500;
  transition: all 0.2s ease;
`;



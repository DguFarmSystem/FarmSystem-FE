// import React, { useState } from 'react';
import * as S from './BlogList.styles';
import BlogItem, { BlogCategory } from './BlogItem';
import useMediaQueries from '@/hooks/useMediaQueries';
//import { useBlogPage } from '@/hooks/useBlog';

// import nextArrow_left from '@/assets/Icons/pagenation_2.png';
// import nextArrow_right from '@/assets/Icons/pagenation_2.png';
// import jumpArrow_left from '@/assets/Icons/pagenation_1.png';
// import jumpArrow_right from '@/assets/Icons/pagenation_1.png';

/** 샘플용 더미 데이터 */
/*
let blogData: BlogItemProps[];
// 개발 모드에서만 보이게 수정했습니다.
if (import.meta.env.MODE === 'development' || window.location.hostname.startsWith('dev.')) {
  blogData = [
    {
      blogUrl: 'https://velog.io/',
      tags: [{ category: BlogCategory.SEMINAR }],
    },
    {
      blogUrl: 'https://blog.naver.com/educds/222797324049',
      tags: [{ category: BlogCategory.PROJECT }],
    },
    {
      blogUrl: 'https://blog.encrypted.gg/',
      tags: [{ category: BlogCategory.STUDY }],
    },
    {
      blogUrl: 'https://www.github.com',
      tags: [{ category: BlogCategory.HACKATHON }],
    },
    {
      blogUrl: 'https://ludeno-studying.tistory.com/82',
      tags: [{ category: BlogCategory.REVIEW }],
    },
    {
      blogUrl: 'https://toss.im/',
      tags: [{ category: BlogCategory.LECTURE }],
    },
  ];
} else {
  blogData = [];
}
*/

// 문자열을 BlogCategory로 변환하는 함수
const convertStringToBlogCategory = (categoryStr: string): BlogCategory => {
  switch (categoryStr.toLowerCase()) {
    case 'seminar':
      return BlogCategory.SEMINAR;
    case 'project':
      return BlogCategory.PROJECT;
    case 'study':
      return BlogCategory.STUDY;
    case 'hackathon':
      return BlogCategory.HACKATHON;
    case 'review':
      return BlogCategory.REVIEW;
    case 'lecture':
      return BlogCategory.LECTURE;
    default:
      return BlogCategory.ETC;
  }
};

const BlogList: React.FC = () => {
  const { isMobile, isTablet } = useMediaQueries();
  const isBig = !isMobile; // 모바일이 아닐 때 큰 화면 기준

  // 페이지네이션 상태
  // const [currentPage, setCurrentPage] = useState<number>(0);
  // const pageSize = 12; // 12개씩 페이지네이션

  // 블로그 데이터 가져오기
  // const { data: blogData, pageInfo, loading, error } = useBlogPage({
  //   page: currentPage,
  //   size: pageSize,
  // });

  // 페이지네이션 핸들러
  // const handlePageChange = (page: number) => {
  //   setCurrentPage(page);
  // };

  // const handlePreviousPage = () => {
  //   if (pageInfo && pageInfo.hasPreviousPage) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  // const handleNextPage = () => {
  //   if (pageInfo && pageInfo.hasNextPage) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // 페이지 번호 배열 생성
  // const generatePageNumbers = () => {
  //   if (!pageInfo) return [];
    
  //   const totalPages = pageInfo.totalPages;
  //   const current = pageInfo.currentPage;
  //   const pages: number[] = [];
    
  //   // 최대 7개의 페이지 번호만 표시
  //   const maxVisiblePages = 3;
  //   let startPage = Math.max(0, current - Math.floor(maxVisiblePages / 2));
  //   let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);
    
  //   // 시작 페이지 조정
  //   if (endPage - startPage < maxVisiblePages - 1) {
  //     startPage = Math.max(0, endPage - maxVisiblePages + 1);
  //   }
    
  //   for (let i = startPage; i <= endPage; i++) {
  //     pages.push(i);
  //   }
    
  //   return pages;
  // };

  // if (loading) {
  //   return <div>로딩 중...</div>;
  // }

  // if (error) {
  //   return <div>에러가 발생했습니다: {error.message}</div>;
  // }

  return (
    <S.Container>
      <S.TableContainer $isTablet={isTablet} $isMobile={isMobile}>
        <S.SubDescription $isMobile={isMobile}>
          * 블로그 클릭 시 외부 링크로 연결돼요.
        </S.SubDescription>
      </S.TableContainer>

      {/* 블로그 카드 리스트 */}
      {true ? (
        <>
          <S.DescriptionContainer>
            <S.ListContainer $isTablet={isTablet} $isBig={isBig} $isMobile={isMobile}>
              {[{key: 1, category: ['seminar']}].map((blog, index) => (
                <BlogItem 
                  key={1 || index} 
                  blogUrl={'https://velog.io/@dongmin0204/'}
                  tags={blog.category && blog.category.length > 0 
                    ? blog.category.map(categoryStr => convertStringToBlogCategory(categoryStr))
                    : [BlogCategory.ETC]
                  }
                />
              ))}
            </S.ListContainer>   
          </S.DescriptionContainer>
          
              {/* 페이지네이션 */}
              {/* {pageInfo && pageInfo.totalPages > 0 && (
              <S.PaginationContainer>
                <S.PaginationButton>
                  <S.PaginationButtonText
                    onClick={() => setCurrentPage(0)}
                    $disabled={!pageInfo.hasPreviousPage}
                    $isMobile={isMobile}
                    $isTablet={isTablet}
                  >
                    <img src={jumpArrow_left} alt="jumpArrow" />
                  </S.PaginationButtonText>
                  <S.PaginationButtonText 
                    onClick={handlePreviousPage}
                    $disabled={!pageInfo.hasPreviousPage}
                    $isMobile={isMobile}
                    $isTablet={isTablet}
                  >
                    <img src={nextArrow_left} alt="nextArrow" />
                  </S.PaginationButtonText>
                  
                  {generatePageNumbers().map((pageNum) => (
                    <S.PaginationPageButton
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      $active={pageNum === pageInfo.currentPage}
                      $isMobile={isMobile}
                      $isTablet={isTablet}
                    >
                      {pageNum + 1}
                    </S.PaginationPageButton>
                  ))}
                  
                  <S.PaginationButtonText 
                    onClick={handleNextPage}
                    $disabled={!pageInfo.hasNextPage}
                    $isMobile={isMobile}
                    $isTablet={isTablet}
                  >
                    <img src={nextArrow_right} alt="nextArrow_right" />
                  </S.PaginationButtonText>
                  <S.PaginationButtonText
                    onClick={() => setCurrentPage(pageInfo.totalPages - 1)}
                    $disabled={!pageInfo.hasPreviousPage}
                    $isMobile={isMobile}
                    $isTablet={isTablet}
                  >
                    <img src={jumpArrow_right} alt="jumpArrow_right" />
                  </S.PaginationButtonText>
                </S.PaginationButton>
              </S.PaginationContainer>
            )} */}
        </>
      ) : (
        <S.TextContainer $isMobile={isMobile}>
          아직 등록된 글이 없어요.
        </S.TextContainer>
      )}
    </S.Container>
  );
};

export default BlogList;

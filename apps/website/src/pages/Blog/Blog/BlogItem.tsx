import React from 'react';
import * as S from './BlogItem.styles';
import { useLinkPreview } from '@/hooks/useLinkPreview';
import useMediaQueries from '@/hooks/useMediaQueries';
import BlankImg from '../../../assets/Images/Blog_Project/blank_img.svg';

export enum BlogCategory {
  SEMINAR,
  PROJECT,
  STUDY,
  HACKATHON,
  REVIEW,
  LECTURE,
  ETC,
}

export interface BlogTag {
  category: BlogCategory;
}

export interface BlogItemProps {
  blogUrl: string;
  tags: BlogCategory[];
}

// 카테고리 enum을 텍스트로 매핑
const getCategoryName = (category: BlogCategory): string => {
  switch (category) {
    case BlogCategory.SEMINAR:
      return '세미나';
    case BlogCategory.PROJECT:
      return '프로젝트';
    case BlogCategory.STUDY:
      return '스터디';
    case BlogCategory.HACKATHON:
      return '해커톤';
    case BlogCategory.REVIEW:
      return '리뷰';
    case BlogCategory.LECTURE:
      return '강의';
    case BlogCategory.ETC:
      return '기타';
    default:
      return '';
  }
};

const BlogItem: React.FC<BlogItemProps> = ({ blogUrl, tags }) => {
  // blogUrl을 기반으로 메타데이터를 fetching
  const { metadata, loading} = useLinkPreview(blogUrl);
  console.log(metadata);
  const { isMobile, isTablet } = useMediaQueries();

  
  // 메타데이터가 없는 경우 대비 기본값 설정
  const title = metadata?.title || '제목이 없습니다';
  const description = metadata?.description || '설명이 없습니다';
  const previewImage =
  metadata?.image && metadata?.image !== 'null' && !metadata.image.startsWith('/')
    ? metadata.image
    : BlankImg;
  return (
    <S.Card href={blogUrl} target="_blank" $isMobile={isMobile} $isTablet={isTablet}>
      <S.Image $isMobile={isMobile} $isTablet={isTablet}>
        {loading ? (
          <img src={BlankImg} alt="로딩중..." />
        ) : (
          <img src={previewImage} alt={title} />
        )}
      </S.Image>
      <S.Content>
        <S.Title $isMobile={isMobile} $isTablet={isTablet}>{loading ? '로딩중...' : title}</S.Title>
        <S.Description $isMobile={isMobile} $isTablet={isTablet}>
          {loading ? '설명을 불러오는 중입니다...' : description}
        </S.Description>
        <S.TagContainer>
          {tags.map((category, index) => (
            <S.Tag key={index} $isMobile={isMobile} $isTablet={isTablet}>{getCategoryName(category)}</S.Tag>
          ))}
        </S.TagContainer>
      </S.Content>
    </S.Card>
  );
};

export default BlogItem;

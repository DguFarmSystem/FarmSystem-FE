export interface NewsDto {
  newsId: number;
  title: string;
  thumbnailUrl: string;
  contentPreview: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface NewsItemDto {
  title: string;
  thumbnailUrl: string;
  content: string;
  imageUrls: string[];
  tags: string[];
}

interface NewsDetailDto {
  newsId: number;
  title: string;
  thumbnailUrl: string;
  content: string;
  imageUrls: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export type NewsListResponseDto = NewsDto[];

export type NewsDetailResponseDto = NewsDetailDto;

export type NewsItemMutationDto = NewsItemDto;

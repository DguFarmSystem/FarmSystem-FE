import { Track } from './blog';

export interface Project {
  projectId: number;
  title: string;
  introduction: string;
  thumbnailImageUrl: string;
  track: Track;
  generation: number;
}

export interface ProjectFilterResponse {
  content: Project[];
  pageInfo: {
    pageSize: number;
    totalElements: number;
    currentPageElements: number;
    totalPages: number;
    currentPage: number;
    sortBy: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface DetailedProjectResponse {
  projectId: number;
  title: string;
  introduction: string;
  content: string;
  thumbnailImageUrl: string;
  bodyImageUrl: string;
  githubLink: string;
  deploymentLink: string;
  resourceLink: string;
  participants: string[];
  imageUrls?: string[];
  approvalStatus: string;
  track: Track;
}

interface ApiResponse<T = unknown> {
  status: number;
  message: "요청이 성공했습니다." | string;
  data?: T;
}

//GET요청 
export type ProjectDetailResponse = ApiResponse<DetailedProjectResponse>;
export type ProjectFilterApiResponse = ApiResponse<ProjectFilterResponse>;
  
enum ApiErrorMessages {
    BLOG_NOT_FOUND = "블로그를 찾을 수 없습니다.",
    BLOG_DUPLICATED = "이미 신청 처리된 블로그입니다.",
    ALREADY_SUBMITTED = "이미 승인 처리된 블로그입니다.",
  }

  export enum Track {
    ALL = "",
    UNION = "UNION",
    GAMING_VIDEO = "GAMING_VIDEO",
    AI = "AI",
    SECURITY_WEB = "SECURITY_WEB",
    IOT_ROBOTICS = "IOT_ROBOTICS",
    BIGDATA = "BIGDATA",
  }

  export interface SortMeta {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  }
  
  export interface PageableMeta {
    pageNumber: number;
    pageSize: number;
    sort: SortMeta;
    offset: number;
    unpaged: boolean;
    paged: boolean;
  }
  

  interface ApiResponse<T = unknown> {
    status: number;
    message: ApiErrorMessages | "요청이 성공했습니다." | string;
    data?: T;
  }
  
  //blog 신청 요청 
  interface ApiRequest {
    title : string;
    description : string;
    track : Track[]; //트랙은 리스트
    link : string;
  }

  // 블로그 목록 조회 응답 데이터
  export interface BlogItem {
    blogId: number;
    link: string;
    categories: string[];
    approvalStatus: string;
    title?: string;
    description?: string;
    thumbnailUrl?: string;
  }

  interface BlogListResponse {
    content: BlogItem[];
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

  export interface BlogPage {
    content: BlogItem[];
    pageable: PageableMeta;
  
    last: boolean;
    totalElements: number;
    totalPages: number;
  
    sort: SortMeta;
  
    first: boolean;
    number: number;
    numberOfElements: number;
    size: number;
    empty: boolean;
  }
  
  export interface BlogPageInfo {
    currentPage: number;
    totalPages: number;
    totalElements: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  
    pageSize: number;
    numberOfElements: number;
  
    pageable: PageableMeta;
    sort: SortMeta;
  
    isFirst: boolean;
    isLast: boolean;
    isEmpty: boolean;
  }
  
  // blog에 POST 요청, POST 응답, GET요청 
  export type BlogPOSTRequest = ApiRequest;
  export type BlogGETResponse = ApiResponse<BlogListResponse>;
  export type BlogPOSTResponse = ApiResponse<{ blogId: number }>;
  export type BlogPageResponse = ApiResponse<BlogPage>;
export type CATEGORIES =
  | 'SEMINAR'
  | 'PROJECT'
  | 'STUDY'
  | 'HACKATHON'
  | 'REVIEW'
  | 'LECTURE'
  | 'ETC';

export interface BlogRequestDto {
  link: string;
  categories: CATEGORIES[];
}

export interface BlogDto {
  blogId: number;
  link: string;
  userNickname: string;
  appliedAt: string;
}

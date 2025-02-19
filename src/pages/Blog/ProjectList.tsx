import React, { useState } from 'react';
import * as S from './ProjectList.styles';
import BlankImg from '../../assets/Images/Blog_Project/blank_img.svg';
import ProjectItem, { ProjectItemProps } from './ProjectItem';

/** 샘플용 더미 데이터 */
const projectData: ProjectItemProps[] = [
  {
    title: '임시직 프로젝트 1',
    description: '팜시스템에 필요한 모든 정보를 담은 앱! W-300 H-40 고정사이즈로써 2줄까지 소개가 가능하다.',
    imageUrl: BlankImg,
  },
  {
    title: '임시직 프로젝트 2',
    description: '백동민 최강 백동민 힘내 백동민 파이팅 2.',
    imageUrl: BlankImg,
  },
  {
    title: '임시직 프로젝트 3',
    description: '백동민 최강 백동민 힘내 백동민 파이팅 3.',
    imageUrl: BlankImg,
  },
  {
    title: '임시직 프로젝트 1',
    description: '팜시스템에 필요한 모든 정보를 담은 앱! W-300 H-40 고정사이즈로써 2줄까지 소개가 가능하다.',
    imageUrl: BlankImg,
  },
  {
    title: '임시직 프로젝트 2',
    description: '백동민 최강 백동민 힘내 백동민 파이팅 2.',
    imageUrl: BlankImg,
  },
  {
    title: '임시직 프로젝트 3',
    description: '백동민 최강 백동민 힘내 백동민 파이팅 3.',
    imageUrl: BlankImg,
  },
];

/**
 * 드롭다운을 구분하기 위한 타입
 * - "grade" = 기수, "track" = 트랙
 */
type DropdownType = 'grade' | 'track' | '';

const ProjectList: React.FC = () => {
  // 하나만 열리도록, 어떤 드롭다운이 열려 있는지 state로 관리
  const [openDropdown, setOpenDropdown] = useState<DropdownType>('');

  // 드롭다운 열림/닫힘 토글 함수
  const handleToggleDropdown = (type: DropdownType) => {
    // 이미 열려 있는 상태면 닫고, 아니면 해당 타입으로 연다
    setOpenDropdown(prev => (prev === type ? '' : type));
  };

  // 드롭다운에서 선택 시 동작 (필요 시 구현)
  const handleSelectOption = (option: string) => {
    console.log('선택한 옵션:', option);
    // 선택 후 바로 닫고 싶다면:
    setOpenDropdown('');
  };

  return (
    <S.Container>
      <S.TableContainer>
        {/* 기수 */}
        <S.FilterWrapper>
          <S.FilterButton onClick={() => handleToggleDropdown('grade')}>
            기수 ▾
          </S.FilterButton>
          {openDropdown === 'grade' && (
            <S.DropdownMenu>
              {['4기', '3기', '2기', '1기'].map((grade) => (
                <S.DropdownItem
                  key={grade}
                  onClick={() => handleSelectOption(grade)}
                >
                  {grade}
                </S.DropdownItem>
              ))}
            </S.DropdownMenu>
          )}
        </S.FilterWrapper>

        {/* 트랙 */}
        <S.FilterWrapper>
          <S.FilterButton onClick={() => handleToggleDropdown('track')}>
            트랙 ▾
          </S.FilterButton>
          {openDropdown === 'track' && (
            <S.DropdownMenu>
              {['Union', '빅데이터', '사물인터넷/로봇', '인공지능', '보안/웹', '게임/영상'].map(
                (track) => (
                  <S.DropdownItem
                    key={track}
                    onClick={() => handleSelectOption(track)}
                  >
                    {track}
                  </S.DropdownItem>
                )
              )}
            </S.DropdownMenu>
          )}
        </S.FilterWrapper>
      </S.TableContainer>

      {/* 프로젝트 카드 리스트 */}
      <S.ListContainer>
        {projectData.map((item, index) => (
          <ProjectItem key={index} {...item} />
        ))}
      </S.ListContainer>
    </S.Container>
  );
};

export default ProjectList;

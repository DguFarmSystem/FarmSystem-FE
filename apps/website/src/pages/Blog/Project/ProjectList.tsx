import { useState } from 'react';
import * as S from './ProjectList.styles';
import useMediaQueries from '@/hooks/useMediaQueries';
import { useProjectList } from '@/hooks/useProject';
import ProjectItem from './ProjectItem';
import { Track } from '@/models/blog';

/**
 * 드롭다운을 구분하기 위한 타입
 * - "grade" = 기수, "track" = 트랙
 */
type DropdownType = 'grade' | 'track' | '';

// 트랙 한글명을 Track enum으로 변환하는 함수
const convertTrackToEnum = (trackName: string): Track | undefined => {
  const trackMap: Record<string, Track> = {
    'Union': Track.UNION,
    '빅데이터': Track.BIGDATA,
    '사물인터넷/로봇': Track.IOT_ROBOTICS,
    '인공지능': Track.AI,
    '보안/웹': Track.SECURITY_WEB,
    '게임/영상': Track.GAMING_VIDEO
  };
  return trackMap[trackName];
};

const ProjectList: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<DropdownType>('');
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedTrack, setSelectedTrack] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const pageSize = 6;

  const { data: projects, loading, error } = useProjectList(
    selectedGrade ? parseInt(selectedGrade) : undefined,
    selectedTrack ? convertTrackToEnum(selectedTrack) : undefined,
    currentPage,
    pageSize
  );

  const { isTablet, isMobile, isBig } = useMediaQueries();

  const handleToggleDropdown = (type: DropdownType) => {
    setOpenDropdown(prev => (prev === type ? '' : type));
  };

  const handleSelectGrade = (grade: string) => {
    const gradeNumber = grade.replace('기', '');
    setSelectedGrade(gradeNumber);
    setOpenDropdown('');
    setCurrentPage(0); // 필터 변경 시 첫 페이지로 이동
  };

  const handleSelectTrack = (track: string) => {
    setSelectedTrack(track);
    setOpenDropdown('');
    setCurrentPage(0); // 필터 변경 시 첫 페이지로 이동
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  return (
    <S.Container>
      <S.TableContainer $isTablet={isTablet} $isMobile={isMobile}>
        {/* 기수 필터 */}
        <S.FilterWrapper>
          <S.FilterGradeButton 
            onClick={() => handleToggleDropdown('grade')} 
            $isTablet={isTablet} 
            $isMobile={isMobile}
          >
            <a>{selectedGrade || '기수'}</a> <a>▾</a>
          </S.FilterGradeButton>
          {openDropdown === 'grade' && (
            <S.DropdownGradeMenu $isTablet={isTablet} $isMobile={isMobile}>
              {['4기', '3기', '2기', '1기'].map((grade) => (
                <S.DropdownItem
                  key={grade}
                  onClick={() => handleSelectGrade(grade)}
                  $isTablet={isTablet} 
                  $isMobile={isMobile}
                >
                  {grade}
                </S.DropdownItem>
              ))}
            </S.DropdownGradeMenu>
          )}
        </S.FilterWrapper>

        {/* 트랙 필터 */}
        <S.FilterWrapper>
          <S.FilterTrackButton 
            onClick={() => handleToggleDropdown('track')} 
            $isTablet={isTablet} 
            $isMobile={isMobile}
          >
            <a>{selectedTrack || '트랙'}</a> <a>▾</a>
          </S.FilterTrackButton>
          {openDropdown === 'track' && (
            <S.DropdownTrackMenu $isTablet={isTablet} $isMobile={isMobile}>
              {['Union', '빅데이터', '사물인터넷/로봇', '인공지능', '보안/웹', '게임/영상'].map(
                (track) => (
                  <S.DropdownItem
                    key={track}
                    onClick={() => handleSelectTrack(track)}
                    $isTablet={isTablet} 
                    $isMobile={isMobile}
                  >
                    {track}
                  </S.DropdownItem>
                )
              )}
            </S.DropdownTrackMenu>
          )}
        </S.FilterWrapper>
      </S.TableContainer>
      
      {/* 프로젝트 카드 리스트 */}
        {projects && projects.length > 0 ? (
          <>
            <S.ListContainer $isTablet={isTablet} $isBig={isBig}>
              {projects.map((project) => (
                <ProjectItem
                  key={project.projectId}
                  projectId={project.projectId.toString()}
                  title={project.title}
                  description={project.introduction}
                  imageUrl={project.thumbnailImageUrl}
                  tags={[{
                    generation: [project.generation],
                    track: [project.track]
                  }]}
                />
              ))}
            </S.ListContainer>
            
            {/* 페이지네이션 */}
          </>
        ) : (
          <S.TextContainer $isMobile={isMobile}>
            {selectedGrade || selectedTrack ? '선택한 필터에 맞는 프로젝트가 없어요.' : '아직 등록된 글이 없어요.'}
            <a>파밍로그를 통해 프로젝트를 등록해보세요!</a>
          </S.TextContainer>
        )}
    </S.Container>
  );
};

export default ProjectList;


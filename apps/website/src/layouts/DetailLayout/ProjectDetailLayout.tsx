import * as S from "./ProjectDetailLayout.styled";
import GoBackArrow from "@/assets/LeftArrow.png";
import useMediaQueries from "@/hooks/useMediaQueries";
import GithubIcon from "@/assets/githubLogo.png";
import DeploymentIcon from "@/assets/home.png";
import ResourceIcon from "@/assets/resource.png";

interface ProjectDetailLayoutProps {
  title?: string;
  content?: string;
  tag?: string;
  thumbnailUrl?: string;
  imageUrls?: string[];
  githubLink?: string;
  deploymentLink?: string;
  resourceLink?: string;
  participants?: string[];
}

export default function ProjectDetailLayout({
  title = "(임시) 제목",
  content = "(임시) 내용",
  tag = "(임시) 태그",
  thumbnailUrl = "",
  githubLink = "(임시) 링크",
  deploymentLink = "(임시) 링크",
  resourceLink = "(임시) 링크",
  participants = ["(임시) 참여자1","(임시) 참여자2"],
}: ProjectDetailLayoutProps) {
  const { isMobile, isTablet, isDesktop } = useMediaQueries();

  return (
      <S.DetailCard $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
        <S.GoBackContainer  $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
          <S.GoBackButton 
             $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}
            onClick={() => window.history.back()}
          >
            <S.GoBackImg
              $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop} 
              src={GoBackArrow}
              alt="Go back"
            />
            <p>돌아가기</p>
          </S.GoBackButton>
        </S.GoBackContainer >
        <S.TitleContainer $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
          <S.ParticipantsAndTagContainer  $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
            <S.Participant  $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
              {participants.map((participant, index) => (
                <span key={index}>{participant}</span>
              ))}
            </S.Participant>
            <S.Tag  $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
              {tag}
            </S.Tag>            
          </S.ParticipantsAndTagContainer>
          <S.Title  $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
            {title}
          </S.Title>
        </S.TitleContainer>
        <S.ImageContainer  $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
          <S.Thumbnail
            $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}
            src={thumbnailUrl}
            alt={title}
          />
        </S.ImageContainer>
        <S.LinkContainer $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
            <S.Link  $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop} href={githubLink} target="_blank">
              <S.LinkIcon src={GithubIcon} alt="Github"/>
            </S.Link>
            <S.Link  $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop} href={resourceLink} target="_blank">
              <S.LinkIcon src={ResourceIcon} alt="Resource"/>
            </S.Link>
            <S.Link  $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop} href={deploymentLink} target="_blank">
              <S.LinkIcon src={DeploymentIcon} alt="Deployment"/>
            </S.Link>
        </S.LinkContainer>
        <S.ContentBox  $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
          {content}
        </S.ContentBox>
      </S.DetailCard>
  );
}
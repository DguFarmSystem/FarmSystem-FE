import * as S from "./ProjectDetailLayout.styled";
import ImageCarousel from "./ImageCarousel";
import GoBackArrow from "@/assets/LeftArrow.png";
import useMediaQueries from "@/hooks/useMediaQueries";
import GithubIcon from "@/assets/githubLogo.png";
import DeploymentIcon from "@/assets/Icons/deploy_Icon.png";
import ResourceIcon from "@/assets/pink_link.png";
import BlankThumbnailImg from "@/assets/Images/Blog_Project/blank_img_project.png";

interface ProjectDetailLayoutProps {
  title?: string;
  introduction?: string;
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
  introduction = "(임시) 소개",
  tag = "(임시) 태그",
  thumbnailUrl = BlankThumbnailImg,
  imageUrls = [],
  githubLink = "(임시) 링크",
  deploymentLink = "(임시) 링크",
  resourceLink = "(임시) 링크",
  participants = ["참여자1","참여자2"],
}: ProjectDetailLayoutProps) {
  const { isMobile, isTablet, isDesktop } = useMediaQueries();

  // 썸네일 + 갤러리 이미지를 한 캐러셀로 넘겨 봄
  const images = [...new Set([thumbnailUrl, ...imageUrls].filter(Boolean))];
  if (images.length === 0) images.push(BlankThumbnailImg);

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
          <S.Title  $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
            {title}
          </S.Title>
          <S.Introduction  $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
            {introduction}
          </S.Introduction>
          </S.TitleContainer>
          <S.ContentContainer $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
          <S.LinkContainer $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
            <S.Link  $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop} href={githubLink} target="_blank">
              <S.LinkIcon $isMobile={isMobile} src={GithubIcon} alt="Github"/>
            </S.Link>
            {resourceLink && resourceLink !== "(임시) 링크" && (
              <S.Link  $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop} href={resourceLink} target="_blank">
                <S.LinkIcon $isMobile={isMobile} src={ResourceIcon} alt="Resource"/>
              </S.Link>
            )}
            {deploymentLink && deploymentLink !== "(임시) 링크" && (
              <S.Link  $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop} href={deploymentLink} target="_blank">
                <S.LinkIcon $isMobile={isMobile} src={DeploymentIcon} alt="Deployment"/>
              </S.Link>
            )}
          </S.LinkContainer>
            <S.ParticipantsAndTagContainer  $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
              <S.TagContainer $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
                <S.Tag  $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
                  {tag}
                </S.Tag>    
              </S.TagContainer>
              <S.ParticipantContainer $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
                <S.Participant  $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
                  {participants.length > 0 && (<>
                  {`참여 팀원:`}
                  {participants.map((participant, index) => (
                    <span key={index}>{participant}</span>
                  ))}
                  </>
                )}
                </S.Participant>
              </S.ParticipantContainer>        
            </S.ParticipantsAndTagContainer>
          </S.ContentContainer>
        <S.ImageContainer  $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
          <ImageCarousel
            images={images}
            renderImage={(src, i) => (
              <S.Thumbnail
                $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}
                src={src}
                alt={`${title} ${i + 1}`}
              />
            )}
          />
        </S.ImageContainer>
        <S.ContentBox  $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
          {content}
        </S.ContentBox>
      </S.DetailCard>
  );
}
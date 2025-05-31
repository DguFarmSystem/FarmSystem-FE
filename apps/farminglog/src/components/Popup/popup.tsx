import React, { useState } from "react";
import { PopupProps } from "./popup.types";
import * as S from "./popup.styled";
import useMediaQueries from "@/hooks/useMediaQueries";
import { useNavigate } from "react-router"; // 추가

// import BellIcon from "@/assets/Icons/bell.png"; 알림
import LogoutIcon from "@/assets/Icons/log-out.png";
import GithubIcon from "@/assets/Icons/Github.png";
import CloseIcon from "@/assets/Icons/close.png";
import NotificationModal from "@/components/Notification/NotificationModal";
import { useLogout } from "@repo/auth/services/mutation/useLogout";
import PinIcon from '@/assets/Icons/x.png';

// import { nav } from "framer-motion/client";


const Popup: React.FC<PopupProps> = (props) => {
  const { isMobile, isTablet } = useMediaQueries();
  const { isOpen, onClose, variant } = props;

  if (!isOpen) return null;

  const handleOverlayClick = () => {
    onClose();
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const renderContent = () => {
    switch (variant) {
      case "PROFILE":
        return <ProfileLayout {...props} />;
      case "MYPAGE":
        return <MyPageLayout {...props} />;
      case "MESSAGE":
        return <MessageLayout {...props} />;
      case "INFO":
        return <InfoLayout {...props} />;
      case "CHEER":
        return <CheerMessageLayout {...props} />;
      default:
        return null;
    }
  };

  return (
    <S.PopupOverlay onClick={handleOverlayClick}>
      {(variant !== "INFO") && 
      <S.PopupBox onClick={stopPropagation} $isMobile={isMobile} $isTablet={isTablet}>
        {renderContent()}
      </S.PopupBox>
      }
      {
        (variant === "INFO") && (
          <>
            {renderContent()}
          </>
        )
      }
    </S.PopupOverlay>
  );
};

export default Popup;

/** 1) PROFILE 팝업 */
const ProfileLayout: React.FC<PopupProps> = ({
  onClose,
  userName,
  generationAndPart,
  major,
  githubId,
  profileImg,
}) => {
  const { isMobile, isTablet } = useMediaQueries();

  return (
    <>
      <S.CloseIconButton onClick={onClose}>
        <img src={CloseIcon} alt="닫기" width={24} height={24} />
      </S.CloseIconButton>

      <S.ProfileLayoutRow $isMobile={isMobile}>
        <S.ProfileCircle $isMobile={isMobile}>
          {profileImg ? <img src={profileImg} alt="profile" /> : <span>🌱</span>}
        </S.ProfileCircle>

        <S.InfoBox $isMobile={isMobile}>
          <S.PopupTitle $isMobile={isMobile} $isTablet={isTablet}>
            {userName || "이름"}
          </S.PopupTitle>
          <S.PopupText $isMobile={isMobile} $isTablet={isTablet}>
            {generationAndPart || "3기 보안/웹"}
          </S.PopupText>
        </S.InfoBox>
      </S.ProfileLayoutRow>

      <S.PopupText $isMobile={isMobile} $isTablet={isTablet}>
        {major || "전공 없음"}
      </S.PopupText>

      <S.Divider $isMobile={isMobile} />

      <S.PopupText $isMobile={isMobile} $isTablet={isTablet}>
        {githubId ? (
          <>
            <img
              src={GithubIcon}
              width={24}
              height={24}
              alt="github"
              style={{ marginRight: 8 }}
            />
            {githubId}
          </>
        ) : (
          "깃허브 아이디 없음"
        )}
      </S.PopupText>
    </>
  );
};

/** 2) MYPAGE 팝업 */
const MyPageLayout: React.FC<PopupProps> = ({
  onClose,
  userName,
  generationAndPart,
  profileImg,
  // hasAlarm, 알림
  hasLogout,
}) => {
  const { isMobile, isTablet } = useMediaQueries();
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const navigate = useNavigate(); // 추가
  
  const logout = useLogout();
  
  const handleLogout = () => {
    logout.mutate();
    onClose();
    navigate("/"); // 로그아웃 후 이동
  };

  return (
    <>
      <S.IconContainer $isMobile={isMobile}>
        {/* 알림 버튼  나중에 보이게*/}
        {/* <div className="alarm" onClick={() => setNotificationOpen(true)}>
          <img
            src={BellIcon}
            alt="알림"
            width={isMobile ? 20 : 40}
            height={isMobile ? 20 : 40}
          />
          {hasAlarm && <S.AlarmDot />} 
        </div> */}

        {hasLogout && (
          <button onClick={handleLogout}> {/* 수정 */}
            <img
              src={LogoutIcon}
              alt="로그아웃"
              width={isMobile ? 20 : 40}
              height={isMobile ? 20 : 40}
              style={{ cursor: "pointer" }}
            />
          </button>
        )}
      </S.IconContainer>

      <S.ProfileLayoutRow $isMobile={isMobile}>
        <S.ProfileCircle $isMobile={isMobile}>
          {profileImg ? <img src={profileImg} alt="profile" /> : <span>🌱</span>}
        </S.ProfileCircle>

        <S.InfoBox $isMobile={isMobile}>
          <S.PopupTitle $isMobile={isMobile} $isTablet={isTablet}>
            {userName || "사용자"}
          </S.PopupTitle>
          <S.PopupText $isMobile={isMobile} $isTablet={isTablet}>
            {generationAndPart || "4기 보안/웹"}
          </S.PopupText>
        </S.InfoBox>
      </S.ProfileLayoutRow>

      <S.Divider $isMobile={isMobile} />

      <S.CenteredPopupText
        $isMobile={isMobile}
        onClick={() => (window.location.href = "/mypage")}
      >
        마이페이지
      </S.CenteredPopupText>

      {isNotificationOpen && (
        <NotificationModal onClose={() => setNotificationOpen(false)} />
      )}
    </>
  );
};

/** 3) MESSAGE 팝업 */
const MessageLayout: React.FC<PopupProps> = ({
  onClose,
  mainMessage,
  subMessage,
  confirmLabel,
}) => {
  const { isMobile } = useMediaQueries();
  const words = subMessage?.split(' ');
  const highlight = words?.shift() || '';
  const rest = words?.join(' ');

  return (
    <>
        <S.MainMessage $isMobile={isMobile}>{mainMessage}</S.MainMessage>
        <S.SubMessage $isMobile={isMobile}>
          <span className="highlight">{highlight}</span>{' '}
          <span>{rest}</span>
        </S.SubMessage>
        <S.Divider $isMobile={isMobile} />
        <S.ConfirmButton $isMobile={isMobile} onClick={onClose}>
          {confirmLabel}
        </S.ConfirmButton>
    </>
  );
};

/** 4) INFO 팝업 */
const InfoLayout: React.FC<PopupProps> = () => {
  const { isMobile, isApp } = useMediaQueries();

  return (
    <>
            {/* Header 섹션 */}
            <S.FarmingLogEditorContainerHeader $isApp={isApp} $isMobile={isMobile}>
            <S.HeaderPinContainer $isApp={isApp}>
              <S.HeaderPin $isApp={isApp}>
                <S.HeaderPinIcon $isApp={isApp} src={PinIcon} alt="pin" />
              </S.HeaderPin>
              <S.HeaderPin $isApp={isApp}>
                <S.HeaderPinIcon $isApp={isApp} src={PinIcon} alt="pin" />
              </S.HeaderPin>
            </S.HeaderPinContainer>
            <S.HeaderContext $isApp={isApp} $isMobile={isMobile}>
              <p>
                <S.HeaderContextBold>파밍로그</S.HeaderContextBold>는 팜시스템 회원들을 위한 공간입니다.
              </p>

            </S.HeaderContext>
            <S.HeaderContext $isApp={isApp} $isMobile={isMobile}>
                <p>매일 활동을 하는 만큼 씨앗을 모을 수 있습니다.</p>
                <p>모은 씨앗은 <a>트랙별 우수 심사</a>에 반영됩니다.</p>
            </S.HeaderContext>
            <S.HeaderContext $isApp={isApp} $isMobile={isMobile}>
                <p></p>
                <p>· 출석하면, <S.HeaderContextBold>1개</S.HeaderContextBold></p>
                <p>· 응원하면, <S.HeaderContextBold>2개</S.HeaderContextBold></p>
                <p>· 파밍로그 작성하면, <S.HeaderContextBold>5개</S.HeaderContextBold></p>
                <p></p>
            </S.HeaderContext>

            <S.HeaderContext $isApp={isApp} $isMobile={isMobile}>
                <p>씨앗 모으기 퀘스트: 매일 00시 기준 초기화</p>
                <p>하루에 모을 수 있는 최대 씨앗 개수: 8개</p>
            </S.HeaderContext>
          </S.FarmingLogEditorContainerHeader>
      </>
  );
};

const CheerMessageLayout: React.FC<PopupProps> = ({
  onClose = () => {},
  mainMessage = '파밍로그 작성이 완료되었어요.',
  subMessage = '씨앗 5개 획득!',
  confirmLabel = '확인',
}) => {
  const { isMobile } = useMediaQueries();
  const words = subMessage?.split(' ');
  const highlight = words?.shift() || '';
  const rest = words?.join(' ');

  return (
    <>
        <S.MainMessage $isMobile={isMobile}>{mainMessage}</S.MainMessage>
        <S.SubMessage $isMobile={isMobile}>
          <span className="highlight">{highlight}</span>{' '}
          <span>{rest}</span>
        </S.SubMessage>
        <S.Divider $isMobile={isMobile} />
        <S.ConfirmButton $isMobile={isMobile} onClick={onClose}>
          {confirmLabel}
        </S.ConfirmButton>
    </>
  );
};

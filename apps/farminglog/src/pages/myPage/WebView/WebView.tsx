import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import * as S from './WebView.styles';
import useMediaQueries from '@/hooks/useMediaQueries';

import BackArrow from '@/assets/Icons/BackArrow.png';
import NotionIcon from '@/assets/Icons/Notion.png';
import GithubIcon from '@/assets/Icons/Github.png';
import PhoneIcon from '@/assets/Icons/PhoneIcon.png';
import DefaultProfile from '@/assets/home/default_profile.png';
import ImageEdig from '@/assets/buttons/ImageEdit.png';

import { useUserInfoQuery } from '@repo/auth/services/query/useUserInfoQuery';
import { useUpdateUserMutation } from '@repo/auth/services/mutation/useUpdateUserMutation';
// import { useUserStore } from '@repo/auth/stores/userStore';

export default function WebView() {
  const navigate = useNavigate();
  const { isMobile } = useMediaQueries();
  const { data: user } = useUserInfoQuery();  // , refetch
  const { mutate: updateUserInfo } = useUpdateUserMutation();
  // const setUser = useUserStore((s) => s.setUser);
  const fileInputRef = useRef<HTMLInputElement>(null);

const handleImageEditClick = () => {
  fileInputRef.current?.click();
};

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    setProfileImage(file);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setProfileImageUrl(reader.result); 
      }
    };
    reader.readAsDataURL(file);
  }
};

  const [isEditing, setIsEditing] = useState(false);
  const [mobile, setMobile] = useState('');
  const [notion, setNotion] = useState('');
  const [github, setGithub] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setProfileImageUrl(user.profileImageUrl);
      setMobile(user.phoneNumber || '');
      setNotion(user.notionAccount || '');
      setGithub(user.githubAccount || '');
    }
  }, [user]);

  const handleEditComplete = async () => {
    updateUserInfo(
      {
        profileImageUrl: profileImageUrl || user?.profileImageUrl || '',
        phoneNumber: mobile,
        notionAccount: notion,
        githubAccount: github,
      },
      {
        onSuccess: async () => {
          // const { data: updatedUser } = await refetch();
          // if (updatedUser) setUser(updatedUser);
          setIsEditing(false);
        },
      }
    );
  };

  const accountFields = [
    { label: '전화번호', icon: PhoneIcon, value: mobile, onChange: setMobile },
    { label: 'Notion', icon: NotionIcon, value: notion, onChange: setNotion },
    { label: 'Github', icon: GithubIcon, value: github, onChange: setGithub },
  ];

  return (
    <S.MyPageContainer>
      <S.ProfileWrapper isMobile={isMobile}>
        <S.TitleBox isMobile={isMobile}>
          <S.BackArrow src={BackArrow} onClick={() => navigate(-1)}/>
          <S.Title>마이페이지</S.Title>
          <S.EditButton onClick={isEditing ? handleEditComplete : () => setIsEditing(true)}>
            {isEditing ? '완료' : '수정하기'}
          </S.EditButton>
        </S.TitleBox>

        <S.SectionTitleBox isMobile={isMobile}>
          <S.SectionTitle>프로필</S.SectionTitle>
        </S.SectionTitleBox>

        <S.ProfileCard isMobile={isMobile}>
          <S.ImageEditWrapper>
            <S.ProfileImage
              src={
                profileImage
                  ? URL.createObjectURL(profileImage)
                  : user?.profileImageUrl || DefaultProfile
              }
              alt={user?.name || '사용자'}
            />
            {isEditing && (
              <>
                <S.ImageEditButton 
                  src={ImageEdig}
                  onClick={handleImageEditClick}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </>
            )}
          </S.ImageEditWrapper>

          <S.ProfileInfo>
            <S.RoleBox><S.Role>{user?.role}</S.Role></S.RoleBox>
            <S.Name>{user?.name}</S.Name>
          </S.ProfileInfo>
        </S.ProfileCard>


        {isEditing ? (
          <>
            <S.SectionTitleBox isMobile={isMobile}>
              <S.SectionTitle>수정 정보</S.SectionTitle>
            </S.SectionTitleBox>
            <S.EditForm isMobile={isMobile}>
              {accountFields.map(({ label, icon, value, onChange }) => (
                <S.EditField key={label}>
                  <S.RowBox><S.Icon2 src={icon} /><label>{label}</label></S.RowBox>
                  <input value={value} onChange={(e) => onChange(e.target.value)} />
                </S.EditField>
              ))}
            </S.EditForm>
          </>
        ) : (
          <>
            <S.SectionTitleBox isMobile={isMobile}>
              <S.SectionTitle>기본 정보</S.SectionTitle>
            </S.SectionTitleBox>
            <S.InfoGrid>
              <S.InfoItem><S.InfoLabel>전공</S.InfoLabel><S.InfoValue>{user?.major}</S.InfoValue></S.InfoItem>
              <S.InfoItem><S.InfoLabel>트랙</S.InfoLabel><S.InfoValue>{user?.track}</S.InfoValue></S.InfoItem>
              <S.InfoItem><S.InfoLabel>기수</S.InfoLabel><S.InfoValue>{user?.generation}기</S.InfoValue></S.InfoItem>
              <S.InfoItem><S.InfoLabel>학번</S.InfoLabel><S.InfoValue>{user?.studentNumber}</S.InfoValue></S.InfoItem>
              <S.InfoItem><S.InfoLabel>전화번호</S.InfoLabel><S.InfoValue>{user?.phoneNumber}</S.InfoValue></S.InfoItem>
              <S.InfoItem><S.InfoLabel>현재 씨앗 개수 🌱</S.InfoLabel><S.InfoValue>{user?.totalSeed}개</S.InfoValue></S.InfoItem>
            </S.InfoGrid>

            <S.SectionTitleBox isMobile={isMobile}>
              <S.SectionTitle>계정 연동</S.SectionTitle>
            </S.SectionTitleBox>
            <S.AccountLinks isMobile={isMobile}>
              <S.AccountBox>
                <S.RowBox><S.Icon src={NotionIcon} /><S.AccountLable>Notion</S.AccountLable></S.RowBox>
                <S.AccountValue>{user?.notionAccount}</S.AccountValue>
              </S.AccountBox>
              <S.AccountBox>
                <S.RowBox><S.Icon src={GithubIcon} /><S.AccountLable>Github</S.AccountLable></S.RowBox>
                <S.AccountValue>{user?.githubAccount}</S.AccountValue>
              </S.AccountBox>
            </S.AccountLinks>
          </>
        )}
      </S.ProfileWrapper>
    </S.MyPageContainer>
  );
}

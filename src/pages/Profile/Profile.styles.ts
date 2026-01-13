import styled from "styled-components";
import { Theme } from "@mui/material";

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 64px);
`;

export const ProfileBannerContainer = styled.div`
  position: relative;
  height: 125px;
  overflow: hidden;

  @media (max-width: 600px) {
    height: 100px;
  }
`;

export const BannerOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
  pointer-events: none;
  z-index: 1;
`;

export const ProfileHeaderContainer = styled.div`
  position: relative;
  padding: 0 24px 12px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 600px) {
    padding: 0 16px 12px;
  }
`;

export const AvatarContainer = styled.div`
  margin-top: -60px;
  z-index: 10;
  position: relative;

  @media (max-width: 600px) {
    margin-top: -50px;
  }
`;

export const StyledAvatar = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 4px solid ${({ theme }) => (theme as Theme).palette.background.default};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  object-fit: cover;

  @media (max-width: 600px) {
    width: 90px;
    height: 90px;
    border-width: 3px;
  }
`;

export const ProfileActions = styled.div`
  padding-bottom: 8px;

  @media (max-width: 600px) {
    margin-top: 8px;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 24px 48px;

  @media (max-width: 600px) {
    padding: 0 16px 32px;
  }
`;

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  @media (max-width: 900px) {
    padding-left: 8px;
  }
`;

export const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  min-width: 0;
`;

export const ProfileCard = styled.div`
  background: ${({ theme }) => (theme as Theme).palette.background.paper};
  border-radius: 12px;
  padding: 24px;
  box-shadow: ${({ theme }) => (theme as Theme).shadows[1]};
  border: 1px solid ${({ theme }) => (theme as Theme).palette.divider};
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

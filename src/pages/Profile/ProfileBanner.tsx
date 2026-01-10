import { Theme } from "@mui/material/styles";
import React from "react";
import styled from "styled-components";
import ScheduleGrid from "../../components/ScheduleGrid/ScheduleGrid";

const ProfileBannerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;

  @keyframes move {
    0% {
      opacity: 0;
      transform: translate(-808px, -95px) rotate(-30deg);
    }

    1% {
      opacity: 1;
      transform: translate(-800px, -100px) rotate(-30deg);
    }

    99% {
      opacity: 1;
      transform: translate(0px, -560px) rotate(-30deg);
    }

    100% {
      opacity: 0;
      transform: translate(8px, -565px) rotate(-30deg);
    }
  }

  .opacity-gradient {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: radial-gradient(
      circle at 100% 150%,
      rgba(0, 0, 0, 0) 0%,
      ${({ theme }) => (theme as Theme).palette.grey[50]} 75%
    );
  }

  .wrapper-profile-banner {
    animation: move 90s linear infinite;
    filter: blur(${({ theme }) => (theme as Theme).sizes.size_4});
    height: 2000px;
    width: 3000px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    & > div {
      width: 500px;
      height: 400px;
      padding: 15px;
    }
  }
`;

function ProfileBanner(): JSX.Element {
  return (
    <ProfileBannerWrapper>
      <div className="opacity-gradient" />
      <div className="wrapper-profile-banner">
        <ScheduleGrid count={25} />
      </div>
    </ProfileBannerWrapper>
  );
}

export default ProfileBanner;

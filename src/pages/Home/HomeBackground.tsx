import React from "react";
import ScheduleGrid from "../../components/ScheduleGrid/ScheduleGrid";
import HomeBackgroundWrapper from "./HomeBackground.styles";

function HomeBackground(): JSX.Element {
  return (
    <HomeBackgroundWrapper className="home-background-wrapper">
      <div className="opacity-gradient" />
      <div className="wrapper-home-background">
        <ScheduleGrid count={25} />
      </div>
    </HomeBackgroundWrapper>
  );
}

export default HomeBackground;

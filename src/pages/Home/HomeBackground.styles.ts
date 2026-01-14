import { Theme } from '@mui/material/styles';
import styled from 'styled-components';

const HomeBackgroundWrapper = styled.div`
  width: 100%;
  height: 100%;

  position: fixed;
  z-index: -1;
  overflow: hidden;

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
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: radial-gradient(
      circle at 100% 150%,
      rgba(0, 0, 0, 0) 0%,
      ${({ theme }) => (theme as Theme).palette.grey[50]} 75%
    );
  }

  .wrapper-home-background {
    animation: move 90s linear infinite;

    filter: blur(${({ theme }) => (theme as Theme).sizes.size_4});

    height: 200%;
    width: 3000px;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    & > div {
      width: 500px;
      height: 20%;
      padding: 0.5%;
    }
  }
`;

export default HomeBackgroundWrapper;

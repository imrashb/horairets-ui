import { Theme } from "@mui/material/styles";
import styled from "styled-components";

const GenerateurHoraireWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  padding: ${({ theme }) => (theme as Theme).sizes.size_8}
    ${({ theme }) => (theme as Theme).sizes.size_24};

  ${({ theme }) => (theme as Theme).breakpoints.down("sm")} {
    padding: ${({ theme }) => (theme as Theme).sizes.size_8}
      ${({ theme }) => (theme as Theme).sizes.size_8};
  }

  .title {
    text-shadow: ${({ theme }) => (theme as Theme).textShadow.main};
  }

  .main-content-wrapper {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    ${({ theme }) => (theme as Theme).breakpoints.up("lg")} {
      height: 100%;
    }
    position: relative;

    ${({ theme }) => (theme as Theme).breakpoints.down("lg")} {
      flex-direction: column;
    }

    .left {
      ${({ theme }) => (theme as Theme).breakpoints.up("lg")} {
        flex: 1;
        position: sticky;
        top: 4rem;
      }

      height: 100%;
      max-width: 33.3333333vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;

      ${({ theme }) => (theme as Theme).breakpoints.between("md", "lg")} {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        max-width: 100%;
        width: 100%;

        & > div {
          flex: 1;
          margin: 0 ${({ theme }) => (theme as Theme).sizes.size_8};
          &:first-child {
            margin-left: 0;
          }

          &:last-child {
            margin-right: 0;
          }
        }
      }

      ${({ theme }) => (theme as Theme).breakpoints.down("md")} {
        max-width: 100%;
        width: 100%;
      }

      .expand-btn {
        position: absolute;
        top: ${({ theme }) => (theme as Theme).sizes.size_16};
        right: -${({ theme }) => (theme as Theme).sizes.size_40};
        opacity: 1;
        border-radius: 0;
      }

      ${({ theme }) => (theme as Theme).breakpoints.up("lg")} {
        @keyframes slide {
          0% {
            margin-left: 0;
          }

          100% {
            margin-left: -33.3333333vw;
          }
        }

        @keyframes inverseSlide {
          0% {
            margin-left: -33.3333333vw;
          }
          100% {
            margin-left: 0;
          }
        }

        & > div {
          transition: opacity 0.3s ease-in-out;
        }

        &.closed {
          animation: 0.3s slide ease-in-out forwards;
          & > div {
            opacity: 0;
          }
        }

        &.open {
          animation: 0.3s inverseSlide ease-in-out forwards;
          & > div {
            opacity: 1;
          }
        }
      }
    }

    .right {
      ${({ theme }) => (theme as Theme).breakpoints.up("lg")} {
        flex: 2;
      }
      height: 100%;
      width: 100%;
    }
  }
`;

export default GenerateurHoraireWrapper;

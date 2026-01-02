import { Theme } from "@mui/material/styles";
import styled from "styled-components";

const NavBarWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;

  .MuiToolbar-root {
    justify-content: space-between;

    & > div {
      display: flex;
      align-items: center;

      &.navbar-left {
        flex: 2;

        ${({ theme }) => (theme as Theme).breakpoints.down("md")} {
          flex: 1;
        }
      }

      &.navbar-right {
        flex: 2;
        flex-direction: row-reverse;

        ${({ theme }) => (theme as Theme).breakpoints.down("md")} {
          flex: 1;
        }
      }

      &.navbar-center {
        flex: 5;
        justify-content: center;

        ${({ theme }) => (theme as Theme).breakpoints.down("md")} {
          flex: 7;
        }

        .MuiTabs-flexContainer {
          justify-content: center;

          .MuiTab-root {
            flex-direction: row;
            align-items: center;
          }
        }
      }

      .logo-horairets {
        width: ${({ theme }) => (theme as Theme).sizes?.size_32};
        height: ${({ theme }) => (theme as Theme).sizes?.size_32};
        margin-right: ${({ theme }) => (theme as Theme).sizes?.size_16};

        ${({ theme }) => (theme as Theme).breakpoints.down("md")} {
          margin-right: 0;
        }

        cursor: pointer;
      }
    }
  }
`;

export default NavBarWrapper;

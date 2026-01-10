import { Theme } from "@mui/material/styles";
import styled from "styled-components";

const GenerationModifiersWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  background: ${({ theme }) => (theme as Theme).palette.grey[100]};

  min-height: ${({ theme }) => (theme as Theme).sizes.size_64};
  height: ${({ theme }) => (theme as Theme).sizes.size_64};

  .views-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;

    padding-right: ${({ theme }) => (theme as Theme).sizes.size_16};

    & > button {
      background: ${({ theme }) => (theme as Theme).palette.common.white};
      path {
        fill: ${({ theme }) => (theme as Theme).palette.primary.main};
      }

      &.Mui-selected {
        background: ${({ theme }) => (theme as Theme).palette.primary.main};
        path {
          fill: ${({ theme }) => (theme as Theme).palette.common.white};
        }
      }
    }
  }

  .nb-horaires-generes {
    margin-left: ${({ theme }) => (theme as Theme).sizes.size_16};
    margin-right: auto;
  }

  & > * {
    display: flex;
    flex-direction: row;
    align-items: center;

    margin-right: ${({ theme }) => (theme as Theme).sizes.size_16};
    .sort-dropdown {
      width: ${({ theme }) => (theme as Theme).sizes.size_256};

      ${({ theme }) => (theme as Theme).breakpoints.between("sm", "md")} {
        width: ${({ theme }) => (theme as Theme).sizes.size_192};
      }
    }

    .sort-text {
      margin-right: ${({ theme }) => (theme as Theme).sizes.size_16};
    }
  }
`;

export default GenerationModifiersWrapper;

import { Theme } from "@mui/material/styles";
import styled from "styled-components";

const FavorisWrapper = styled.div`
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

  .control-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: ${({ theme }) => (theme as Theme).sizes.size_8} 0;
    max-width: 20rem;
  }
`;

export default FavorisWrapper;

import { Theme } from "@mui/material/styles";
import styled from "styled-components";

const JourWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  .nom-jour {
    text-align: center;
    border-bottom: ${({ theme }) => (theme as Theme).sizes.size_1} solid
      ${({ theme }) => (theme as Theme).palette.grey[700]};
  }
  .activite {
    width: 100%;
    background: blue;
  }

  .classes-wrapper {
    border: ${({ theme }) => (theme as Theme).sizes.size_1} solid
      ${({ theme }) => (theme as Theme).palette.grey[700]};
    border-top: none;
    height: 100%;
    display: flex;
    flex-direction: column;
    .periode {
      flex: 1;
    }

    background-image: linear-gradient(
      to bottom,
      ${({ theme }) => (theme as Theme).palette.grey[900]}
        ${({ theme }) => (theme as Theme).sizes.size_1},
      transparent ${({ theme }) => (theme as Theme).sizes.size_1}
    );
    background-size: 99.5% 3.333333333%;
  }
`;

export default JourWrapper;

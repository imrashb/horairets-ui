import { Theme } from "@mui/material/styles";
import styled from "styled-components";

// Ensure theme is typed correctly
const NewBadgeWrapper = styled.div`
  background-color: ${({ theme }) => (theme as Theme).palette.badgeNew.main};
  border-radius: ${({ theme }) => (theme as Theme).sizes?.size_16};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: min-content;
  color: ${({ theme }) => (theme as Theme).palette.background.default};
  padding: ${({ theme }) => (theme as Theme).sizes?.size_2}
    ${({ theme }) => (theme as Theme).sizes?.size_8};
  margin: ${({ theme }) => (theme as Theme).sizes?.size_8};
`;

export default NewBadgeWrapper;

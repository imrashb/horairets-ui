import styled from "styled-components";
import { IconButton, Typography, Theme } from "@mui/material";

export const CardWrapper = styled.div`
  background: ${({ theme }) => (theme as Theme).palette.grey[100]};
  border: 1px solid ${({ theme }) => (theme as Theme).palette.grey[200]};
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CoursesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  min-height: 32px;
`;

export const AddButton = styled(IconButton)`
  width: 28px;
  height: 28px;
  background: ${({ theme }) => (theme as Theme).palette.primary.light};
  color: white;
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }) => (theme as Theme).palette.primary.main};
  }
`;

export const InlineAutocomplete = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  height: 28px;

  .MuiAutocomplete-root {
    width: 180px;
  }

  .MuiInputBase-root {
    height: 28px;
    font-size: 0.8125rem;
    padding: 0 8px !important;
  }

  .MuiOutlinedInput-notchedOutline {
    border-radius: 6px;
  }
`;

export const EmptyState = styled(Typography)`
  color: ${({ theme }) => (theme as Theme).palette.text.secondary};
  font-style: italic;
  font-size: 0.875rem;
  line-height: 28px;
`;

export const DeleteButton = styled(IconButton)`
  opacity: 0.6;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
    color: ${({ theme }) => (theme as Theme).palette.error.main};
  }
`; 

import { Add } from "@mui/icons-material";
import { Theme, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { getSessionTranslation } from "../../../utils/Sessions.utils";

const AddCardWrapper = styled.div`
  background: transparent;
  border: 2px dashed ${({ theme }) => (theme as Theme).palette.grey[400]};
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 200px;
  height: 100%;

  &:hover {
    border-color: ${({ theme }) => (theme as Theme).palette.primary.main};
    background: ${({ theme }) => (theme as Theme).palette.primary.main}15;
  }
`;

const AddIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => (theme as Theme).palette.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const AddText = styled(Typography)`
  color: ${({ theme }) => (theme as Theme).palette.text.secondary};
  font-size: 0.875rem;
`;

interface AddSessionCardProps {
  session: string;
  onAdd: () => void;
}

export function AddSessionCard({ session, onAdd }: AddSessionCardProps): JSX.Element {
  const { t } = useTranslation("common");
  
  return (
    <AddCardWrapper onClick={onAdd}>
        <AddIcon>
          <Add />
        </AddIcon>
        <AddText align="center">
          {getSessionTranslation(session, t) || session}
        </AddText>
      </AddCardWrapper>
  );
}

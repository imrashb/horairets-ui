import styled from 'styled-components';
import { Theme } from '@mui/material';

export const ChangeIndicator = styled.div`
  color: ${({ theme }) => (theme as Theme).palette.warning.main};
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

// Desktop floating pill
export const DesktopFloatingPill = styled.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1100;
  background: ${({ theme }) => (theme as Theme).palette.background.paper};
  border-radius: 16px;
  padding: 12px 20px;
  border: 1px solid ${({ theme }) => (theme as Theme).palette.divider};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  ${({ theme }) => (theme as Theme).breakpoints.down('sm')} {
    display: none;
  }
`;

export const PillActionsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

// Mobile fixed bottom bar
export const MobileFixedContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1100;
  background: ${({ theme }) => (theme as Theme).palette.background.paper};
  border-top: 1px solid ${({ theme }) => (theme as Theme).palette.divider};
  padding: 12px 16px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom, 0px));
  display: flex;
  flex-direction: column;
  gap: 8px;

  ${({ theme }) => (theme as Theme).breakpoints.up('sm')} {
    display: none;
  }
`;

export const MobileActionsRow = styled.div`
  display: flex;
  gap: 0.75rem;

  & > button {
    flex: 1;
  }
`;

// Animated spacer for layout
export const LayoutSpacer = styled.div<{ $expanded: boolean }>`
  height: ${({ $expanded }) => ($expanded ? '40px' : '0px')};
  transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  flex-shrink: 0;
`;

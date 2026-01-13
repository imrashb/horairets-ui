import { Theme } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

interface LogoWrapperProps {
  fontSize?: string;
  mobileFontSize?: string;
}

const LogoWrapper = styled.div<LogoWrapperProps>`
  font-size: ${({ fontSize }) => fontSize || '12vw'};
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: 960px) {
    font-size: ${({ mobileFontSize, fontSize }) => mobileFontSize || fontSize || '16vw'};
  }

  .horairets-animated-text {
    font-family: 'Fugaz One';
  }

  .ets {
    font-family: 'Fugaz One';
    color: ${({ theme }) => (theme as Theme).palette.primary.ets};
  }

  .text-shadow {
    position: absolute;
    font-family: 'Fugaz One';
    /* Adjust shadow relative to font size if possible, or keep using vw for Home compatibility */
    text-shadow: black 0.04em 0.12em 0.08em;
    color: transparent;
    z-index: -1;
  }
`;

interface HorairetsLogoProps {
  fontSize?: string;
  mobileFontSize?: string;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

const HorairetsLogo = React.forwardRef<HTMLDivElement, HorairetsLogoProps>(
  ({ fontSize, mobileFontSize, className }, ref) => {
    const { t } = useTranslation('common');

    return (
      <LogoWrapper
        ref={ref}
        className={className}
        fontSize={fontSize}
        mobileFontSize={mobileFontSize}
      >
        <span className="horairets-wrapper">
          <span className="text-shadow">{t('horairets')}</span>
          <span className="horairets-animated-text">{t('horair')}</span>
          <span className="ets">{t('ets')}</span>
        </span>
      </LogoWrapper>
    );
  },
);

HorairetsLogo.displayName = 'HorairetsLogo';

export default HorairetsLogo;

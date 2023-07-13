/* eslint-disable react/jsx-props-no-spreading */
import { Badge, Tooltip } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

function BetaBadge({ children, anchorOrigin }) {
  const { t } = useTranslation('common');
  return (
    <Badge
      color="beta"
      anchorOrigin={anchorOrigin}
      badgeContent={(
        <Tooltip title={t('tooltipBeta')}>
          <span>
            {t('beta')}
          </span>
        </Tooltip>
      )}
    >
      {children}
    </Badge>
  );
}

export const withBetaBadge = (Component, anchorOrigin) => function (props) {
  return (
    <BetaBadge anchorOrigin={anchorOrigin}>
      <Component {...props} />
    </BetaBadge>
  );
};

export default BetaBadge;

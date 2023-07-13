/* eslint-disable react/jsx-props-no-spreading */
import { Badge } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

function NewBadge({ children, anchorOrigin }) {
  const { t } = useTranslation('common');
  return (
    <Badge
      color="new"
      anchorOrigin={anchorOrigin}
      badgeContent={t('new')}
    >
      {children}
    </Badge>
  );
}

export const withNewBadge = (Component, anchorOrigin) => function (props) {
  return (
    <NewBadge anchorOrigin={anchorOrigin}>
      <Component {...props} />
    </NewBadge>
  );
};

export default NewBadge;

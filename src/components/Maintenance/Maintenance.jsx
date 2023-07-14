import React, { useEffect } from 'react';
import { useFeatureFlagPayload, usePostHog } from 'posthog-js/react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import MaintenanceWrapper from './Maintenance.styles';

function Maintenance() {
  const maintenance = useFeatureFlagPayload('maintenance-payload');

  const posthog = usePostHog();
  const { t } = useTranslation('common');

  useEffect(() => {
    const interval = setInterval(() => {
      posthog.reloadFeatureFlags();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!maintenance) return undefined;

  const { start, end } = maintenance;

  const endMaintenance = new Date(end * 1000);

  return (
    <MaintenanceWrapper>
      <img className="logo-horairets" src="./logo.png" alt="Logo HorairÉTS" />
      <Typography variant="h3" component="div" className="navbar-title">
        {t('maintenance', { heures: endMaintenance.getHours(), minutes: endMaintenance.getMinutes() })}
      </Typography>
    </MaintenanceWrapper>
  );
}

export default Maintenance;

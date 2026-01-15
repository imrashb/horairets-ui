import {
  CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Typography,
} from '@mui/material';
import { Close, OpenInNew } from '@mui/icons-material';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetCours } from '../../features/generateur/generateurQueries';
import { getEtsCourseUrl } from '../../utils/ets.utils';

interface CourseDetailsDialogProps {
  open: boolean;
  activator: React.ReactNode;
  onClose: () => void;
  sigle: string | null;
}

function CourseDetailsDialog({
  open, onClose, sigle, activator,
}: CourseDetailsDialogProps): JSX.Element {
  const { t } = useTranslation('common');
  const { data: courses, isLoading } = useGetCours();

  const course = useMemo(() => {
    if (!sigle || !courses) return null;
    return courses.find((c) => c.sigle === sigle);
  }, [sigle, courses]);

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ m: 0, p: 2, pr: 6 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {course ? course.sigle : t('detailsCours')}
              {course && (
                <IconButton
                  size="small"
                  href={getEtsCourseUrl(course.sigle)}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'primary.main' }}
                >
                  <OpenInNew fontSize="small" />
                </IconButton>
              )}
            </Typography>
            <Typography variant="body2">
              {course?.titre}
            </Typography>
          </div>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {isLoading && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
              <CircularProgress />
            </div>
          )}
          {!isLoading && course && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Typography variant="body1">
                <strong>
                  {t('credits')}
                  :
                </strong>
                {' '}
                {course.credits}
              </Typography>
              {course.programmes && course.programmes.length > 0 && (
                <Typography variant="body1">
                  <strong>
                    {t('programmes')}
                    :
                  </strong>
                  {' '}
                  {course.programmes.join(', ')}
                </Typography>
              )}
            </div>
          )}
          {!isLoading && !course && (
            <Typography>{t('coursNonTrouve')}</Typography>
          )}
        </DialogContent>
      </Dialog>
      {activator}
    </>
  );
}

export default CourseDetailsDialog;

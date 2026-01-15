import {
  Button, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography,
} from '@mui/material';
import { Close, MenuBook, OpenInNew } from '@mui/icons-material';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetCours } from '../../features/generateur/generateurQueries';
import { getEtsCourseUrl, getPlanDeCoursUrl } from '../../utils/ets.utils';

interface CourseDetailsDialogProps {
  open: boolean;
  activator: React.ReactNode;
  onClose: () => void;
  sigle: string | null;
  session?: string;
  groupe?: string;
}

function CourseDetailsDialog({
  open, onClose, sigle, activator, session, groupe,
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
            <Typography variant="h6">
              {course ? course.sigle : t('detailsCours')}
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
              <Typography variant="body1">
                <strong>
                  {t('prealables')}
                  :
                </strong>
                {' '}
                {course.prealables && course.prealables.length > 0
                  ? course.prealables.join(', ')
                  : t('aucun')}
              </Typography>

              <Stack direction="column" spacing={1} sx={{ mt: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<OpenInNew />}
                  href={getEtsCourseUrl(course.sigle)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('descriptionCours')}
                </Button>
                {session && (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<MenuBook />}
                    href={getPlanDeCoursUrl(session, course.sigle, groupe || '00')}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('planDeCours')}
                  </Button>
                )}
              </Stack>
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

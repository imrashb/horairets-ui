import { useTranslation } from 'react-i18next';
import { CreditsRange } from '../utils/credits.utils';

export function useCreditsLabel(creditsRange: CreditsRange): string {
  const { t } = useTranslation('common');

  if (creditsRange.min === creditsRange.max) {
    return t('credits', { count: creditsRange.min });
  }

  return t('creditsRange', { min: creditsRange.min, max: creditsRange.max });
}

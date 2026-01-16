import { Theme, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { SessionsMap } from '../../../../../hooks/firebase/types';
import { getAcademicYearSessions } from '../../../../../utils/SessionSequence.utils';
import SemesterViewCard from './SemesterViewCard';

const YearContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const YearLabel = styled(Typography)`
  font-weight: 600;
  color: ${({ theme }) => (theme as Theme).palette.text.secondary};
  padding-left: 0.25rem;
`;

const SemestersColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

interface AcademicYearGroupProps {
  academicYear: number;
  sessions: SessionsMap;
}

function AcademicYearGroup({ academicYear, sessions }: AcademicYearGroupProps): JSX.Element {
  const { t } = useTranslation('common');
  const yearSessions = getAcademicYearSessions(academicYear);

  return (
    <YearContainer>
      <YearLabel variant="caption">
        {t('anneeAcademique', { startYear: academicYear, endYear: academicYear + 1 })}
      </YearLabel>
      <SemestersColumn>
        {yearSessions.map((session) => (
          <SemesterViewCard
            key={session}
            session={session}
            config={sessions[session]}
          />
        ))}
      </SemestersColumn>
    </YearContainer>
  );
}

export default AcademicYearGroup;

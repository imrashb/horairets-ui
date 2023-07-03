import { DragIndicator } from '@mui/icons-material';
import React from 'react';
import { useDrag } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { CONGE_DND } from '../../generateurHoraire.dnd';

function Conge() {
  const { t } = useTranslation('common');

  const [, drag] = useDrag(() => ({
    type: CONGE_DND,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <CongeWrapper ref={drag}>
      <DragIndicator className="drag" />
      {t('conge')}
    </CongeWrapper>
  );
}

const CongeWrapper = styled.div`

    padding: 0.5rem;

    display: flex;
    flex-direction: row;
    align-items: center;

    .drag {
        cursor: pointer;
    }

    &:not(:last-child) {
        border-bottom: ${({ theme }) => theme.palette.grey[400]} solid ${({ theme }) => theme.sizes.size_1};
    }

`;

export default Conge;

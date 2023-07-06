import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SelectionAccordion from '../../../components/SelectionAccordion/SelectionAccordion';
import SelectionParametresWrapper from './SelectionParametres.styles';
import Conge from './dnd/Conge';

function SelectionParametres() {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation('common');

  return (
    <SelectionAccordion
      title={t('parametres')}
      expanded={expanded}
      onAccordionChange={() => setExpanded(!expanded)}
      accordionContent={(
        <SelectionParametresWrapper>
          <Conge />
        </SelectionParametresWrapper>
    )}
    />
  );
}

export default SelectionParametres;
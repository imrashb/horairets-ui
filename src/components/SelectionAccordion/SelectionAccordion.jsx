import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Typography,
} from '@mui/material';
import React from 'react';
import SelectionAccordionWrapper from './SelectionAccordion.styles';

function SelectionAccordion({
  title,
  accordionTitleAdditionalContent,
  accordionContent,
  accordionActions,
  disabled,
  expanded,
  onAccordionChange,
}) {
  return (
    <SelectionAccordionWrapper>
      <Accordion
        expanded={expanded}
        disabled={disabled}
        onChange={onAccordionChange}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
        >
          <Typography variant="h5">{title}</Typography>
          {accordionTitleAdditionalContent && accordionTitleAdditionalContent}
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          {accordionContent}
        </AccordionDetails>
        {accordionActions && (
        <>
          <Divider />
          <AccordionActions>
            {accordionActions}
          </AccordionActions>
        </>
        )}
      </Accordion>
    </SelectionAccordionWrapper>
  );
}

export default SelectionAccordion;

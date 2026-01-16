import { Add, Close } from '@mui/icons-material';
import {
  Autocomplete, ClickAwayListener, IconButton, TextField,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Cours } from '../../../../features/generateur/generateur.types';
import { AddButton, InlineAutocomplete } from './SessionCard.styles';

interface AddCourseAutocompleteProps {
  allCours: Cours[];
  isLoading?: boolean;
  existingCourses: string[];
  onAddCourse: (sigle: string) => void;
}

function AddCourseAutocomplete({
  allCours,
  isLoading = false,
  existingCourses,
  onAddCourse,
}: AddCourseAutocompleteProps): JSX.Element {
  const { t } = useTranslation('common');
  const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const availableCourses = allCours.filter((c) => !existingCourses.includes(c.sigle));

  const handleStartAdding = () => {
    setIsAdding(true);
    setInputValue('');
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleStopAdding = () => {
    setIsAdding(false);
    setInputValue('');
  };

  const handleAdd = (sigle: string) => {
    onAddCourse(sigle);
    setInputValue('');
    // Keep focus to allow adding multiple courses quickly
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  if (isAdding) {
    return (
      <ClickAwayListener onClickAway={handleStopAdding}>
        <InlineAutocomplete>
          <Autocomplete
            size="small"
            options={availableCourses}
            getOptionLabel={(option) => option.sigle}
            loading={isLoading}
            inputValue={inputValue}
            value={null}
            onInputChange={(_, value, reason) => {
              if (reason !== 'reset') setInputValue(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                inputRef={inputRef}
                placeholder={t('sigle') as string}
                variant="outlined"
                size="small"
                onKeyDown={(e) => {
                  if (e.key === 'Escape') handleStopAdding();
                }}
              />
            )}
            onChange={(_, value) => {
              if (value) {
                handleAdd(value.sigle);
              }
            }}
            autoHighlight
            openOnFocus
            blurOnSelect={false}
            clearOnBlur={false}
          />
          <IconButton size="small" onClick={handleStopAdding} sx={{ p: 0.25 }}>
            <Close sx={{ fontSize: 14 }} />
          </IconButton>
        </InlineAutocomplete>
      </ClickAwayListener>
    );
  }

  return (
    <AddButton size="small" onClick={handleStartAdding}>
      <Add sx={{ fontSize: 18 }} />
    </AddButton>
  );
}

export default AddCourseAutocomplete;

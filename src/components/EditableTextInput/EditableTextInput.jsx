import React, { useCallback, useEffect, useState } from 'react';
import { TextField, Typography } from '@mui/material';
import EditableComponent from '../EditableComponent/EditableComponent';

function EditableTextInput({
  defaultValue, onEdit, variant = 'h6', height = '48px',
}) {
  const [value, setValue] = useState(defaultValue);
  const [isEditing, setEditing] = useState(false);

  const onEditComplete = useCallback(() => {
    setEditing(!isEditing);
    if (isEditing && value !== defaultValue) onEdit(value);
  }, [value, defaultValue, onEdit, setEditing, isEditing]);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue, setValue]);
  return (
    <EditableComponent
      width="256px"
      height={height}
      isEditing={isEditing}
      setEditing={onEditComplete}
      displayComponent={(
        <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} variant={variant}>
          {value}
        </Typography>
      )}
      editComponent={(
        <TextField
          autoFocus
          size="medium"
          variant="standard"
          value={value}
          onBlur={onEditComplete}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onEditComplete();
            }
          }}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
      onEditComplete={onEditComplete}
    />
  );
}

export default EditableTextInput;

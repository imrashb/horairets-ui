import { Search } from '@mui/icons-material';
import {
  IconButton,
  InputAdornment,
  Menu,
  SxProps,
  TextField,
  Theme,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';

interface ResponsiveSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function ResponsiveSearchBar({ value, onChange, placeholder }: ResponsiveSearchBarProps): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery((theme as Theme).breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderTextField = (autoFocus: boolean) => (
    <TextField
      autoFocus={autoFocus}
      size="small"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
      sx={{ maxWidth: 250 }}
    />
  );

  if (!isMobile) {
    return renderTextField(false);
  }

  return (
    <>
      <IconButton onClick={handleOpen} color={value ? 'primary' : 'default'}>
        <Search />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            sx: {
              p: 1,
            },
          },
        }}
      >
        {renderTextField(true)}
      </Menu>
    </>
  );
}

export default ResponsiveSearchBar;

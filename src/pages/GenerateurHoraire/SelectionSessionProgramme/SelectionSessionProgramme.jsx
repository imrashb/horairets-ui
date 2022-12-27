import { Sync } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SelectionSessionProgrammeWrapper from './SelectionSessionProgramme.styles';

function SelectionSessionProgramme() {
  const { t } = useTranslation('common');

  const sessions = ['A2022', 'H2023', 'E2023'];
  const programmes = ['Génie Logiciel', 'Génie Électrique'];

  const [session, setSession] = useState(sessions[0]);
  const [programme, setProgramme] = useState(programmes[0]);

  return (
    <SelectionSessionProgrammeWrapper>
      <Card variant="elevation" className="choix-session">
        <CardHeader title={t('sessionProgramme')} />
        <Divider />
        <CardContent className="selection-wrapper">
          <FormControl variant="standard">
            <InputLabel>{t('session')}</InputLabel>
            <Select
              value={session}
              onChange={(e) => setSession(e?.target?.value)}
              label={t('session')}
            >
              {sessions.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl variant="standard">
            <InputLabel>{t('programme')}</InputLabel>
            <Select
              value={programme}
              onChange={(e) => setProgramme(e?.target?.value)}
              label={t('programme')}
            >
              {programmes.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
            </Select>
          </FormControl>
        </CardContent>
        <Divider />
        <CardActions>
          <Button variant="text">
            {t('synchroniserCours')}
            <Sync />
          </Button>
        </CardActions>
      </Card>
    </SelectionSessionProgrammeWrapper>
  );
}

export default SelectionSessionProgramme;

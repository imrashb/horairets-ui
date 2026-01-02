/* eslint-disable react-hooks/exhaustive-deps */
import {
  ChevronLeft,
  ChevronRight,
  Lock,
  LockOpen,
  SwapHoriz,
} from "@mui/icons-material";
import {
  IconButton,
  ListItemButton,
  ListItemIcon,
  TextField,
  Typography,
} from "@mui/material";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { useAtomValue } from "jotai";
import React, { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  programmesAtom,
  selectedCoursAtom,
  sessionAtom,
} from "../../../features/generateur/generateurAtoms";
import { Cours } from "../../../features/generateur/generateur.types";
import { useGetCoursSession } from "../../../features/generateur/generateurQueries";
import {
  MAITRISE,
  NOMBRE_MAX_COURS,
  NOMBRE_MAX_COURS_PAR_HORAIRE,
} from "../generateurHoraire.constants";
import useGenerateurHoraire from "../GenerateurHoraireContexts/hooks/useGenerateurHoraire";
import CoursTransferListWrapper from "./CoursTransferList.styles";

const RIGHT = "right";
const LEFT = "left";

interface ListProperties {
  id: string;
  listName: string;
  icon: ReactNode;
  filter: string;
  setFilter: (val: string) => void;
}

const createListProperties = (
  id: string,
  listName: string,
  icon: ReactNode,
  filter: string,
  setFilter: (val: string) => void
): ListProperties => ({
  id,
  listName,
  icon,
  filter,
  setFilter,
});

interface CoursTransferListProps {
  includeMaitrise?: boolean;
}

export default function CoursTransferList({
  includeMaitrise,
}: CoursTransferListProps): JSX.Element {
  const { t } = useTranslation("common");

  const programme = useAtomValue(programmesAtom);
  const session = useAtomValue(sessionAtom);
  const selectedCours = useAtomValue(selectedCoursAtom);
  // useGetCoursSession returns UseQueryResult<Cours[], Error>
  // or similar. We assume data is Cours[]
  const coursSessionQuery = useGetCoursSession(session, programme);
  const {
    nombreCours: nbCours,
    setCoursObligatoires,
    setCours,
  } = useGenerateurHoraire();

  const [left, setLeft] = useState<Cours[]>([]);
  const [right, setRight] = useState<Cours[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [unselectedFilter, setUnselectedFilter] = useState("");
  const [locked, setLocked] = useState<Cours[]>([]);

  useEffect(() => {
    if (locked.length > (nbCours || 0)) {
      setLocked([]);
      setCoursObligatoires([]);
    }
  }, [nbCours, setCoursObligatoires]);

  // eslint-disable-next-line no-param-reassign
  const nombreCours =
    nbCours || Math.min(right.length, NOMBRE_MAX_COURS_PAR_HORAIRE);

  useEffect(() => {
    if (coursSessionQuery?.data) {
      setLeft(coursSessionQuery.data);
      setRight([]);
      setSelectedFilter("");
      setUnselectedFilter("");
    }
  }, [coursSessionQuery?.data]);

  useEffect(() => {
    if (selectedCours && coursSessionQuery?.data) {
      const selected = coursSessionQuery.data.filter((c) =>
        selectedCours.includes(c?.sigle)
      );
      const unselected = coursSessionQuery.data.filter(
        (c) => !selected.includes(c)
      );
      setRight(selected);
      setLeft(unselected);
    }
  }, []); // Only on mount/initial query/selected changes? The dep array is empty.

  const handleToggle = (value: Cours) => {
    const isLeft = left.find((v) => v?.sigle === value?.sigle);

    let modifiedLeft: Cours[];
    let modifiedRight: Cours[];

    if (isLeft) {
      modifiedLeft = left.filter((v) => v !== value);
      modifiedRight = [...right, value];
    } else {
      modifiedRight = right.filter((v) => v !== value);
      modifiedLeft = [...left, value];
    }
    const modifiedLocked = locked.filter((v) => v !== value);
    setLocked(modifiedLocked);
    setLeft(modifiedLeft);
    setRight(modifiedRight);
    setCours(modifiedRight.map((v) => v.sigle));
    setCoursObligatoires(modifiedLocked.map((v) => v.sigle));
  };

  const handleLocked = (value: Cours) => {
    let modified;
    if (locked.includes(value)) {
      modified = locked.filter((v) => v !== value);
    } else {
      modified = [...locked, value];
    }
    setLocked(modified);
    setCoursObligatoires(modified.map((v) => v.sigle));
  };

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: (val: string) => void
  ) => {
    setState(event?.target?.value);
  };

  const lists: Record<string, ListProperties> = {
    [LEFT]: createListProperties(
      LEFT,
      t("coursDisponibles"),
      <ChevronRight />,
      unselectedFilter,
      setUnselectedFilter
    ),
    [RIGHT]: createListProperties(
      RIGHT,
      t("coursSelectionnes"),
      <ChevronLeft />,
      selectedFilter,
      setSelectedFilter
    ),
  };

  const customList = (items: Cours[], properties: ListProperties) => {
    const { id, listName, icon, filter, setFilter } = properties;
    const filterFunction = (i: Cours) =>
      i?.sigle.toLowerCase().includes(filter.toLowerCase());

    let filteredItems = filter ? items.filter(filterFunction) : items;

    filteredItems =
      includeMaitrise || id === RIGHT
        ? filteredItems
        : filteredItems.filter((i) => !i?.programmes?.includes(MAITRISE));

    const sortFunction = (a: Cours, b: Cours) => {
      if (a.sigle < b.sigle) {
        return -1;
      }
      if (a.sigle > b.sigle) {
        return 1;
      }
      return 0;
    };
    const title =
      id === RIGHT
        ? `${listName} (${right.length}/${NOMBRE_MAX_COURS})`
        : `${listName} (${filteredItems.length})`;

    return (
      <Paper className="selection-list">
        <Typography>{title}</Typography>
        <TextField
          value={filter}
          label={t("filtrerSigle")}
          variant="standard"
          onChange={(event) => handleFilterChange(event, setFilter)}
          type="search"
        />
        <List dense component="div" role="list">
          {[...filteredItems].sort(sortFunction).map((value) => (
            <ListItemButton
              disableGutters
              divider
              key={value?.sigle}
              onClick={() => handleToggle(value)}
              disabled={id === LEFT && right.length === NOMBRE_MAX_COURS}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={value?.sigle} />
              {id === RIGHT && (
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLocked(value);
                  }}
                  disabled={
                    !locked?.includes(value) && locked.length >= nombreCours
                  }
                >
                  {locked?.includes(value) ? <Lock /> : <LockOpen />}
                </IconButton>
              )}
            </ListItemButton>
          ))}
          {id === RIGHT && right.length === 0 && (
            <ListItemButton disableGutters disabled>
              <ListItemText primary={t("aucunCoursSelectionne")} />
            </ListItemButton>
          )}
        </List>
      </Paper>
    );
  };

  return (
    <CoursTransferListWrapper>
      {customList(left, lists[LEFT])}
      <SwapHoriz className="swap-icon" />
      {customList(right, lists[RIGHT])}
    </CoursTransferListWrapper>
  );
}

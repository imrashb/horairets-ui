import { FilterList } from "@mui/icons-material";
import { useSetAtom } from "jotai";
import React from "react";
import { useTranslation } from "react-i18next";
import ButtonDialog from "../../../../components/ButtonDialog/ButtonDialog";
import { setFiltersAtom } from "../../../../features/generateur/generateurAtoms";
import useFilters from "./context/useFilters";
import DisponibilitesFilter from "./DisponibilitesFilter";
import GroupesFilter from "./GroupesFilter";

function GenerationFilters(): JSX.Element {
  const { t } = useTranslation("common");
  const setFilters = useSetAtom(setFiltersAtom);

  const { groupes, disponibilites } = useFilters();

  const onClose = () => {
    setFilters({
      groupes,
      disponibilites,
    });
  };

  return (
    <ButtonDialog onClose={onClose} title={t("filtrer")} icon={<FilterList />}>
      <DisponibilitesFilter />
      <GroupesFilter />
    </ButtonDialog>
  );
}

export default GenerationFilters;

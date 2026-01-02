import { FilterList } from "@mui/icons-material";
import { useSetAtom } from "jotai";
import React from "react";
import { useTranslation } from "react-i18next";
import ButtonDialog from "../../../../components/ButtonDialog/ButtonDialog";
import { setFiltersAtom } from "../../../../features/generateur/generateurAtoms";
import useFilters from "./context/useFilters";
import GroupesFilter from "./GroupesFilter";
import PlanificationSeanceFilter from "./PlanificationSeanceFilter";

function GenerationFilters(): JSX.Element {
  const { t } = useTranslation("common");
  const setFilters = useSetAtom(setFiltersAtom);

  const { planification, groupes } = useFilters();

  const onClose = () => {
    setFilters({
      planification,
      groupes,
    });
  };

  return (
    <ButtonDialog onClose={onClose} title={t("filtrer")} icon={<FilterList />}>
      <PlanificationSeanceFilter />
      <GroupesFilter />
    </ButtonDialog>
  );
}

export default GenerationFilters;

import { Close, Menu } from "@mui/icons-material";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import HorairetsLogo from "../../HorairetsLogo/HorairetsLogo";
import LoginButton from "./LoginButton";
import NavLogo from "./NavLogo";
import useNavBarTabs from "../useNavBarTabs";

const MobileNavWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: ${({ theme }) => theme.palette.grey[100]};
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
`;

const DrawerContent = styled.div`
  width: 280px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

function MobileNavDrawer(): JSX.Element {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const tabs = useNavBarTabs();

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      <MobileNavWrapper>
        <IconButton color="inherit" onClick={() => setOpen(true)}>
          <Menu />
        </IconButton>
        <NavLogo />
        <LoginButton />
      </MobileNavWrapper>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <DrawerContent>
          <DrawerHeader>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <img src="./logo.png" alt="Logo" style={{ width: 28, height: 28 }} />
              <HorairetsLogo fontSize="1.2rem" />
            </div>
            <IconButton onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          </DrawerHeader>

          <List sx={{ flex: 1, py: 2 }}>
            {tabs
              .filter((tab) => !tab.hidden)
              .map((tab) => (
                <ListItemButton
                  key={tab.label}
                  selected={location.pathname === tab.path}
                  onClick={() => handleNavigate(tab.path)}
                  disabled={tab.disabled}
                  sx={{ mx: 1, borderRadius: 2 }}
                >
                  <ListItemIcon>
                    <tab.icon />
                  </ListItemIcon>
                  <ListItemText primary={t(tab.label)} />
                </ListItemButton>
              ))}
          </List>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default MobileNavDrawer;

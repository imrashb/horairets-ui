import { AccountCircle, Logout } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NewBadge from "../../NewBadge/NewBadge";
import { PROFILE_URL } from "../../../routes/Routes.constants";
import useFirebaseAuth from "../useFirebaseAuth";

interface AccountMenuProps {
  open: boolean;
  onClose: () => void;
  anchor: HTMLElement | null;
}

function AccountMenu({ open, onClose, anchor }: AccountMenuProps): JSX.Element {
  const { t } = useTranslation("common");
  const navigate = useNavigate();

  const auth = useFirebaseAuth();
  const [signOut] = useSignOut(auth);

  const handleProfile = () => {
    onClose();
    navigate(PROFILE_URL);
  };

  const logout = async () => {
    if (onClose) onClose();
    const signedOut = await signOut();
    if (signedOut) {
      toast.success(t("deconnexionSucces"));
    } else {
      toast.error(t("deconnexionErreur"));
    }
  };

  return (
    <Menu
      anchorEl={anchor}
      open={open}
      onClose={onClose}
      onClick={onClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
    >
      <MenuItem onClick={handleProfile}>
        <ListItemIcon>
          <AccountCircle fontSize="small" />
        </ListItemIcon>
        {t("monProfil")}
        <NewBadge />
      </MenuItem>
      <MenuItem onClick={logout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        {t("seDeconnecter")}
      </MenuItem>
    </Menu>
  );
}

export default AccountMenu;


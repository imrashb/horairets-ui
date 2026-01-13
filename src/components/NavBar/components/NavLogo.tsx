import React from "react";
import { useNavigate } from "react-router-dom";
import { HOME_URL } from "../../../routes/Routes.constants";

interface NavLogoProps {
  size?: number;
}

function NavLogo({ size = 32 }: NavLogoProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <img
      src="./logo.png"
      alt="Logo HorairÉTS"
      style={{ width: size, height: size, cursor: "pointer" }}
      onClick={() => navigate(HOME_URL)}
    />
  );
}

export default NavLogo;

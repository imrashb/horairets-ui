import { Auth } from "firebase/auth";
import React from "react";

const AuthContext = React.createContext<Auth | null>(null);

export default AuthContext;

import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  name: null,
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
});

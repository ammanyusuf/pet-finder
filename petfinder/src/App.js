import "./App.css";
import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AddPost from "./pages/Posts/AddPosts";
import AddPet from "./pages/Pets/AddPet";
import PetFeed from "./pages/Pets/PetFeed";
import Register from "./pages/Profile/Register";
import Profile from "./pages/Profile/Profile";

import Feed from "./Feed";
import UserPostFeed from "./pages/Posts/UserPostFeed";
import ViewPost from "./pages/Posts/ViewPost";
import { AuthContext } from "./context/auth-context";
import Navbar from "./Navbar";
import { NotFound } from "./NotFound";
import { createTheme, ThemeProvider } from "@mui/material/styles";

let logoutTimer;
function App() {
  const [token, setToken] = useState(false);
  const [name, setName] = useState(false);
  const [expirationDate, setExpirationDate] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((token, name, id, texpirationDate) => {
    setToken(token);
    setName(name);
    setUserId(id);
    // const tokenExpiration = texpirationDate || new Date(new Date().getTime()+ 1000*60*60) //1000*60*60 converts to one hour after current time
    const tokenExpiration =
      texpirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24); //1000*60*60 converts to one hour after current time
    setExpirationDate(tokenExpiration);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        token: token,
        name: name,
        userId: id,
        expiration: tokenExpiration.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    window.location.replace("/Home");
    setToken(null);
    setName(null);
    setUserId(null);
    setExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      storedData.userId &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.token,
        storedData.name,
        storedData.userId,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  useEffect(() => {
    if (token && expirationDate) {
      const remainingTime = expirationDate.getTime() - new Date().getTime();
      console.log("Remaning Time: " + remainingTime);
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, expirationDate]);

  let routes;

  const theme = createTheme({
    palette: {
      primary: {
        main: "#306BAC",
      },
      secondary: {
        main: "#141B41",
      },
      tertiary: {
        main: "#C4DAFF",
      },
    },
  });

  if (token) {
    routes = (
      <React.Fragment>
        <Route element={<Feed />} path="/Home" />
        <Route element={<ViewPost />} path="/ViewPost" />
        <Route element={<UserPostFeed />} path="/PostFeed" />
        <Route element={<AddPost />} path="/createPosts" />
        <Route element={<AddPet />} path="/AddPet" />
        <Route element={<PetFeed />} path="/PetFeed" />
        <Route element={<Profile />} path="/Profile" />
        <Route element={<Navigate to="/Home" replace />} path="/login" />
        <Route path="*" element={<NotFound />} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route element={<LoginPage />} path="/login" />
        <Route element={<Feed />} path="/Home" />
        <Route element={<ViewPost />} path="/ViewPost" />
        <Route element={<Register />} path="/Register" />
        <Route path="*" element={<NotFound />} />
      </React.Fragment>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        name: name,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Routes>{routes}</Routes>
        </Router>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;

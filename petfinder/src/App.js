import "./App.css";
import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AddPost from "./AddPosts";
import AddPet from "./AddPet";
import PetFeed from "./PetFeed";
import Register from "./Register";
import Profile from "./Profile";
import Search from "./Search";

import Feed from "./Feed";
import UserPostFeed from "./UserPostFeed";
import ViewPost from "./ViewPost";
import { AuthContext } from "./context/auth-context";
import Navbar from "./Navbar";
import Navbar2 from "./NavBar2";

function App() {
  const [token, setToken] = useState(false);
  const [name, setName] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((token, name, id) => {
    setToken(token);
    setName(name);
    setUserId(id);
    localStorage.setItem(
      "userData",
      JSON.stringify({ token: token, name: name, userId: id })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setName(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token && storedData.userId) {
      login(storedData.token, storedData.name, storedData.userId);
    }
  }, [login]);

  let routes;

  if (token) {
    routes = (
      <React.Fragment>
        <Route element={<Feed />} path="/Home" />
        <Route element={<ViewPost />} path="/ViewPost" exact />
        <Route element={<UserPostFeed />} path="/PostFeed" />
        <Route element={<AddPost />} path="/createPosts" />
        <Route element={<AddPet />} path="/AddPet" />
        <Route element={<PetFeed />} path="/PetFeed" />
        <Route element={<Profile />} path="/Profile" />
        <Route elemet={<Search />} path ="/Search" />
        {/* <Route element={<Register />} path="/Register" /> */}
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route element={<LoginPage />} path="/login" />
        <Route element={<Feed />} path="/Home" exact />
        <Route element={<ViewPost />} path="/ViewPost" />
        <Route element={<Register />} path="/Register" />
        <Route elemet={<Search />} path ="/Search" />
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
      <Router>
        {/* <Navbar2 /> */}
        <Navbar />
        <Routes>{routes}</Routes>
      </Router>
    </AuthContext.Provider>
  );
  /*
  return (
    <AuthContext.Provider value={{isLoggedIn: !!token, token: token, name:name, login:login, logout: logout}}>
        <Router>
          <Navbar/>
          <Routes>
          ///CreatePet/Post
            <Route element={<PrivateRoutes />}>
                <Route element={<HomePage/>} path="/Home" exact/>
                
            </Route>

            <Route element={<LoginPage/>} path="/login"/>
            <Route element={<AddPost/>} path="/createPosts"/>
            <Route element={<AddPet/>} path="/AddPet"/>
            <Route element={<PetFeed/>} path="/PetFeed"/>

            CreatePetPost ends here
            //main is here
            {routes}
            //main ends here //
          </Routes>
      </Router>
    </AuthContext.Provider>
  );
  */
}

export default App;

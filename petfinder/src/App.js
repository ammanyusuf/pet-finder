import './App.css';
import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AddPost from './AddPosts';
import AddPet from './AddPet';
import PetFeed from './PetFeed';

import PrivateRoutes from './utils/PrivateRoute';
import Feed from './Feed'
import ViewPost from './ViewPost'
import PostComment from './PostComment';
import {AuthContext} from './context/auth-context'


import Navbar from './Navbar';
function App() {
  const [token, setToken] = useState(false);
  const [name, setName] = useState(false);


  const login = useCallback((token, name) => {
    setToken(token);
    setName(name);
    localStorage.setItem('userData', 
    JSON.stringify({token: token, name:name}))
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setName(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if(storedData && storedData.token){
      login(storedData.token, storedData.name);
    }
  }, [login]);

  let routes; 

  if(token){
    routes = (
      <React.Fragment>
        <Route element={<Feed/>} path="/Home" exact/>
        <Route element={<ViewPost/>} path="/ViewPost"/>
      </React.Fragment>
      );
  } else {
    routes = (
    <React.Fragment>
      <Route element={<LoginPage/>} path="/login"/>
      <Route element={<Feed/>} path="/Home" exact/>
      <Route element={<ViewPost/>} path="/ViewPost"/>
    </React.Fragment>
    );
  }



  return (
    <AuthContext.Provider value={{isLoggedIn: !!token, token: token, name:name, login:login, logout: logout}}>
        <Router>
          <Navbar/>
          <Routes>
          /*CreatePet/Post
            <Route element={<PrivateRoutes />}>
                <Route element={<HomePage/>} path="/Home" exact/>
                
            </Route>
            <Route element={<LoginPage/>} path="/login"/>
            <Route element={<AddPost/>} path="/createPosts"/>
            <Route element={<AddPet/>} path="/AddPet"/>
            <Route element={<PetFeed/>} path="/PetFeed"/>
            CreatePetPost ends here*/
            /* main is here*/
            {routes}
            /* main ends here */
          </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
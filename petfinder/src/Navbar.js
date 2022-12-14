import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { AuthContext } from "./context/auth-context";
import { Link, NavLink } from "react-router-dom";
import "./App.css";
import "./navbar.css";
import classnames from 'classnames';
import { Avatar } from "@mui/material";
import logo from './Spike3.png';

export default function ButtonAppBar() {
  const auth = useContext(AuthContext);
  return (
    <Box >
      <AppBar position="static" sx={{backgroundColor: "#306BAC"}}>
        <Toolbar className={'sidebar'}>
          <img src={logo} alt="logo" className="sidebar-img" min-width={"100px"}/>
          <NavLink to="/Home" >
            Feed
          </NavLink>
          {auth.isLoggedIn && (
            <NavLink
              to="/PostFeed"
            >
              MyPosts
            </NavLink>
          )}
          {auth.isLoggedIn && (
            <NavLink
              to="/PetFeed"
            >
              MyPets
            </NavLink>
          )}
          {auth.isLoggedIn && (
            <NavLink
              to="/Profile"
              id={'sidebar-name'}
            >
              {auth.name}
            </NavLink>
          )}
          {auth.isLoggedIn && (
            <Button className={'sidebar-button'} id={"sidebar-button"}
              onClick={auth.logout}
              variant="contained"
              color="secondary"
            >
              Logout
            </Button>
          )}
          {!auth.isLoggedIn && (
            <NavLink
              to="/login"
            >
              Login
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

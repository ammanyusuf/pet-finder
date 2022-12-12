import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { AuthContext } from "./context/auth-context";
import { Link } from "react-router-dom";
import "./App.css";
import "./navbar.css";
import classnames from 'classnames';
import { Avatar } from "@mui/material";

export default function ButtonAppBar() {
  const auth = useContext(AuthContext);
  return (
    <Box >
      <AppBar position="static" sx={{backgroundColor: "#306BAC"}}>
        <Toolbar className={'sidebar'}>
          <Link to="/Home" >
            Feed
          </Link>
          {auth.isLoggedIn && (
            <Link
              to="/PostFeed"
            >
              MyPosts
            </Link>
          )}
          {auth.isLoggedIn && (
            <Link
              to="/PetFeed"
            >
              MyPets
            </Link>
          )}
          {auth.isLoggedIn && (
            <Link
              to="/Profile"
              id={'sidebar-name'}
            >
              {auth.name}
            </Link>
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
            <Link
              to="/login"
            >
              Login
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

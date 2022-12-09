import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { AuthContext } from "./context/auth-context";
import { Link } from "react-router-dom";
import "./App.css";

export default function ButtonAppBar() {
  const auth = useContext(AuthContext);
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static">
        <Toolbar style={{ marginLeft: 500 }} className='parent'>
          <Link to="/Home" style={{ color: "white", textDecoration: "none" }}>
            Feed
          </Link>
          {auth.isLoggedIn && (
            <Link
              to="/PostFeed"
              style={{ color: "white", textDecoration: "none" }}
            >
              My Posts
            </Link>
          )}
          {auth.isLoggedIn && (
            <Link
              to="/PetFeed"
              style={{ color: "white", textDecoration: "none" }}
            >
              My Pets
            </Link>
          )}
          {auth.isLoggedIn && (
            <Link
              to="/Profile"
              style={{ color: "white", textDecoration: "none" }}
            >
              My Profile
            </Link>
          )}
          {auth.isLoggedIn && <h2 className="right">{auth.name}</h2>}
          {auth.isLoggedIn && (
            <Button className="right1"
              onClick={auth.logout}
              variant="contained"
              color="secondary"
              style={{ color: "white" }}
            >
              Logout
            </Button>
          )}
          {!auth.isLoggedIn && (
            <Link
              to="/login"
              style={{ color: "white", textDecoration: "none" }}
            >
              Login
            </Link>
          )}
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}

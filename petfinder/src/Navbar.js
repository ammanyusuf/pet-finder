import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { AuthContext } from "./context/auth-context";
import { Link } from "react-router-dom";

export default function ButtonAppBar() {
  const auth = useContext(AuthContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
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
          {auth.isLoggedIn && (
            <Button
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
          {auth.isLoggedIn && <h2>{auth.name}</h2>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

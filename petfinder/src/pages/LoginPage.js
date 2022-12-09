import React, { useContext } from "react";
import axios from "axios";
import { setAuthToken } from "../context/setAuthToken";
import { AuthContext } from "../context/auth-context";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

function LoginPage() {
  const auth = useContext(AuthContext);

  // let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)

  async function handleSubmit(e) {
    e.preventDefault();
    // const form = e.target;
    const data = new FormData(e.target);
    //reqres registered sample user
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });
    const loginInfo = {
      username: data.get("username"),
      password: data.get("password"),
      // username: form[0].value,
      // password: form[1].value
    };

    axios
      .post("http://localhost:4000/api/user/login", loginInfo)
      .then((response) => {
        //get token from response
        if(response.data.login)
        {
          const token = response.data.token;
          const username = response.data.username;
          const id = response.data.userId;
          auth.login(token, username, id);

          //redirect user to home page
          window.location.href = '/Home';
        }
        else
        {
          console.log(response.data.message)
          const loginIncorrect = <div> YOU must login correctly! </div> //add something like this in
        }
      })
      .catch((err) => console.log(err));
  }
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={(event) => handleSubmit(event)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/Register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default LoginPage;

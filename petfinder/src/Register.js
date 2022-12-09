import React, { useContext } from "react";
import axios from "axios";
// import { setAuthToken } from "../context/setAuthToken";
// import { AuthContext } from "../context/auth-context";
import { AuthContext } from "./context/auth-context";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AssignmentIcon from '@mui/icons-material/Assignment';
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import {AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from "moment";

function Register() {
  const auth = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
//   const [dateLost, setDate] = useState(moment());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(moment());
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (newValue) => {
    setDateOfBirth(newValue);
  };

  // let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)

  async function handleSubmit(e) {
    e.preventDefault();
    
    const data = {
        name,
        username,
        password,
        email,
        dateOfBirth
    };
    if(data.name == "" || data.username == "" || data.password == "" || confirmPassword == "" || data.email == "" || data.dateOfBirth == "")
    {
      console.log("gotta enter info") //add css here
    }
    else if(confirmPassword != password)
    {
      console.log("Password's need to match") //add css
    }
    else
    {
      try {
        let res = await fetch("http://localhost:4000/api/user/register", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          //   "x-access-token": auth.token,
          },
        });
        let resJson = await res.json();
        if (res.status === 200) {
          console.log("Successful Register");
          window.location.href = '/Login';
          //handleClose();
          //window.location.reload(true);
        } else {
          console.log("Fail");
        }
      } catch (err) {
        console.log(err);
      }
    };
  }

//     axios
//       .post("http://localhost:4000/api/user/register", loginInfo)
//       .then((response) => {
//         //get token from response
//         const token = response.data.token;
//         const username = response.data.username;
//         const id = response.data.userId;
//         auth.login(token, username, id);

//         //redirect user to home page
//       })
//       .catch((err) => console.log(err));
//   }    
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
              <AssignmentIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
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
                    id="name"
                    label="name"
                    name="name"
                    autoComplete="First & Last Name"
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="email"
                name="email"
                autoComplete="Your Email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <LocalizationProvider dateAdapter={AdapterMoment}>
              <MobileDatePicker
              label="Date Of Birth"
              value={dateOfBirth}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
             />
             </LocalizationProvider>
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Date:"
                    value={DOB}
                    onChange={(e) => {
                    setDOB(e);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider> */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                autoComplete="Enter Username"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confimPassword"
                label="confimPassword"
                type="password"
                id="confimPassword"
                autoComplete="Re-enter Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />


              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/Login" variant="body2">
                    {"Already have an account? Log in!"}
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



export default Register;

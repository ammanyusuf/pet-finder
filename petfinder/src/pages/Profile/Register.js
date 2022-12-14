import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth-context";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment, { invalid } from "moment";

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

  const [invalidName, setInvalidName] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidDateofBirth, setInvaliDateofBirth] = useState(false);
  const [invalidUserName, setInvalidUserName] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const validate = (data) => {
    let validated = true;

    if (data.name.lengh >= 20 || data.name.length === 0) {
      setInvalidName(true);
      validated = false;
      console.log("invalid name");
    } else {
      setInvalidName(false);
    }

    if (data.username.length >= 20 || data.username.length === 0) {
      setInvalidUserName(true);
      validated = false;
      console.log("invalid username");
    } else {
      setInvalidUserName(false);
    }

    if (data.password.length === 0) {
      setInvalidPassword(true);
      setPasswordErrorMsg("Password length must be greater than 0");
      validated = false;
      console.log("invalid password");
    } else if (data.password !== data.confirmPassword) {
      setInvalidPassword(true);
      setPasswordErrorMsg("Password's need to match");
      validated = false;
      console.log("passwords need to match");
    } else {
      setInvalidPassword(false);
      setPasswordErrorMsg("");
    }

    const re = /.+\@.+\..+/;
    if (data.email.length === 0 || !re.test(data.email)) {
      setInvalidEmail(true);
      validated = false;
      console.log("invalid email");
    } else {
      setInvalidEmail(false);
    }

    const dateInput = new Date(data.dateOfBirth);
    const now = new Date();
    if (
      dateInput > now ||
      data.dateOfBirth === "" ||
      data.dateOfBirth === "Invalid date"
    ) {
      setInvaliDateofBirth(true);
      validated = false;
      console.log("invalid date lolololol");
    } else {
      setInvaliDateofBirth(false);
    }

    return validated;
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      name,
      username,
      password,
      email,
      dateOfBirth,
      confirmPassword,
    };
    if (!validate(data)) {
      console.log("wrong buddy");
    } else {
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

        if (resJson.validReg) {
          console.log("Successful Register");
          window.location.href = "/Login";
          //handleClose();
          //window.location.reload(true);
          //auth.login(token, username, id);
        } else {
          console.log("Fail");
          setInvalidUserName(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  const theme = createTheme({
    palette: {
      primary: {
        main: "#306BAC",
      },
      secondary: {
        main: "#306BAC",
      },
    },
  });
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
            backgroundImage: "url(https://source.unsplash.com/random/?pets)",
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
              <AssignmentIcon />
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
                error={invalidName}
                helperText={invalidName && "Name is required (Max Char 20)"}
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="First & Last Name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                margin="normal"
                error={invalidEmail}
                helperText={invalidEmail && "Email is required"}
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="Your Email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <LocalizationProvider dateAdapter={AdapterMoment} margin="normal">
                <MobileDatePicker
                  margin="normal"
                  label="Date Of Birth"
                  value={dateOfBirth}
                  onChange={handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={invalidDateofBirth}
                      helperText={invalidDateofBirth && "Invalid date of birth"}
                    />
                  )}
                />
              </LocalizationProvider>
              <TextField
                margin="normal"
                error={invalidUserName}
                helperText={
                  invalidUserName && "Username is required (Max Char 20)"
                }
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="Enter Username"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                error={invalidPassword}
                helperText={invalidPassword && passwordErrorMsg}
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
                error={invalidPassword}
                helperText={invalidPassword && passwordErrorMsg}
                required
                fullWidth
                name="confimPassword"
                label="Confirm Password"
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
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Register;

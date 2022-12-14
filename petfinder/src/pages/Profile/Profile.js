import React, { useContext } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import { Badge } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
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

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from "moment";
import "../../App.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Profile = () => {
  const [profile, setProfile] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [image, setSelectedImages] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [open, setOpen] = React.useState(false);
  const [openPic, setOpenPic] = React.useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const auth = useContext(AuthContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenPicture = () => {
    setOpenPic(true);
  };

  const handleClose = () => {
    setPassword("");
    setConfirmPassword("");
    setOldPassword("");
    setOpen(false);
    setInvalidPassword(false);
    setInvalidPasswordMsg("");
  };

  const handleClosePic = () => {
    setSelectedImages("");
    setOpenPic(false);
  };

  const handleChange = (newValue) => {
    setDateOfBirth(newValue);
  };

  const handleSubmitPicture = async (e) => {
    e.preventDefault();
    let data = new FormData();

    data.append("image", image);
    console.log(data.get(image));
    try {
      let res = await fetch("http://localhost:4000/api/user/addPicture", {
        method: "PATCH",
        body: data,
        headers: {
          // "Content-Type": "application/json",
          "x-access-token": auth.token,
        },
      });
      let resJson = await res.json();
      if (res.status === 200) {
        console.log("Success");
        setOpenSnackBar(true);
        handleClose();
        setTimeout(() => {
          window.location.reload(false);
        }, 500);
      } else {
        console.log("Fail");
      }
    } catch (err) {
      console.log(err);
    }
  };
  //}

  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidPasswordMsg, setInvalidPasswordMsg] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setInvalidPassword(true);
      setInvalidPasswordMsg("Passwords must patch");
    } else if (password.length === 0) {
      setInvalidPassword(true);
      setInvalidPasswordMsg("Password must be greater than 0");
    } else {
      const data = {
        password,
      };
      setInvalidPassword(false);
      setInvalidPasswordMsg("");
      console.log("what is going on");
      try {
        let res = await fetch("http://localhost:4000/api/user", {
          method: "PATCH",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": auth.token,
          },
        });
        let resJson = await res.json();
        if (res.status === 200) {
          console.log("Success");
          setOpenSnackBar(true);
          handleClose();
          setTimeout(() => {
            window.location.reload(false);
          }, 500);
        } else {
          console.log("Fail");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      username,
      email,
      dateOfBirth,
    };
    if (
      data.name == "" ||
      data.username == "" ||
      data.email == "" ||
      data.dateOfBirth == ""
    ) {
      console.log("info not updated"); //add alert or red box on text fields
    } else {
      try {
        let res = await fetch("http://localhost:4000/api/user/", {
          method: "PATCH",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": auth.token,
          },
        });
        let resJson = await res.json();
        if (res.status === 200) {
          setOpenSnackBar(true);
          console.log("Success");
        } else {
          console.log("Fail");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    async function fetchProfile() {
      fetch("http://localhost:4000/api/user/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": auth.token,
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            console.log(result);
            setProfile(result);
            setName(result.name);
            setEmail(result.email);
            setUsername(result.username);
            setDateOfBirth(result.dateOfBirth);
          },
          (error) => {
            console.log(error);
          }
        );
    }
    fetchProfile();
  }, []);

  // };
  const changePicture = () => {
    return (
      <Dialog open={openPic} onClose={handleClosePic}>
        <DialogTitle>Add a Profile Picture</DialogTitle>
        <DialogContent>
          <DialogContentText>Add Profile Picture</DialogContentText>
          <input
            type="file"
            name="imagefileinput"
            accept="image/*"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setSelectedImages(event.target.files[0]);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePic}>Cancel</Button>
          <Button onClick={handleSubmitPicture}>Add Picture</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const changePassword = () => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <br></br>
          <TextField
            label="New Password"
            error={invalidPassword}
            helperText={invalidPassword && invalidPasswordMsg}
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
          <br></br>
          <TextField
            type="password"
            label="Confirm New Password"
            error={invalidPassword}
            helperText={invalidPassword && invalidPasswordMsg}
            value={confirmPassword}
            placeholder="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePasswordChange}>Change Password</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const badgeStyle = {
    "& .MuiBadge-badge": {
      color: "yellow",
      backgroundColor: "primary",
      // right: `${position}px`,
      width: 50,
      height: 50,
      borderRadius: "50%",
    },
  };

  return (
    <React.Fragment>
      {changePicture()}
      {changePassword()}
      {!profile && <div className="loader"></div>}
      {/* <div>Profile! :)</div> */}
      {profile && (
        <Grid container spacing={2}>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            {/* <Item>xs=4</Item> */}
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                {profile.username}
              </Typography>
              <IconButton
                color="primary"
                sx={{ p: "10px" }}
                aria-label="control-point"
                onClick={handleClickOpenPicture}
              >
                <Badge
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  // BadgeContent='+'
                  badgeContent={"+"}
                  // backgroundColor='secondary'
                  // variant="dot"
                  color="primary"
                  overlap="circular"
                  sx={badgeStyle}
                >
                  <Avatar
                    src={profile.picture}
                    sx={{
                      width: 200,
                      height: 200,
                      m: 1,
                      bgcolor: "secondary.main",
                    }}
                  ></Avatar>
                  {/* <ControlPointIcon /> */}
                </Badge>
              </IconButton>
              <Box
                component="form"
                noValidate
                onSubmit={(event) => handleSubmit(event)}
                sx={{ mt: 1 }}
              >
                <Button
                  onClick={handleClickOpen}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Change Password
                </Button>
                <TextField
                  value={name}
                  InputLabelProps={{ shrink: true }}
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
                  value={email}
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
                    disabled={true}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <TextField
                  value={username}
                  margin="normal"
                  required
                  fullWidth
                  disabled={true}
                  id="username"
                  label="username"
                  name="username"
                  autoComplete="Enter Username"
                  autoFocus
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Update Profile
                </Button>

                {/* <Copyright sx={{ mt: 5 }} /> */}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      )}

      {openSnackBar && (
        <Snackbar
          open={openSnackBar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackBar((prevCheck) => !prevCheck)}
        >
          <Alert
            onClose={() => setOpenSnackBar((prevCheck) => !prevCheck)}
            severity="success"
          >
            Success!
          </Alert>
        </Snackbar>
      )}
    </React.Fragment>
  );
};

export default Profile;

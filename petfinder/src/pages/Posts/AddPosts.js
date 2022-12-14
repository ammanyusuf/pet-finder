import React, { useState, useEffect, useContext } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment from "moment";

import { AuthContext } from "../../context/auth-context";

import "../../App.css";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { FormHelperText, Grid } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const AddPosts = () => {
  const auth = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mdateLost, setDate] = useState(null);
  const [location, setLocation] = useState("");
  const [pet, chosenPet] = useState("");

  const [pets, setPets] = useState([]);
  const [open, setOpen] = React.useState(false);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [invalidForm, setInvalidForm] = useState(false);
  const [invalidTitle, setInvalidTitle] = useState(false);
  const [invalidDescription, setInvalidDescription] = useState(false);
  const [invalidPet, setInvalidPet] = useState(false);
  const [invalidDateLost, setInvalidDateLost] = useState(false);
  const [invalidLocation, setInvalidLocation] = useState(false);

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(true);

  const validate = (data) => {
    let validated = true;
    if (data.title.length >= 100 || data.title.length === 0) {
      setInvalidTitle(true);
      validated = false;
      console.log("invlaid title");
    } else {
      setInvalidTitle(false);
    }

    if (data.description >= 4000 || data.description.length === 0) {
      setInvalidDescription(true);
      validated = false;
      console.log("invalid description");
    } else {
      setInvalidDescription(false);
    }

    if (data.pet === "" || data.pet === "Select a Pet") {
      setInvalidPet(true);
      validated = false;
      console.log("invalid pet");
    } else {
      setInvalidPet(false);
    }

    const dateInput = new Date(data.dateLost);
    const now = new Date();
    if (
      dateInput > now ||
      data.dateLost === "" ||
      data.dateLost === "Invalid date"
    ) {
      setInvalidDateLost(true);
      validated = false;
      console.log("invalid date lolololol");
    } else {
      setInvalidDateLost(false);
    }

    if (data.location === "") {
      setInvalidLocation(true);
      validated = false;
      console.log("invalid location");
    } else {
      setInvalidLocation(false);
    }

    return validated;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setInvalidTitle(false);
    setDescription("");
    setInvalidDescription(false);
    setDate("");
    setInvalidDateLost(false);
    setLocation("");
    setInvalidLocation(false);
    chosenPet("Select a Pet");
    setInvalidPet(false);
  };

  const handleChange = (newValue) => {
    setDate(newValue);
  };

  async function getUserPets() {
    await fetch("http://localhost:4000/api/user/myPets", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": auth.token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setPets(result.pets);
          //if (result.pets.length > 0) {
          //  chosenPet(result.pets[0]._id);
          //}
          chosenPet("Select a Pet");
        },
        (error) => {
          console.log(error);
        }
      );
  }

  useEffect(() => {
    getUserPets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(mdateLost);
    const dateLost = moment(mdateLost).format();
    console.log(dateLost);
    console.log(typeof dateLost);
    const data = {
      title,
      description,
      pet,
      dateLost,
      location,
      resolved: false,
    };
    console.log(validate(data));
    if (validate(data)) {
      try {
        let res = await fetch("http://localhost:4000/api/posts", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": auth.token,
          },
        });
        let resJson = await res.json();
        if (res.status === 200) {
          handleClose();
          setOpenSnackBar(true);
          setTimeout(() => window.location.reload(false), 500);
          console.log("Success");
        } else {
          console.log("Fail");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("What are you doing!"); //add the react components to turn boxes red
    }
  };

  const checkIfPets = () => {
    if (pets.length > 0) {
      return (
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{
            "& .MuiDialog-paper": { width: "80%", maxHeight: 435 },
          }}
        >
          <DialogTitle>Create Lost Pet Post</DialogTitle>
          <DialogContent sx={{ paddingTop: 0 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  error={invalidTitle}
                  helperText={invalidTitle && "Title required (Max Char 100)"}
                  type="text"
                  value={title}
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <MobileDateTimePicker
                  label="Date/time pet was lost"
                  toolbarTitle="Date/time pet was lost"
                  value={mdateLost}
                  onChange={handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={invalidDateLost}
                      helperText={
                        invalidDateLost &&
                        "Date lost required (Before current time)"
                      }
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  error={invalidDescription}
                  helperText={
                    invalidDescription && "Description required (Max Char 4000)"
                  }
                  type="text"
                  value={description}
                  placeholder="Description"
                  multiline
                  maxRows={4}
                  rows={3}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  error={invalidLocation}
                  helperText={invalidLocation && "Location required"}
                  type="text"
                  value={location}
                  placeholder="Location"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <Select
                  fullWidth
                  error={invalidPet}
                  value={pet}
                  placeholder="Select a Pet"
                  onChange={(e) => {
                    chosenPet(e.target.value);
                  }}
                >
                  <MenuItem value="Select a Pet">
                    <div style={{ opacity: 0.42 }}>-- Select a pet --</div>
                  </MenuItem>
                  {pets.map((pet) => (
                    <MenuItem key={pet._id} value={pet._id}>
                      {pet.name}
                    </MenuItem>
                  ))}
                </Select>
                {invalidPet && (
                  <FormHelperText error>Please select a pet</FormHelperText>
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Create Post</Button>
          </DialogActions>
        </Dialog>
      );
    } else {
      return (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>No pets found</DialogTitle>
          <DialogContent>
            <DialogContentText>
              No pets were found on your account. Please create a pet first.
            </DialogContentText>
            <Link to="/PetFeed">Go to Pet Page</Link>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      );
    }
  };

  return (
    <React.Fragment>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <div id="create-post-button-container">
          <Button
            variant="outlined"
            onClick={handleClickOpen}
            sx={{
              color: "green",
              fontWeight: "bold",
              backgroundColor: "lightgreen",
            }}
          >
            Create a new post
          </Button>
          {checkIfPets()}
        </div>
      </LocalizationProvider>
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
            Added post! Page will refresh shortly.
          </Alert>
        </Snackbar>
      )}
    </React.Fragment>
  );
};

export default AddPosts;

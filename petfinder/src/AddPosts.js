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

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment from "moment";

import { AuthContext } from "./context/auth-context";

export const AddPosts = () => {
  const auth = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mdateLost, setDate] = useState(null);
  const [location, setLocation] = useState("");
  const [pet, chosenPet] = useState("");

  const [pets, setPets] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setDescription("");
    setDate(moment());
    setLocation("");
    chosenPet("");
  };

  const handleChange = (newValue) => {
    setDate(newValue);
  };

  async function getUserPets() {
    // console.log("Getting pets");
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
          // console.log("Set pets");
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
        console.log("Success");
        handleClose();
        window.location.reload(false);
      } else {
        console.log("Fail");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkIfPets = () => {
    if (pets.length > 0) {
      return (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create post</DialogTitle>
          <DialogContent>
            <TextField
              type="text"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              type="text"
              value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <Select value={pet} onChange={(e) => chosenPet(e.target.value)}>
              <MenuItem value="⬇️ Select a Pet ⬇️">-- Select a Pet --</MenuItem>
              {pets.map((pet) => (
                <MenuItem key={pet._id} value={pet._id}>
                  {pet.name}
                </MenuItem>
              ))}
            </Select>
            <DateTimePicker
              label="Date and Time picker"
              value={mdateLost}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
            <TextField
              type="text"
              value={location}
              placeholder="location"
              onChange={(e) => setLocation(e.target.value)}
            />
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
            <Link to="/PetFeed">Goto Pet Page</Link>
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
        <Button variant="outlined" onClick={handleClickOpen}>
          Create a new post
        </Button>
        {checkIfPets()}
      </LocalizationProvider>
    </React.Fragment>
  );
};

export default AddPosts;

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

const Search = () => {
  const auth = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateLost, setDate] = useState(moment());
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
    console.log("Getting pets");
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
          console.log("Set pets");
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
    const data = {
      title,
      description,
      pet,
      dateLost,
      location,
      resolved: false
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
        window.location.reload(true);
      } else {
        console.log("Fail");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const search = () => {
    return (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Filter Posts</DialogTitle>
          <DialogContent>
            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Filter</Button>
          </DialogActions>
        </Dialog>
    )
    };

  return (
    <React.Fragment>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Button variant="outlined" onClick={handleClickOpen}>
          Search
        </Button>
        {search()}
      </LocalizationProvider>
    </React.Fragment>
  );
};

export default Search;

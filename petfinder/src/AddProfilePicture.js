import React, { useState, useEffect, useContext } from "react";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { WithContext as ReactTags } from "react-tag-input";
import { AuthContext } from "./context/auth-context";



export const AddProfilePicture = () => {
  const auth = useContext(AuthContext);
  const [photo, setSelectedImages] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImages('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData();

    data.append("image", images);
    //const data = {name, breed, animal, tags, image}
    console.log(data.get(images));
    // if(data.get(images) == null)
    // {
    //   console;e.log("No")
    // }
    // else
    // {
      try {
        let res = await fetch("http://localhost:4000/api/user/addProfilePicture", {
          method: "PATCH",
          body: data,
          headers: {
            // 'Content-Type': 'appli/form-data',
            "x-access-token": auth.token,
          },
        });
        let resJson = await res.json();
        if (res.status === 200) {
          handleClose();
          window.location.reload(true);
          console.log("Success");
        } else {
          console.log("Fail");
        }
      } catch (err) {
        console.log(err);
      }
    };
  

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add a pet
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a Profile Picture</DialogTitle>
        <DialogContent>
          
          {/* {images.map((image) => (
            <div key={image}>
              <img
                alt="not found"
                width={"250px"}
                src={URL.createObjectURL(image)}
              />
              <br />
            </div>
          ))} */}
          
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Picture</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddProfilePicture;
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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert"
import { FormHelperText, Grid } from "@mui/material";
import { WithContext as ReactTags } from "react-tag-input";
import { AuthContext } from "../../context/auth-context";

import "./reactTags.css"

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

let animalsTop50 = [
  "Dog",
  "Cat",
  "Rabbit",
  "Lizard",
  "Fish",
  "Horse",
  "Hamster",
  "Chicken",
  "Ferret",
  "Parrot",
  "Monkey",
];

export const AddPet = () => {
  const auth = useContext(AuthContext);
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [animal, setAnimal] = useState("");
  const [tags, setTags] = useState([]);
  const [images, setSelectedImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);


  const [invalidName, setInvalidName] = useState(false);
  const [invalidBreed, setInvalidBreed] = useState(false);
  const [invalidAnimal, setInvalidAnimal] = useState(false);
  const [invalidImages, setInvalidImages] = useState(false);

  const validate = data => {
    /*
    name
    breed
    animal
    images
    */
    let validated = true;
    if (data.get("name").length >= 20 || data.get("name").length === 0) {
      setInvalidName(true);
      validated = false;
      console.log('invalid name of pet');
    } else {
      setInvalidName(false);
    }

    if (data.get("breed").length >= 20 || data.get("breed").length === 0) {
      setInvalidBreed(true);
      validated = false;
      console.log('invalid breed name');
    } else {
      setInvalidBreed(false);
    }

    if (data.get("animal") === "" || data.get("animal") === "Select a Animal") {
      setInvalidAnimal(true);
      validated = false;
      console.log('invalid animal');
    } else {
      setInvalidAnimal(false);
    }

    if (data.get("image") === null) {
      setInvalidImages(true);
      validated = false;
      console.log('invalid image');
    } else {
      setInvalidImages(false);
    }

    return validated;
  }


  const handleClickOpen = () => {
    setOpen(true);

    setAnimal("Select a Animal");
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setBreed("");
    setAnimal("");
    setTags([]);
    setSelectedImages([]);

    setInvalidAnimal(false);
    setInvalidBreed(false);
    setInvalidImages(false);
    setInvalidName(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData();
    let tagName = [];

    for (let i = 0; i < tags.length; i++) {
      tagName.push(tags[i].text);
    }

    data.append("name", name);
    data.append("breed", breed);
    data.append("animal", animal);
    data.append("tags", tagName);
    for (let i = 0; i < images.length; i++) {
      data.append("image", images[i]);
    }
    console.log(data.get("image"))
    if(!validate(data))
    {
      console.log("What are you doing!") //add the react components to turn boxes red
    }
    else
    {
      try {
        let res = await fetch("http://localhost:4000/api/user/addPet", {
          method: "POST",
          body: data,
          headers: {
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
    };
  }

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
    console.log(tag.text);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  return (
    <React.Fragment>
      <div id="create-post-button-container">
        <Button variant="outlined" onClick={handleClickOpen}
        sx={{
          color: "green",
          fontWeight: "bold",
          backgroundColor: "lightgreen",
        }}
        >
          Add a pet
        </Button>
      </div>
      <Dialog
        open={open} 
        encType="multipart/form-data" 
        onClose={handleClose}
        sx={{
          '& .MuiDialog-paper': { width: '80%', maxHeight: 435 },
        }}
      >
        <DialogTitle>Add a Pet!</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} alignItems="start" justifyContent={"center"}>
            <Grid item xs={6} container spacing={2} direction="column">
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  error={invalidName}
                  helperText={invalidName && "Name required (Max Char 20)"}
                  type="text"
                  value={name}
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  error={invalidBreed}
                  helperText={invalidBreed && "Breed required (Max Char 20)"}
                  type="text"
                  value={breed}
                  placeholder="Breed"
                  onChange={(e) => setBreed(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Select 
                  fullWidth
                  error={invalidAnimal}
                  value={animal} 
                  onChange={(e) => setAnimal(e.target.value)}
                >
                  <MenuItem value="Select a Animal">
                    <div style={{opacity: 0.42}}> 
                      -- Select a Animal --{" "}
                    </div>
                  </MenuItem>
                  {animalsTop50.map((animal) => (
                    <MenuItem key={animal} value={animal}>
                      {animal}
                    </MenuItem>
                  ))}
                </Select>
                {invalidAnimal && <FormHelperText error>Please select an animal</FormHelperText>}
              </Grid>
            </Grid>
            <Grid item xs={6} container spacing={2} direction="column">
              <Grid item xs={12}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}>
                  {images.map((image, index) => (
                  <div key={index}>
                      <img
                        alt="not found"
                        width={"250px"}
                        src={URL.createObjectURL(image)}
                      />
                      <br />
                    </div>
                  ))}
                  <input
                    style={{
                      width: "32%",
                    }}
                    type="file"
                    name="imagefileinput"
                    accept="image/*"
                    onChange={(event) => {
                      setSelectedImages((images) => [...images, event.target.files[0]]);
                    }}
                  />
                  {invalidImages && <FormHelperText error>Please add atleast one image</FormHelperText>}
                  <DialogContentText>Add images of your pet!</DialogContentText>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div style={{
                  display: "flex",
                  justifyContent: "center"
                }}>
                  <ReactTags
                    tags={tags}
                    delimiters={delimiters}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    handleTagClick={handleTagClick}
                    inputFieldPosition="bottom"
                    autocomplete
                    style={{
                      color: "red",
                    }}
                    classNames={{
                      tags: 'ReactTags__tags',
                      tagInput: 'ReactTags__tagInput',
                      tagInputField: 'ReactTags__tagInputField',
                      selected: 'ReactTags__selected',
                      tag: 'tagClass',
                      remove: 'ReactTags__remove',
                      suggestions: 'ReactTags__suggestions',
                      activeSuggestion: 'ReactTags__activeSuggestion',
                      editTagInput: 'ReactTags__editInput',
                      editTagInputField: 'ReactTags__editTagInput',
                      clearAll: 'ReactTags__clearAll',
                    }}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Pet</Button>
        </DialogActions>
      </Dialog>
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
            Added pet! Page will refresh shortly. 
          </Alert>
        </Snackbar>
      )}
    </React.Fragment>
  );
};

export default AddPet;

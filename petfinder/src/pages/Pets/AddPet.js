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
import { AuthContext } from "../../context/auth-context";

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setBreed("");
    setAnimal("");
    setTags([]);
    setSelectedImages([]);
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

    if(name == "" || breed == "" || animal == "")
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
          window.location.reload(false);
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
      <Dialog open={open} encType="multipart/form-data" onClose={handleClose}>
        <DialogTitle>Add a pet</DialogTitle>
        <DialogContent>
          <TextField
            type="text"
            value={name}
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            type="text"
            value={breed}
            placeholder="breed"
            onChange={(e) => setBreed(e.target.value)}
          />
          <Select value={animal} onChange={(e) => setAnimal(e.target.value)}>
            <MenuItem value="⬇️ Select a Animal ⬇️">
              -- Select a Animal --{" "}
            </MenuItem>
            {animalsTop50.map((animal) => (
              <MenuItem key={animal} value={animal}>
                {animal}
              </MenuItem>
            ))}
          </Select>
          <ReactTags
            tags={tags}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            handleTagClick={handleTagClick}
            inputFieldPosition="bottom"
            autocomplete
          />
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
          <DialogContentText>Add images of your pet!</DialogContentText>
          <input
            type="file"
            name="imagefileinput"
            accept="image/*"
            onChange={(event) => {
              setSelectedImages((images) => [...images, event.target.files[0]]);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Pet</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddPet;

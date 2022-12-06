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
    data.append("image", images);
    //const data = {name, breed, animal, tags, image}
    console.log(data.get(images));
    try {
      let res = await fetch("http://localhost:4000/api/user/addPet", {
        method: "POST",
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
      <Button variant="outlined" onClick={handleClickOpen}>
        Add a pet
      </Button>
      <Dialog open={open} onClose={handleClose}>
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
          {images.map((image) => (
            <div key={image}>
              <img
                alt="not found"
                width={"250px"}
                src={URL.createObjectURL(image)}
              />
              <br />
            </div>
          ))}
          {/* {images && (
            <div>
              <img
                alt="not found"
                width={"250px"}
                src={URL.createObjectURL(images)}
              />
              <br />
              <Button onClick={() => setSelectedImages(null)}>
                Remove all
              </Button>
            </div>
          )} */}
          <DialogContentText>Add images of your pet!</DialogContentText>
          <input
            type="file"
            name="imagefileinput"
            accept="image/*"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setSelectedImages((images) => [...images, event.target.files[0]]);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Pet</Button>
        </DialogActions>
      </Dialog>
      {/* <form onSubmit={handleSubmit} enctype="multipart/form-data">
        <input
          type="text"
          value={name}
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={breed}
          placeholder="breed"
          onChange={(e) => setBreed(e.target.value)}
        />
        <select onChange={(e) => setAnimal(e.target.value)}>
          <option value="⬇️ Select a Animal ⬇️"> -- Select a Animal -- </option>
          {animalsTop50.map((animal) => (
            <option value={animal}>{animal}</option>
          ))}
        </select>
        <ReactTags
          tags={tags}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          inputFieldPosition="bottom"
          autocomplete
        /> */}
      {/* Source for uploading images: https://stackoverflow.com/questions/1085801/get-selected-value-in-dropdown-list-using-javascript */}
      {/* <div>
          <h1>Upload An Image of Your Doge :)</h1>
          {image && (
            <div>
              <img
                alt="not found"
                width={"250px"}
                src={URL.createObjectURL(image)}
              />
              <br />
              <button onClick={() => setSelectedImage(null)}>Remove</button>
            </div>
          )}
          <br />
          <br />
          <input
            type="file"
            name="myImage"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setSelectedImage(event.target.files[0]);
            }}
          />
        </div>
        <br />
        <br />

        <button type="submit">Create</button>
      </form> */}
    </React.Fragment>
  );
};

export default AddPet;

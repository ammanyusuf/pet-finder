import React, { useState, useEffect, useContext } from "react";
import { Button, Paper, TextField } from "@mui/material";
import { Controller, Input, useForm } from "react-hook-form";
import { joinPaths } from "@remix-run/router";
import axios from "axios";
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
  const [image, setSelectedImage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData();
    let tagName = [];

    // for(let i in tags)
    // {
    //     tagName.push(tags[i].text)
    //     console.log(tags[i].text)

    // }

    for (let i = 0; i < tags.length; i++) {
      tagName.push(tags[i].text);
    }

    data.append("name", name);
    data.append("breed", breed);
    data.append("animal", animal);
    data.append("tags", tagName);
    data.append("image", image);
    //const data = {name, breed, animal, tags, image}
    console.log(data.get(image));
    try {
      let res = await fetch("http://localhost:4000/api/user/addPet", {
        method: "POST",
        // body:  JSON.stringify(data),
        body: data,
        headers: {
          // 'Content-Type': 'appli/form-data',
          "x-access-token": auth.token,
        },
      });
      let resJson = await res.json();
      if (res.status === 200) {
        // setName("");
        // setEmail("");
        // setMessage("User created successfully");
        console.log("Success");
      } else {
        // setMessage("Some error occured");
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
      {
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
          <input
            type="text"
            value={name}
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
          {/* <input
    type="text"
    value={animal}
    placeholder="animal"
    onChange={(e) => setAnimal(e.target.value)}
    /> */}
          <input
            type="text"
            value={breed}
            placeholder="breed"
            onChange={(e) => setBreed(e.target.value)}
          />

          <select onChange={(e) => setAnimal(e.target.value)}>
            <option value="⬇️ Select a Animal ⬇️">
              {" "}
              -- Select a Animal --{" "}
            </option>
            {animalsTop50.map((animal) => (
              <option value={animal}>{animal}</option>
            ))}
            {/* {Array.from(arrayFill).map((i) => <option value={i.name}>{i.name}</option>)} */}
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
          />
          {/* Source for uploading images: https://stackoverflow.com/questions/1085801/get-selected-value-in-dropdown-list-using-javascript */}
          <div>
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
        </form>
      }
    </React.Fragment>
  );
};

export default AddPet;

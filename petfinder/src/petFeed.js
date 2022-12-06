import React, { useState, useEffect, useContext } from "react";
import { Button, Paper, TextField } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Typography from "@mui/material/Typography";
import { PostCard } from "./PostCard";
import { PetCard } from "./PetCard";
import { Link } from "react-router-dom";
import AddPet from "./AddPet";

import { AuthContext } from "./context/auth-context";

export const PetFeed = () => {
  const auth = useContext(AuthContext);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    async function fetchPets() {
      fetch("http://localhost:4000/api/user/myPets", {
        method: "GET",
        headers: {
          "x-access-token": auth.token,
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            let myPets = result.pets;
            setPets(myPets);
          },
          (error) => {
            console.log(error);
          }
        );
    }
    fetchPets();
  }, [auth.token]);

  return (
    <React.Fragment>
      {/* <Link to="/AddPet">
        <Button
          onClick={handleSubmit}
          color="primary"
          sx={{ p: "10px" }}
          aria-label="control-point"
        >
          <Typography variant="body2" color="text.primary">
            Add Pet
          </Typography>
        </Button>
      </Link> */}
      <AddPet />
      {pets.map((pet) => (
        <div key={pet._id}>
          <PetCard {...pet} />
        </div>
      ))}
    </React.Fragment>
  );
};

function handleSubmit() {
  console.log("we will do this");
}

export default PetFeed;

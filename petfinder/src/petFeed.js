import React, {useState, useEffect} from 'react'
import {Button, Paper, TextField} from "@mui/material";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Typography from '@mui/material/Typography';
import { PostCard } from "./PostCard"
import { PetCard } from "./PetCard"
import {Link} from 'react-router-dom'


export const PetFeed = () =>{
    const [pets, setPets] = useState([]);

    useEffect(() => {
      async function fetchPets() {
       fetch("http://localhost:4000/api/user/myPets", {
        method: "GET",
        headers: {
            'x-access-token': localStorage.getItem("token")
        }})
      .then(res => res.json())
      .then(
        (result) => {
        let myPetter = result.pets
        //   nonResolved = nonResolved.filter(x => x.resolved === false)
        //let recentPosts = Array.from(myPetter)
        //   recentPosts.sort ( function (a, b){
        //     return Date.parse(b.dateLost)-Date.parse(a.dateLost);
        //   });
        //console.log(myPetter)          
        setPets(myPetter);
        console.log(myPetter);
        console.log(result)
        },
        (error) => {
            console.log(error);
          }
        )
        }
        fetchPets();
      }, []);

      return (
        
         <React.Fragment>
        <Link to="/AddPet">
        <Button onClick={handleSubmit} color="primary" sx={{ p: '10px' }} aria-label="control-point">
        <Typography variant="body2" color="text.primary">
          Add Pet
        </Typography>
        </Button>
        </Link>
        {pets && pets.map((pet) =>
         <div key={pet._id}>
             <PetCard {...pet} />
         </div>
         )}
         </React.Fragment>
      )

}

function handleSubmit() {
  console.log("we will do this")
}


export default PetFeed
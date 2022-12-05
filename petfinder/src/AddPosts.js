import React, {useState, useEffect} from 'react'
import { Button, Paper, TextField} from "@mui/material";
import { Controller, Input, useForm} from "react-hook-form";
import { joinPaths } from "@remix-run/router";
import axios from 'axios';
// import { get } from 'http';

let getThePets = 0;
let petsMongo = '';
let arrayFill = [{name: "Hello"}, {name: "Hello2"}]


const defaultValues = {
    textValue: "",
    checkboxValue: [],
};

export const FormInputText = ({ name, control, label }) => {
    return (
        <Controller control={control} name={name}
            render={({ 
                field: { onChange, value } 
                }) => (
                    <TextField onChange={onChange} value={value || ""} label={label} />
                )}
        />
    );
};

const getUserPets = async() => {
    // const [pets, setPet] = useState([]);
    
    console.log("here")
        //Api call get feed
       await fetch("http://localhost:4000/api/user/myPets", {method: 'GET', headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem("token")
    }})
      .then(res => res.json())
      .then(
        (result) => {
          
        //   nonResolved = nonResolved.filter(x => !!x.resolved)
        getThePets = 1
        
        petsMongo = result;
        console.log(petsMongo);
        return result;
         
        },
        (error) => {
            console.log(error);
          }
        )
}

export const AddPosts = () => {
    //const [textValue, setTextValue] = useState("");
    // const { handleSubmit, reset, control } = useForm();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dateLost, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [pets, setPets] = useState([]);
    const [pet, chosenPet] = useState('');
    // setPets([])

    // let petsMongo = "";
    // if(getThePets == 0)
    // {
    //     getUserPets().then( () => {
    //         setPets(petsMongo);
    //         console.log(petsMongo.pets[0].name)
    //         getThePets = 1
            
    //     })
        
    //     // console.log(petsMongo);
        
    // }

    useEffect(() => {
        
        getUserPets().then( () => {
            setPets(petsMongo);
            console.log(petsMongo.pets[0].name)
            
        })
                      
    }, [])





    

    // fetch("http://localhost:4000/api/user/myPets")
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
          
    //     //   nonResolved = nonResolved.filter(x => !!x.resolved)
          
    //       setPet(result);
    //     },
    //     (error) => {
    //         console.log(error);
    //       }
    //     )
    //   console.log(pets)
    //const [pet, setPet] = useState('');
    //const [error, setError] = useState(null)
    //console.log(pet)

    let handleSubmit = async (e) => {
        e.preventDefault();
        const data = {title, description, pet, dateLost,location}
        console.log(data)
        try {
          let res = await fetch("http://localhost:4000/api/posts", {
            method: "POST",
            body:  JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem("token")
            }
            
          });
          let resJson = await res.json();
          if (res.status === 200) {
            // setName("");
            // setEmail("");
            // setMessage("User created successfully");
            console.log('Success');
          } else {
            // setMessage("Some error occured");
            console.log('Fail');
          }
        } catch (err) {
          console.log(err);
        }
      };

    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'x-access-token': 'application/json' },
    //     body: JSON.stringify({ title: 'React POST Request Example' })
    // };
    // const onSubmit = async (e) => {
    //     e.preventDefault()
    //     // e.preventDefault();
    //     //console.log(data);
    //     console.log(title)
    //     // const title = data.title
    //     // const description = data.description
    //     // const pet = data.pet
    //     // const dateLost = data.dateLost
    //     // const location = data.location
    //     // const postData = {title, description, pet, dateLost, location}
    //     // console.log(postData)
    //     fetch('http://localhost:4000/api/posts', {
    //         method: 'POST',
    //         body: JSON.stringify({title: "Hello"}),
    //         headers: {
    //             'x-access-token': localStorage.getItem("token")
    //         }
    //     }).then(response => response.json())

    //     // const json = await response.json()
    //     // console.log(json)
    // }

    return (
        // const {title, description, pet, resolved, dateLost, Location} = req.body
        // <form>
        //     <FormInputText name={"title"} control={control} label={"Title"} onChange={(e) => setTitle(e.target.value)}/>
        //     <FormInputText name={"description"} control={control} label={"Description"}/>
        //     <FormInputText name={"pet"} control={control} label={"pet"}/>
        //     <FormInputText name={"dateLost"} control={control} label={"dateLost"}/>
        //     <FormInputText name={"location"} control={control} label={"Location"}  />
        //     <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
        //     <Button onClick={() => reset()} variant={"outlined"}>Reset</Button>
        // </form>

        <React.Fragment>

        {petsMongo && <form onSubmit={handleSubmit}>
        <input
        type="text"
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        />
        <input
        type="text"
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        />
        {/* <input type="select" onChange={this.onDropdownSelected} label="Multiple Select" multiple>
            {this.createSelectItems()}
        </input> */}
        

        <select onChange={(e) => chosenPet(e.target.value)}>
        <option value="⬇️ Select a Pet ⬇️"> -- Select a Pet -- </option>
        {Array.from(petsMongo.pets).map((pet) => <option value={pet._id}>{pet.name}</option>)}
        {/* {Array.from(arrayFill).map((i) => <option value={i.name}>{i.name}</option>)} */}
        </select>
    
        {/* type="text"
        value={pet}
        placeholder="pet"
        onChange={(e) => setPet(e.target.value)} */}
        
        <input
        type="text"
        value={dateLost}
        placeholder="dateLost"
        onChange={(e) => setDate(e.target.value)}
        />
        <input
        type="text"
        value={location}
        placeholder="location"
        onChange={(e) => setLocation(e.target.value)}
        />

        <button type="submit">Create</button>


        </form>}
        </React.Fragment>
    );
}





export default AddPosts

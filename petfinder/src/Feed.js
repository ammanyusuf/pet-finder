import React, { lazy, useState, useEffect, useContext } from "react";
// import PostCard from "./pages/Posts/PostCard";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import "./App.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Grid } from "@mui/material";

const PostCard = lazy(() => import("./pages/Posts/PostCard"));
const Feed = () => {
  const [posts, setPosts] = useState();
  const [sort, setSort] = useState('Date Lost');
  // const [temp, setTemp] = useState([]);
  // let index = 0;

  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [name, setName] = useState("");
  const [tags, setTags] = useState("")
  const [author, setAuthorName] = useState("")


  const handleFilter = async (e) => {
    e.preventDefault();
    const data = {
      animal : animal,
      breed : breed,
      name: name,
      tags: tags
      //author: author
    };
    try {
      let res = await fetch("http://localhost:4000/api/posts/search", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        }}).then((res) => res.json())
        .then(
          (result) => {
            console.log(result)
            let nonResolved = Array.from(result);
            console.log(nonResolved);
            // let nonResolved = Array.from(result);
            // nonResolved = nonResolved.filter((x) => x.resolved === false);
            let recentPosts = Array.from(nonResolved);
            recentPosts.sort(function (a, b) {
               console.log(Date.parse(b.dateLost) - Date.parse(a.dateLost));
            });
           setPosts(recentPosts);
          })
        }
        
    catch{
        console.log("error retrieving from db")
  
      }
    }
  

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
 
  useEffect(() => {
    async function fetchPosts() {
      fetch("http://localhost:4000/api/posts")
        .then((res) => res.json())
        .then(
          (result) => {
            let nonResolved = Array.from(result);
            nonResolved = nonResolved.filter((x) => x.resolved === false);
            let recentPosts = Array.from(nonResolved);
            recentPosts.sort(function (a, b) {
              return Date.parse(b.dateLost) - Date.parse(a.dateLost);
            });
            setPosts(recentPosts);
          },
          (error) => {
            console.log(error);
          }
        );
    }
    fetchPosts();
  }, []);

  const clear = async (e) => {
    e.preventDefault();
    setAnimal("")
    setBreed("")
    setName("")
    setTags("")
    try {
      fetch("http://localhost:4000/api/posts")
        .then((res) => res.json())
        .then(
          (result) => {
            let nonResolved = Array.from(result);
            nonResolved = nonResolved.filter((x) => x.resolved === false);
            let recentPosts = Array.from(nonResolved);
            recentPosts.sort(function (a, b) {
              return Date.parse(b.dateLost) - Date.parse(a.dateLost);
            });
            setPosts(recentPosts);
          },
          (error) => {
            console.log(error);
          }
        );
      }
      catch 
      {

      }
    }
  const sortBy = (event) =>{
    if(event.target.value === sort){
      return
    }
    else{
      let tempPosts = Array.from(posts);
      if(event.target.value === "Post Created At"){
        tempPosts.sort(function (a, b) {
          return Date.parse(b.createdAt) - Date.parse(a.createdAt);
        });
      }
      else if(event.target.value === "Date Lost"){
        tempPosts.sort(function (a, b) {
          return Date.parse(b.dateLost) - Date.parse(a.dateLost);
        });
      }
      setSort(event.target.value);
      setPosts(tempPosts);
      // setTemp(tempPosts);
    }
  }

  // useEffect(() => {
  //   // Load the first 5 items
  //   loadItems(5);

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);


  // const handleScroll = () => {
  //   console.log("HI");
  //   console.log(window.innerHeight + document.documentElement.scrollTop);
  //   console.log(document.documentElement.offsetHeight);
  //   if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight) return;
  //   loadItems(5);
  // }

  // const loadItems = async (numberOfItems) => {
  //   fetch("http://localhost:4000/api/posts")
  //   .then((res) => res.json())
  //   .then(
  //     (result) => {
  //       // let nonResolved = Array.from(result);
  //       // nonResolved = nonResolved.filter((x) => x.resolved === false);
  //       // let recentPosts = Array.from(nonResolved);
  //       // recentPosts.sort(function (a, b) {
  //       //   return Date.parse(b.dateLost) - Date.parse(a.dateLost);
  //       // });
  //       setPosts(true);
  //       let test = result.slice(index, numberOfItems);
  //       index +=numberOfItems;
  //       setTemp(prevTemp => [...prevTemp, ...test]);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  return (
    <React.Fragment>
      {/* <TextField
              type="text"
              value={author}
              placeholder="User name"
              onChange={(e) => setAuthorName(e.target.value)}
            /> */}
     {!posts &&  <div className="loader"></div>}
     {posts &&  
      <React.Fragment>
        <div>
          <Grid className="filterGroup" container>
            <Grid item xs={12} >
              <Grid container spacing={2} justifyContent={'center'}>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    type="text"
                    value={name}
                    placeholder="Pet Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    type="text"
                    value={breed}
                    placeholder="Breed"
                    onChange={(e) => setBreed(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Select 
                    value={animal} 
                    onChange={(e) => setAnimal(e.target.value)}
                    fullWidth
                  >
                    <MenuItem value="Select an Animal">
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
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    type="tags"
                    value={tags}
                    placeholder="Tags"
                    onChange={(e) => setTags(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3} >
                  <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sort}
                    label="Age"
                    onChange={(e) => sortBy(e)}
                  >
                    <MenuItem value={'Date Lost' }>Date Lost</MenuItem>
                    <MenuItem value={'Post Created At'}>Post Create</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={4} container>
                  <Button onClick={handleFilter}>Filter</Button>
                  <Button onClick={clear}>Clear</Button>
                </Grid>
                <Grid item xs={2}></Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
      }
      {posts &&
      posts.map((post) => (
        <div key={post._id}>
          <PostCard {...post} />
        </div>
      ))}
    </React.Fragment>
  );
};




export default Feed;

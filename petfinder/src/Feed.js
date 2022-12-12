import React, { lazy, useState, useEffect } from "react";
// import PostCard from "./pages/Posts/PostCard";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import "./App.css";

const PostCard = lazy(() => import("./pages/Posts/PostCard"));

const Feed = () => {
  const [posts, setPosts] = useState();
  const [sort, setSort] = useState('Date Lost');
  // const [temp, setTemp] = useState([]);
  // let index = 0;
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
     {!posts &&  <div class="loader"></div>}
     {posts &&  
      <React.Fragment>
      <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={sort}
        label="Age"
        onChange={(e) => sortBy(e)}
      >
        <MenuItem value={'Date Lost'}>Date Lost</MenuItem>
        <MenuItem value={'Post Created At'}>Post Created</MenuItem>
      </Select>
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

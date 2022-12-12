import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { SinglePostCard } from "./SinglePostCard";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';


import "../../App.css";


const ViewPost = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [post, setPost] = useState();
  function parsePostLink(href) {
    let x = href.indexOf("?");
    let query = x >= 0 ? href.substring(x + 4) : null;
    return query;
  }

  useEffect(() => {
    async function fetchPost() {
      if (id === "") {
        let id2 = parsePostLink(window.location.href);
        if (id2 === null) {
          return;
        }
        setId(id2);
        //Api call get feed
        await fetch(
          `http://localhost:4000/api/posts/${encodeURIComponent(id2)}`
        )
          .then((res) => res.json())
          .then(
            (result) => {
              setId(id2);
              setPost(result);
            },
            (error) => {
              console.log(error);
            }
          );
      }
    }
    fetchPost();
  }, []);

  return (
    <React.Fragment>
      {!post &&  <div className="loader"></div>}
      {post && 
      <React.Fragment>
      <IconButton className="backButton" sx={{color:"#306BAC", marginLeft: "30%", marginTop:"10px", border: "4px solid #306BAC", borderRadius: 10}} size="large" onClick={() => navigate(-1)}>
        <ArrowBackIcon fontSize="inherit"/>
      </IconButton>
      <SinglePostCard {...post} />
      </React.Fragment>
      }
    </React.Fragment>
  );
};
export default ViewPost;

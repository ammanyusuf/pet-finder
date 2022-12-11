import React, { useState, useEffect } from "react";
import { PostCard } from "./PostCard";
import { SinglePostCard } from "./SinglePostCard";
import "../../App.css";


const ViewPost = () => {
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
      {!post &&  <div class="loader"></div>}
      {post && <SinglePostCard {...post} />}
    </React.Fragment>
  );
};
export default ViewPost;

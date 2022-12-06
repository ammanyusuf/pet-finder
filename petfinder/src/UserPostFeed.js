import React, { useState, useEffect, useContext } from "react";

import { PostCard } from "./PostCard";
import AddPosts from "./AddPosts";
import { AuthContext } from "./context/auth-context";

const UserPostFeed = () => {
  const auth = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      fetch("http://localhost:4000/api/user/myPosts", {
        method: "GET",
        headers: {
          "x-access-token": auth.token,
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setPosts(result);
          },
          (error) => {
            console.log(error);
          }
        );
    }
    fetchPosts();
  }, []);

  return (
    <React.Fragment>
      <AddPosts />
      {posts.map((post) => (
        <div key={post._id}>
          <PostCard {...post} />
        </div>
      ))}
    </React.Fragment>
  );
};

export default UserPostFeed;

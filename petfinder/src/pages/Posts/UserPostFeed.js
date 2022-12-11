import React, { useState, useEffect, useContext } from "react";

import { PostCard } from "./PostCard";
import AddPosts from "./AddPosts";
import { AuthContext } from "../../context/auth-context";

const UserPostFeed = () => {
  const auth = useContext(AuthContext);
  const [posts, setPosts] = useState();

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
            let recentPosts = Array.from(result);
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

  return (
    <React.Fragment>
      {!posts &&  <div class="loader"></div>}
      {posts &&
      <React.Fragment>
        <AddPosts />
        {posts.map((post) => (
          <div key={post._id}>
            <PostCard {...post} />
          </div>
        ))}
      </React.Fragment>
      }
    </React.Fragment>
  );
};

export default UserPostFeed;

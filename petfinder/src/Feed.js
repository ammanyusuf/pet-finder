import React, {useState, useEffect} from 'react'

import { PostCard } from "./PostCard"
import moment from 'moment'

const Feed = () =>{
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
      async function fetchPosts() {
       fetch("http://localhost:4000/api/posts")
      .then(res => res.json())
      .then(
        (result) => {
          let nonResolved = Array.from(result)
          nonResolved = nonResolved.filter(x => x.resolved === false)
          let recentPosts = Array.from(nonResolved)
          recentPosts.sort ( function (a, b){
            return Date.parse(b.dateLost)-Date.parse(a.dateLost);
          });          
          setPosts(recentPosts);
          console.log(recentPosts);
        },
        (error) => {
            console.log(error);
          }
        )
        }
        fetchPosts();
      }, []);

      return (
        <React.Fragment>
        {posts.map((post) =>
        <div key={post._id}>
            <PostCard {...post} />
        </div>
        )}
        </React.Fragment>
      )

}

export default Feed;
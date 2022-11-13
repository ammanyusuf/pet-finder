import React, {useState, useEffect} from 'react'

import { PostCard } from "./PostCard"

export const Feed = () =>{
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        //Api call get feed
       fetch("http://localhost:4000/api/posts")
      .then(res => res.json())
      .then(
        (result) => {
          let nonResolved = Array.from(result)
        //   nonResolved = nonResolved.filter(x => !!x.resolved)
          nonResolved = nonResolved.filter(x => x.resolved === false)
          console.log(nonResolved)
          setPosts(nonResolved);
        },
        (error) => {
            console.log(error);
          }
        )
      }, []);

      return (
        <React.Fragment>
        {posts.map((post) =>
        <div key={post.dateLost}>
            <PostCard {...post} />
        </div>
        )}
        </React.Fragment>
      )

}
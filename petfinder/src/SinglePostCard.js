import React, { useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { ViewComment } from "./ViewComment";
import { AuthContext } from "./context/auth-context";

import PostComment from "./PostComment";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SinglePostCard = (props) => {
  const auth = useContext(AuthContext);
  const [index, setIndex] = useState(0);
  const [resolvedText, setResolvedText] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  useEffect(() => {
    if (props.resolved) {
      setResolvedText("Post has been resolved!");
    } else {
      setResolvedText("Post has not been resolved");
    }
  }, []);

  const sortTime = (time) => {
    time.sort(function (a, b) {
      return Date.parse(b.createdAt) - Date.parse(a.createdAt);
    });
  };

  const adjustIndexRight = () => {
    if (index == props.photos.length - 1) {
      setIndex(0);
    } else {
      setIndex((index) => index + 1);
    }
  };
  const adjustIndexLeft = () => {
    if (index == 0) {
      setIndex(props.photos.length - 1);
    } else {
      setIndex((index) => index - 1);
    }
  };

  const checkIfCanResolve = () => {
    if (
      auth.userId === props.author._id &&
      resolvedText == "Post has not been resolved"
    ) {
      return true;
    }
    return false;
  };

  const handleClick = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    const data = {
      resolved: true,
    };
    try {
      const res = await fetch(`http://localhost:4000/api/posts/${props._id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "x-access-token": auth.token,
        },
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setOpenSnackBar(true);
        setResolvedText("Post has been resolved");
        console.log("Success");
      } else {
        console.log("Fail");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <Card variant="outlined" style={{ border: "1px solid black" }}>
        <CardHeader
          avatar={<Avatar src={props.author.picture}></Avatar>}
          title={`${props.title}   -  ${resolvedText}`}
          subheader={`Author: ${props.author.username}`}
        />
        <CardMedia
          component="img"
          height="200"
          image={props.photos[index]}
          alt="Missing"
          sx={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography variant="body2" color="text.primary">
            Description: {props.description}
          </Typography>
        </CardContent>
        {checkIfCanResolve() && (
          <Button
            size="small"
            variant="contained"
            color="primary"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={handleClick}
          >
            Resolve post
          </Button>
        )}
        <CardActions>
          <IconButton
            edge="start"
            aria-label="delete"
            onClick={adjustIndexLeft}
          >
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={adjustIndexRight}>
            <NavigateNextIcon />
          </IconButton>
        </CardActions>
      </Card>
      <PostComment post_id={props._id} />
      {sortTime(props.comments)}
      {props.comments.map((comment) => (
        <div key={comment._id}>
          <ViewComment {...comment} post_id={props._id} />
        </div>
      ))}
      {openSnackBar && (
        <Snackbar
          open={openSnackBar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackBar((prevCheck) => !prevCheck)}
        >
          <Alert
            onClose={() => setOpenSnackBar((prevCheck) => !prevCheck)}
            severity="success"
          >
            Resolved Post
          </Alert>
        </Snackbar>
      )}
    </React.Fragment>
  );
};

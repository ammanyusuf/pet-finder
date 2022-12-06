import React, { useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { ViewComment } from "./ViewComment";
import PostComment from "./PostComment";

export const SinglePostCard = (props) => {
  const [index, setIndex] = useState(0);

  const sortTime = (time) => {
    time.sort(function (a, b) {
      return Date.parse(b.dateLost) - Date.parse(a.dateLost);
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

  return (
    <React.Fragment>
      <Card variant="outlined" style={{ border: "1px solid black" }}>
        <CardHeader
          avatar={<Avatar src={props.author.picture}></Avatar>}
          title={props.title}
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
    </React.Fragment>
  );
};

import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import moment from "moment";
import "./App.css";

export const PostCard = (props) => {
  const calcTimeFromNow = (time) => {
    let timeFromNow = moment(time, "YYYYMMDD").fromNow();
    return timeFromNow;
  };
  return (
    <Card
      variant="outlined"
      className="postCard"
    >
      
      <CardActionArea href={`\ViewPost?id=${props._id}`}>
        <CardHeader
          avatar={<Avatar className ="profilePic" src={props.author.picture}></Avatar>}
          // title={props.title + " - " + calcTimeFromNow(props.createdAt) }
          // title = {"Posted - " + calcTimeFromNow(props.createdAt)}
          title ={<Typography variant="body2" color="text.primary" className="postTitle">
            {props.title}
          </Typography>}
          subheader={`Author: ${props.author.username} - ${calcTimeFromNow(props.createdAt)}`}
          
        />
        
        <CardMedia
          component="img"
          height="200"
          image={props.photos[0]}
          alt="Missing"
          sx={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography variant="body2" color="text.primary" className="descriptionLabel">
            Description
          </Typography>
          <Typography variant="body2" color="text.primary" className="description">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

  );
};

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

export const PostCard = (props) => {
  const calcTimeFromNow = (time) => {
    let timeFromNow = moment(time, "YYYYMMDD").fromNow();
    return timeFromNow;
  };
  return (
    <Card
      variant="outlined"
      style={{ maxWidth: "90%", border: "1px solid black" }}
    >
      <CardActionArea href={`\ViewPost?id=${props._id}`}>
        <CardHeader
          avatar={<Avatar src={props.author.picture}></Avatar>}
          title={props.title + " - " + calcTimeFromNow(props.createdAt)}
          subheader={`Author: ${props.author.username}`}
        />
        <CardMedia
          component="img"
          height="200"
          image={props.photos[0]}
          alt="Missing"
          sx={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography variant="body2" color="text.primary">
            Description: {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

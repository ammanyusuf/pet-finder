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
import { ViewComment } from "../Comments/ViewComment";
import PostComment from "../Comments/PostComment";

export const ProfileCard = (props) => {
//   const [index, setIndex] = useState(0);

  return (
    <React.Fragment>
      <Card variant="outlined" style={{ border: "1px solid black" }}>
        <CardHeader
          avatar={<Avatar src={props.picture}></Avatar>}
          title={props.username}
        //   subheader={`Author: ${props.author.username}`}
        />
        {/* <CardMedia
          component="img"
          height="200"
          image={props.photos[index]}
          alt="Missing"
          sx={{ objectFit: "contain" }}
        /> */}
        <CardContent>
          
          <Typography variant="body2" color="text.primary">
            Hash Password: {props.password}
          </Typography>
        </CardContent>
        <CardActions>
          {/* <IconButton
            edge="start"
            aria-label="delete"
            // onClick={adjustIndexLeft}
          >
            <NavigateBeforeIcon />
          </IconButton> */}
          {/* <IconButton edge="end" aria-label="delete" onClick={adjustIndexRight}>
            <NavigateNextIcon />
          </IconButton> */}
        </CardActions>
      </Card>
      
    </React.Fragment>
  );
};

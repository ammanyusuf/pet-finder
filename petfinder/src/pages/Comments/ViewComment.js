import React, { useState, useEffect, useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthContext } from "../../context/auth-context";
import '../../App.css'

import moment from "moment";

export const ViewComment = (props) => {
  const auth = useContext(AuthContext);
  const [upvotes, setUpvotes] = useState(props.upvotes);
  const [cantVote, setVote] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [showComment, setShowComment] = useState(true);

  const calcTimeFromNow = (time) => {
    let temp = moment(time).format();
    let timeFromNow = moment(temp).fromNow();
    return timeFromNow;
  };

  useEffect(() => {
    if (auth.isLoggedIn && auth.userId === props.author._id) {
      setCanDelete(true);
    }
  }, [auth.isLoggedIn]);

  const deleteComment = async () => {
    let res = await fetch(
      `http://localhost:4000/api/posts/${encodeURIComponent(
        props.post_id
      )}/${encodeURIComponent(props._id)}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": auth.token,
        },
      }
    );

    if (res.ok) {
      setShowComment(false);
    } else {
      console.log(res);
    }
  };
  const upVote = async () => {
    let res = await fetch(
      `http://localhost:4000/api/posts/${encodeURIComponent(
        props.post_id
      )}/${encodeURIComponent(props._id)}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          upvote: true,
        }),
        headers: {
          "Content-Type": "application/json",
          "x-access-token": auth.token,
        },
      }
    );

    if (res.ok) {
      setUpvotes((upvotes) => upvotes + 1);
      setVote(true);
    } else {
      console.log(res);
    }
  };
  const downVote = async () => {
    let res = await fetch(
      `http://localhost:4000/api/posts/${encodeURIComponent(
        props.post_id
      )}/${encodeURIComponent(props._id)}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          upvote: false,
        }),
        headers: {
          "Content-Type": "application/json",
          "x-access-token": auth.token,
        },
      }
    );

    if (res.ok) {
      setUpvotes((upvotes) => upvotes - 1);
      setVote(true);
    } else {
      console.log(res);
    }
  };

  return (
    <React.Fragment>
      {showComment && (
        <List
          sx={{ 
            width: "100%", 
            maxWidth: "95%",
            bgcolor: "background.paper",
            marginBottom: "2vh",
            marginLeft: "2vh",
            borderRadius: "10px",
          }}
        >
          <ListItem
            alignItems="flex-start"
            secondaryAction={
              <React.Fragment>
                <Typography
                  edge="end"
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {upvotes}
                </Typography>
                {auth.isLoggedIn && (
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={upVote}
                    disabled={cantVote}
                  >
                    <ThumbUpIcon />
                  </IconButton>
                )}
                {auth.isLoggedIn && (
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={downVote}
                    disabled={cantVote}
                  >
                    <ThumbDownIcon />
                  </IconButton>
                )}
                {auth.isLoggedIn && canDelete && (
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={deleteComment}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </React.Fragment>
            }
          >
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={props.author.picture} />
            </ListItemAvatar>
            <ListItemText
             sx={{ maxWidth: '55%' }}
              primary={
                props.author.username + " - " + calcTimeFromNow(props.createdAt)
              }
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {props.body}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      )}
    </React.Fragment>
  );
};

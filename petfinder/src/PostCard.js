import React, { useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { AuthContext } from "./context/auth-context";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const PostCard = (props) => {
  const auth = useContext(AuthContext);
  const [resolved, setResolved] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const calcTimeFromNow = (time) => {
    let temp = moment(time).format();
    let timeFromNow = moment(temp).fromNow();
    return timeFromNow;
  };

  const checkIfCanResolve = () => {
    if (auth.userId === props.author._id && !props.resolved) {
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
        setResolved(true);
        setOpenSnackBar(true);
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
      {!resolved && (
        <Card
          variant="outlined"
          style={{ maxWidth: "90%", border: "1px solid black" }}
        >
          <CardActionArea href={`\ViewPost?id=${props._id}`}>
            <CardHeader
              avatar={<Avatar src={props.author.picture}></Avatar>}
              title={
                props.title +
                " -- " +
                calcTimeFromNow(props.dateLost) +
                "--" +
                ` Resolved: ${props.resolved}`
              }
              subheader={`Author: ${props.author.username}`}
            />
            <CardMedia
              component="img"
              height="200"
              image={props.photos[0]}
              alt="Missing"
              sx={{ objectFit: "contain" }}
            />
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
            <CardContent>
              <Typography variant="body2" color="text.primary">
                Description: {props.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
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

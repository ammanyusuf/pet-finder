import React, { useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import { AuthContext } from "../../context/auth-context";
import MuiAlert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import moment from "moment";
import "../../App.css";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PostCard = (props) => {
  const auth = useContext(AuthContext);
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
      await res.json();
      if (res.status === 200) {
        setOpenSnackBar(true);
        setTimeout(() => {
          window.location.reload(false);
        }, 500);
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
      <Card variant="outlined" className="postCard">
        <CardActionArea href={`\ViewPost?id=${props._id}`}>
          <CardHeader
            avatar={
              <Avatar
                className="profilePic"
                src={props.author.picture}
              ></Avatar>
            }
            title={
              <>
                <Typography
                  variant="body2"
                  color="text.primary"
                  className="postTitle"
                >
                  {props.title.length < 50 && props.title}
                  {props.title.length >= 50 &&
                    props.title.substring(0, 50) + "..."}
                </Typography>
                {props.resolved && (
                  <Typography
                    variant="body2"
                    color="text.primary"
                    className="postResolved"
                    sx={{
                      color: "green",
                    }}
                  >
                    Pet found :D
                  </Typography>
                )}
                {!props.resolved && (
                  <Typography
                    variant="body2"
                    color="text.primary"
                    className="postResolved"
                    sx={{
                      color: "red",
                    }}
                  >
                    Pet still lost :\
                  </Typography>
                )}
              </>
            }
            subheader={`Author: ${
              props.author.username
            } - Date Lost: ${calcTimeFromNow(
              props.dateLost
            )}  Created At: ${calcTimeFromNow(props.createdAt)}`}
          />
          <CardMedia
            component="img"
            height="200"
            image={props.photos[0]}
            alt="Missing"
            sx={{ objectFit: "contain" }}
          />
          {checkIfCanResolve() && (
            <div id="view-post-button-container">
              <Button
                size="small"
                variant="contained"
                color="primary"
                onMouseDown={(event) => event.stopPropagation()}
                onClick={handleClick}
                sx={{
                  marginTop: 2,
                }}
              >
                Resolve post
              </Button>
            </div>
          )}
          <CardContent>
            <Typography
              variant="body2"
              color="text.primary"
              className="petDescription"
            >
              Animal: {props.pet.animal}
            </Typography>
            <Typography
              variant="body2"
              color="text.primary"
              className="petDescription"
            >
              Breed: {props.pet.breed}
            </Typography>
            <Paper
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                listStyle: "none",
                backgroundColor: "transparent",
                boxShadow: "none",
                p: 0.5,
                m: 0,
              }}
              component="ul"
            >
              <ListItem>
                {props.pet.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    sx={{ margin: 0.1 }}
                    color="primary"
                  />
                ))}
              </ListItem>
            </Paper>
            <Typography
              variant="body2"
              color="text.primary"
              className="descriptionLabel"
            >
              Description
            </Typography>
            <Typography variant="body2" className="description">
              {props.description.length < 315 && props.description}
              {props.description.length >= 315 &&
                props.description.substring(0, 315) +
                  "... (click to read more)"}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
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
            Resolved Post! Will reload page shortly.
          </Alert>
        </Snackbar>
      )}
    </React.Fragment>
  );
};

export default PostCard;

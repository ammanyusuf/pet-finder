import React, { useState, useEffect, useContext } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { AuthContext } from "../../context/auth-context";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PostComment({ post_id }) {
  const auth = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("error");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);


  const onChange = (e) => setComment(e.target.value);
  const handleSubmit = async () => {
    if (!auth.isLoggedIn) {
      return;
    }
    if (comment.replace(/\s/g, "").length === 0) {
      // comment is only white space
      setError(true);
      setErrorMessage("Please put a comment to submit");
      console.log("its empty");
      return;
    } else if (comment === "Comment...") {
      // comment is the default value
      setError(true);
      setErrorMessage("Please put a comment to submit");
      return;
    }
    setError(false);
    setErrorMessage("");

    console.log(comment.trim());

    // post the comment
    let res = await fetch(
      `http://localhost:4000/api/posts/${encodeURIComponent(post_id)}`,
      {
        method: "POST",
        body: JSON.stringify({
          body: comment,
          upvotes: 0,
        }),
        headers: {
          "Content-Type": "application/json",
          "x-access-token": auth.token,
        },
      }
    );
    if (res.ok) {
      setComment("");
      setOpenSnackBar(true);
      setTimeout(() => {window.location.reload(false)}, 500);
    } else {
      setError(true);
      setErrorMessage("Something went wrong...");
    }
  };

  return (

    <React.Fragment>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </Alert>
      )}
      {auth.isLoggedIn && (
        <Paper
          component="form"
          sx={{
            marginBottom: "2vh",
            marginLeft: "2vh",
            display: "flex",
            alignItems: "center",
            borderRadius: "10px",
            maxWidth: "95%",
          }}
        >
          <InputBase
            onChange={onChange}
            value={comment}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Comment..."
            multiline
            inputProps={{ "aria-label": "Comment" }}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            onClick={handleSubmit}
            color="primary"
            sx={{ p: "10px" }}
            aria-label="control-point"
          >
            <ControlPointIcon />
          </IconButton>
        </Paper>
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
            Added post! Page will refresh shortly. 
          </Alert>
        </Snackbar>
      )}
    </React.Fragment>
  );
}

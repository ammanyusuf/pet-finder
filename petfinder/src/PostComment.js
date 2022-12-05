import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Backdrop } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Stack } from '@mui/system';

export default function PostComment({post_id}) {

  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("error");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (e) => setComment(e.target.value);
  const handleSubmit = async  () => {
    if (comment.replace(/\s/g, '').length === 0) {
      // comment is only white space
      setError(true);
      setErrorMessage('Please put a comment to submit');
      console.log('its empty');
      return;
    } else if (comment === 'Comment...') {
      // comment is the default value
      setError(true);
      setErrorMessage('Please put a comment to submit');
      return;
    }
    setError(false);
    setErrorMessage('');

    console.log(comment.trim());

    let id = "636c51503e5815eb60ce7914";

    // post the comment
    let res = await fetch(`http://localhost:4000/api/posts/${encodeURIComponent(post_id)}`, {
      method: "POST",
      body:  JSON.stringify({
        "body": comment,
        "upvotes": 0
      }),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem("token")
      }
    });
    console.log(res);
    if (res.ok) {
      setComment('');
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false)
      }, 3000);
    } else {
      setError(true);
      setErrorMessage('Something went wrong...');
    }

  };

  return (
    <React.Fragment>
      {error && 
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </Alert>
      }
      {success && 
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Comment added!
        </Alert>
      }
      <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
          <InputBase
              onChange={onChange}
              value={comment}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Comment..."
              inputProps={{ 'aria-label': 'Comment' }}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton onClick={handleSubmit} color="primary" sx={{ p: '10px' }} aria-label="control-point">
              <ControlPointIcon />
          </IconButton>
      </Paper>
    </React.Fragment>
  );
}
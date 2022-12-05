import React, {useState, useEffect} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import moment from 'moment'


export const ViewComment = (props) =>{
    const [upvotes, setUpvotes] = useState(props.upvotes);
    const [cantVote, setVote] = useState(false);
    const calcTimeFromNow = (time) =>{ 
        let timeFromNow = moment(time, "YYYYMMDD").fromNow();
        return timeFromNow;
    }
    const upVote = async () =>{
            let res = await fetch(`http://localhost:4000/api/posts/${encodeURIComponent(props.post_id)}/${encodeURIComponent(props._id)}`, {
              method: "PATCH",
              body:  JSON.stringify({
                'upvote': true,
              }),
              headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem("token")
              }
            });
        
            if (res.ok) {
                setUpvotes(upvotes => upvotes + 1);
                setVote(true);
                console.log(upvotes);
            } else {
                console.log(res);
            }
    }
    const downVote = async () =>{
        let res = await fetch(`http://localhost:4000/api/posts/${encodeURIComponent(props.post_id)}/${encodeURIComponent(props._id)}`, {
            method: "PATCH",
            body:  JSON.stringify({
              'upvote': false,
            }),
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': localStorage.getItem("token")
            }
          });
      
          if (res.ok) {
              setUpvotes(upvotes => upvotes - 1);
              setVote(true);
          } else {
              console.log(res);
          }
    }
      return (
        <React.Fragment>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem alignItems="flex-start"
        secondaryAction={
            <React.Fragment>
            <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                >
                    {upvotes}              
            </Typography>
            <IconButton edge="end" aria-label="delete" onClick={upVote} disabled={cantVote}>
              <ThumbUpIcon />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={downVote} disabled={cantVote}>
            <ThumbDownIcon />
            </IconButton>
            </React.Fragment>
          }
          >
            <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={props.author.picture} />
            </ListItemAvatar>
            <ListItemText
            primary={props.author.username+" - "+calcTimeFromNow(props.createdAt)}
            secondary={
                <React.Fragment>
                <Typography
                    sx={{ display: 'inline' }}
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
    </React.Fragment>
    )

}

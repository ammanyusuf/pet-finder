import {useState} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const PetCard = (props) =>{
  return (
    <Card variant="outlined"  style={{ border: "1px solid black" }}>
      <CardActionArea>
      <CardHeader
        // avatar={
        //   <Avatar src={props.author.picture}>
        //   </Avatar>
        // }
        title={props.name}
        subheader={`Animal: ${props.animal} Breed: ${props.breed}`}
        
      />
      <CardMedia
        component="img"
        height="200"
        image={props.photos[0]}
        alt="Missing"
      />
      <CardContent>
        <Typography variant="body2" color="text.primary">
        {props.tags.map((tag) =>
         <span>{tag}      </span>
        )}
        </Typography>
      </CardContent>
      </CardActionArea>
    </Card>
  );
}


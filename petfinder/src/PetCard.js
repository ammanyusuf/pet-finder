import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { set } from "react-hook-form";

export const PetCard = (props) => {
  const [index, setIndex] = useState(0);
  const adjustIndexRight = () => {
    if (index == props.photos.length - 1) {
      setIndex(0);
    } else {
      setIndex((index) => index + 1);
    }
  };
  const adjustIndexLeft = () => {
    if (index == 0) {
      setIndex(props.photos.length - 1);
    } else {
      setIndex((index) => index - 1);
    }
  };
  return (
    <Card variant="outlined" className = "postCard">
      <CardHeader
        // title={props.name}
        title ={<Typography variant="body2" color="text.primary" className="petName">
            {props.name}
          </Typography>}
        subheader={`Animal: ${props.animal} Breed: ${props.breed}`}
//         subheader={<Typography variant="body2" color="text.primary">
//         Animal: {props.animal}
//         Breed: {props.breed}
//       </Typography> 
// }
      />
      <CardMedia
        component="img"
        height="200"
        image={props.photos[index]}
        alt="Missing"
        sx={{ objectFit: "contain" }}
      />
      <CardContent>
        <Typography variant="body2" color="text.primary">
          {props.tags.map((tag) => (
            <span key={tag}>{tag} </span>
          ))}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton edge="start" aria-label="delete" onClick={adjustIndexLeft}>
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton edge="end" aria-label="delete" onClick={adjustIndexRight}>
          <NavigateNextIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

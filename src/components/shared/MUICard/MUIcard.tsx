import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
// the button that can be expanded
interface CardProps {
    cardcolor: string[];
    story: any
}
// used to store the colour changes of the like button

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
//code documents how expand button works

export default function MUICard(props: CardProps) {
  const [expanded, setExpanded] = React.useState(false);

    const [isClicked, setIsClicked] = React.useState(false);
  
    const handleClick = () => {
      setIsClicked(!isClicked);
    };
    // Click handling
  
    const iconStyle = {
      color: isClicked ? '#ef5350' : '#e0e0e0',
    };
    // button colour changing

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card style={{backgroundColor: String(props.cardcolor) ,border: '1px solid black'}}>
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            {props.story?.title}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt="Image Not Found"
        height="auto"
        image={props.story?.image_url}
      />
<CardContent>
        <Typography variant="body2" color="text.secondary">
            {/*Before read more text*/}
            
        Comes after Mr Johnson’s apology to nation was interrupted by four protesters in hearing room.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleClick} style={iconStyle} aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Button size="small">VIEWS: 1.7k</Button>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>More on this story:</Typography>
          <Typography paragraph>
            {/*AFTER read more text*/}
            {props.story?.content}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
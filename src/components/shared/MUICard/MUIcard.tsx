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
import { 
  createTheme,
  ThemeProvider,
  responsiveFontSizes 
} from '@mui/material/styles';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
// the button that can be expanded
interface CardProps {
    cardcolor: string[];
    story: any
}

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
  
    let theme = createTheme({
      typography: {
        fontFamily: [
          'DM Serif Display',
        ].join(','),
      },});
    theme = responsiveFontSizes(theme);
  
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

  //Isolating the first sentence of the article to insert as the preview
  function cutStringToLastWord(str: String, maxLength: number) {
    if (str.length <= maxLength) {
      // Return the original string if its length is less than or equal to the maximum length
      return str;
    }
    const lastSpaceIndex = str.lastIndexOf(' ', maxLength);
    let newString = ""
  
    if (lastSpaceIndex !== -1) {
      newString = str.slice(0, lastSpaceIndex);
    } else {
      newString = str.slice(0, maxLength);
    }
    return newString.split(/[\?\.\!]/)[0]
  }

  return (
    <ThemeProvider theme = {theme}>
      <Card style={{backgroundColor: String(props.cardcolor) ,border: '1px solid black'}}>
        <CardContent>
          <Typography variant="h6" height = "110px">
              {props.story?.title}
          </Typography>
        </CardContent>
        <img
          src={props.story?.image_url}
          alt="Image Not Found"
          style={{
            width: "100%",
            height: '225px',
            objectFit: 'fill',
          }}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary" height="95px">
              {/*Before read more text*/}
              {cutStringToLastWord(props.story?.content, 175)}
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
    </ThemeProvider>
  );
}
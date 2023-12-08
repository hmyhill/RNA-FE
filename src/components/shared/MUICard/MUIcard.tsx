import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
    cardColour: string[];
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
    const responsiveTheme = responsiveFontSizes(theme);
  
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

    // Find the index of the last sentence-ending punctuation mark before the maximum length
    const lastSentenceIndex = Math.max(
      str.lastIndexOf('.', maxLength),
      str.lastIndexOf('?', maxLength),
      str.lastIndexOf('!', maxLength)
    )

    if (lastSentenceIndex !== -1 && lastSentenceIndex < maxLength) {
      // Display all characters before the last sentence-ending punctuation mark within the maximum length
      const result = str.slice(0, lastSentenceIndex + 1);
      return result;
    }

    // If no sentence-ending punctuation mark is found or the index is beyond the maximum length, cut the string to the last full word before the maximum length
    const lastSpaceIndex = str.lastIndexOf(' ', maxLength);
    return lastSpaceIndex !== -1 ? str.slice(0, lastSpaceIndex) : str.slice(0, maxLength);
  }

  return (
    <ThemeProvider theme = {responsiveTheme}>
      <Card style={{backgroundColor: String(props.cardColour) , border: '1px solid black'}}>
        <CardContent>
          <Typography variant="h6" height = "80px" lineHeight = "1">
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
          <Typography variant="body2" color="text.secondary" height="85px">
              {/*Before read more text*/}
              {cutStringToLastWord(props.story?.content, 175)}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Typography variant="body2" pr="8px"> Views: 1.7k</Typography>
          <IconButton onClick={handleClick} style={iconStyle} aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>

          {expanded ? (
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          ) : (
            <>
              <Typography variant="body2" marginLeft="auto" textAlign="right"> Read Full Story </Typography> 
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                marginLeft="auto"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </>
          )}
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph lineHeight="1.2" m="0">
              {/*AFTER read more text*/}
              {props.story?.content}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </ThemeProvider>
  );
}
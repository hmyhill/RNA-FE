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
import { Backdrop, Box, Button, Chip, Divider, Fade, Modal } from '@mui/material';
import { 
  createTheme,
  ThemeProvider,
  responsiveFontSizes 
} from '@mui/material/styles';
import { Email, Facebook, Instagram, Twitter, WhatsApp } from '@mui/icons-material';
import { blue, green, purple, red } from '@mui/material/colors';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
// the button that can be expanded
interface CardProps {
    cardcolor: string[];
    //story: any
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

//modal style
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function MainMUICard(props: CardProps) {
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
  //Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme = {theme}>
      <Card style={{backgroundColor: String(props.cardcolor) ,border: '1px solid black'}}>
        <CardContent>
          <Typography variant="h6">
            Inside 'tinseltown' - where it's Christmas all year round
              {/*props.story?.title*/}
          </Typography>
        </CardContent>
        {/*Dividers are the little lines between, delete them if they are not working*/}
        <Divider variant="middle" />
        {/*remove this typography later its for the image so i know where it is. The typeography below*/}
        <Box display="flex" flexDirection="row">
          <Typography variant="h6">
              IMAGE GOES HERE
          </Typography>
        {/*<img
          src=
          alt="Image Not Found"
          style={{
            width: "100%",
            height: '225px',
            objectFit: 'fill',
          }}
        />
        */}
        <Divider orientation="vertical" variant="middle"/>
        
        <CardContent>
          <Typography variant="body2" color="text.secondary">
              {/*Before read more text*/}
              Festive Productions Ltd is one of the UK's biggest Christmas decoration suppliers. Sky News visited its base in Cwmbran, South Wales.
              With the Christmas season in full swing, the country is lit up by decorations and illuminations.

But there's one Welsh town where it's Christmas all year round.

Festive Productions Ltd is one of the biggest suppliers of Christmas decorations in the UK.

Sky News visited its base in Cwmbran, south Wales, which is located on a site measuring 250,000 square feet.

Its distribution office here has over 16,000 pallet spaces, and its showroom for Christmas 2024 has already opened.

No corner of the showroom is left undecorated, as baubles and bells, tinsel and trees span several rooms.

Each room is intricately decorated to fit a different theme, from candy cane colours to a winter wonderland extravaganza.
              {/*
              {cutStringToLastWord(props.story?.content, 175)}
              */}
          </Typography>
        </CardContent>
        </Box>
        <Divider variant="middle" />
        <CardActions disableSpacing>
          <IconButton onClick={handleClick} style={iconStyle} aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon onClick={handleOpen}/>
            <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Share:
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <IconButton>
                <Facebook sx={{ color: blue[500]}}/>
              </IconButton>
              <IconButton>
              <WhatsApp sx={{ color: green[500]}}/>
              </IconButton>
              <IconButton>
              <Email sx={{ color: red[500]}}/>
              </IconButton>
              <IconButton>
              <Instagram sx={{ color: purple[500]}}/>
              </IconButton>
              <IconButton>
              <Twitter sx={{ color: blue[200]}}/>
              </IconButton>
            </Typography>
            <IconButton>
                {/*Add actual URL here*/}
              URL:
              </IconButton>
          </Box>
        </Fade>
      </Modal>
          </IconButton>

            <Button size="small">VIEWS: 1.7k</Button>

            <Button size="small" sx={{ color: "#111111" }}>Click Here For Full Story</Button>

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
            STORY TWO
              {/*AFTER read more text*/}
              With the Christmas season in full swing, the country is lit up by decorations and illuminations.

But there's one Welsh town where it's Christmas all year round.

Festive Productions Ltd is one of the biggest suppliers of Christmas decorations in the UK.

Sky News visited its base in Cwmbran, south Wales, which is located on a site measuring 250,000 square feet.

Its distribution office here has over 16,000 pallet spaces, and its showroom for Christmas 2024 has already opened.

No corner of the showroom is left undecorated, as baubles and bells, tinsel and trees span several rooms.

Each room is intricately decorated to fit a different theme, from candy cane colours to a winter wonderland extravaganza.
              {/*
              {props.story?.content}
            */}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </ThemeProvider>
  );
}
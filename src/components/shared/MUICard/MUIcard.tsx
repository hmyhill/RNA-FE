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
interface CardColorProps {
    cardcolor: string[];
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

export default function MUICard(props: CardColorProps) {
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
            {/*HEADER Change this to change header*/}

        Boris Johnson Covid Inquiry – live: Ex-PM to face second day’s grilling amid anger from families

        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt="Image Not Found"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
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
          Boris Johnson is to face a second day of grilling at the covid inquiry on Thursday.
The former prime minister will return to the hearing having been booed by crowds of bereaved families on Wednesday.
During his first day of testimony, Mr Johnson’s apology to the nation was interrupted by four people who staged a protest in the hearing room.
Mr Johnson arrived three hours early on Wednesday morning to dodge the protesters waiting outside. During the day he admitted the pandemic’s impact on the NHS had “bewildered” him. He also acknowledged the government’s policy appeared “incoherent” on the timing of actions in light of the graph in March 2020 suggesting the NHS could be overwhelmed.
Mr Johnson stumbled over his words as the inquiry heard he lost 5,000 WhatsApp messages between January 2020 and June 2020.
He also implied the mad cow disease crisis in Britain made him sceptical of the threat of coronavirus as it “wasn’t nearly as fatal as people had originally believed”.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
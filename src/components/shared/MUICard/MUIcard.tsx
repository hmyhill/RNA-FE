import * as React from "react";
import {
  createTheme,
  styled,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import {
  Backdrop,
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Fade,
  IconButton,
  IconButtonProps,
  Modal,
  Typography,
} from "@mui/material";
import {
  Email,
  Facebook,
  Favorite,
  Instagram,
  Share,
  Twitter,
  WhatsApp,
} from "@mui/icons-material";
import { blue, green, purple, red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UserState } from "../../../contexts/User/UserContext";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
// the button that can be expanded
interface CardProps {
  cardColour: string[];
  story: any;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
//code documents how expand button works

//modal style
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: "10px",
};

export default function MUICard(props: CardProps) {
  const userState = UserState();

  const [expanded, setExpanded] = React.useState(false);

  const [isClicked, setIsClicked] = React.useState(false);

  let theme = createTheme({
    typography: {
      fontFamily: ["DM Serif Display"].join(","),
    },
  });
  const responsiveTheme = responsiveFontSizes(theme);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  // Click handling

  const iconStyle = {
    color: isClicked ? "#ef5350" : "#e0e0e0",
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
      str.lastIndexOf(".", maxLength),
      str.lastIndexOf("?", maxLength),
      str.lastIndexOf("!", maxLength)
    );

    if (lastSentenceIndex !== -1 && lastSentenceIndex < maxLength) {
      // Display all characters before the last sentence-ending punctuation mark within the maximum length
      const result = str.slice(0, lastSentenceIndex + 1);
      return result;
    }

    // If no sentence-ending punctuation mark is found or the index is beyond the maximum length, cut the string to the last full word before the maximum length
    const lastSpaceIndex = str.lastIndexOf(" ", maxLength);
    return lastSpaceIndex !== -1
      ? str.slice(0, lastSpaceIndex)
      : str.slice(0, maxLength);
  }

  const mailTo = () => {
    const emailSubject = "Check Out This Great Story I Found On RNA";
    const emailBody = `I Found This Article I Thought You Might Like.\n${props.story?.title}\nFind The Full Article Here: ${props.story?.link}`;

    const mailtoLink = `mailto:?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;

    // Open the default email client
    window.location.href = mailtoLink;
  };

  //Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme={responsiveTheme}>
      <Card
        style={{
          backgroundColor: String(props.cardColour),
          border: "1px solid black",
        }}
      >
        <CardContent>
          <Typography variant="h6" height="80px" lineHeight="1">
            {props.story?.title}
          </Typography>
        </CardContent>
        <img
          src={props.story?.image_url}
          alt="Image Not Found"
          style={{
            width: "100%",
            height: "225px",
            objectFit: "fill",
          }}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary" height="85px">
            {/*Before read more text*/}
            {cutStringToLastWord(props.story?.content, 175)}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Typography variant="body2" pr="8px" textAlign="center">
            {" "}
            1.7k Views
          </Typography>
          {/* The like button should only be visible to users who are not logged out*/}
          {userState.userStatus !== "loggedOut" && (
            <IconButton
              onClick={handleClick}
              style={iconStyle}
              aria-label="add to favorites"
            >
              <Favorite />
            </IconButton>
          )}
          <IconButton aria-label="share">
            <Share onClick={handleOpen} />
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
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    <Typography id="transition-modal-title" variant="h6">
                      Share Story:
                    </Typography>
                    <Typography id="transition-modal-description">
                      <IconButton disableRipple sx={{ padding: "4px" }}>
                        <Facebook sx={{ p: "0", color: blue[500] }} />
                      </IconButton>
                      <IconButton disableRipple sx={{ padding: "4px" }}>
                        <WhatsApp sx={{ p: "0", color: green[500] }} />
                      </IconButton>
                      <IconButton disableRipple sx={{ padding: "4px" }}>
                        <Instagram sx={{ p: "0", color: purple[500] }} />
                      </IconButton>
                      <IconButton disableRipple sx={{ padding: "4px" }}>
                        <Twitter sx={{ p: "0", color: blue[300] }} />
                      </IconButton>
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography variant="h6">Send Via Email:</Typography>
                    <IconButton onClick={mailTo}>
                      <Email sx={{ color: red[500] }} />
                    </IconButton>
                  </Box>
                </Box>
              </Fade>
            </Modal>
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
              <Typography variant="body2" marginLeft="auto" textAlign="right">
                {" "}
                Read Full Story{" "}
              </Typography>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                sx={{ marginLeft: 0 }}
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

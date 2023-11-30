import {
  Button,
  Card,
  CardActions,
  Fade,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import Navbar from "../../components/shared/Navbar/Navbar";
import React from "react";
import SaveIcon from "@mui/icons-material/Save";

const Upload = () => {
  //Declare textbox and dropdown states
  const [categoryChoice, setCategoryChoice] = React.useState<string>(
    localStorage.getItem("rnaUploadCategory") ?? "world"
  );
  const [headline, setHeadline] = React.useState<string>(
    localStorage.getItem("rnaUploadHeadline") ?? ""
  );
  const [story, setStory] = React.useState<string>(
    localStorage.getItem("rnaUploadStory") ?? ""
  );
  const [imageURL, setImageURL] = React.useState<string>(
    localStorage.getItem("rnaUploadImageURL") ?? ""
  );

  //Declare control states
  const [badDetails, setBadDetails] = React.useState<{
    problem: boolean;
    description: string;
  }>({
    problem: false,
    description: "",
  });

  const [showAutosave, setShowAutosave] = React.useState<boolean>(false);

  //Function to execute on the upload button being pressed
  const handleUpload = () => {};

  //Function to execute when a user deletes their current story
  const handleDelete = () => {
    setCategoryChoice("world");
    setStory("");
    setHeadline("");
    setImageURL("");
    localStorage.removeItem("rnaUploadStory");
    localStorage.removeItem("rnaUploadHeadline");
    localStorage.removeItem("rnaUploadImageURL");
  };

  //Function to fade the autosave text and icon in then out
  const fadeAutosave = () => {
    setShowAutosave(true);
    setTimeout(() => {
      setShowAutosave(false);
    }, 500);
  };

  //React use effect will continually restart a 1 second timer when any of the headline, story, imageURL, or category are changed
  //After 2 seconds it will then save the contents for offline use.
  //This effectively debounces the save operation to save performance
  React.useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      localStorage.setItem("rnaUploadCategory", categoryChoice);
      localStorage.setItem("rnaUploadStory", story);
      localStorage.setItem("rnaUploadHeadline", headline);
      localStorage.setItem("rnaUploadImageURL", imageURL);
      fadeAutosave();
    }, 1000);

    return () => clearTimeout(debounceTimeout);
  }, [categoryChoice, story, headline, imageURL]);

  return (
    <>
      {/*Display upload page navbar at the top of the screen */}
      <Navbar pageName={"upload"} backgroundColour={"#7F7F7F"} />

      {/* Store entire page inside grid for structuring*/}
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        marginTop="10px"
        padding="5px"
      >
        {/* Page heading grid item */}
        <Grid
          item
          xs={12}
          sx={{ width: "100%", justifyContent: "center", marginBottom: "5px" }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            align="center"
            sx={{ justifyContent: "center" }}
          >
            Upload a story
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{ width: "100%", justifyContent: "center", marginBottom: "5px" }}
        >
          {/* Utilise MUIs fade API to create a fadeable text and icon combination for autosave functionality */}
          <Fade appear={false} timeout={500} in={showAutosave}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              align="center"
              color="green"
              sx={{ justifyContent: "center" }}
            >
              Offline Autosave
              <SaveIcon color="success"></SaveIcon>
            </Typography>
          </Fade>
        </Grid>

        {/* Main form card grid item*/}
        <Grid item xs={12}>
          {/* Main form card to contain all inputs*/}
          <Card
            sx={{
              padding: "10px",
              display: "flex",
              flexDirection: "column",
            }}
            onKeyDown={(e) => {
              //If user presses enter key while focus is on this card, execute handleUpload function
              if (e.key === "Enter") {
                handleUpload();
              }
            }}
          >
            {/* Headline text input */}
            <TextField
              id="headlineTextBox"
              label="Headline"
              variant="filled"
              size="small"
              InputLabelProps={{ shrink: true }}
              focused={false}
              value={headline}
              onChange={(e: any) => setHeadline(e.target.value)}
              margin="dense"
              required={true}
            />

            {/* Story text input, this is multiline with a minimum of 5 rows to make it clear to user that it has multiline capability*/}
            <TextField
              id="storyTextBox"
              label="Story"
              variant="filled"
              size="small"
              InputLabelProps={{ shrink: true }}
              focused={false}
              value={story}
              onChange={(e: any) => setStory(e.target.value)}
              margin="dense"
              multiline={true}
              minRows={5}
              required={true}
            />

            {/* Image URL textbox that user can use to provide URL of an image associated with the story if they wish */}
            <TextField
              id="imageURLTextBox"
              label="Image URL"
              variant="filled"
              size="small"
              InputLabelProps={{ shrink: true }}
              focused={false}
              value={imageURL}
              onChange={(e: any) => setImageURL(e.target.value)}
              margin="dense"
              required={true}
            />

            {/* Label for select dropdown */}
            <InputLabel id="select-category-label">Select Category</InputLabel>

            {/* Select dropdown allowing user to select the category of their story from a predefined list */}
            <Select
              labelId="select-category-label"
              id="select-category"
              value={categoryChoice}
              label="Select Category"
              onChange={(e: any) => setCategoryChoice(e.target.value)}
            >
              <MenuItem value={"world"}>World</MenuItem>
              <MenuItem value={"entertainment"}>Entertainment</MenuItem>
              <MenuItem value={"sport"}>Sport</MenuItem>
              <MenuItem value={"tech"}>Tech</MenuItem>
              <MenuItem value={"ourstories"}>Our Stories</MenuItem>
            </Select>

            {/* If something has gone wrong, show details of error in red text*/}
            {badDetails.problem ? (
              <Typography
                variant="body2"
                color={"red"}
                sx={{ width: "100%", height: "100%", textAlign: "right" }}
              >
                {badDetails.description}
              </Typography>
            ) : null}

            <CardActions
              sx={{
                justifyContent: "right",
              }}
            >
              {/* Delete Story button*/}
              <Button
                color="error"
                variant={"contained"}
                onClick={handleDelete}
              >
                Delete Story
              </Button>

              {/* Upload story button*/}
              <Button
                color="error"
                variant={"contained"}
                onClick={handleUpload}
              >
                Upload Story
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Upload;

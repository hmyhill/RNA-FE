import {
  Button,
  Card,
  CardActions,
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

const Upload = () => {
  const [categoryChoice, setCategoryChoice] = React.useState<string>("world");
  const [headline, setHeadline] = React.useState<string>("");
  const [story, setStory] = React.useState<string>("");
  const [imageURL, setImageURL] = React.useState<string>("");
  const [badDetails, setBadDetails] = React.useState<{
    problem: boolean;
    description: string;
  }>({
    problem: false,
    description: "",
  });

  const handleCategoryChange = (e: SelectChangeEvent) => {
    setCategoryChoice(e.target.value);
  };

  const handleUpload = () => {};

  return (
    <>
      <Navbar pageName={"upload"} backgroundColour={"#7F7F7F"} />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        marginTop="10px"
        padding="5px"
      >
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

        <Grid item xs={12}>
          <Card
            sx={{
              padding: "10px",
              display: "flex",
              flexDirection: "column",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleUpload();
              }
            }}
          >
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
            />

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
            />

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
            />

            <InputLabel id="select-category-label">Select Category</InputLabel>
            <Select
              labelId="select-category-label"
              id="select-category"
              value={categoryChoice}
              label="Select Category"
              onChange={handleCategoryChange}
            >
              <MenuItem value={"world"}>World</MenuItem>
              <MenuItem value={"entertainment"}>Entertainment</MenuItem>
              <MenuItem value={"sport"}>Sport</MenuItem>
              <MenuItem value={"tech"}>Tech</MenuItem>
              <MenuItem value={"ourstories"}>Our Stories</MenuItem>
            </Select>

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

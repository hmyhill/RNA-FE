import {
  Button,
  Card,
  CardActions,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { UserState } from "../../contexts/User/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  //Loads user context
  const userState = UserState();

  //Establish page specific states for form inputs
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>("");

  //Declare state to track whether the form is in login or signup mode
  const [formMode, setFormMode] = useState<"login" | "signup">("login");

  //Create an example of the form having no problems, then assign this by default to the badDetails state which tracks issues
  const noProblemDetails = { problem: false, description: "" };
  const [badDetails, setBadDetails] = useState<{
    problem: boolean;
    description: string;
  }>(noProblemDetails);

  //Instantiate the react router navigate function
  const navigate = useNavigate();

  //Function to handle the login button being pressed
  const handleLogin = () => {
    //If form already in login mode
    if (formMode === "login") {
      //And form is valid
      if (validateForm()) {
        //TODO: Add API request to backend for login and error handling for error being rejected
        //Login user
        userState.login("standard", "mockEmail", "mockUsername");
        //Then navigate to homepage
        navigate("world");
      }
    } else {
      //Otherwise toggle to login mode and clear any errors
      setFormMode("login");
      setBadDetails(noProblemDetails);
    }
  };

  //Function to handle the signup button being pressed
  const handleSignup = () => {
    //If the form is already in signup mode
    if (formMode === "signup") {
      //And the form is valid
      if (validateForm()) {
        //TODO: Add API request to backend for signup and error handling for error being rejected
        //After user signup is successful, execute login logic to update user context with relevant information
        userState.login("standard", "mockEmail", "mockUsername");
        //Then navigate to world page
        navigate("world");
      }
    } else {
      //If not already in signup mode, switch to signup and clear any errors
      setFormMode("signup");
      setBadDetails(noProblemDetails);
    }
  };

  //Function returns true if form is valid or false if form is not valid
  const validateForm = (): boolean => {
    let valid = true;
    if (emailInput.length === 0) {
      valid = false;
    } else if (passwordInput.length === 0) {
      valid = false;
    } else if (confirmPasswordInput.length === 0 && formMode === "signup") {
      valid = false;
    }

    //If an error has been found, set error message appropriately
    if (!valid) {
      setBadDetails({
        problem: true,
        description: "You must complete all fields",
      });
    }

    return valid;
  };

  return (
    //Place all elements inside grid for easy structuring
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      marginTop="10px"
      padding="5px"
    >
      {/* First grid item to be site logo */}
      <Grid item xs={8} sm={4} md={2}>
        <Card
          sx={{
            width: "100%",
            height: "100%",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            marginBottom: "10px",
          }}
        >
          <img
            src={"/logo512.png"}
            alt="RNA Logo"
            style={{ padding: "10%" }}
          ></img>
        </Card>
      </Grid>

      {/*Breakline*/}
      <Grid item xs={12}></Grid>

      {/* Form elements */}
      <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{
            width: "100%",
            height: "100%",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              /* On enter key being pressed, execute handleLogin or handleSignup as appropriate */
              formMode === "login" ? handleLogin() : handleSignup();
            }
          }}
        >
          {/* Email input text box*/}
          <TextField
            id="emailTextBox"
            label="Email"
            variant="filled"
            size="small"
            InputLabelProps={{ shrink: true }}
            focused={false}
            value={emailInput}
            onChange={(e: any) => setEmailInput(e.target.value)}
            margin="dense"
          />

          {/* Password input text box */}
          <TextField
            id="passwordTextBox"
            label="Password"
            variant="filled"
            type="password"
            size="small"
            InputLabelProps={{ shrink: true }}
            focused={false}
            value={passwordInput}
            onChange={(e: any) => setPasswordInput(e.target.value)}
            margin="dense"
          />

          {/* Only show next section if screen in signup mode*/}
          {formMode === "signup" ? (
            /* Password confirmation test box (for use in signup mode only) */
            <TextField
              id="passwordConfirmTextBox"
              label="Confirm Password"
              variant="filled"
              type="password"
              size="small"
              InputLabelProps={{ shrink: true }}
              focused={false}
              value={confirmPasswordInput}
              onChange={(e: any) => setConfirmPasswordInput(e.target.value)}
              margin="dense"
            />
          ) : null}

          {/* If there is a problem then display error message as appropriate */}
          {badDetails.problem ? (
            <Typography
              variant="body2"
              color={"red"}
              sx={{ width: "100%", height: "100%", textAlign: "right" }}
            >
              {badDetails.description}
            </Typography>
          ) : null}

          {/* Card actions handles buttons for login form */}
          <CardActions
            sx={{
              width: "100%",
              height: "100%",
              justifyContent: "right",
            }}
          >
            {/* On button press, handleLogin function is called */}
            {/* Button variant changes depending on the screen mode */}
            <Button
              color="error"
              variant={formMode === "login" ? "contained" : "outlined"}
              onClick={handleLogin}
            >
              Login
            </Button>

            {/* On button press, handleSignup function is called */}
            {/* Button variant changes depending on the screen mode */}
            <Button
              color="error"
              variant={formMode === "signup" ? "contained" : "outlined"}
              onClick={handleSignup}
            >
              Signup
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;

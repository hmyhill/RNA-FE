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
  const userState = UserState();
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>("");
  const [formMode, setFormMode] = useState<"login" | "signup">("login");
  const noProblemDetails = { problem: false, description: "" };
  const [badDetails, setBadDetails] = useState<{
    problem: boolean;
    description: string;
  }>(noProblemDetails);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (formMode === "login") {
      if (validateForm()) {
        //TODO: Add API request to backend for login and error handling for error being rejected
        userState.login("standard", "mockEmail", "mockUsername");
        navigate("world");
      }
    } else {
      setFormMode("login");
      setBadDetails(noProblemDetails);
    }
  };
  const handleSignup = () => {
    if (formMode === "signup") {
      if (validateForm()) {
        //TODO: Add API request to backend for signup and error handling for error being rejected
        userState.login("standard", "mockEmail", "mockUsername");
        navigate("world");
      }
    } else {
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
    if (!valid) {
      setBadDetails({
        problem: true,
        description: "You must complete all fields",
      });
    }

    return valid;
  };

  return (
    //Grid to contain login elements
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      marginTop="10px"
      padding="5px"
    >
      {/* Logo grid item*/}
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

      {/* Form elements*/}
      <Grid item xs={12} sm={6} md={4}>
        {/* Place all login elements inside a formatted card element, if the user presses enter key then login should be processed */}
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
              /* Take action dependent on what mode the screen is in */
              formMode === "login" ? handleLogin() : handleSignup();
            }
          }}
        >
          {/* Text field that user can interact with, loads and sets values to username react hook*/}
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

          {/* Same as above */}
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
            /* A third text field for password confirm box for when user is in signup */
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

          {/* Only show error message if bad details have been entered */}
          {badDetails ? (
            /* Further information then shown using typography components */
            <Typography
              variant="body2"
              color={"red"}
              sx={{ width: "100%", height: "100%", textAlign: "right" }}
            >
              {badDetails.description}
            </Typography>
          ) : null}

          {/* Card Actions stored in this area */}
          <CardActions
            sx={{
              width: "100%",
              height: "100%",
              justifyContent: "right",
            }}
          >
            {/* On button press, handleLogin function is called to process page */}
            {/* Button variant changes depending on the screen mode */}
            <Button
              color="error"
              variant={formMode === "login" ? "contained" : "outlined"}
              onClick={() => {
                handleLogin();
              }}
            >
              Login
            </Button>

            {/* On button press, handleSignup function is called to process page */}
            {/* Button variant changes depending on the screen mode */}
            <Button
              color="error"
              variant={formMode === "signup" ? "contained" : "outlined"}
              onClick={() => {
                handleSignup();
              }}
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

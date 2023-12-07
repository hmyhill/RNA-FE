import {
  AccountCircle,
  BadgeOutlined,
  Logout,
  MenuOutlined,
  Newspaper,
  Public,
  SportsEsports,
  SportsBasketball,
  Terminal,
  Upload,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserState } from "../../../contexts/User/UserContext";

interface NavbarProps {
  pageName: string;
  backgroundColour: string;
}

export default function Navbar(props: NavbarProps) {
  //SET DEBUG TO TRUE/FALSE TO TOGGLE BETWEEN BEING ABLE TO MANUALLY SET CURRENT USERS PERMISSIONS
  const debug = process.env.REACT_APP_DEBUG_MODE.toUpperCase() === "TRUE";
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const userState = UserState();

  //Function to be called whenever a user attempts to logout or login through the navbar
  const logoutUser = () => {
    //If user is currently logged in, then log them out and send them to the login screen
    if (userState.userStatus !== "loggedOut") {
      userState.logout();
    }

    //Send to login screen regardless of already logged in or not
    navigate("/login");
  };

  return (
    <>
      {/* Each of the following buttons should be shown only if the application is in debug mode */}
      {debug && (
        <button
          onClick={() => {
            userState.login("standard", "mockEmail", "mockUsername");
          }}
        >
          Standard
        </button>
      )}
      {debug && (
        <button
          onClick={() => {
            userState.login("admin", "mockEmail", "mockUsername");
          }}
        >
          Admin
        </button>
      )}
      {debug && (
        <button
          onClick={() => {
            userState.logout();
          }}
        >
          Logout
        </button>
      )}
      <AppBar position="sticky">
        <Toolbar
          sx={{
            backgroundColor: props.backgroundColour,
            width: "100%",
            minHeight: "75px",
            height: "15vh",
            elevation: 1,
            display: "flex",
            flexWrap: "wrap",
            padding: "0 !important",
          }}
        >
          <Link href="/world" underline="none" sx={{ marginLeft: "2vw" }}>
            <Avatar
              id="logo"
              alt="RNA Logo"
              src={"/Logo512.png"}
              sx={{ height: "10vh", width: "auto" }}
            />
          </Link>

          <Box>
          <Button
              onClick={() => navigate("/world")} 
              sx={{flexDirection: "column", textTransform: "none", color: "#fff"}} 
            >
          <Typography variant="h2">NEWS</Typography>
          </Button>
          </Box>
          {/* Large News button at the top just to take up some empty space */}

          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: 1,
              marginLeft: "auto",
            }}
          >
            <Button
              onClick={() => navigate("/world")}
              sx={{
                flexDirection: "column",
                textTransform: "none",
                color: "#fff",
              }}
            >
              <Public fontSize="large" />
              <Typography sx={{ textAlign: "center" }}>World</Typography>
            </Button>

            <Button
              onClick={() => navigate("/gaming")}
              sx={{
                flexDirection: "column",
                textTransform: "none",
                color: "#fff",
              }}
            >
              <SportsEsports fontSize="large" />
              <Typography sx={{ textAlign: "center" }}>Gaming</Typography>
            </Button>

            <Button
              onClick={() => navigate("/sport")}
              sx={{
                flexDirection: "column",
                textTransform: "none",
                color: "#fff",
              }}
            >
              <SportsBasketball fontSize="large" />
              <Typography sx={{ textAlign: "center" }}>Sport</Typography>
            </Button>

            <Button
              onClick={() => navigate("/tech")}
              sx={{
                flexDirection: "column",
                textTransform: "none",
                color: "#fff",
              }}
            >
              <Terminal fontSize="large" />
              <Typography sx={{ textAlign: "center" }}>Tech</Typography>
            </Button>

            <Button
              onClick={() => navigate("/our-news")}
              sx={{
                flexDirection: "column",
                textTransform: "none",
                color: "#fff",
              }}
            >
              <Newspaper fontSize="large" />
              <Typography sx={{ textAlign: "center" }}>Our Stories</Typography>
            </Button>
          </Box>

          {/* Menu that displays when the screen width is more than 600px */}
          <Box sx={{ marginLeft: "auto", display: { xs: "none", sm: "flex" } }}>
            <Tooltip title="View User Options">
              <IconButton onClick={() => setOpen(!open)}>
                <AccountCircle sx={{ color: "#fff", fontSize: "7vh" }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ marginTop: "9vh", display: { xs: "none", sm: "flex" } }}
              id="menu-appbar-narrow"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={() => setOpen(false)}
            >
              {/* Only show the account management button if the user is not currently logged out */}
              {userState.userStatus !== "loggedOut" && (
                <MenuItem key="manage" onClick={() => navigate("/account")}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <BadgeOutlined
                      sx={{
                        fontSize: "32px",
                      }}
                    />
                    <div style={{ flexDirection: "column" }}>
                      <Typography
                        variant="body2"
                        textAlign="center"
                        marginLeft={"5px"}
                      >
                        {" "}
                        {userState.username}{" "}
                      </Typography>
                      <Typography
                        variant="body2"
                        textAlign="center"
                        marginLeft={"5px"}
                      >
                        {" "}
                        Manage Account{" "}
                      </Typography>
                    </div>
                  </div>
                </MenuItem>
              )}

              {/* Only show the upload a story button if the user is logged */}
              {userState.userStatus === "admin" && (
                <MenuItem key="manage" onClick={() => navigate("/upload")}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Upload
                      sx={{
                        fontSize: "32px",
                      }}
                    />
                    <Typography
                      variant="body2"
                      textAlign="center"
                      marginLeft={"5px"}
                    >
                      {" "}
                      Upload Story{" "}
                    </Typography>
                  </div>
                </MenuItem>
              )}

              <MenuItem key="logout" onClick={logoutUser}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Logout
                    sx={{
                      fontSize: "32px",
                    }}
                  />
                  <Typography
                    variant="body2"
                    textAlign="center"
                    marginLeft={"5px"}
                  >
                    {/* Show "Log In" or "Log Out" dependent on the current status of the user */}
                    {userState.userStatus !== "loggedOut"
                      ? "Log Out"
                      : "Log In"}
                  </Typography>
                </div>
              </MenuItem>
            </Menu>
          </Box>

          {/* Menu that displays when the screen width is less than 600px */}
          <Box sx={{ marginLeft: "auto", display: { xs: "flex", sm: "none" } }}>
            <IconButton onClick={() => setOpen(!open)}>
              <MenuOutlined sx={{ color: "#fff", fontSize: "7vh" }} />
            </IconButton>
            <Menu
              sx={{ marginTop: "9vh", display: { xs: "flex", sm: "none" } }}
              id="menu-appbar-wide"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              marginThreshold={0}
              PaperProps={{
                style: {
                  width: "100%",
                  maxWidth: "100%",
                  left: 0,
                  right: 0,
                },
              }}
              open={open}
              onClose={() => setOpen(false)}
            >
              <MenuItem
                key="tech"
                onClick={() => navigate("/tech")}
                sx={{
                  backgroundColor: "#0400BD",
                  color: "#fff",
                  borderTop: "1px solid black",
                  borderBottom: "1px solid black",
                  "&:hover": {
                    background: "rgba(4, 0, 189, 0.5)",
                  },
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Terminal
                    sx={{
                      fontSize: "40px",
                    }}
                  />
                  <div style={{ flexDirection: "column" }}>
                    <Typography
                      variant="h4"
                      textAlign="center"
                      marginLeft={"5px"}
                    >
                      {" "}
                      Technology{" "}
                    </Typography>
                  </div>
                </div>
              </MenuItem>

              <MenuItem
                key="sport"
                onClick={() => navigate("/sport")}
                sx={{
                  backgroundColor: "#FF7A00",
                  color: "#fff",
                  borderTop: "1px solid black",
                  borderBottom: "1px solid black",
                  "&:hover": {
                    background: "rgba(255, 122, 0, 0.5)",
                  },
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <SportsBasketball
                    sx={{
                      fontSize: "40px",
                    }}
                  />
                  <div style={{ flexDirection: "column" }}>
                    <Typography
                      variant="h4"
                      textAlign="center"
                      marginLeft={"5px"}
                    >
                      {" "}
                      Sport{" "}
                    </Typography>
                  </div>
                </div>
              </MenuItem>

              <MenuItem
                key="gaming"
                onClick={() => navigate("/gaming")}
                sx={{
                  backgroundColor: "#0E7A0D",
                  color: "#fff",
                  borderTop: "1px solid black",
                  borderBottom: "1px solid black",
                  "&:hover": {
                    background: "rgba(14, 122, 13, 0.5)",
                  },
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <SportsEsports
                    sx={{
                      fontSize: "40px",
                    }}
                  />
                  <div style={{ flexDirection: "column" }}>
                    <Typography
                      variant="h4"
                      textAlign="center"
                      marginLeft={"5px"}
                    >
                      {" "}
                      Gaming{" "}
                    </Typography>
                  </div>
                </div>
              </MenuItem>

              <MenuItem
                key="world"
                onClick={() => navigate("/world")}
                sx={{
                  backgroundColor: "#e90000",
                  color: "#fff",
                  borderTop: "1px solid black",
                  borderBottom: "1px solid black",
                  "&:hover": {
                    background: "rgba(233, 0, 0, 0.5)",
                  },
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Public
                    sx={{
                      fontSize: "40px",
                    }}
                  />
                  <div style={{ flexDirection: "column" }}>
                    <Typography
                      variant="h4"
                      textAlign="center"
                      marginLeft={"5px"}
                    >
                      {" "}
                      World{" "}
                    </Typography>
                  </div>
                </div>
              </MenuItem>

              <MenuItem
                key="our-news"
                onClick={() => navigate("/our-news")}
                sx={{
                  backgroundColor: "#8A21DD",
                  color: "#fff",
                  borderTop: "1px solid black",
                  borderBottom: "1px solid black",
                  "&:hover": {
                    background: "rgba(138, 31, 221, 0.5)",
                  },
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Newspaper
                    sx={{
                      fontSize: "40px",
                    }}
                  />
                  <div style={{ flexDirection: "column" }}>
                    <Typography
                      variant="h4"
                      textAlign="center"
                      marginLeft={"5px"}
                    >
                      {" "}
                      Our News{" "}
                    </Typography>
                  </div>
                </div>
              </MenuItem>

              {/* Only show the manage account button if the user is not currently logged out */}
              {userState.userStatus !== "loggedOut" && (
                <MenuItem
                  key="manage"
                  onClick={() => navigate("/account")}
                  sx={{
                    backgroundColor: "#7F7F7F",
                    color: "#fff",
                    borderTop: "1px solid black",
                    borderBottom: "1px solid black",
                    "&:hover": {
                      background: "rgba(127, 127, 127, 0.5)",
                    },
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <BadgeOutlined
                      sx={{
                        fontSize: "40px",
                      }}
                    />
                    <div style={{ flexDirection: "column" }}>
                      <Typography
                        variant="h4"
                        textAlign="center"
                        marginLeft={"5px"}
                      >
                        {" "}
                        Manage Account{" "}
                      </Typography>
                    </div>
                  </div>
                </MenuItem>
              )}

              {/* Only show the upload a story button if the user is currently logged in as an admin */}
              {userState.userStatus === "admin" && (
                <MenuItem
                  key="manage"
                  onClick={() => navigate("/upload")}
                  sx={{
                    backgroundColor: "#7F7F7F",
                    color: "#fff",
                    borderTop: "1px solid black",
                    borderBottom: "1px solid black",
                    "&:hover": {
                      background: "rgba(127, 127, 127, 0.5)",
                    },
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Upload
                      sx={{
                        fontSize: "40px",
                      }}
                    />
                    <Typography
                      variant="h4"
                      textAlign="center"
                      marginLeft={"5px"}
                    >
                      {" "}
                      Upload Story{" "}
                    </Typography>
                  </div>
                </MenuItem>
              )}

              <MenuItem
                key="logout"
                onClick={logoutUser}
                sx={{
                  backgroundColor: "#7F7F7F",
                  color: "#fff",
                  borderTop: "1px solid black",
                  borderBottom: "1px solid black",
                  "&:hover": {
                    background: "rgba(127, 127, 127, 0.5)",
                  },
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Logout
                    sx={{
                      fontSize: "40px",
                    }}
                  />
                  <Typography
                    variant="h4"
                    textAlign="center"
                    marginLeft={"5px"}
                  >
                    {/* Dynamically adjust the text between "Log In" and "Log Out" depending on the current status of the user*/}
                    {userState.userStatus !== "loggedOut"
                      ? "Log Out"
                      : "Log In"}
                  </Typography>
                </div>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

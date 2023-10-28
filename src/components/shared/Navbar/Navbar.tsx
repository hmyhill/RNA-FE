import {
  AccountCircle,
  BadgeOutlined,
  Logout,
  Newspaper,
  Public,
  SportsEsports,
  SportsBasketball,
  Terminal,
  Upload
} from "@mui/icons-material"
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography 
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  pageName: string;
  backgroundColour: string;
}

export default function Navbar(props: NavbarProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const user = "Elliot(t)";


  return (
    <>
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
        <Link href="/world" underline="none" sx={{marginLeft: "2vw"}} >
          <Avatar id="logo" alt="RNA Logo" src={"/Logo512.png"} sx={{ height: "11vh", width:"auto" }}/>
        </Link>

        <Box sx = {{display: "flex", gap: 2, marginLeft: "auto"}}>
          <Button
            onClick={() => navigate("/world")} 
            sx={{flexDirection: "column", textTransform: "none", color: "#fff"}} 
          >
            <Public fontSize="large"/>
            <Typography sx= {{textAlign: "center"}}>World</Typography>
          </Button>

          <Button
            onClick={() => navigate("/gaming")} 
            sx={{flexDirection: "column", textTransform: "none", color: "#fff" }} 
          >
              <SportsEsports fontSize="large"/>
              <Typography sx= {{textAlign: "center"}}>Gaming</Typography>
          </Button>

          <Button
            onClick={() => navigate("/sport")} 
            sx={{flexDirection: "column", textTransform: "none", color: "#fff"}} 
          >
            <SportsBasketball fontSize="large"/>
            <Typography sx= {{textAlign: "center"}}>Sport</Typography>
          </Button>

          <Button
            onClick={() => navigate("/tech")} 
            sx={{flexDirection: "column", textTransform: "none", color: "#fff"}} 
          >
            <Terminal fontSize="large"/>
            <Typography sx= {{textAlign: "center"}}>Tech</Typography>
          </Button>

          <Button
            onClick={() => navigate("/our-news")} 
            sx={{flexDirection: "column", textTransform: "none", color: "#fff"}} 
          >
            <Newspaper fontSize="large"/>
            <Typography sx= {{textAlign: "center"}}>Our Stories</Typography>
          </Button>
        </Box>

        <Box sx={{ marginLeft: "auto" }}>
          <Tooltip title="View User Options">
            <IconButton onClick={() => setOpen(!open)}>
              <AccountCircle sx={{color: "#fff", fontSize: "8vh"}} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ marginTop: "9vh" }}
            id="menu-appbar"
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
            onClose={()=> setOpen(false)}
          >
            <MenuItem key="manage" onClick={() => navigate("/account")}>
              <div style={{ display: "flex", alignItems: "center"}}>
                <BadgeOutlined sx={{
                  fontSize:"32px",
                }}
                />
                <div style={{ flexDirection: "column" }}>
                  <Typography variant="body2" textAlign="center" marginLeft={"5px"}> {user} </Typography>
                  <Typography variant="body2" textAlign="center" marginLeft={"5px"}> Manage Account </Typography>  
                </div>  
              </div>                
            </MenuItem>
          
            <MenuItem key="manage" onClick={() => navigate("/upload")}>
              <div style={{ display: "flex", alignItems: "center"}}>
                <Upload sx={{
                  fontSize:"32px"
                }}
                />
                <Typography variant="body2" textAlign="center" marginLeft={"5px"}> Upload Story </Typography>
              </div>
            </MenuItem>

            <MenuItem key="logout" onClick={() => navigate("/login")}>
              <div style={{ display: "flex", alignItems: "center"}}>
                <Logout sx={{
                  fontSize:"32px"
                }}
                />
                <Typography variant="body2" textAlign="center" marginLeft={"5px"}>Log Out</Typography>
              </div>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </>
  );
}

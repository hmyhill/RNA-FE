import { Outlet } from "react-router-dom";
import { CssBaseline } from "@mui/material";

//Defines the main page components, Outlet will contain the page specific contents
const Layout = () => {
  return (
    <>
      <CssBaseline />
      <Outlet />
    </>
  );
};

export default Layout;

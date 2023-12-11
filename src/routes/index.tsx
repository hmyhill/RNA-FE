import { Navigate } from "react-router-dom";
import Account from "../containers/Account/Account";
import Entertainment from "../containers/Entertainment/Entertainment";
import Login from "../containers/Login/Login";
import OurNews from "../containers/OurNews/OurNews";
import Sport from "../containers/Sport/Sport";
import Tech from "../containers/Tech/Tech";
import Upload from "../containers/Upload/Upload";
import World from "../containers/World/World";
import { userStatuses } from "../contexts/User/types/userStatuses";

//Function will dynamically generate router settings dependent on whether user is admin or not
export function getRoutes(userStatus: userStatuses) {
  //Outline default acceptable routes
  let allowedRoutes = [
    { path: "entertainment", element: <Entertainment /> },
    { path: "our-news", element: <OurNews /> },
    { path: "sport", element: <Sport /> },
    { path: "tech", element: <Tech /> },
    { path: "world", element: <World /> },
    { path: "login", element: <Login /> },
  ];

  //If user is logged in then add on account routes
  if (userStatus !== "loggedOut") {
    allowedRoutes = allowedRoutes.concat([
      { path: "account", element: <Account /> },
    ]);
  }

  //User logged in as admin, also open up management pages as acceptable routes
  if (userStatus === "admin") {
    allowedRoutes = allowedRoutes.concat([
      { path: "upload", element: <Upload /> },
    ]);
  }

  //Ensure that there is a catch all path for 404 pages that will send them to world
  allowedRoutes.push({ path: "/*", element: <Navigate to={"/world"} /> });

  return {
    allowedRoutes,
    routesStringArr: allowedRoutes.map((route) => route.path),
  };
}

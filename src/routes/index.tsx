import World from "../containers/World/World";
import Layout from "../components/shared/Layout/Layout";
import Account from "../containers/Account/Account";
import Gaming from "../containers/Gaming/Gaming";
import Login from "../containers/Login/Login";
import OurNews from "../containers/OurNews/OurNews";
import Sport from "../containers/Sport/Sport";
import Tech from "../containers/Tech/Tech";
import Upload from "../containers/Upload/Upload";

export function getRoutes() {
  //Outline default acceptable routes
  let allowedRoutes = [
    {
      path: "/",
      element: <World />,
    },
    {
      path: "account",
      element: <Account />,
    },
    {
      path: "gaming",
      element: <Gaming />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "our-news",
      element: <OurNews />,
    },
    {
      path: "sport",
      element: <Sport />,
    },
    {
      path: "tech",
      element: <Tech />,
    },
    {
      path: "upload",
      element: <Upload />,
    },
    {
      path: "world",
      element: <World />,
    },
  ];

  //Put together formatted routerOptions using prebuilt variables and return
  const routerOptions = [
    {
      path: "/",
      element: <Layout />,
      errorElement: <h1>Error 404: Page Not Found</h1>,
      children: allowedRoutes,
    },
    {
      path: "*",
      element: <h1>Error 404: Page Not Found</h1>,
    },
  ];
  return { routerOptions };
}

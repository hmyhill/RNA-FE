import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getRoutes } from "./routes";
import { UserState } from "./contexts/User/UserContext";

function App() {
  //Load userState from user context
  const userState = UserState();

  //Dynamically generate allowable routes dependent on the current users status
  const { allowedRoutes } = getRoutes(userState.userStatus);

  //Create router passing in allowable routes
  const router = createBrowserRouter(allowedRoutes);

  //Render the page as determined by the router
  return <RouterProvider router={router} />;
}

export default App;

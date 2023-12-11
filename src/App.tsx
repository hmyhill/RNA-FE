import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getRoutes } from "./routes";
import { UserState } from "./contexts/User/UserContext";

function App() {
  //Load userState from user context
  const userState = UserState();

  //The app should refresh the current state of the user whenever it starts up (by retrieving existing session IDs in cookies)
  userState.onStartup();
  //Dynamically generate allowable routes dependent on the current users status
  const { allowedRoutes } = getRoutes(userState.userStatus);

  //Create router passing in allowable routes
  const router = createBrowserRouter(allowedRoutes);

  //Render the page as determined by the router
  return <RouterProvider router={router} />;
}

export default App;

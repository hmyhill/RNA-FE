import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getRoutes } from "./routes";
import { UserState } from "./contexts/User/UserContext";

function App() {
  const userState = UserState();
  const { allowedRoutes } = getRoutes(userState.userStatus);

  //And a router created using those routes
  const router = createBrowserRouter(allowedRoutes);

  return <RouterProvider router={router} />;
}

export default App;

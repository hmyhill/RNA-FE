import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { getRoutes } from "./routes";

function App() {
  const { allowedRoutes, routesStringArr } = getRoutes("admin");

  //And a router created using those routes
  const router = createBrowserRouter(allowedRoutes);

  return <RouterProvider router={router} />;
}

export default App;

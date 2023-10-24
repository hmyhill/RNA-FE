import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { getRoutes } from "./routes";

function App() {
  const { routerOptions } = getRoutes();

  const router = createBrowserRouter(routerOptions);
  return <RouterProvider router={router} />;
}

export default App;

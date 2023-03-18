import React from "react";
import ReactDOM from "react-dom/client";
import "./css/main.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/Root";
import Profile from "./routes/Profile";

import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

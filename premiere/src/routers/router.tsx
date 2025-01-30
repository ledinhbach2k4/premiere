import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./../pages/ProtectedRoutes";
import Home from "../screens/Home";
import App from "../App";
import About from "../screens/About";
import Login from "../screens/auth/Login";
import Account from "../screens/Account";
import Template from "../screens/Template";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/template/:id",
        element: <Template/>,
      }
    ],
  },
  {
    path: "/signup",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;

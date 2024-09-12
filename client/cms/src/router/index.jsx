import { createBrowserRouter, redirect } from "react-router-dom";
import Register from "../views/RegisterPage";
import BaseLayout from "../components/BaseLayout";
import HomePage from "../views/HomePage";
import { io } from "socket.io-client";
import ScorePage from "../views/ScorePage";

const socket = io("http://localhost:3000", {
  autoConnect: false,
});

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.username) {
        return redirect("/register");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage socket={socket}/>,
      },
      {
        path : '/highScore',
        element : <ScorePage/>
      }
    ],
  },
]);

export default router;

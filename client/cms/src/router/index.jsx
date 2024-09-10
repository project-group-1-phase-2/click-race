import { createBrowserRouter, redirect } from "react-router-dom"; 
import Register from "../views/RegisterPage";
const router = createBrowserRouter(
    [
        {
            path : '/register',
            element : <Register/>
        }
    ]
)

export default router
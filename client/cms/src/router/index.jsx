import { createBrowserRouter, redirect } from "react-router-dom"; 
import Register from "../views/RegisterPage";
import BaseLayout from "../components/BaseLayout";
import HomePage from "../views/HomePage";
const router = createBrowserRouter(
    [
        {
            path : '/register',
            element : <Register/>
        },
        {
            element : <BaseLayout/>,
            loader : () => {
                if(!localStorage.username){
                    return redirect('/register')
                }
                return null
            },
            children : [
                {
                    path : "/",
                    element : <HomePage/>
                }
            ]
        }
    ]
)

export default router
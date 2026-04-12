import { createBrowserRouter } from "react-router"
import Register from "./features/auth/Pages/Register"
import Login from "./features/auth/Pages/Login"
import Home from "./features/home/pages/Home"
import Protected from "./features/auth/Components/Protected"


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected><Home /></Protected>
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path:"/login",
        element: <Login />
    }
])
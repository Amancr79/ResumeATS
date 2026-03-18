import {createBrowserRouter} from "react-router"
import Login from "./feature/auth/pages/Login"
import Register from "./feature/auth/pages/Register"


export const router = createBrowserRouter([
        {
            Component: Login,
            path:'/login'
        },
        {
            Component: Register,
            path:'/register'
        }
])
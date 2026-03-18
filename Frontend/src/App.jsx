import {RouterProvider} from "react-router-dom"
import {router} from "./app.route.jsx"
import { AuthProvider } from "./feature/auth/context/auth.context.jsx"

export const App = () => {
  return (
    <AuthProvider>
    <RouterProvider router={router}/>
    </AuthProvider>
  )
}


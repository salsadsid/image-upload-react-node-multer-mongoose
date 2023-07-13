import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import AllUsers from "../pages/AllUsers";

const routes = createBrowserRouter([
    {
        path:"/",
        element:<Main></Main>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"/users",
                element:<AllUsers></AllUsers>
            }
        ]
    }
])

export default routes;
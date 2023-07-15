import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import AllUsers from "../pages/AllUsers";
import AllUsers2 from "../pages/AllUsers2";

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
            },
            // {
            //     path:"/users_2",
            //     element:<AllUsers2></AllUsers2>
            // }
        ]
    }
])

export default routes;
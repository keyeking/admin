//统一管理路由
import Home from "../Home/Home"
import Login from "../Login/Login"
import Pages from "../Pages/Pages";
import News from "../News/News";
import User from "../components/User/User";
import NotFound from "../404/404";
import Roles from "../components/Roles/Roles";
import Users from "../components/User/User";
import First from "../components/First/First";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    {
        path:"/home",
        component:Home,
        auth:true,
        routes:[
            {
                path:'/home/first',
                component:First
            },
            {
                path:"/home/users",
                component:Users
            },
            {
                path:"/home/roles",
                component:Roles 
            }
        ]
    },
    {
        path:"/login",
        component:Login,
        auth:false,
        exact:true
    },
    {
        path:"/404",
        component:NotFound,
        auth:false,
        exact:true
    },
    {
        path:"/pages",
        component:Pages,
        auth:true,
        routes:[
            {
                path:"/pages/news",
                component:News
            },
            {
                path:"/pages/user",
                component:User
            }
        ]
    }
]
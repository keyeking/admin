// import { Redirect,Route,Switch } from "react-router";
// import Login from "../Login/Login"
// import routes from "../routes/routes"
// import Notfound from "../404/404"
// //这个组价你的目的就是统一管理路由
// export default function Auth(props){
//     let pathname=props.location.pathname;
//     let routeritem=routes.find((item,index)=>{
//         return pathname.search(item.path)!==-1
//     })   
//     //登录状态存储的本地，登录状态叫token
//     let isLogin=JSON.parse(window.localStorage.getItem("loginstatus") )
//     if(pathname=="/"){
//         //项目的首页
//         return <Redirect to="/login"/>
//     }
//     if(!routeritem){
//         //如果不存在，说明就是一个非法路由
//         return <Redirect to="/404"/>
//     }else{
//         //表示的合法路由
//         if(isLogin){
//             //有登录状态
//             if(pathname="/login"){
//                 return <Redirect to="/home"/>
//             }else{
//                 return <Route to={pathname} component={routeritem.component}/>         
//             }
//         }else{
//              //有权限的路由
//              if(routeritem.auth){
//                 return <Redirect to="/login"/>
//             }else{
//             //没有权限的路由
//                 return(
//                     <Switch>
//                     <Route to={pathname} component={routeritem.component}/>
//                     </Switch>
//                 ) 
//             }
//         }
//     } 
// }
"use strict";
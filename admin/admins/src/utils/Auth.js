
import { Redirect,Route,Switch } from "react-router-dom"
import routes from "../routes/routes"


function Auth(props){ //统一管理我们的路由
    // console.log(props)
    const pathname = props.location.pathname;
    const itemRouter = routes.find((item,index)=>{
        return pathname.search(item.path)!==-1;
    })
    let isLogin = JSON.parse(window.localStorage.getItem("TOKEN"))
    if(pathname === "/"){
        return <Redirect to="/login"></Redirect>
    }
    if(!itemRouter){ //非法路由
        return <Redirect to = "/404"></Redirect>
    }else{  //合法路由
        if(isLogin){ //有登录状态
            if(pathname==="/login"){
                return <Redirect to="/home"></Redirect>
            }else{
                return <Route path={pathname} component={itemRouter.component}/>
            }
        }else{//没有登录状态
            if(itemRouter.auth){ //该页面是否要权限
                return <Redirect exact to="/login"/>
            }else{
                
                return (
                    <Switch>
                    <Route path={pathname} component={itemRouter.component}/>
                    </Switch>
                )
            }
        }
    }
}
export default Auth


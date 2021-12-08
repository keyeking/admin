import {Link,Switch} from "react-router-dom";
import { matchRoutes, renderRoutes } from "react-router-config";
import routes from "../routes/routes"
function Pages(props){
    // console.log(props)
    let arr=matchRoutes(routes,props.location.pathname)
    return (
        <>
            <div>pages works</div>
            <Link to="/pages/news">news</Link><br/>
            <Link to="/pages/users">users</Link>
           
            <Switch>
               {renderRoutes(arr[0].route.routes)}
            </Switch>
            
        </>
    )
}
export default Pages;
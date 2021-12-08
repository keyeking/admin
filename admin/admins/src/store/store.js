import  {applyMiddleware, createStore} from "redux"
import reducer from "./reducer"
import thunk from "redux-thunk"
//解决异步请求
let store=createStore(reducer,applyMiddleware(thunk))
export default store
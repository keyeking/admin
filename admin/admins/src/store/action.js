import axios from "axios"
// 同步向store获取state的
let requestTable = (data) => {  //派发action
    // console.log(data)
    return {   //action
      type:"ajaxTable",
      data
    }
  }
  
  //异步请求
  let requestTableAsync = () => {  //发送ajax请求
    // console.log(url)
    return async (dispatch) => {
      // 异步代码
      let { data } = await axios.get("http://127.0.0.1:8000/users")
      dispatch(requestTable(data))
    }
  }

  export default requestTableAsync;
import {Helmet} from 'react-helmet';
import {Input, Button, Form} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import Banner from "../components/Banner"
import { useState,useEffect } from "react"
import "./login.less"
import axios from "axios"
import qs from "query-string"
function Login() {
    function submit(value){
        //校验处理
        //  console.log(JSON.stringify(value))
        const {username,password}=value
            axios.post("http://localhost:8000/login",qs.stringify({
                username,
                password
            })).then(function (response) {
                // console.log(response);
                 //将登录的数据存储的本地
                 window.localStorage.setItem("TOKEN",JSON.stringify(value))
                //跳转路由
                window.location.href = "http://localhost:3000/home";    
            }).catch(function (error) {
                console.log(error);
            }); 
    }

    const [states,setStates] = useState({isMount:false,loading:false})
    useEffect(()=>{
        setTimeout(() => setStates({...states,isMount:true}), 300);
    },[states])
    //{isMount:true}
    const formItemStyleName = states.isMount ? 'form-item active' : 'form-item';
    return (
        <>
            <Helmet title="欢迎登陆"></Helmet>
            <div className="left">
                <Banner></Banner>
            </div>
            <div className="right">
                <div className="box">
                    <Form
                    name="login"
                    className=""
                    onFinish={submit}
                    >
                        <div className={formItemStyleName}>
                            <div className="header">欢迎登录</div>
                        </div>
                        <div className={formItemStyleName}>
                            <Form.Item
                                name="username"
                                rules={[{required: true, message: '请输入用户名'}]}
                            >
                                <Input allowClear prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="用户名"/>
                            </Form.Item>
                        </div>
                        <div className={formItemStyleName}>
                            <Form.Item
                                name="password"
                                rules={[{required: true, message: '请输入密码'}]}
                            >
                                <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>} placeholder="密码"/>
                            </Form.Item>
                        </div>
                        <div className={formItemStyleName}>
                            <Form.Item shouldUpdate={true}>
                                {() => (
                                    <Button
                                        className="submit-btn"
                                        loading={states.loading}
                                        type="primary"
                                        htmlType="submit"  
                                    >
                                        登录
                                    </Button>
                                )}
                             </Form.Item>   
                        </div>

                    </Form>
                </div>
            </div>
        </>
    )
}

export default Login;


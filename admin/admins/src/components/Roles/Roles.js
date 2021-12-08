import {Layout,Spin,Divider } from 'antd';
import RoleHead from "./RoleHead"
import RoleTable from "./RoleTable"
import RoleTab from "./RoleTab"
import { useState,useEffect } from "react"
import axios from "axios"
import "./role.css"
const { Sider, Content } = Layout;

function Role() {
 const [isLoading,setIsLoading] = useState(true)
 const [ states,setStates ] = useState({selectedKeys:["首页","文档"]}) // 所有被选中的 row 的 key 值
 const [ roles,setRoles ] = useState([])
 const [ selectedRoleName,setSelectedRoleName] = useState("admin") // 状态值是头部的角色人员

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    let { data } = await axios.get("http://127.0.0.1:8000/roles")
    // console.log(data)
    await setRoles(data)
    await setIsLoading(false)
    },[])
 
  let getMenus = async (id,name) => { //用于获取单个角色的权限
    // console.log(id)
    let { data } = await axios.get(`http://127.0.0.1:8000/roles?id=${id}`) //分配的权限
    // console.log(typeof data[0].menu)
    //勾选后的menu 是string 需要转成 json
    typeof data[0].menu==="string"?await setStates({selectedKeys:JSON.parse(data[0].menu)}):await setStates({selectedKeys:data[0].menu})
    await setSelectedRoleName(name)
    await setIsLoading(false)  //加载状态
  }

  let ajaxRole = async () => {
    setIsLoading(true)  //呈现加载状态
    let { data } = await axios.get("http://127.0.0.1:8000/roles")
    await setRoles(data)
    await setIsLoading(false)
  }
  //收集分配给角色的权限
  let onChange = (selectedRowKeys, selectedRows) => {
    // console.log(selectedRowKeys,selectedRows)
    setStates({selectedKeys:selectedRowKeys})
  }  
  
    return (
        <Spin spinning={isLoading}>
          <RoleHead selectedRoleName = {selectedRoleName} states={states} ajaxRole={ajaxRole} setIsLoading={setIsLoading} roles={roles}></RoleHead>
          <Divider></Divider>
          <Layout>
              <Sider className="role-sider" width="60%">
                <RoleTable isLoading={isLoading} setIsLoading={setIsLoading} roles = {roles} getMenus = {getMenus}></RoleTable>
              </Sider>
              
              <Content style={{width:'30%'}}>
                <RoleTab states={states} onChange={onChange}></RoleTab>
              </Content>
          </Layout>
          </Spin>
    )
}
  
export default Role;
import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import axios from "axios"
import RoleForm from "./RoleForm"
import "./role.css"
import qs from "qs"
const RoleHead = (props) => {
    // console.log(props)
    const { selectedRoleName,roles,states,ajaxRole } = props;   //解构props
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({}); // To disable submit button at the beginning.
    
    useEffect(() => {
      forceUpdate({});
    }, []);
  
    const onFinish = async (values) => {
      // console.log('Finish:', values);
      
    };
    const save = async () => {   //给角色分配权限
      props.setIsLoading(true)
      let id = roles.findIndex((item,index) => {
        return item.name === selectedRoleName
      })
      const { key,name,describle } = roles[id]
      await axios.put(`http://127.0.0.1:8000/roles/${id}`,qs.stringify({key,name,describle,menu:JSON.stringify(states.selectedKeys)}))
      await props.setIsLoading(false)
      
    }

    return (

    <>
    <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="角色名"
      >
        <Input placeholder="请输入角色名" />
      </Form.Item>
      
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
          >
            查询
          </Button>
        )}
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            htmlType="reset"
    
          >
            重置
          </Button>
        )}
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <RoleForm roles={roles} ajaxRole = {ajaxRole}></RoleForm>
        )}
      </Form.Item>
      <div className="role-menu-tip">
        {selectedRoleName ? <span>当前角色权限：「{selectedRoleName}」</span> : <span>请在左侧列表中选择一个角色！</span>}
        <Button disabled={!selectedRoleName} type="primary" onClick={save}>保存权限</Button>
      </div>
    </Form>
    
    </>
    )
}
export default RoleHead;
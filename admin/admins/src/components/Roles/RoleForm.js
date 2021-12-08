import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Modal, Button, Spin } from 'antd';
import axios from "axios"
import qs from "qs"
// const layout = {
//   labelCol: {
//     span: 8,
//   },
//   wrapperCol: {
//     span: 16,
//   },
// };
// const tailLayout = {
//   wrapperCol: {
//     offset: 8,
//     span: 16,
//   },
// };

// reset form fields when modal is form, closed
const useResetFormOnCloseModal = ({ form, visible }) => {
  const prevVisibleRef = useRef();
  useEffect(() => {
    prevVisibleRef.current = visible;
  }, [visible]);
  const prevVisible = prevVisibleRef.current;
  useEffect(() => {
    if (!visible && prevVisible) {
      form.resetFields();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);
};

const ModalForm = ({ visible, onCancel,ajaxRole }) => {  //弹窗表单组件
  const [form] = Form.useForm();
  const [ isLoading,setIsLoading ] = useState(false)
  useResetFormOnCloseModal({
    form,
    visible,
  });
  const onFinish = (values) => {  //
    // console.log(values) //就是表单填入的数据
    setIsLoading(true)
    const {name,key,describle}=values
    axios.post("http://127.0.0.1:8000/roles",qs.stringify({key,name,describle}))
    .then(res => {
        // console.log(res)
        setIsLoading(false)
        onCancel()
        // 表单输入完成后 让页面出现加载状态 从而将数据渲染出来
        ajaxRole() //
    })
  }
  const onOk = () => {
    form.submit();

  };

  return (
    <Modal title="添加角色" visible={visible} onOk={onOk} onCancel={onCancel}>
     <Spin spinning = {isLoading}>
      <Form form={form} layout="vertical" name="userForm" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="角色名"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="key"
          label="key"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="describle"
          label="描述"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
      </Spin>
    </Modal>
  );
};
const RoleForm = (props) => {   //添加 按钮这个组件
  // console.log(props)
  const [visible, setVisible] = useState(false);

  const showUserModal = () => {
    setVisible(true);
  };

  const hideUserModal = () => {
    setVisible(false);
  };

  // eslint-disable-next-line no-unused-vars
  const onFinish = (values) => {
    // console.log('Finish:', values);
  };

  return (
    <>
        <Button
            htmlType="button"
            type="primary"
            style={{
            margin: '0 8px',
            }}
            onClick={showUserModal}
        >
            添加
        </Button>
        <ModalForm visible={visible} onCancel={hideUserModal} ajaxRole = {props.ajaxRole}/>
    </>
  );
};

export default RoleForm
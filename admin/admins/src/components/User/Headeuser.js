import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import store from "../../store/store"
import requestTableAsync from "../../store/action"

export default function Headeruser(){
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({}); // To disable submit button at the beginning.

    useEffect(() => {
      forceUpdate({});
    }, []);
  
    //查
    const onFinish = async(value) => {
      //  console.log('Finish:', value);
      await store.dispatch(requestTableAsync(`http://127.0.0.1:8000/users/?name=${value.name}`))

    };

    return(
        <div>
              <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
                <Form.Item name="name"   label="名称:">        
                  <Input  placeholder="请输入名称" />
                </Form.Item>

                <Form.Item name="职位" label="职位:" >
                  <Input placeholder="请输入职位"/>
                </Form.Item>

                <Form.Item shouldUpdate>
                  {() => (
                    <Button type="primary"htmlType="submit">  
                      提交
                    </Button>
                  )}
                </Form.Item>
                <Form.Item shouldUpdate>
                  {() => (
                    <Button htmlType="reset">
                      重置
                    </Button>
                  )}
                </Form.Item>
                <Form.Item shouldUpdate>
                  {() => (
                    <Button  type="primary"  htmlType="add">
                      添加
                    </Button>
                  )}
                </Form.Item>
                <Form.Item shouldUpdate>
                  {() => (
                    <Button
                      type="primary"
                      htmlType="del"
                      disabled={
                        !form.isFieldsTouched(true) ||
                        !!form.getFieldsError().filter(({ errors }) => errors.length).length
                      }
                    >
                      删除
                    </Button>
                  )}
                </Form.Item>
                  
                </Form>
        </div>
    )
}
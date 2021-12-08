import React  from 'react';
import { Form, Input, Select } from 'antd';
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
// const tailLayout = {
//   wrapperCol: {
//     offset: 8,
//     span: 16,
//   },
// };

class Myform extends React.Component {
  formRef = React.createRef();
  onGenderChange = (value) => {
    // eslint-disable-next-line default-case
    switch (value) {
      case 'male':
        this.formRef.current.setFieldsValue({
          note: 'Hi, man!',
        });
        return;

      case 'female':
        this.formRef.current.setFieldsValue({
          note: 'Hi, lady!',
        });
        return;

      case 'other':
        this.formRef.current.setFieldsValue({
          note: 'Hi there!',
        });
    }
  };
  onFinish = (values) => {
    console.log(values);
  };
  onReset = () => {
    this.formRef.current.resetFields();
  };
  onFill = () => {
    this.formRef.current.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };

  render(props) {
    console.log(this.props)
    return (
      <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input  defaultValue={this.props.formuser.name}/>
        </Form.Item>
        <Form.Item
          name="age"
          label="年龄"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input  defaultValue={this.props.formuser.age}/>
          </Form.Item>

        <Form.Item
          name="work"
          label="工作"

        >
          <Select
            placeholder="请选择"
            onChange={this.onGenderChange}
            allowClear
            defaultValue={this.props.formuser.work}
          >
            <Option value="qd" >前端</Option>
            <Option value="hd">后端</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="zhiwei"
          label="职位"

        >
          <Select
            placeholder="请选择"
            onChange={this.onGenderChange}
            allowClear
            defaultValue={this.props.formuser.zhiwei}
          >
             <Option value="yg">员工</Option>
            <Option value="zj">总监</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="juese"
          label="角色"

        >
          <Select
            placeholder="请选择"
            onChange={this.onGenderChange}
            allowClear
            defaultValue="普通用户"
          >
            <Option value="ad">管理员</Option>
            <Option value="pt">普通用户</Option>
          </Select>
        </Form.Item>

      </Form>
    );
  }
}

export default Myform


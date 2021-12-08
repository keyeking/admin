import React, { useState,useEffect } from 'react';
import {Table} from 'antd';
import axios from "axios"
//删除时确认的函数
// function confirm(e) {
//     console.log(e);
//     message.success('Click on Yes');
// }

// function cancel(e) {
// console.log(e);
// message.error('Click on No');
// }



const columns = [  //表头
 
  {
    title: '名称',
    dataIndex: 'name',
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    render: (text) => <a>{text}</a>,
  },
  {
    title: '类型',
    dataIndex: 'type',
  },
 
];
const data = [];
for (let i = 0; i < 6; i++) {
  data.push({
    key: i,
    name: `张三 ${i}`,
    type: `用户管理`,
  });
}



const RoleTab = (props) => {
  // console.log(props)
  const { states,onChange } = props   //
  const [menus,setMenus] = useState([]) //定义一个初始状态 menus
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const { data } = await axios.get("http://localhost:8000/menus")
    // console.log(data)
    await setMenus(data) //异步的
  },[])
  
  return (
    <div>
      <Table   
        rowSelection={{
          selectedRowKeys:states.selectedKeys,
          onChange,
        }}
        
        columns={columns}
        dataSource={menus}
        pagination={false}
      />
    </div>
  );
};
export default RoleTab
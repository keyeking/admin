
import React, { useState,useEffect } from 'react';
import Talk from './Talk';
import { Table, Divider , Space , Popconfirm, message } from 'antd';
import store from '../../store/store';
import requestTableAsync from "../../store/action"
const columns = [//表头
  {
    title: 'ID',
    dataIndex: 'id',
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    render: (text) => <a>{text}</a>,
  },
  {
    title: '用户名',
    dataIndex: 'name',
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    render: (text) => <a>{text}</a>,
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '工作',
    dataIndex: 'work',
  },
  {
    title: '职位',
    dataIndex: 'zhiwei',
  },
  {
    title: '操作',
    dataIndex: 'action',
    render: (text, record) => {
        // console.log(record)
        return(
        <Space size="middle">
                {/*  eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a><Talk user={record}/></a>       
          <Popconfirm
               title={`你确定要删除${record.name}`}
               onConfirm={confirm}
               onCancel={cancel}
               okText="Yes"
               cancelText="No"
             >
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
               <a href="#" style={{color:'red'}}>删除</a>
             </Popconfirm>
        </Space>
        )       
      },
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
};
//---
//删除时确认的函数
function confirm(e) {
    console.log(e,"e");
    message.success('删除成功',);
  }
  
  function cancel(e) {
    console.log(e);
    message.error('删除失败');
  }

export default function Tableuser(){
    // const [selectionType, setSelectionType] = useState('checkbox');
    const [selectionType] = useState('checkbox');
    const [data,setData]=useState([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( async ()=>{
      //     
      await store.dispatch(requestTableAsync("http://127.0.0.1:8000/users"))  //异步的
      setData(store.getState())
      store.subscribe(async () => {
        await setData(store.getState())
      })
    
    },[])
    return (
        <div>
              <Divider />
              <Table
                rowSelection={{
                  type: selectionType,
                  ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
              />
        </div>
    )
}
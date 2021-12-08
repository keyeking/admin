import React, { useState } from 'react';
import { Table, Space,Popconfirm, message} from 'antd';

//删除时确认的函数
function confirm(e) {
    // console.log(e);
    message.success('Click on Yes');
}

function cancel(e) {
// console.log(e);
message.error('Click on No');
}

const columns = [  //表头
  {
    title:"#",
    dataIndex:"key"
  },
  {
    title: '角色名称',
    dataIndex: 'name',
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    render: (text) => <a>{text}</a>,
  },
  {
    title: '描述',
    dataIndex: 'describle',
  },
  {
      title:"操作",
      dataIndex:"action",
      render: (text, record) => {
        // console.log(record)
        return (<Space size="middle">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>编辑</a>
        <Popconfirm
        title={`您确定删除${record.name}`}
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
    >
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#" style={{color:"red"}}>删除</a>
    </Popconfirm>
      </Space>)
      }  
  }
];


// eslint-disable-next-line no-unused-vars
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => {
    // console.log(record) //data中的每一条数据
    return {
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }},
};


const RoleTable = (props) => {

  // console.log(props)
  // let { isLoading } = props
  // eslint-disable-next-line no-unused-vars
  const [rowId,setRowId] = useState(0)
  // const [data,setData] = useState([])
  
  // let setRowClassName = (record) => {
  //   console.log(record)
  //   console.log(rowId)
  //   return record.id===rowId?"clickname":""
  // }

  return (
    <div>
      <Table
        columns={columns}
        dataSource={props.roles}
        pagination={false}
        scroll={{y:440}}     
        onRow={record => {         
          return {
            onClick: async function(ev){
              // console.log(record)
             await props.setIsLoading(true)
             await props.getMenus(record.id,record.name)
            
             setRowId(record.id)
          
            }
          }
        }}
      ></Table>
    </div>
  );
};

export default RoleTable



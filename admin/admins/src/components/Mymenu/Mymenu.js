import { Menu } from 'antd';
import { Link } from "react-router-dom";
import React from "react"
import {

    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,

  } from '@ant-design/icons';

function MyMenu(props) {
    // console.log(props)
    
 //增加tab
 let add = ({item,key,keyPath}) => {
    // console.log(item,keyPath)
    const { panes } = props.tabsstate; //必须使用组件中的panes 这个状态
    let activeitem = panes.find((item,i)=>{
      return item.key === key  //相等代表在状态值中存在 返回这一项对象 false 代表没有 返回的是undefined
    })
    const activeKey = key; //唯一的
    // console.log(activeKey)
    if(!activeitem){
      //给tab添加title
      let title=""
      switch (activeKey) {
        case "1":
          title="首页";
          break;
        case "2":
          title="用户管理";
          break;
        case "3":
          title="角色管理";
          break;
        default:
          title="New Tab";
          break;
      }
      panes.push({ title, content: 'New Tab Pane', key: activeKey });
    }
    props.setTabsstate({ panes, activeKey });
    
  };


    return (
        <>
          <Menu theme="" mode="inline" defaultSelectedKeys={['1']} onClick={add}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to="/home/first">首页</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                <Link to="/home/users">用户管理</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<UploadOutlined />}>
                <Link to="/home/roles">角色管理</Link>
              </Menu.Item>
          </Menu>
        </>
    )
}

export default MyMenu;
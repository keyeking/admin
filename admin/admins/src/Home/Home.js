
import React,{ useEffect, useState } from "react"
// import {Input, Button, Form} from 'antd';
import {Helmet} from 'react-helmet';
import { matchRoutes, renderRoutes } from "react-router-config";
import routes from "../routes/routes"
import Mymenu from "../components/Mymenu/Mymenu"
// -------
// import { , Button } from 'antd';
// const { TabPane } = Tabs;
import { Layout,Breadcrumb,Tabs} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  AntDesignOutlined,
} from '@ant-design/icons';
import "./home.less"
const { Header, Sider, Content } = Layout;
const { TabPane } = Tabs;


function Home(props){
    // console.log(props)
    let arr=matchRoutes(routes,props.location.pathname)

    const [states,setStates] = useState({
        collapsed: false,
        h1:null
    })
    // ----
  //  处理tabs
  const panes = [
    //  { title: '公告', content: 'Content of Tab Pane 1', key: '0' },
  ];
  const [tabsstate,setTabsstate] = useState({
    activeKey: 0,
    panes
  })
  // 修改激活状态
  let onChange = activeKey => {
    setTabsstate({...tabsstate,activeKey });
    let pathname = ""
    switch (activeKey) {
      case "1":
        pathname = "/home/first";
        break;
      case "2":
        pathname = "/home/users";
        break; 
      case "3":
        pathname = "/home/roles";
        break;   
      default:
        pathname = "/home/first"
        break;
    }
    props.history.push(pathname)
  };

  //删除tab
  let remove = targetKey => {
    let { activeKey } = tabsstate;
    let lastIndex;
  //保证首页是不会删除的
    tabsstate.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = tabsstate.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    setTabsstate({ panes, activeKey });
  };
  let onEdit = (targetKey, action) => {
    // console.log(targetKey,action)
    remove(targetKey)
  };

     let toggle = () => {
        setStates({
          collapsed: !states.collapsed
        });
        // console.log(states.h1)
        states.collapsed?states.h1.style.display="block":states.h1.style.display="none"
      };
    
    useEffect(()=>{
        
    })
    
    return (
       <>
         <Helmet title="首页"/>
         <Layout style={{ minHeight: '100vh' }}>
            <Sider className="sider" trigger={null} collapsible collapsed={states.collapsed}>
            <div className="home-logo">
              <img alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"></img>
              <h1 ref={(h1)=>{states.h1=h1}}>React Admin</h1>
            </div>
           <Mymenu tabsstate={tabsstate} setTabsstate={setTabsstate}/>
            </Sider>
            <Layout className="site-layout">
            <Header className="site-layout-background-header clear" style={{ padding: 0 ,background:'#2F54EB' }}>
                  {
                      React.createElement(states.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                         className: 'trigger',
                         onClick: toggle,
                      })
                  }
                   <div  className="home">
                   <Breadcrumb >
                      <Breadcrumb.Item href="" >
                        <HomeOutlined />
                        <span>首页</span>
                      </Breadcrumb.Item>     
                      <Breadcrumb.Item href="https://ant.design/index-cn" >
                        <AntDesignOutlined /> 
                        <span>Ant Design官网</span>
                      </Breadcrumb.Item>                   
                    </Breadcrumb>
                   </div>
                </Header>
            
            <Content
                className="site-layout-background"
                style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                }}
            >
                 <Tabs
                    hideAdd
                    onChange={onChange}
                    activeKey={tabsstate.activeKey}
                    type="editable-card"
                    onEdit={onEdit}
                  >
                    {tabsstate.panes.map(pane => (
                      <TabPane tab={pane.title} key={pane.key} closeIcon={pane.key==='0'? true : false}>
                         {renderRoutes(arr[0].route.routes)}  
                      </TabPane>
                    ))}
                  </Tabs>
            </Content>
            </Layout>
        </Layout>
       </>
    )
}
export default Home;



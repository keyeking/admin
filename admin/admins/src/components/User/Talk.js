import { Modal, Button } from 'antd';
import React from "react"
import Myform from './Myform';
 const Talk = (props) => {
    // console.log(props)
  const [visible, setVisible] = React.useState(false);   //model的消失和显示
  const [confirmLoading, setConfirmLoading] = React.useState(false);  //决定确认按钮的loading状态
//   const [modalText, setModalText] = React.useState('Content of the modal');

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    // setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    // console.log('Clicked cancel button');
    setVisible(false);
  };

  return (
    <div>
      <span onClick={showModal} >编辑</span>
      <Modal
        title="修改用户"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        cancelText="重置"
        okText="保存"
        footer={
            [
                <Button type="primary" onClick={handleOk} loading={confirmLoading}>保存</Button>,
                <Button onClick={handleCancel}>重置</Button>
            ]
        }
      >
        <p><Myform formuser={props.user}/></p>
      </Modal>
    </div>
  );
};
export default Talk
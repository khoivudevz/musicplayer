import React, { useState } from "react";
import { Button, Modal } from "antd";
import { BiMenu } from "react-icons/bi";

import "./musicList.scss";

export default function MusicList() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <div
        onClick={showModal}
        className="hover:text-white transition-all cursor-pointer rounded-full"
      >
        <BiMenu size={50} />
      </div>
      <Modal
        title="Title"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "antd";
import { BsMusicNoteList, BsMusicNote } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";

import "./musicList.scss";
import { setCurrentIndex, setPlaying } from "../../reducers/musicSlice";

export default function MusicList() {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.musicSlice.musicData);

  const setIndex = (index) => {
    dispatch(setCurrentIndex(index));
    dispatch(setPlaying(true));
  };

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <div
        onClick={showDrawer}
        className="hover:text-white transition-all cursor-pointer rounded-full"
      >
        <BsMusicNoteList size={30} />
      </div>
      <Drawer
        title={
          <div className="flex items-center justify-center space-x-5">
            <p className="text-[25px cursor-pointer">Play List</p>
            <BsMusicNoteList size={25} />
          </div>
        }
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <div className="space-y-7">
          {data.musicList.map((song, index) => {
            return (
              <div
                className="flex space-x-2 hover:shadow-2xl cursor-pointer border-[#00000067] hover:border-white transition-all border-b-2 pb-8 bg-blur"
                onClick={() => {
                  setIndex(index);
                }}
              >
                <div className="w-[150px] h-[150px] shadow-2xl border-white border-2">
                  <img
                    src={song.image}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <div className="flex items-center  space-x-3">
                    <BsMusicNote size={20} />
                    <p className="text-[20px]">{song.name}</p>
                  </div>
                  <div className="flex items-center  space-x-3">
                    <FaMicrophone size={20} />
                    <p className="text-[20px]">{song.singer}</p>
                  </div>
                  <div className="flex items-center  space-x-3">
                    <BiTimeFive size={20} />
                    <p className="text-[20px]">{song.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Drawer>
    </>
  );
}

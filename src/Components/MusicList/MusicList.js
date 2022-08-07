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

  const currentIndex = useSelector((state) => state.musicSlice.currentIndex);

  const data = useSelector((state) => state.musicSlice.musicData);

  const setIndex = (index) => {
    dispatch(setCurrentIndex(index));
    dispatch(setPlaying(true));
  };

  const [visible, setVisible] = useState(false);

  const [active, setActive] = useState(false);

  const showDrawer = () => {
    setVisible(!visible);
    setActive(!active);
  };

  const onClose = () => {
    setVisible(false);
    setActive(false);
  };
  return (
    <>
      <div
        onClick={showDrawer}
        id={active ? "music-list-active" : ""}
        className="hover:text-white transition-all cursor-pointer rounded-full"
      >
        <BsMusicNoteList size={30} />
      </div>
      <Drawer
        mask={false}
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
                id={index === currentIndex ? "current-song" : ""}
                className="flex  hover:shadow-2xl cursor-pointer border-[#00000067] hover:border-white transition-all border-b-2 py-8 px-3 bg-blur"
                onClick={() => {
                  setIndex(index);
                }}
              >
                <div className="w-[30%] ">
                  <div className=" max-w-[90px] max-h-[90px] min-w-[90px] min-h-[90px] sm:max-w-[145px] sm:max-h-[145px] sm:min-w-[145px] sm:min-h-[145px] ">
                    <img
                      src={song.image}
                      alt="banner"
                      className="object-cover  max-w-[86px] max-h-[86px] min-w-[86px] min-h-[86px] sm:max-w-[141px] sm:max-h-[141px] sm:min-w-[141px] sm:min-h-[141px] "
                    />
                  </div>
                </div>
                <div className="w-[70%]">
                  <div className="flex items-center  space-x-3">
                    <BsMusicNote size={20} className="w-[30%]" />
                    <p className="text-[20px] w-[70%] break-words">
                      {song.name}
                    </p>
                  </div>
                  <div className="flex items-center  space-x-3">
                    <FaMicrophone size={20} className="w-[30%]" />
                    <p className="text-[20px] w-[70%] break-words">
                      {song.singer}
                    </p>
                  </div>
                  <div className="flex items-center  space-x-3">
                    <BiTimeFive size={20} className="w-[30%]" />
                    <p className="text-[20px] w-[70%] break-words">
                      {song.time}
                    </p>
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

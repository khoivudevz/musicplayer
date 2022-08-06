import React, { useEffect } from "react";
import { Clouds } from "../../Components/BackgroundAnimation/Clouds";
import { useDispatch } from "react-redux";
import { getMusicList } from "../../reducers/musicSlice";

export default function Home() {
  return (
    <div>
      <Clouds />
    </div>
  );
}

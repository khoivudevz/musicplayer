import React, { useEffect, useState } from "react";
import MovingText from "react-moving-text";
import { FcMusic } from "react-icons/fc";

import "./loading.scss";

export default function Loading() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHidden(true);
    }, 1500);
  }, []);

  return (
    <div id={hidden ? "hidden-loading" : ""}>
      <div className="w-screen h-screen bg-white">
        <MovingText
          type="fadeIn"
          duration="1s"
          delay="0s"
          direction="normal"
          timing="ease-in-out"
          iteration="1"
          fillMode="none"
          className="w-full h-full flex flex-col items-center justify-center"
        >
          <div className="flex items-center justify-center">
            <FcMusic className="text-[50px] sm:text-[80px]  lg:size-[100px]" />{" "}
            <p className="text-black text-[50px] sm:text-[80px] lg:text-[100px] font-bold">
              Chill Music
            </p>
          </div>
          <div>
            <p className="text-black text-[15px] lg:text-[20px] font-extralight italic">
              Made by itsjinhk (khoivudev)
            </p>
          </div>
        </MovingText>
      </div>
    </div>
  );
}

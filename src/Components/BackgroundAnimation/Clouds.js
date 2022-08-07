import React, { useState, useEffect, useRef } from "react";
import CLOUDS from "vanta/dist/vanta.clouds.min";
import * as THREE from "three";
import MusicPlayer from "../MusicPlayer/MusicPlayer";

import "./cloud.scss";

export const Clouds = () => {
  const [vantaEffect, setVantaEffect] = useState(0);
  const [display, setDisplay] = useState(false);

  const vantaRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        CLOUDS({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          backgroundColor: 0x2a1c1c,
          skyColor: 0x6985ac,
          sunColor: 0xff6600,
          sunGlareColor: 0xfa9b00,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  useEffect(() => {
    setTimeout(() => {
      setDisplay(true);
    }, 3500);
  }, []);

  return (
    <div
      ref={vantaRef}
      className="absolute top-0 left-0 w-full h-full -z-[1]"
      id={display ? "d-none" : ""}
    >
      <MusicPlayer />
    </div>
  );
};

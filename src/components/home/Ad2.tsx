"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { IoVolumeHigh, IoVolumeMute } from "react-icons/io5";
const Ad2 = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };
  return (
    <div className="flex flex-col gap-6 items-center">
      <Image
        src={"/assets/images/home/ads/ict.png"}
        height={100}
        width={100}
        alt="advertisement"
        className="mix-blend-multiply"
      />
      <Image
        src={"/assets/images/home/ads/DoICT.jpg"}
        height={100}
        width={100}
        alt="advertisement"
        className="mix-blend-multiply"
      />
      <Image
        src={"/assets/logoText.png"}
        height={100}
        width={100}
        alt="advertisement"
      />
      <div className="h-[260px] w-full md:h-[530px] md:w-[200px] bg-black rounded-md relative">
        <video
          ref={videoRef}
          src={"/sp-11.mp4"}
          autoPlay
          loop
          muted={isMuted}
          className="w-full h-full object-contain"
        />
        <button
          onClick={toggleMute}
          className="absolute top-2 right-2 text-white px-2 py-1 rounded"
        >
          {isMuted ? <IoVolumeMute size={22}/> : <IoVolumeHigh size={22}/>}
        </button>
      </div>
    </div>
  );
};

export default Ad2;

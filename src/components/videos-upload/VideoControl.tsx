// components/HomePage.tsx
"use client";

import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";

const VideoControl: React.FC = () => {
  const [progressTime, setProgressTime] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Handler to update the progress time
  const handleProgress = (time: number) => {
    setProgressTime(time);
  };

  // Handler for video completion
  const handleComplete = () => {
    setIsCompleted(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Course Title: Video Tutorial</h1>

      {/* Video Player Component */}
      <VideoPlayer
         title="Tech Video"
        description="This is a description of the sample video."
        startTime={progressTime} // Resume from last progress
        onProgress={handleProgress}
        onComplete={handleComplete}
        className="my-4"
      />

      {/* Video Completion Indicator */}
      {isCompleted && (
        <div className="mt-4 text-green-600 font-semibold">
          You have completed this video!
        </div>
      )}
    </div>
  );
};

export default VideoControl;

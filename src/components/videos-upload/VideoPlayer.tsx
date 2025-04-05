"use client";

import React, { useEffect, useRef, useState } from "react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import Hls from "hls.js";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { url } from "@/api/api";

interface VideoPlayerProps {
  // videoId: string;
  title?: string;
  description?: string;
  startTime?: number;
  onProgress?: (time: number) => void;
  onComplete?: () => void;
  className?: string;
}

// const videoSrc =
//   "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8";

const videoSrc = `${url}/public/attachments/course/C241000000001/video/test.mp4`;

// const videoSrc =
//   "https://stream-akamai.castr.com/5b9352dbda7b8c769937e459/live_2361c920455111ea85db6911fe397b9e/index.fmp4.m3u8";

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  title,
  description,
  startTime = 0,
  onProgress,
  onComplete,
  className = "",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const plyrRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(startTime);

  useEffect(() => {
    if (!videoRef.current) return;

    const videoElement = videoRef.current;
    const isM3U8 = videoSrc.endsWith(".m3u8");
    let hls: Hls | null = null;

    const handlePlyrEvents = () => {
      if (!plyrRef.current) return;

      // Handle timeupdate events
      plyrRef.current.plyr.on("timeupdate", () => {
        const currentTime = plyrRef.current.plyr.currentTime || 0;
        setCurrentTime(currentTime);
        if (onProgress) onProgress(currentTime);
      });

      // Handle video end events
      plyrRef.current.plyr.on("ended", () => {
        if (onComplete) onComplete();
      });
    };

    if (isM3U8 && Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(videoElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
        handlePlyrEvents();
      });
    } else {
      videoElement.src = videoSrc;
      videoElement.addEventListener("loadedmetadata", () => {
        setIsLoading(false);
        handlePlyrEvents();
      });
    }

    return () => {
      hls?.destroy();
      plyrRef.current?.plyr?.destroy();
    };
  }, [onProgress, onComplete]);

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-0">
        <div className="relative group">
          {/* Video Title Overlay */}
          {title && (
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <h2 className="text-white text-lg font-semibold truncate">
                      {title}
                    </h2>
                  </TooltipTrigger>
                  {description && (
                    <TooltipContent>
                      <p>{description}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </div>
          )}

          {/* Loading Spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          )}

          {/* Progress Indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/20">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{
                width: `${
                  (currentTime / (videoRef.current?.duration || 1)) * 100
                }%`,
              }}
            />
          </div>

          {/* Video Player */}
          <div className="aspect-video bg-black">
            <Plyr
              ref={plyrRef}
              source={{
                type: "video",
                sources: [
                  {
                    src: videoSrc,
                    type: videoSrc.endsWith(".m3u8")
                      ? "application/x-mpegURL"
                      : "video/mp4",
                  },
                ],
              }}
              options={{
                controls: [
                  "play-large",
                  "play",
                  "progress",
                  "current-time",
                  "duration",
                  "mute",
                  "volume",
                  "settings",
                  "fullscreen",
                ],
                settings: ["captions", "quality", "speed", "loop"],
                speed: {
                  selected: 1,
                  options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
                },
                quality: {
                  default: 720,
                  options: [240, 360, 480, 720, 1080],
                  forced: true,
                  // onChange: (newQuality) =>
                  //   console.log("Quality changed to:", newQuality),
                },
                keyboard: { focused: true, global: true },
                tooltips: { controls: true, seek: true },
                hideControls: true,
                loop: { active: true },
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;

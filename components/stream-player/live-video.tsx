"use client";

import { Participant, Track } from "livekit-client";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useTracks } from "@livekit/components-react";
import { FullscreenControl } from "./fullscreen-control";
import { useEventListener } from "usehooks-ts";
import { VolumeControl } from "./volume-control";

interface ILiveVideoProps {
  participant: Participant;
}
export const LiveVideo = ({ participant }: ILiveVideoProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(0);
  const videoRef = useRef<ElementRef<"video">>(null);
  const wrapperRef = useRef<ElementRef<"div">>(null);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });

  const toggleFullScreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else if (wrapperRef.current) {
      wrapperRef.current.requestFullscreen();
    }
  };

  const handleFullscrenChange = () => {
    const isCurrentlyFullSCreen = !!document.fullscreenElement;
    setIsFullscreen(isCurrentlyFullSCreen);
  };

  useEventListener("fullscreenchange", handleFullscrenChange, wrapperRef);

  const onVolumeChange = (value: number) => {
    setVolume(+value);
    if (videoRef.current) {
      videoRef.current.muted = +value === 0;
      videoRef.current.volume = +value * 0.01;
    }
  };

  useEffect(() => {
    onVolumeChange(0);
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-full flex">
      <video ref={videoRef} width="100%" />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
          <VolumeControl value={volume} onChange={onVolumeChange} />
          <FullscreenControl
            isFullscreen={isFullscreen}
            onToggle={toggleFullScreen}
          />
        </div>
      </div>
    </div>
  );
};

import React, { ReactNode, RefObject, useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';

const VIDEO_FPS = 60;
const CANVAS_WIDTH = '640px';
const CANVAS_HEIGHT = '360px';

interface ICanvasControlContext {
  isPlaying: boolean;
  videoRef: RefObject<HTMLVideoElement | null> | null;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setVideoRef: (ref: HTMLVideoElement | null) => void;
  setCanvasARef: (ref: HTMLCanvasElement | null) => void;
  setCanvasBRef: (ref: HTMLCanvasElement | null) => void;
  play: () => void;
  pause: () => void;
  seek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  stepFrame: (direction: 'forward' | 'back') => void;
}

const CanvasControlContext = createContext<ICanvasControlContext>({
  isPlaying: false,
  videoRef: null,
  setIsPlaying: () => {},
  setVideoRef: () => {},
  setCanvasARef: () => {},
  setCanvasBRef: () => {},
  play: () => {},
  pause: () => {},
  seek: () => {},
  stepFrame: () => {},
});

const CanvasControlProvider = ({ children }: { children: ReactNode }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasARef = useRef<HTMLCanvasElement>(null);
  const canvasBRef = useRef<HTMLCanvasElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const setVideoRef = (ref: HTMLVideoElement | null) => {
    videoRef.current = ref;
  };

  const setCanvasARef = (ref: HTMLCanvasElement | null) => {
    canvasARef.current = ref;
  };

  const setCanvasBRef = (ref: HTMLCanvasElement | null) => {
    canvasBRef.current = ref;
  };

  const drawFrame = useCallback(() => {
    const video = videoRef.current;
    const canvasA = canvasARef.current;
    const canvasB = canvasBRef.current;

    if (!video || !canvasA || !canvasB) return;

    canvasA.width = video.videoWidth;
    canvasA.height = video.videoHeight;

    canvasA.style.width = CANVAS_WIDTH;
    canvasA.style.height = CANVAS_HEIGHT;
    canvasB.width = video.videoWidth;
    canvasB.height = video.videoHeight;
    canvasB.style.width = CANVAS_WIDTH;
    canvasB.style.height = CANVAS_HEIGHT;

    const ctxA = canvasA.getContext('2d');
    const ctxB = canvasB.getContext('2d');

    if (ctxA && ctxB) {
      ctxA.drawImage(video, 0, 0, canvasA.width, canvasA.height);
      ctxB.drawImage(video, 0, 0, canvasB.width, canvasB.height);
    }

    videoRef.current?.requestVideoFrameCallback(drawFrame);
  }, [videoRef, canvasARef, canvasBRef]);

  const play = useCallback(() => {
    setIsPlaying(true);
    videoRef.current?.play().catch(() => console.log("Error playing the video"));
    videoRef.current?.requestVideoFrameCallback(drawFrame);
  }, [videoRef, isPlaying, drawFrame]);

  const pause = useCallback(() => {
    videoRef.current?.pause();
    setIsPlaying(false);
  }, [isPlaying, videoRef]);

  const seek = useCallback(
    (e) => {
      if (videoRef.current) {
        const time = parseFloat(e.target.value);
        videoRef.current.currentTime = time;
        drawFrame();
      }
    },
    [videoRef, drawFrame]
  );

  const stepFrame = useCallback((direction) => {
    if (isPlaying) pause();
    if (!videoRef.current) return;

    const frameStep = 1 / VIDEO_FPS;
    if(direction === 'forward') {
      videoRef.current.currentTime += frameStep;
    }
    if (direction === 'back') {
      videoRef.current.currentTime -= frameStep;
    }
    drawFrame();
  }, [isPlaying, videoRef]);

  return (
    <CanvasControlContext.Provider
      value={{
        isPlaying,
        videoRef,
        setIsPlaying,
        setVideoRef,
        setCanvasARef,
        setCanvasBRef,
        play,
        pause,
        seek,
        stepFrame,
      }}
    >
      {children}
    </CanvasControlContext.Provider>
  );
};

const useCanvasControl = () => {
  return useContext(CanvasControlContext);
};

export { CanvasControlProvider, useCanvasControl };

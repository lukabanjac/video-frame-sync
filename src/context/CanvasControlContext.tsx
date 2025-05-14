import React, { ReactNode, useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';

const VIDEO_FPS = 60;
const CANVAS_WIDTH = '640px';
const CANVAS_HEIGHT = '360px';

interface ICanvasControlContext {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setPlayerRef: (ref: HTMLVideoElement | null) => void;
  setCanvasARef: (ref: HTMLCanvasElement | null) => void;
  setCanvasBRef: (ref: HTMLCanvasElement | null) => void;
  play: () => void;
  pause: () => void;
  seek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  stepFrame: () => void;
}

const CanvasControlContext = createContext<ICanvasControlContext>({
  isPlaying: false,
  setIsPlaying: () => {},
  setPlayerRef: () => {},
  setCanvasARef: () => {},
  setCanvasBRef: () => {},
  play: () => {},
  pause: () => {},
  seek: () => {},
  stepFrame: () => {},
});

const CanvasControlProvider = ({ children }: { children: ReactNode }) => {
  const playerRef = useRef<HTMLVideoElement>(null);
  const canvasARef = useRef<HTMLCanvasElement>(null);
  const canvasBRef = useRef<HTMLCanvasElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const setPlayerRef = (ref: HTMLVideoElement | null) => {
    playerRef.current = ref;
  };

  const setCanvasARef = (ref: HTMLCanvasElement | null) => {
    canvasARef.current = ref;
  };

  const setCanvasBRef = (ref: HTMLCanvasElement | null) => {
    canvasBRef.current = ref;
  };

  const drawFrame = useCallback(() => {
    const video = playerRef.current;
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

    playerRef.current?.requestVideoFrameCallback(drawFrame);
  }, [playerRef, canvasARef, canvasBRef]);

  const play = useCallback(() => {
    setIsPlaying(true);
    playerRef.current?.play().catch(() => console.log("Error playing the video"));
    playerRef.current?.requestVideoFrameCallback(drawFrame);
  }, [playerRef, isPlaying, drawFrame]);

  const pause = useCallback(() => {
    playerRef.current?.pause();
    setIsPlaying(false);
  }, [isPlaying, playerRef]);

  const seek = useCallback(
    (e) => {
      if (playerRef.current) {
        const time = parseFloat(e.target.value);
        playerRef.current.currentTime = time;
        drawFrame();
      }
    },
    [playerRef, drawFrame]
  );

  const stepFrame = useCallback(() => {
    if (isPlaying) pause();
    if (!playerRef.current) return;

    const frameStep = 1 / VIDEO_FPS;
    playerRef.current.currentTime += frameStep;
    drawFrame();
  }, [isPlaying, playerRef]);

  return (
    <CanvasControlContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        setPlayerRef,
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

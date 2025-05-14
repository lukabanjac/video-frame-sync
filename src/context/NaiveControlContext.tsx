import React, { ReactNode, useCallback, useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';

const VIDEO_FPS = 60;

interface INaiveControlContext {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setPlayerARef: (ref: HTMLVideoElement | null) => void;
  setPlayerBRef: (ref: HTMLVideoElement | null) => void;
  play: () => void;
  pause: () => void;
  seek: (e: Event) => void;
  stepFrame: () => void;
}

const NaiveControlContext = createContext<INaiveControlContext>({
  isPlaying: false,
  setIsPlaying: () => {},
  setPlayerARef: () => {},
  setPlayerBRef: () => {},
  play: () => {},
  pause: () => {},
  seek: () => {},
  stepFrame: () => {},
});

const NaiveControlProvider = ({ children }: { children: ReactNode }) => {
  const playerARef = useRef<HTMLVideoElement>(null);
  const playerBRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const setPlayerARef = (ref: HTMLVideoElement | null) => {
    playerARef.current = ref;
  };

  const setPlayerBRef = (ref: HTMLVideoElement | null) => {
    playerBRef.current = ref;
  };

  const sync = () => {
    if (
      !playerARef.current ||
      !playerBRef.current ||
      playerARef.current.paused ||
      playerBRef.current.paused
    )
      return;

    const delta = Math.abs(
      playerARef.current.currentTime - playerBRef.current.currentTime
    );
    if (delta < 0.01 && delta > 0) {
      console.log('videos close');
      playerARef.current.currentTime = playerBRef.current.currentTime;
    }
  };

  const play = useCallback(() => {
    if (isPlaying) return;
    setIsPlaying(true);
    Promise.all([playerARef.current?.play(), playerBRef.current?.play()]);
  }, [playerARef, playerBRef, isPlaying, sync]);

  const pause = useCallback(() => {
    if (!isPlaying) return;
    setIsPlaying(false);
    playerARef.current?.pause();
    playerBRef.current?.pause();
    sync();
  }, [playerARef, playerBRef, isPlaying, sync]);

  const seek = (e: Event) => {
    const video = e.currentTarget as HTMLVideoElement;
    const newTime = video.currentTime;
    if (!playerARef.current || !playerBRef.current || isSyncing) return;
    setIsSyncing(true);
    playerARef.current.currentTime = newTime;
    playerBRef.current.currentTime = newTime;
    setTimeout(() => setIsSyncing(false), 10);
  };

  const stepFrame = useCallback(() => {
    pause();
    sync();
    if (!playerARef.current || !playerBRef.current) return;
    const frameStep = 1 / VIDEO_FPS;
    playerARef.current.currentTime += frameStep;
    playerBRef.current.currentTime += frameStep;
  }, [playerARef, playerBRef]);

  return (
    <NaiveControlContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        setPlayerARef,
        setPlayerBRef,
        play,
        pause,
        seek,
        stepFrame,
      }}
    >
      {children}
    </NaiveControlContext.Provider>
  );
};

const useNativeControl = () => {
  return useContext(NaiveControlContext);
};

export { NaiveControlProvider, useNativeControl };

import React, { ChangeEvent, useEffect, useState } from 'react';

import PlayIcon from '../../assets/play-icon.svg';
import PauseIcon from '../../assets/pause-icon.svg';
import { RangeInput } from '../PlaybackControl/RangeInput/RangeInput';
import { PlayPauseButton } from '../PlaybackControl/PlayPauseButton/PlayPauseButton';

interface ICanvasVideoPlayerProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  handlePlay: () => void;
  handlePause: () => void;
  handleSeek: (e: ChangeEvent<HTMLInputElement>) => void;
  isPlaying: boolean;
}

export const CanvasVideoPlayer: React.FC<ICanvasVideoPlayerProps> = ({
  canvasRef,
  videoRef,
  handlePlay,
  handlePause,
  handleSeek,
  isPlaying,
}) => {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const updateDuration = () =>
      setCurrentTime(videoRef.current?.currentTime || 0);
    videoRef.current?.addEventListener('timeupdate', updateDuration);
    return () => {
      videoRef.current?.removeEventListener('timeupdate', updateDuration);
    };
  }, []);

  return (
    <>
      <div className="relative group w-[640px] h-[360px] overflow-hidden border bg-black">
        <canvas
          ref={canvasRef}
          width={640}
          height={360}
          className="block w-full h-full min-w-[640px]"
        />

        <div className="absolute inset-0 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex justify-center gap-4 p-2 items-center">
            <PlayPauseButton
              isPlaying={isPlaying}
              play={handlePlay}
              pause={handlePause}
            />
            <RangeInput videoRef={videoRef} handleSeek={handleSeek} />
          </div>
        </div>
      </div>
    </>
  );
};

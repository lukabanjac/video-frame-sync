import React, { ChangeEvent, useEffect, useState } from 'react';

import PlayIcon from '../../assets/play-icon.svg';
import PauseIcon from '../../assets/pause-icon.svg';

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
            <button
              onClick={isPlaying ? handlePause : handlePlay}
              className="bg-white/80 hover:bg-white text-black font-bold py-1 px-3 rounded"
            >
              <div className="h-[40px] ">
                {isPlaying ? (
                  <img
                    src={PauseIcon}
                    alt="Play Button"
                    className="w-full h-full"
                  />
                ) : (
                  <img
                    src={PlayIcon}
                    alt="Pause Button"
                    className="w-full h-full"
                  />
                )}
              </div>
            </button>
            <input
              type="range"
              min={0}
              max={videoRef.current?.duration || 30}
              value={currentTime}
              step={0.1}
              onChange={handleSeek}
              className="accent-orange-300 w-2/3 bg-transparent rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    </>
  );
};

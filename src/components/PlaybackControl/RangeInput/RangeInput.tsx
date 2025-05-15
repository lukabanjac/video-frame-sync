import React, { ChangeEvent, useEffect, useState } from 'react';

interface IRangeInputProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  handleSeek: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const RangeInput: React.FC<IRangeInputProps> = ({
  videoRef,
  handleSeek,
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
    <input
        type="range"
        min={0}
        max={videoRef.current?.duration || 30}
        value={currentTime}
        step={0.1}
        onChange={handleSeek}
        className="accent-orange-300 w-2/3 bg-transparent rounded-lg cursor-pointer"
    />
  );
};

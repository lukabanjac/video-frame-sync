import React, { RefObject } from 'react';

import { PlayPauseButton } from './PlayPauseButton/PlayPauseButton';
import { RangeInput } from './RangeInput/RangeInput';

interface IPlaybackControl {
  isPlaying: boolean;
  videoRef: RefObject<HTMLVideoElement | null> | null;
  play: () => void;
  pause: () => void;
  seek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  stepFrame: (direction: 'forward' | 'back') => void;

  className?: string;
}

export const PlaybackControl: React.FC<IPlaybackControl> = ({
  isPlaying,
  pause,
  play,
  seek,
  stepFrame,
  videoRef,
  className,
}) => {
  return (
    <div
      className={`flex flex-col w-1/3 mx-auto my-[10px] justify-center bg-gray-800 ${className}`}
    >
      <div className="flex mx-auto">
        <button onClick={() => stepFrame('back')}>{'<<'}</button>
        <PlayPauseButton isPlaying={isPlaying} play={play} pause={pause} />
        <button onClick={() => stepFrame('forward')}>{'>>'}</button>
      </div>
      <div>
        {videoRef ? <RangeInput videoRef={videoRef} handleSeek={seek} /> : null}
      </div>
    </div>
  );
};

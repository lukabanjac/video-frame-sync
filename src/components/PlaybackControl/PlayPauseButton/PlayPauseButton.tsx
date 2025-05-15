import React from 'react';

import PlayIcon from '../../../assets/play-icon.svg';
import PauseIcon from '../../../assets/pause-icon.svg';

interface IPlayPauseButton {
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
}

export const PlayPauseButton: React.FC<IPlayPauseButton> = ({
  isPlaying,
  pause,
  play,
}) => {
  return (
    <button className="button" onClick={isPlaying ? pause : play}>
      <div className="h-[40px] ">
        {isPlaying ? (
          <img src={PauseIcon} alt="Play Button" className="w-full h-full" />
        ) : (
          <img src={PlayIcon} alt="Pause Button" className="w-full h-full" />
        )}
      </div>
    </button>
  );
};

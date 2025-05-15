import React from 'react';
import { useCanvasControl } from '../../context/CanvasControlContext';
import { PlaybackControl } from '../PlaybackControl/PlaybackControl';

export const CanvasSuperControls: React.FC = () => {
  const { isPlaying, play, pause, seek, stepFrame, videoRef } =
    useCanvasControl();

  return (
    <PlaybackControl
      videoRef={videoRef}
      stepFrame={stepFrame}
      play={play}
      pause={pause}
      seek={seek}
      isPlaying={isPlaying}
    />
  );
};

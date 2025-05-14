import React from 'react';
import { useNativeControl } from '../../context/NaiveControlContext';

export default function NaiveSuperControls() {
  const { isPlaying, play, pause, stepFrame } = useNativeControl();

  return (
    <div className="flex w-full justify-center">
      <div className="mt-5 gap-3">
        <button className="button" onClick={isPlaying ? pause : play}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={stepFrame}>Step Frame</button>
      </div>
    </div>
  );
}

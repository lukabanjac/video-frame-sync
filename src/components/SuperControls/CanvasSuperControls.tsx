import React from 'react';
import { useCanvasControl } from '../../context/CanvasControlContext';

export default function CanvasSuperControls() {
  const { isPlaying, play, pause, stepFrame } = useCanvasControl();

  return (
    <div className="flex w-full justify-center">
      <div className="mt-5 gap-3">
        <button onClick={() => stepFrame('back')}>{"<<"}</button>
        <button className="button" onClick={isPlaying ? pause : play}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={() => stepFrame('forward')}>{">>"}</button>
      </div>
    </div>
  );
}

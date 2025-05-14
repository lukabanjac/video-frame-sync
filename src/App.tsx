import React, { useState } from 'react';
import { CanvasControlProvider } from './context/CanvasControlContext';
import { CanvasVideoDisplay } from './components/VideoDisplay/CanvasVideoDisplay';
import { NaiveVideoDisplay } from './components/VideoDisplay/NaiveVideoDisplay';
import { NaiveControlProvider } from './context/NaiveControlContext';
import CanvasSuperControls from './components/SuperControls/CanvasSuperControls';
import NaiveSuperControls from './components/SuperControls/NaiveSuperControls';

const App: React.FC = () => {
  const [isNaiveOpen, setIsNaiveOpen] = useState(false);

  return (
    <div className="mt-20 size-full justify-center text-center">
      <CanvasControlProvider>
        <CanvasVideoDisplay />
        <CanvasSuperControls />
      </CanvasControlProvider>
      <div className="m-10 p-5 border border-solid border-gray-700">
        <button onClick={() => setIsNaiveOpen(!isNaiveOpen)}>
          {isNaiveOpen ? 'Hide' : 'Show'} Naive Approach
        </button>
        {isNaiveOpen ? (
          <NaiveControlProvider>
            <NaiveVideoDisplay />
            <NaiveSuperControls />
          </NaiveControlProvider>
        ) : null}
      </div>
    </div>
  );
};

export default App;

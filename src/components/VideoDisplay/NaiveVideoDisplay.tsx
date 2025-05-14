import React, { useEffect, useRef } from 'react';
import { useNativeControl } from '../../context/NaiveControlContext';
import { NaiveVideoPlayer } from '../VideoPlayer/NaiveVideoPlayer';

type NaiveVideoDisplayProps = {};

export const NaiveVideoDisplay: React.FC<NaiveVideoDisplayProps> = ({}) => {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);

  const { setPlayerARef, setPlayerBRef } = useNativeControl();

  useEffect(() => {
    setPlayerARef(videoARef.current);
  }, [setPlayerARef]);

  useEffect(() => {
    setPlayerBRef(videoBRef.current);
  }, [setPlayerBRef]);

  //   useEffect(()=>{
  //     const stream = videoARef.current?.captureStream();
  //     videoBRef.current?.srcObject = stream
  //   },[])

  function handlePlayerASync(time: number, isPlaying: boolean): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-3xl mt-10">Synced Native Video Players</h2>
      <p className="text-justify mx-20">
        Here I tried to synchronize two native <code>&lt;video&gt;</code>{' '}
        players. It looked like a quick solution. However, as demonstrated
        below, the two players don't remain in exact frame sync. This is due to
        the fact that each player handles a separate media stream, and calls to{' '}
        <code>play()</code> on a video element are asynchronous promises.
        As a result, their execution timing cannot be perfectly aligned.
      </p>
      <div className="flex gap-2 items-center justify-center">
        <NaiveVideoPlayer
          videoRef={videoARef}
          onSyncEvent={handlePlayerASync}
        />
        <NaiveVideoPlayer
          videoRef={videoBRef}
          onSyncEvent={handlePlayerASync}
        />
      </div>
    </div>
  );
};

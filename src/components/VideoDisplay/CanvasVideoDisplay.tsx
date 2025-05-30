import React, { useEffect, useRef, useState } from 'react';
import { CanvasVideoPlayer } from '../VideoPlayer/CanvasVideoPlayer';
import { useCanvasControl } from '../../context/CanvasControlContext';
import VIDEO_SRC from '../../assets/video.mp4';
import VideoPlayer from '../SuperControls/VideoPlayer';

type CanvasVideoDisplayProps = {};

export const CanvasVideoDisplay: React.FC<CanvasVideoDisplayProps> = ({}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const iFrameRef = useRef<HTMLIFrameElement>(null);
  const canvasARef = useRef<HTMLCanvasElement>(null);
  const canvasBRef = useRef<HTMLCanvasElement>(null);

  const [loadIframe, setLoadIframe] = useState(false);

  const {
    setVideoRef,
    setCanvasARef,
    setCanvasBRef,
    play,
    pause,
    seek,
    isPlaying,
  } = useCanvasControl();

  useEffect(() => {
    setVideoRef(videoRef.current);
  }, [setVideoRef]);

  useEffect(() => {
    setCanvasARef(canvasARef.current);
  }, [setCanvasARef]);

  useEffect(() => {
    setCanvasBRef(canvasBRef.current);
  }, [setCanvasBRef]);

  useEffect(() => {
    console.log(iFrameRef.current?.contentWindow?.document);
  }, [loadIframe]);

  return (
    <div className="flex flex-col gap-10">
      <h2 className="font-bold text-3xl">Synced Video Players</h2>
      <p className="text-justify mx-20">
        In this setup, both players stay in perfect frame sync. A single hidden{' '}
        <code>&lt;video&gt;</code> element acts as the source, drawing each
        frame onto two separate <code>&lt;canvas&gt;</code> elements. The
        synchronization is handled using <code>requestVideoFrameCallback</code>,
        which ensures that each frame is rendered at the right moment, and that
        the drawing is stopped according to video controls.
      </p>
      <div className="flex gap-2 items-center justify-center flex-col lg:flex-row">
        <VideoPlayer videoRef={videoRef} />
        <CanvasVideoPlayer
          videoRef={videoRef}
          canvasRef={canvasARef}
          handlePlay={play}
          handlePause={pause}
          handleSeek={seek}
          isPlaying={isPlaying}
        />
        <CanvasVideoPlayer
          videoRef={videoRef}
          canvasRef={canvasBRef}
          handlePlay={play}
          handlePause={pause}
          handleSeek={seek}
          isPlaying={isPlaying}
        />
      </div>
    </div>
  );
};

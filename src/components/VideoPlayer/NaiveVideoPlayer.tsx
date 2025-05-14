import React, { useEffect, useRef, useState } from 'react';
import VIDEO_SRC from '../../assets/video.mp4';
import { useNativeControl } from '../../context/NaiveControlContext';

interface INaiveVideoPlayerProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onSyncEvent: (time: number, isPlaying: boolean) => void;
}

export const NaiveVideoPlayer: React.FC<INaiveVideoPlayerProps> = ({
  videoRef,
  onSyncEvent,
}) => {
  const { play, pause, seek } = useNativeControl();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.addEventListener('play', play);
    video.addEventListener('pause', pause);
    video.addEventListener('seeked', seek);

    return () => {
      video.removeEventListener('play', play);
      video.removeEventListener('pause', pause);
      video.removeEventListener('seeked', seek);
    };
  }, [onSyncEvent, videoRef]);

  return (
    <video
      ref={videoRef}
      src={VIDEO_SRC}
      controls
      controlsList="nodownload nofullscreen noplaybackrate"
      disablePictureInPicture
      width={400}
    />
  );
};

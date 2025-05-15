import type { Ref } from 'react';

interface VideoPlayerProps {
  videoRef: Ref<HTMLVideoElement>;
}

const VideoPlayer = ({ videoRef }: VideoPlayerProps) => {
  return (
    <video
      className="video-player"
      ref={videoRef}
      controls
      controlsList="nodownload nofullscreen noplaybackrate"
      disablePictureInPicture
      hidden
      width="480"
      src="https://www.w3schools.com/html/mov_bbb.mp4"
    />
  );
};

export default VideoPlayer;

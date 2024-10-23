import { useEffect, useRef } from 'react';

const pdrainElement = (videoSource, videoRef) => {
  return (
    <video
      ref={videoRef}
      className='h-full w-full'
      poster='poster.webp'
      controls
      playsInline
      crossOrigin='anonymous'
    >
      <source
        src={`https://pixeldrain.com/api/file/${videoSource}`}
        type='video/mp4'
      />
    </video>
  );
};

const megaElement = (videoSource, videoRef) => {
  return (
    <iframe
      ref={videoRef}
      className='h-full w-full'
      style={{ border: 0 }}
      src={`https://mega.nz/embed/${videoSource}`}
      allowFullScreen
    ></iframe>
  );
};

export default function StreamSection({ streamProvider, videoSource }) {
  const videoRef = useRef();

  useEffect(() => {
    videoRef.current?.load();
  }, [videoSource]);

  return (
    <div className='col-span-full xl:col-span-2'>
      {streamProvider === 'pdrain'
        ? pdrainElement(videoSource, videoRef)
        : megaElement(videoSource, videoRef)}
    </div>
  );
}

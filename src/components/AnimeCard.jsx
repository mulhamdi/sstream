import { useState, useCallback, useEffect } from 'react';

export default function AnimeCard({ anime }) {
  const [isHover, setIsHover] = useState(false);
  const [touchTimeout, setTouchTimeout] = useState(null);

  const handleTouchStart = useCallback(() => {
    // Clear any existing timeout
    if (touchTimeout) {
      clearTimeout(touchTimeout);
    }

    // Set new timeout
    const timeout = setTimeout(() => {
      setIsHover(true);
    }, 400);

    setTouchTimeout(timeout);
  }, [touchTimeout]);

  const handleTouchEnd = useCallback(() => {
    if (touchTimeout) {
      clearTimeout(touchTimeout);
    }
    // Add small delay before hiding to prevent flickering
    setTimeout(() => {
      setIsHover(false);
    }, 100);
  }, [touchTimeout]);

  useEffect(() => {
    return () => {
      if (touchTimeout) {
        clearTimeout(touchTimeout);
      }
    };
  }, [touchTimeout]);

  return (
    <div className='relative h-[300px] w-[224px] max-sm:h-[216px] max-sm:w-[151px]'>
      <div
        className='absolute z-20 h-full w-full'
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        <p className='absolute z-10 rounded-br bg-red-episode px-4 py-1 text-center font-bold'>
          {anime.episode}
        </p>
        <div
          className={`material-icons ${
            isHover ? 'visible opacity-100' : 'invisible opacity-0'
          } absolute left-1/3 top-1/3 z-10 transition-opacity duration-200`}
          style={{ fontSize: '64px' }}
        >
          play_circle
        </div>
        <img
          className={`max-h-[216px] w-[161px] transition-all duration-200 sm:max-h-[300px] sm:min-w-[224px] ${
            isHover ? 'brightness-50' : 'brightness-100'
          }`}
          referrerPolicy='no-referrer'
          loading='lazy'
          src={anime.thumbnail}
          alt={`Thumbnail anime ${anime.title}`}
        />
        <p
          className={`absolute bottom-0 z-20 w-full overflow-hidden bg-black bg-opacity-70 px-2 text-center font-semibold transition-all duration-300 ease-in-out ${
            isHover ? 'h-[53px]' : 'h-6'
          }`}
        >
          {anime.title}
        </p>
      </div>
    </div>
  );
}

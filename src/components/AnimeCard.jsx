import { useState } from 'react';

export default function AnimeCard({ anime }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className='relative h-[300px] w-[224px] max-sm:h-[216px] max-sm:w-[161px]'>
      <div
        className='absolute z-20'
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onTouchStart={() => setIsHover(true)}
        onTouchEnd={() => setIsHover(false)}
        onClick={() => setIsHover(false)}
      >
        <p className='absolute z-10 rounded-br bg-red-episode px-4 py-1 text-center font-bold'>
          {anime.episode}
        </p>
        <div
          className={`material-icons ${isHover ? 'visible' : 'invisible'} absolute left-1/3 top-1/3 z-10`}
          style={{ fontSize: '64px' }}
          onMouseEnter={() => setIsHover(true)}
          onTouchStart={() => setIsHover(true)}
        >
          play_circle
        </div>
        <img
          className={`max-h-[216px] w-[161px] sm:max-h-[300px] sm:min-w-[224px] ${isHover ? 'brightness-50' : 'brightness-100'}`}
          referrerPolicy='no-referrer'
          loading='lazy'
          src={anime.thumbnail}
          alt={`Thumbnail anime ${anime.title}`}
        />
        <p
          className={`absolute bottom-0 z-20 w-full overflow-hidden bg-black bg-opacity-70 px-2 text-center font-semibold ${isHover ? 'h-[53px] transition-all duration-300 ease-in-out' : 'h-6'}`}
        >
          {anime.title}
        </p>
      </div>
    </div>
  );
}

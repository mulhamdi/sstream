import Header from '#components/Header';
import StreamSection from '#components/StreamSection';
import { useEffect, useState } from 'react';
import AnimeInformation from '#/components/AnimeInformation';
import AnimeCard from '#/components/AnimeCard';

function App() {
  const [animeData, setAnimeData] = useState([]);
  const [currentAnime, setCurrentAnime] = useState(null);
  const [errorMessage, seterrorMessage] = useState(null);

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const response = await fetch('data/anime-list.json', {
          cache: 'no-cache',
        });

        if (!response.ok) {
          throw new Error(
            `Bad News: Fetching anime data failed with status ${response.status}`,
          );
        }

        const animes = await response.json();
        setAnimeData(animes);
        setCurrentAnime(animes[0]);
        seterrorMessage(null);
      } catch (err) {
        seterrorMessage(err.message);
        setAnimeData([]);
        setCurrentAnime(null);
      }
    };

    fetchAnimeData();
  }, []);

  const handleClickOnCard = (anime) => {
    setCurrentAnime(anime);
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  };

  return (
    <div className='h-min text-white dark:bg-black'>
      {errorMessage && (
        <div className='text-red relative h-screen w-screen px-2 pt-4 text-2xl'>
          <div className='mb-4 text-center text-3xl font-bold text-pink'>
            <p className='mb-2'>{'>_<'}</p>
            <p>EwRoR</p>
          </div>
          <p className='text-center text-red-title'>{errorMessage}</p>
        </div>
      )}

      {currentAnime && (
        <div className='container'>
          <Header />
          <div className='mb-8 grid grid-cols-3 gap-4'>
            <StreamSection
              streamProvider={currentAnime.streamProvider}
              videoSource={currentAnime.downloadLinks['720p']}
            />
            <AnimeInformation anime={currentAnime} />
          </div>

          <div className='flex flex-wrap max-sm:justify-center max-sm:gap-x-4 max-sm:gap-y-4 max-[400px]:gap-x-4 max-[400px]:gap-y-4 sm:gap-4 lg:gap-8 xl:justify-center'>
            {animeData.map((data) => (
              <div
                onClick={() => handleClickOnCard(data)}
                className='cursor-pointer'
                key={data.id}
              >
                <AnimeCard anime={data} />
              </div>
            ))}
          </div>

          <footer className='mt-8 rounded-lg px-4 py-6 text-center shadow-sm'>
            <p className='mb-2 text-lg font-bold underline decoration-red-title decoration-2 underline-offset-8'>
              COPY
              <span className='text-red-title'>LEFT</span> © 2024
            </p>
            <p className='text-sm mt-4'>
              Situs ini tidak berafiliasi dengan Otakudesu atau pihak lainnya.
              Semua konten hanya untuk keperluan pribadi.
            </p>
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;

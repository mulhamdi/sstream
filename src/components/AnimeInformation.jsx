import AnimeData from './AnimeData';
import AnimeSynopsis from './AnimeSynopsis';
import AnimeTitle from './AnimeTitle';
import DownloadLink from './DownloadLink';

export default function AnimeInformation({ anime }) {
  const {
    title,
    episode,
    updateDay,
    updateDate,
    score,
    producer,
    starting,
    studio,
    genre,
    synopsis,
    streamProvider,
    downloadLinks,
  } = anime;
  const linkPrefix =
    streamProvider === 'pdrain'
      ? 'https://pixeldrain.com/u/'
      : 'https://mega.nz/file/';

  return (
    <div className='col-span-full flex flex-col gap-5 xl:col-span-1'>
      <AnimeTitle title={title} latestEpisode={episode} />
      <div className='col-span-2'>
        <div className='grid-span-2 grid grid-cols-1 gap-2'>
          <AnimeData icon='category' type={'Genre'} data={genre} />
          <AnimeData icon='stars' type={'Skor'} data={score} />
          <AnimeData icon='apartment' type={'Produser'} data={producer} />
          <AnimeData icon='calendar_month' type={'Starting'} data={starting} />
          <AnimeData icon='movie' type={'Studio'} data={studio} />
          <AnimeData
            icon='update'
            type={'Update'}
            data={`${updateDay}, ${updateDate}`}
          />
        </div>
      </div>
      <div className='flex flex-col gap-2 sm:flex-row xl:flex-col'>
        <AnimeSynopsis title={title} synopsis={synopsis} />
        <div className='flex flex-wrap gap-2'>
          <DownloadLink
            title={'360p'}
            link={`${linkPrefix}${downloadLinks['360p']}`}
          />
          <DownloadLink
            title={'480p'}
            link={`${linkPrefix}${downloadLinks['480p']}`}
          />
          <DownloadLink
            title={'720p'}
            link={`${linkPrefix}${downloadLinks['720p']}`}
          />
        </div>
      </div>
    </div>
  );
}

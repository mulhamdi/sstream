export default function AnimeTitle({ title, latestEpisode }) {
  return (
    <div>
      <h1 className='text-2xl font-bold' title={title}>{title}</h1>
      <p className='font-semibold text-green'>
        Update to Episode {latestEpisode}
      </p>
    </div>
  );
}

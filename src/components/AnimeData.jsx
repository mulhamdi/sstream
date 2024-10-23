export default function AnimeData({ icon = 'star', type, data }) {
  return (
    <div className='grid grid-cols-6'>
      <div className='col-span-2 flex items-center md:col-span-1 xl:col-span-2'>
        <span className='material-icons mr-2 text-pink'>{icon}</span>{' '}
        <span className='font-semibold'>{type}</span>
      </div>
      <span
        className='col-span-4 truncate md:col-span-5 xl:col-span-4'
        title={data.length > 32 ? data : null}
      >
        <span className='mr-2'>:</span>
        {data}
      </span>
    </div>
  );
}

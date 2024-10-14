export default function DownloadLink({ title, link }) {
  return (
    <button type='button' className='btn-download'>
      <a href={link} target='_blank'>
        {title}
      </a>
      <span className='material-icons text-green'>download</span>
    </button>
  );
}

export default function DownloadLink({ title, link }) {
  return (
    <a className='btn-download' href={link} target='_blank'>
      <p>{title}</p>
      <span className='material-icons text-green'>download</span>
    </a>
  );
}

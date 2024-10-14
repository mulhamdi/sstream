import axios from 'axios';

// Global variables
// const TARGET_URL = 'https://otakudesu.cloud';
// const TARGET_URL = 'https://otakudesu.cloud/anime/goukon-itara-hanashi-sub-indo/'
// const TARGET_URL = 'https://otakudesu.cloud/episode/gigh-episode-2-sub-indo/'
const TARGET_URL = 'https://desustream.com/safelink/link/?id=eXRoOHNYVG9UdnVZK3l6V3czeHJDN0tDTHJhUmdKNnBqaGRTYzdMU21BSTg='
const AXIOS_PARAMS = {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    Accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
  },
  withCredentials: true,
};

async function getHTMLSource(URL) {
  try {
    const response = await axios.get(URL, { ...AXIOS_PARAMS });
    const html = response.data;
    return html;
  } catch (error) {
    if (error.response) {
      console.error('The request was made and the server responded:');
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      console.error('The request was made but no response was recieved:');
      console.error(error.request);
    } else {
      console.error('Error', error.message);
    }
    console.error(error.config);
  }
}

getHTMLSource(TARGET_URL).then((data) => console.log(data));

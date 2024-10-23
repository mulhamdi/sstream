import axios from 'axios';
import * as cheerio from 'cheerio';
import {
  getPreveousAnimeID,
  writeAnimesData,
} from '#services/animeDataUtils.mjs';

// Global variables
const TARGET_URL = 'https://otakudesu.cloud';
const ANIMES_DATA = [];
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

async function getRedirectedURL(requestedUrl) {
  if (!requestedUrl) {
    console.error(
      `Fetching error: invalid requestedUrl argument (${requestedUrl})`,
    );
    return 'N/A';
  }

  try {
    await axios.get(requestedUrl, { ...AXIOS_PARAMS, maxRedirects: 0 });
    // Valid but not redirected
    return requestedUrl;
  } catch (error) {
    // Redirected (server: CORS issue)
    if (error.request._isRedirect) {
      return error.request._currentUrl;
    }

    // Redirected (local)
    if (error.response.status == 301 || error.response.status === 302) {
      const redirectedUrl = error.response.headers.location;
      return redirectedUrl;
    }

    // Invalid
    console.error(`Invalid: ${error.request}`);
    return;
  }
}

async function getDownloadLinks(animePageURL) {
  const animePage = await getHTMLSource(animePageURL);
  const $animePage = cheerio.load(animePage);
  const latestEpsURL = $animePage('div.episodelist')
    .eq(1)
    .find('a')
    .first()
    .attr('href');
  const streamPage = await getHTMLSource(latestEpsURL);
  const $streamPage = cheerio.load(streamPage);

  const extractDownloadLink = (quality, provider) =>
    $streamPage('div.download')
      .find(`strong:contains(${quality})`)
      .siblings(`a:contains(${provider})`)
      .attr('href');

  const downloadLinks = { '360p': null, '480p': null, '720p': null };
  let streamProvider = 'pdrain';
  for (const quality in downloadLinks) {
    downloadLinks[quality] = await getRedirectedURL(
      extractDownloadLink(quality, 'rain') ||
        extractDownloadLink(quality, 'ega'),
    );

    // Bad practice but indexing is fast operation i think.
    if (downloadLinks[quality][8] === 'p') {
      downloadLinks[quality] = downloadLinks[quality].substring(25);
    } else {
      downloadLinks[quality] = downloadLinks[quality].substring(21);
      streamProvider = 'mega';
    }
  }

  return { downloadLinks, streamProvider };
}

async function getAnimeInfo(animePageURL) {
  const animePage = await getHTMLSource(animePageURL);
  const $animePage = cheerio.load(animePage);
  const $animeInformationSection = $animePage('div.infozingle');

  const extractReleaseData = (text, isSynopsis = false) => {
    if (isSynopsis) {
      const synopsis = [];
      $animePage('div.sinopc p').each((i, el) =>
        synopsis.push($animePage(el).text()),
      );
      return synopsis.length ? synopsis : 'N/A';
    }

    let data = $animeInformationSection.find(`p:contains(${text})`).text();
    data = data.slice(data.indexOf(': ') + 2);
    return data || 'N/A';
  };

  const releaseInformation = {
    score: extractReleaseData('Skor'),
    producer: extractReleaseData('Produser'),
    starting: extractReleaseData('Tanggal Rilis'),
    studio: extractReleaseData('Studio'),
    genre: extractReleaseData('Genre'),
    synopsis: extractReleaseData('div.sinopc', true),
  };

  return releaseInformation;
}

const generateAnimeId = (animeTitle) => {
  let generatedId = animeTitle.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
  if (generatedId.length > 16) {
    generatedId = generatedId.slice(0, 16);
  }

  return generatedId;
};

async function getAnimeData(preveousAnimeID) {
  try {
    const mainPage = await getHTMLSource(TARGET_URL);
    const $ = cheerio.load(mainPage);
    const ongoingAnimesContainer = $('.venz').first().find('li');

    const latestAnimeTitle = $(ongoingAnimesContainer[0])
      .find('h2.jdlflm')
      .text()
      .trim();
    if (generateAnimeId(latestAnimeTitle) === preveousAnimeID)
      return Promise.reject('No Updated Anime');

    // TODO: "delay" between request
    const animePromises = [];
    let releaseOrder = 1;
    for (const card of ongoingAnimesContainer) {
      animePromises.push(
        (async () => {
          const animeTitle = $(card).find('h2.jdlflm').text().trim();
          const animeLink = $(card).find('a').attr('href');
          const animeInfo = {
            id: generateAnimeId(animeTitle),
            releaseOrder: releaseOrder++,
            title: animeTitle,
            thumbnail: $(card).find('img').attr('src'),
            episode: $(card).find('div.epz').text().substring(9),
            updateDay: $(card).find('div.epztipe').text().trim(),
            updateDate: $(card).find('div.newnime').text(),
            score: null,
            producer: null,
            starting: null,
            studio: null,
            genre: null,
            synopsis: null,
            streamProvider: null,
            downloadLinks: null,
            ...(await getDownloadLinks(animeLink)),
            ...(await getAnimeInfo(animeLink)),
          };
          ANIMES_DATA.push(animeInfo);
        })(),
      );
    }

    await Promise.all(animePromises);
    ANIMES_DATA.sort((a, b) => a.releaseOrder - b.releaseOrder);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

getPreveousAnimeID(0).then((id) => {
  getAnimeData(id)
    .then(() => {
      try {
        writeAnimesData(ANIMES_DATA);
        console.info('Animes data successfully saved to disk.');
      } catch (error) {
        console.error(error.message);
        process.exit(1);
      }
    })
    .catch((reason) => {
      console.info(reason);
      process.exit(1);
    });
});

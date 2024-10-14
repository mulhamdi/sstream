import { readFile, writeFile } from 'fs/promises';
const fileUrl = new URL('../../public/data/anime-list.json', import.meta.url);

async function getPreveousAnimeID(index) {
  try {
    return JSON.parse(await readFile(fileUrl, { encoding: 'utf-8' }))[index].id;
  } catch (error) {
    console.error(error);
  }
}

const writeAnimesData = (animeJSON) => {
  try {
    const serializedAnimesData = JSON.stringify(animeJSON, null, ' ');
    writeFile(fileUrl, serializedAnimesData, {
      encoding: 'utf-8',
      flush: true,
    });
  } catch (error) {
    console.error(error);
  }
};

export { getPreveousAnimeID, writeAnimesData };

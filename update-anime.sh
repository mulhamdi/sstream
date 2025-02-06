#!/bin/bash

LOGFILE=~/.local/logs/anime_scraping_log.txt

cd ~/sstream
git pull

echo "Memulai scraping data animek: $(date)" >> $LOGFILE
node ~/sstream/src/controllers/animeScraper.mjs >> $LOGFILE 2>&1

if [ $? -eq 0 ]; then
	echo "Scraping berhasil, melajutkan ke proses commit dan push." >> $LOGFILE
	git add .
	git commit -m "Update animes data"
	git push origin main
	echo "Commit dan push berhasil pada $(date)" >> $LOGFILE
else
	echo "Scraping gagal atau tidak ada update."
	echo "Scraping gagal atau tidak ada update, tidak akan melakukan commit dan push." >> $LOGFILE
fi

echo "Selesai pada: $(date)" >> $LOGFILE
echo "----------------------------------" >> $LOGFILE

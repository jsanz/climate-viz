#!/bin/sh
echo " ============================================="
echo " Sincronizando web: `date +\"%F %T\"`"
echo " ============================================="

#if [ ! -d ~/datos/twitter-stats ]; then
#  echo "montando datos"
#  sudo mount /mnt/salon/datos
#fi

cd /home/jsanz/src/climate-viz/

#rsync -avr ~/datos/twitter-stats/ twitter-stats

jekyll build

s3cmd sync --delete-removed ./_site/ s3://climate-viz.jorgesanz.net

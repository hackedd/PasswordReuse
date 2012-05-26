redo-always

date=$(date +%Y%m%d)
time=$(date +%H%M)

sed -e s/'\$DATE\$'/$date/g -e s/'\$TIME\$/'$time/g < install.rdf.template
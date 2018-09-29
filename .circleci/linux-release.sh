declare -a lold=("elementaryos/jupiter" "elementaryos/luna" "elementaryos/freya" "debian/etch" "debian/lenny" "debian/squeeze" "debian/wheezy" "debian/jessie" "ubuntu/wily" "ubuntu/vivid" "ubuntu/utopic" "ubuntu/trusty" "ubuntu/saucy" "ubuntu/raring" "ubuntu/quantal" "ubuntu/precise" "linuxmint/serena" "linuxmint/sarah" "linuxmint/rosa" "linuxmint/rafaela" "linuxmint/rebecca" "linuxmint/qiana")
# elementaryos/loki ? :'(
declare -a l=("ubuntu/xenial" "ubuntu/yakkety" "ubuntu/zesty" "ubuntu/artful" "ubuntu/bionic" "debian/stretch" "debian/buster" "linuxmint/sonya" "linuxmint/sylvia")
for i in "${lold[@]}"
do
  echo "$i"
  package_cloud push "AllToMP3/alltomp3/$i" dist/*_old.deb
done
for i in "${l[@]}"
do
  echo "$i"
  package_cloud push "AllToMP3/alltomp3/$i" dist/*_new.deb
done

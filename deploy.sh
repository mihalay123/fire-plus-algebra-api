cd ~/Projects/fire-plus-algebra/fire-plus-algebra-api

echo "KILL PROCESSES"
kill $(ps aux | grep 'fire-plus-algebra-api' | awk '{print $2}')

echo "UPDATE REPOSITORY"
git pull

echo "UPDATE PACKAGES"
rm -rf node_modules
npm i

echo "START SERVER"
screen -S "fire-plus-algebra-api" -dm npm start

echo "SERVER STATUS"
lsof -i:3333

exit 0


cd oj
git stash
git pull --reb
git stash pop
cd backend
./gradlew clean build

docker-compose restart -t 1
#
#cd oj
#git stash
#git pull --reb
#git stash pop
#
#docker-compose restart -t 1
#-----------------

type=$1
docker pull acey/oj:lastest
if [ "$type" == "start" ]; then
    docker run --name oj -p 8080:8080 -d  acey/oj:lastest   java -jar /work/app.jar --DDATABASE_HOST=10.254.118.242 --DDATABASE_PASSWORD=wap3gqqcom --DUPLOAD_PATH=/root/pictures
else
    docker restart oj
fi

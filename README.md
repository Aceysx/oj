## OJ系统

#### 如何启动

##### 后端

1. 创建数据库:oj，账号:root,密码:root
2. 进入 backend 目录下执行 `./gradlew bootRun` 运行后端


##### 前端

1. 安装 node
2. 进入 web 目录下，执行 `npm install` 安装依赖，执行 `npm start` 运行

##### 部署

```
cd projects/oj
git stash
git pull --reb
git stash pop
docker-compose up -d
```

##### 部署

1. 打包前端，同时将打包出来的文件放到resources下
```aidl
进到 web目录下执行
npm run deploy
``` 

2. 打包后端
```aidl
进到 backend 目录下执行
./gradlew (gradlew.bat 如果是windows) clean build 
```

3. 打包出来的jar包放在 backend/build/libs 下
 - 运行：java -jar build/libs/backend.jar

4. 访问 localhost:8080 即可
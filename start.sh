echo "
+----------------------------------------------------------------------
|                   冒险岛079 FOR CentOS/Ubuntu/Debian
+----------------------------------------------------------------------
"
# 使用当前执行目录作为服务根目录
MAPLE_JAR_PATH="$(pwd)/"
# 启动前请确保当前目录存在以下文件/文件夹：
# - MapleStory-079.jar
# - config/
# - scripts/
# - scripts/wz/
export PATH="$PATH:$MAPLE_JAR_PATH"
nohup java -cp ./MapleStory-079.jar -server -DhomePath=./config/ -DscriptsPath=./scripts/ -DwzPath=./scripts/wz -Xms512m -Xmx2048m -XX:PermSize=256m -XX:MaxPermSize=512m -XX:MaxNewSize=512m server.Start > start.log 2>&1 &

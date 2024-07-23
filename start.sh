echo "
+----------------------------------------------------------------------
|                   冒险岛079 FOR CentOS/Ubuntu/Debian
+----------------------------------------------------------------------
"
MAPLE_JAR_PATH=/usr/local/java-projects/maplestory/
export Path=$PATH:$MAPLE_JAR_PATH
nohup java -cp ./MapleStory-079.jar -server -DhomePath=./config/ -DscriptsPath=./scripts/ -DwzPath=./scripts/wz -Xms512m -Xmx2048m -XX:PermSize=256m -XX:MaxPermSize=512m -XX:MaxNewSize=512m server.Start > start.log 2>&1 &

# MapleStory 079 服务端镜像
#
# 在当前目录执行：
#   docker build -f ./Dockerfile -t maplestory-srv:079 .
#
# 运行示例（数据库需单独部署，并修改 config/db.properties 中 JDBC URL 指向 MySQL 容器名或宿主机）：
#   docker run --name maple-srv -p 9555:9555 -p 8600:8600 -p 7575-7585:7575-7585 maplestory-srv:079
#
# 若 scripts/wz 体积过大，可在构建后改用挂载覆盖：
#   -v /path/to/scripts:/app/scripts:ro

FROM openjdk:7-jdk AS build

ENV MAVEN_VERSION=3.2.5
ENV MAVEN_HOME=/usr/share/maven
ENV PATH=${MAVEN_HOME}/bin:${PATH}

# 在构建阶段内安装 Maven 3.2.5（Java 7 可用）
ADD https://archive.apache.org/dist/maven/maven-3/${MAVEN_VERSION}/binaries/apache-maven-${MAVEN_VERSION}-bin.tar.gz /tmp/maven.tar.gz
RUN mkdir -p /usr/share && \
    tar -xzf /tmp/maven.tar.gz -C /usr/share && \
    ln -s /usr/share/apache-maven-${MAVEN_VERSION} ${MAVEN_HOME} && \
    rm -f /tmp/maven.tar.gz

WORKDIR /build
COPY pom.xml .
COPY src ./src

RUN mvn -e -B package -DskipTests

FROM openjdk:7-jre

WORKDIR /app

# 预创建运行期日志目录，避免启动时 LogIPs.txt 缺失告警
RUN mkdir -p /app/logs && touch /app/logs/LogIPs.txt

# maven-assembly-plugin：jar-with-dependencies
COPY --from=build /build/target/MapleStory-079.jar /app/MapleStory-079.jar

# 与 config/server.properties 中 RoyMS.* 保持一致；6350 为进程单例检测端口
# 频道端口默认为 2524+频道号，未单独配置 RoyMS.Port{n} 时请一并映射
EXPOSE 6350 9555 8600 7575 7576 7577 7578 7579 7580 2525 2526 2527 2528 2529 2530

ENV JAVA_OPTS="-server -Xms512m -Xmx2048m -XX:PermSize=256m -XX:MaxPermSize=512m -XX:MaxNewSize=512m"

# homePath 必须以 / 结尾；与 server.Start#main 中约定一致
ENTRYPOINT ["sh", "-c", "exec java $JAVA_OPTS -DhomePath=/app/config/ -DscriptsPath=/app/scripts/ -DwzPath=/app/scripts/wz -cp /app/MapleStory-079.jar server.Start"]

# 部署指南

本文说明如何在测试或生产环境部署 MapleStory 079 Java 服务端：**本机 / 虚拟机直接运行 JAR** 与 **Docker / Docker Compose** 两种方式；并补充 Linux（含 Rocky Linux 9）下防火墙、`RoyMS.IP` 等常见问题。

更细的键位说明见 [CONFIGURATION.md](./CONFIGURATION.md)。

---

## 1. 前置条件

| 组件 | 建议 |
| --- | --- |
| JDK | **8**（运行 Java 7 编译产物）；或直接 **Maven 使用 JDK 8** 构建 |
| Maven | 3.6+（构建 fat JAR） |
| MySQL | **5.7** 或与脚本兼容的版本；字符集 utf8 / utf8mb4 |
| 资源 | `config/`、`scripts/`（含 `scripts/wz`）与数据库初始化 SQL |

首次导入数据库可使用仓库内 **`docker/init.sql`**（体积大，需耐心等待）。

---

## 2. 构建

在**仓库根目录**执行：

```bash
mvn -q clean package -DskipTests
```

产物（由 `maven-assembly-plugin` 生成）：

```text
target/MapleStory-079-jar-with-dependencies.jar
```

构建上下文若包含本机 `jdk/` 等大目录，可在仓库根使用 **`.dockerignore`**（已提供）避免 `docker build` 上传过慢。

---

## 3. 本机直接运行（非容器）

### 3.1 JVM 系统属性（必填）

`server.Start` 依赖下列属性（`homePath` **必须以 `/` 结尾**）：

| 属性 | 含义 |
| --- | --- |
| `homePath` | 含 `server.properties`、`db.properties`、`shop.properties`、`fish.properties` 的目录（通常为仓库下 `config/`） |
| `scriptsPath` | 脚本根目录（通常为 `scripts/`） |
| `wzPath` | WZ 资源路径（通常为 `scripts/wz`） |

### 3.2 数据库配置

编辑 **`config/db.properties`**：JDBC URL 指向本机或可达的 MySQL，`url` 中的**库名**须与已导入库一致。

注意：`docker/init.sql` 中建库名为 **`maplestory`**，示例 `config/db.properties` 可能为 **`maple`**，部署前请统一。`ServerProperties` 启动时会读表 **`auth_server_channel_ip`**，缺失或连库失败会导致进程退出。

### 3.3 启动命令示例

将路径换成你的部署目录，例如 Linux：**`/root/prod/maple-srv-java`**：

```bash
cd /root/prod/maple-srv-java
java -server \
  -DhomePath=/root/prod/maple-srv-java/config/ \
  -DscriptsPath=/root/prod/maple-srv-java/scripts/ \
  -DwzPath=/root/prod/maple-srv-java/scripts/wz \
  -Xms512m -Xmx2048m \
  -jar target/MapleStory-079-jar-with-dependencies.jar
```

Windows 可参考根目录 `start.bat`，或 IDEA 运行配置中的 VM options（见根目录 `README.md`）。

仓库内 **`start.sh`** 使用的主类为 `server.Start` 与固定 jar 名，若与你本地打包文件名不一致，请改为 `-jar ...MapleStory-079-jar-with-dependencies.jar` 或改正 `classpath`。

---

## 4. Docker 单镜像

在**仓库根目录**构建：

```bash
docker build -f docker/dockerfile -t maplestory-srv:079 .
```

运行示例（数据库需自行提供，并保证容器内或挂载的 **`config/db.properties`** 中 URL 能连上 MySQL）：

```bash
docker run --name maple-srv \
  -p 9555:9555 -p 8600:8600 -p 2525-2530:2525-2530 \
  maplestory-srv:079
```

`scripts`、`config` 可通过 `docker run -v ...` 挂载覆盖镜像内目录；详见 `docker/dockerfile` 头部注释。

---

## 5. Docker Compose（推荐联调 / 单机一体）

编排文件：**`docker/docker-compose.yaml`**，包含 **MySQL 5.7** 与 **游戏服**；首次启动会将 **`docker/init.sql`** 挂载到 MySQL 初始化目录。

### 5.1 启动与停止

在 **`docker/`** 目录：

```bash
cd /path/to/maple-srv-java/docker
docker compose up -d --build
```

在任意目录指定文件：

```bash
docker compose -f /path/to/maple-srv-java/docker/docker-compose.yaml up -d --build
```

查看日志：

```bash
docker compose -f /path/to/maple-srv-java/docker/docker-compose.yaml logs -f maplestory
```

停止：

```bash
docker compose -f .../docker-compose.yaml down
```

仅停止游戏服、保留 MySQL 数据卷：

```bash
docker compose -f .../docker-compose.yaml stop maplestory
```

### 5.2 挂载与配置分工

| 路径 | 说明 |
| --- | --- |
| **`../config` → `/app/config`** | 宿主 `server.properties`、`shop.properties` 等；**改倍率、频道数、公告等多改这里** |
| **`./db.compose.properties` → `/app/config/db.properties`** | **覆盖**宿主 `config/db.properties`，使 JDBC 使用服务名 **`mysql`** 与库 **`maplestory`**；勿在容器场景把 URL 写成 `127.0.0.1`（除非 MySQL 打在宿主机网络） |
| **`../scripts` → `/app/scripts`** | WZ 与脚本；体量大时挂载可避免每次重建镜像 |

修改 **`config/server.properties`** 后，一般 **`docker compose restart maplestory`** 即可；修改 **`db.compose.properties`** 或 JVM 后同样重启游戏容器。

### 5.3 数据库密码

默认 **`MYSQL_ROOT_PASSWORD`** 与 **`docker/db.compose.properties`** 中 **`password=`** 均为示例值（见 compose 文件注释）。**修改任一者时二者必须一致**，否则游戏服无法连库。

可通过环境变量覆盖，例如在 `docker/` 下放置 `.env`：

```env
MYSQL_ROOT_PASSWORD=你的强密码
MYSQL_PORT=3306
```

并同步改写 **`docker/db.compose.properties`** 中的 `password=`。

### 5.4 首次启动时间

`init.sql` 较大，Compose 中 MySQL **`healthcheck.start_period`** 已拉长；若机器较慢，仍可能出现游戏容器在 MySQL 未就绪前重试，可稍后 **`docker compose up -d`** 再次拉起或等待健康检查通过。

---

## 6. 端口与防火墙

### 6.1 进程内约定

| 用途 | 来源 | 说明 |
| --- | --- | --- |
| 单实例锁 | **6350**（`server.Start` 硬编码） | 防止同机重复启动，一般不需对公网开放 |
| 登录 | **`RoyMS.LPort`**（示例 9555） | 客户端登录 |
| 商城 | **`RoyMS.CSPort`**（示例 8600） | 现金商城等 |
| 频道 | **`RoyMS.Port{n}`** 或 **2524+n** | 与 `RoyMS.Count` 一致；示例 6 频道常为 2525–2530 |

**防火墙、安全组、`docker-compose.yaml` 的 `ports` 必须与当前 `server.properties` 一致。**

### 6.2 Linux（firewalld，如 Rocky Linux 9）

示例（端口按你实际配置替换）：

```bash
firewall-cmd --permanent --add-port=9555/tcp
firewall-cmd --permanent --add-port=8600/tcp
firewall-cmd --permanent --add-port=2525-2530/tcp
firewall-cmd --reload
```

对公网暴露 **MySQL 3306** 风险高，生产环境建议仅内网或本机访问。

### 6.3 `RoyMS.IP`（客户端联机）

服务端会把 **`RoyMS.IP` 与端口** 告知客户端逻辑：

- **仅本机登录器**：`127.0.0.1` + 端口映射到本机通常可用。
- **局域网其他设备**：将 **`config/server.properties`** 中 **`RoyMS.IP`** 设为 **宿主机在该网段的 IP**（不要用 Docker 网桥 IP）。
- **云服务器**：使用公网 IP 或域名解析到的 IP，并确保安全组放行上述游戏端口。

---

## 7. 生产部署路径示例（Rocky Linux）

假设代码位于 **`/root/prod/maple-srv-java`**：

- Compose 中 **`../config`** 即 **`/root/prod/maple-srv-java/config`**，**无需**为改路径而改 compose 文件（只要从 `docker/` 目录相对关系不变）。
- 在 **`/root/prod/maple-srv-java/docker`** 执行 `docker compose up -d --build`。
- 根据联机范围修改 **`/root/prod/maple-srv-java/config/server.properties`** 的 **`RoyMS.IP`** 与端口相关项。
- 使用 **`docker/db.compose.properties`** 与 **`MYSQL_ROOT_PASSWORD`** 管理容器内数据库凭据。

若启用 **SELinux** 且卷挂载异常，可按发行版文档为容器卷配置相应标签（此处不展开）。

---

## 8. 常见问题简查

1. **启动立刻退出 / 数据库报错**：检查 `db.properties`（或 `db.compose.properties`）URL、用户名密码、库名；确认 **`auth_server_channel_ip`** 表存在。
2. **客户端连不上**：检查 **`RoyMS.IP`**、防火墙、`ports` 映射与 **`RoyMS.LPort`/频道端口** 是否一致。
3. **提示单实例已占用**：本机 **6350** 已被占用时进程会退出；关闭重复实例或排查占用进程。
4. **内存不足**：调大 **`JAVA_OPTS`**（Compose）或 `java -Xmx`（直连 JAR）；加载 WZ 后内存占用会升高。

更多配置键含义见 [CONFIGURATION.md](./CONFIGURATION.md)。

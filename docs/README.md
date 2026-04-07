# MapleStory 079 服务端 — 项目文档索引

本目录为 **MapleStory** Java 私服源码的技术说明，面向需要部署、排障或二次开发的维护者。

## 项目概要

| 项 | 说明 |
| --- | --- |
| 游戏版本 | MapleStory **079**（`ServerConstants.MAPLE_VERSION = 79`，补丁 `1`） |
| 客户端区域 | 中国区编码（`MapleType.中国`，GB18030） |
| 运行环境 | **Java 7**、**Maven**、**MySQL**（常见为 5.7） |
| 网络框架 | **Apache MINA 2**（`NioSocketAcceptor` + 自定义编解码） |
| 持久化 | **JDBC**（`mysql-connector-java`），无 Spring / MyBatis |
| 入口类 | `server.Start` |

源码Fork自 [aoaostar/MapleStory](https://github.com/aoaostar/MapleStory)；根目录 `README.md` 含简易安装步骤与 IDEA 运行参数。

## 文档导航

- [架构说明](./ARCHITECTURE.md)：进程模型、登录/频道/商城、World、定时器与数据加载顺序。
- [代码结构](./CODEBASE.md)：顶层包职责与关键类索引。
- [部署指南](./DEPLOYMENT.md)：本机 / Docker / Compose、端口与防火墙、`RoyMS.IP`、生产路径示例。
- [配置项说明](./CONFIGURATION.md)：`server.properties`、`db.properties` 及与代码的对应关系。

## 仓库主要目录（非详尽）

- `src/main/java`：服务端主代码（约 388 个 `.java`）。
- `src/main/resources`：收发包操作码表 `recvops.properties`、`sendops.properties` 等。
- `config/`：运行时外部配置（**必须通过 JVM 指定 `homePath` 指向此目录**）。
- `scripts/`：脚本与 WZ/XML 数据（`scripts/wz` 体量很大）。
- `docker/`：`dockerfile` 多阶段构建镜像；`docker-compose.yaml` 编排 MySQL + 游戏服；`init.sql` 初始化数据库；可选 `db.compose.properties` 用于 Compose 覆盖 JDBC。

## 快速提醒

1. 启动前必须设置系统属性：`homePath`、`scriptsPath`、`wzPath`（见 [DEPLOYMENT.md](./DEPLOYMENT.md)）。
2. `ServerProperties` 会在加载 `server.properties` 后，从表 **`auth_server_channel_ip`** 合并频道/IP 相关配置。
3. 仓库内 **`docker/init.sql`** 中 `CREATE DATABASE` 名为 `maplestory`，而示例 **`config/db.properties`** 的 URL 可能指向 `maple`；部署时需统一库名与 JDBC URL（Compose 场景同理）。

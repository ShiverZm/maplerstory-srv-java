# 代码结构

以下为 **`src/main/java`** 顶层包职责说明，便于定位功能与评估改动影响。

## `server`

核心业务服务器侧逻辑，与“地图、怪物、商店、任务、事件、计时器”等强相关。

| 子区域 / 类（示例） | 说明 |
| --- | --- |
| `Start` | 进程入口；初始化世界、网络、数据加载流水线 |
| `ServerProperties` | 读取 `server.properties` + `auth_server_channel_ip` |
| `Timer` 及内部子类 | 世界、地图、怪物、事件、Buff、作弊检测等定时任务 |
| `maps` | 地图对象、 foothold、刷怪、传送脚本接口 |
| `life` | 怪物属性、技能、刷新、NPC 生命体工厂 |
| `quest` | 任务定义与条件/奖励 |
| `events` | 副本/活动（OX、嘉年华、Fitness 等） |
| `shops` | 玩家商店、雇佣商人 |
| `custom` | 自定义玩法（拍卖行扩展、BOSS 排行等） |

## `handling`

网络 I/O 与会话内封包处理。

| 包 | 说明 |
| --- | --- |
| `MapleServerHandler` | MINA `IoHandler`； opcode 路由中心 |
| `RecvPacketOpcode` / `SendPacketOpcode` | 封包类型枚举与属性表联动 |
| `mina` | `MapleCodecFactory`、`MaplePacketDecoder/Encoder` |
| `login` / `login.handler` | 登录服，`LoginServer`、`CharLoginHandler`、`AutoRegister` 等 |
| `channel` / `channel.handler` | 频道内：移动、攻击、背包、NPC、公会、组队、伤害解析等 |
| `cashshop` / `cashshop.handler` | 商城与 MTS 相关操作 |
| `world` | 跨频道世界状态：公会、家族、组队、Messenger |

## `client`

玩家侧模型：角色属性、背包、技能、反作弊 `CheatTracker`、聊天命令 `messages.commands` 等。

## `database`

`DatabaseConnection`（每线程连接包装 + 超时）、`DatabaseException`。

## `tools`

通用工具与 **封包构造**（`MaplePacketCreator`）、字节流读写、时间/文件日志、加密辅助等。

## `provider` 与 `provider/WzXML`

游戏数据资源加载（WZ/XML），向 `server` 侧工厂类提供只读数据视图。

## `scripting`

脚本引擎封装与事件、传送门、副本实例管理（`EventInstanceManager`、`PortalScriptManager`、`AbstractScriptManager`）。

## `constants`

`GameConstants`（经验等）、`ServerConstants`（版本/区服类型/调试开关）、`MapConstants`、`FishingConstants`、`OtherSettings` 等。

## `gui`

可选的管理界面 `RoyMS`（Swing）。

## `KinMS`

与特定定制内容相关的数据库/事件工厂（命名空间独立，接入点需结合引用检索）。

## 资源与外部数据

| 路径 | 说明 |
| --- | --- |
| `scripts/` | 脚本与 WZ/XML；与 `scriptsPath`、`wzPath` 对应 |
| `config/` | **运行时** 外部配置，不打包进 jar 的常规做法是由部署目录挂载 |

## 体量参考

约 **388** 个 Java 源文件；`scripts/wz` 含大量 XML，版本控制与发布时注意体积与克隆时间。

# 架构说明

## 总体模型

本服务端是经典的 **单进程多 Acceptor** 私服架构：在同一 JVM 内依次启动 **登录服**、多个 **游戏频道**、**现金商城（含 MTS 相关会话）**，并通过 **`handling.world.World`** 协调跨频道逻辑（组队、公会、家族、Messenger 等）。

网络层统一采用 **Apache MINA**：每个服务绑定独立 TCP 端口，`MapleCodecFactory` 负责编解码，`MapleServerHandler` 继承 `IoHandlerAdapter`，根据当前会话类型（登录 / 频道 / 商城）分发收到的客户端封包。

## 启动顺序（`server.Start`）

启动阶段大致如下（与控制台输出顺序一致）：

1. **单实例检测**：绑定本地端口 **6350**；若已被占用则认为已有实例在运行并退出。
2. **读取配置**：依赖 `homePath` 下的 `server.properties`、`db.properties` 等（见静态块与 `main` 中的 `System.setProperty`）。
3. **数据库连通性**：重置 `accounts.loggedin` 等；失败则抛出“无法连接 MySQL”的运行时异常。
4. **`World.init()`**：初始化世界级状态（跨频道数据结构）。
5. **定时器线程**：`Timer.WorldTimer`、`MapTimer`、`MobTimer`、`CheatTimer` 等多套计时器。
6. **`loadData()`**：加载经验表、公会、任务、怪物掉落、道具、技能、商城数据、地图 NPC/怪物缓存等与游戏内容强相关的静态数据（**内存占用会明显上升**）。
7. **`LoginServer.run_startup_configurations()`**：绑定 **登录端口**（配置项 `RoyMS.LPort`）。
8. **`ChannelServer.startChannel_Main()`**：按 `RoyMS.Count`（上限 10）为每个频道创建 `ChannelServer` 并绑定 **频道端口**。
9. **`CashShopServer.run_startup_configurations()`**：绑定 **商城端口**（`RoyMS.CSPort`，默认 5200）。
10. **`World.registerRespawn()`**：注册地图刷怪/刷新逻辑。
11. **反作弊 / 在线统计等定时任务**（视配置而定）。
12. **`LoginServer.setOn()`**：登录服对外可接受连接。

可选：`RoyMS.loadGui=true` 时加载 Swing 管理界面 `gui.RoyMS`。

## 三大接入点

### 登录服（`handling.login.LoginServer`）

- 使用 `NioSocketAcceptor`，处理器为 `new MapleServerHandler(-1, false)`（第二个布尔参数表示非商城）。
- 端口：`RoyMS.LPort`。
- 维护登录认证缓存（`loginAuth`、`loginIPAuth`）及频道负载 `load` 等。

### 频道服（`handling.channel.ChannelServer`）

- 每个频道一个 `IoAcceptor`，处理器为 `MapleServerHandler`（商城标志为 `false`）。
- 端口：优先读 `RoyMS.Port{频道号}`，否则 **2524 + 频道号**（`DEFAULT_PORT` 基准与配置共同决定）。
- 内含 `MapleMapFactory`、`PlayerStorage`、`EventScriptManager`、商会/远征队等频道内状态。

### 现金商城（`handling.cashshop.CashShopServer`）

- 独立 `IoAcceptor`，`MapleServerHandler(-1, true)` 区分商城逻辑。
- 端口：`RoyMS.CSPort`。
- 使用独立 `PlayerStorage`（含 MTS 用存储 `-20`）。

## 封包与业务分发

- **收包 opcode**：`handling.RecvPacketOpcode`；资源文件 `recvops.properties` 可与 `ExternalCodeTableGetter` 配合（若启用）。
- **发包 opcode**：`handling.SendPacketOpcode` + `sendops.properties`。
- **`MapleServerHandler`** 根据 opcode 调用 `handling.login.handler.*` 或 `handling.channel.handler.*` 或 `handling.cashshop.handler.*` 中具体处理方法。

加密/摘要相关工具位于 `tools`（如 `MapleAESOFB`、`MapleCustomEncryption`）。

## 世界与跨频道

`handling.world.World` 及子包（`guild`、`family`）负责：

- 频道间角色转移、`CharacterTransfer`、Buff 跨服存储（`PlayerBuffStorage`）；
- 公会、联盟、家族、Messenger、组队等 **不在单一 ChannelServer 内闭环** 的功能。

## 数据与资源

- **数据库**：`database.DatabaseConnection` 按 **Java 线程 ID** 维护连接包装（每线程一个 `Connection`），并带超时重连；用 `SHOW VARIABLES LIKE 'wait_timeout'` 对齐 MySQL 超时。
- **WZ/脚本**：`System.getProperty("wzPath")`、`scripts_path` 指向 `scripts/` 下内容；`provider` 包解析 WZ/XML；`scripting` 包驱动地图/传送门/事件等脚本（与 NPC、任务流程耦合）。

## 自定义扩展片段

代码中存在若干业务向扩展包，例如：

- `server.custom.auction1`、`server.custom.bossrank`；
- `KinMS.db` 下自定义事件工厂等。

二次开发时建议先确认与主线 `World` / `ChannelServer` 的耦合点，再改动。

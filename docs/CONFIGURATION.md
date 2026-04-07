# 配置说明

配置分为 **文件属性** 与 **数据库表** 两部分；部分逻辑在 `constants.ServerConstants` 中读取 `ServerProperties` 完成静态初始化。

## `config/server.properties`（主配置）

由 `server.ServerProperties` 加载，文件路径来自系统属性 `server_property_file_path`（由 `homePath` + `server.properties` 组成）。

常见前缀为 **`RoyMS.`**。示例如下（以仓库内文件为参考，实际以你环境为准）：

| 键 | 作用 |
| --- | --- |
| `RoyMS.Count` | 频道数量（代码上限 **10**） |
| `RoyMS.LPort` | 登录服端口 |
| `RoyMS.Port` / `RoyMS.Port{n}` | 频道端口；未配置 per-channel 键时回退为 **2524 + n** |
| `RoyMS.CSPort` | 现金商城端口 |
| `RoyMS.IP` | 对外声明的服务器 IP（与端口拼成 `ip:port` 发给客户端） |
| `RoyMS.Exp` / `RoyMS.Meso` / `RoyMS.Drop` / `RoyMS.BDrop` | 经验、金币、掉落、BOSS 掉落等倍率在启动日志中打印 |
| `RoyMS.ServerName`、`RoyMS.EventMessage`、`RoyMS.Flag` | 登录/选区展示相关 |
| `RoyMS.Admin` | 仅管理员可登录 |
| `RoyMS.AutoRegister` | 自动注册 |
| `RoyMS.MaxCharacters` | 每账号角色数上限 |
| `RoyMS.userLimit` | 用户上限相关 |
| `RoyMS.MLevel` / `RoyMS.QLevel` | 战神·冒险家 / 骑士团等级上限等 |
| `RoyMS.warpcsshop`、`RoyMS.warpmts` | 进商城/拍卖是否经 NPC 脚本切换 |
| `RoyMS.检测复制装备` | 启动时扫描 `inventoryitems.equipOnlyId` 反复制 |
| `RoyMS.防万能检测` | 周期性对在线角色执行 `startCheck` |
| `RoyMS.封包显示`、`RoyMS.调试输出封包`、`RoyMS.记录38错误` | 调试与封包错误记录 |
| `RoyMS.loadGui` | 是否打开 Swing 工具 `RoyMS` |

另有赌博、PVP 地图 ID、职业群开关等扩展项，见 `server.properties` 全文。

## `config/db.properties`

由 `database.DatabaseConnection` 读取，路径为 `server_property_db_path`。

| 键 | 含义 |
| --- | --- |
| `driverClassName` | JDBC 驱动类（示例为 `com.mysql.jdbc.Driver`） |
| `url` | JDBC URL，需带库名与编码参数 |
| `username` / `password` | 凭据 |
| `timeout` | 连接空闲超时（毫秒），缺省时内部有默认值 |

## 其他配置文件

- **`config/shop.properties`** / **`config/fish.properties`**：由 `Start.main` 注入系统属性路径，供商城、钓鱼等子系统读取（具体类见 `server` / `constants` 包引用）。
- **`src/main/resources/recvops.properties`、`sendops.properties`**：收发包操作码表，配合 `handling` 与 `tools` 使用。
- **`src/main/resources/修复内容.properties`**：项目内说明用属性文件（不参与网络协议）。

## 数据库表：`auth_server_channel_ip`

`ServerProperties` 静态块内会执行：

```sql
SELECT * FROM auth_server_channel_ip
```

将结果映射为 `Properties` 条目：`name` + `channelid` 拼成键，`value` 为值。用于覆盖或补充 **频道 IP/端口类** 配置；若表不存在或连接失败，进程会 **`System.exit(0)`**。

## `constants.ServerConstants` 中值得注意项

- `MAPLE_TYPE`、`MAPLE_VERSION`、`MAPLE_PATCH`：客户端版本与区域识别。
- `CHANNEL_COUNT`：常量 200，与配置里的实际频道数 `RoyMS.Count` 不同用途，勿混淆。
- `Use_Fixed_IV`：是否固定 IV（加密行为）。

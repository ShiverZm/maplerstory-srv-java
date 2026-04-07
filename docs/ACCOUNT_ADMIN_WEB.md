# 网页账号管理（含前台注册审批）

该功能当前由 Maven `maple-web-front`（前台）与 `maple-web-admin`（后台）子模块提供，公共能力沉淀在 `maple-web-core`，并由 `maple-server` 的 `server.Start` 内嵌启动。支持两种模式：

1. 管理员直接创建账号；
2. 前台提交注册申请，管理员审批通过后才写入账号。

## 功能特性

- 管理员创建页面：`GET /admin/accounts/new`
- 管理员创建接口：`POST /admin/accounts`
- 前台注册页面：`GET /register`
- 前台注册提交：`POST /register`
- 审批列表页面：`GET /admin/requests`
- 审批操作：`POST /admin/requests/{id}/approve`、`POST /admin/requests/{id}/reject`
- 健康检查：`GET /admin/health`
- 鉴权方式：请求头 `X-Admin-Token`（管理接口）
- 密码算法：`SHA1(hex)`（复用 `LoginCrypto.hexSha1`）

## 先执行建表 SQL

请先执行：

- `docs/sql/account_register_requests.sql`

该表用于保存待审批申请（`PENDING/APPROVED/REJECTED`）。

## 配置项

在 `config/server.properties` 中添加/修改：

```properties
RoyMS.WebAdminEnabled = false
RoyMS.WebAdminHost = 127.0.0.1
RoyMS.WebAdminPort = 8088
RoyMS.WebAdminToken = change-me
RoyMS.WebAdminAllowIps = 127.0.0.1,::1
RoyMS.WebRegisterEnabled = true
RoyMS.WebRegisterNeedCaptcha = false
RoyMS.WebRegisterRateLimitSeconds = 30
RoyMS.RuoYiThymeleafCache = false
RoyMS.RuoYiSessionTimeoutMinutes = 30
```

说明：

- `RoyMS.WebAdminEnabled`：是否开启网页管理。
- `RoyMS.WebAdminHost`：监听地址，建议保持 `127.0.0.1`。
- `RoyMS.WebAdminPort`：监听端口。
- `RoyMS.WebAdminToken`：管理密钥，长度建议 >= 16。
- `RoyMS.WebAdminAllowIps`：允许访问的来源 IP 白名单，逗号分隔。
- `RoyMS.WebRegisterEnabled`：是否开启前台注册。
- `RoyMS.WebRegisterNeedCaptcha`：验证码预留开关（当前仅预留，不启用验证码逻辑）。
- `RoyMS.WebRegisterRateLimitSeconds`：同一来源 IP 的最小注册提交间隔（秒）。
- `RoyMS.RuoYiThymeleafCache`：是否启用 Thymeleaf 模板缓存（开发期建议 `false`）。
- `RoyMS.RuoYiSessionTimeoutMinutes`：Web Session 超时时间（分钟）。

## 使用方式

1. 执行 `docs/sql/account_register_requests.sql`。
2. 设置 `RoyMS.WebAdminEnabled = true` 并配置好 `RoyMS.WebAdminToken`。
3. 视需求设置 `RoyMS.WebRegisterEnabled = true`。
4. 重启服务端。
5. 访问管理页：`http://127.0.0.1:8088/admin/accounts/new`
6. 请求头携带：`X-Admin-Token: <你的token>`
7. 可直接创建账号或进入待审批列表页面。

## 前台注册流程

1. 访问：`http://127.0.0.1:8088/register`
2. 提交账号密码后写入待审批表（不会立刻写入 `accounts`）
3. 管理员访问 `GET /admin/requests` 审批
4. 审批通过后才会创建 `accounts` 记录。

## API 示例

### 前台提交注册（JSON）

```bash
curl -X POST "http://127.0.0.1:8088/register" \
  -H "Content-Type: application/json" \
  -d '{"username":"test001","password":"Abc12345"}'
```

成功返回（200）：

```json
{"success":true,"message":"申请已提交，等待管理员审核"}
```

### 管理员审批通过

```bash
curl -X POST "http://127.0.0.1:8088/admin/requests/1/approve" \
  -H "X-Admin-Token: change-me"
```

### 管理员审批拒绝

```bash
curl -X POST "http://127.0.0.1:8088/admin/requests/1/reject" \
  -H "Content-Type: application/json" \
  -H "X-Admin-Token: change-me" \
  -d '{"note":"信息不完整"}'
```

### 管理员直接创建账号（JSON）

```bash
curl -X POST "http://127.0.0.1:8088/admin/accounts" \
  -H "Content-Type: application/json" \
  -H "X-Admin-Token: change-me" \
  -d '{"username":"test001","password":"Abc12345"}'
```

成功返回（201）：

```json
{"success":true,"message":"创建成功","username":"test001"}
```

失败示例（覆盖前台与审批流程）：

- 401：未授权（token错误或IP不在白名单）
- 404：申请不存在 / 路由不存在
- 409：账号已存在、申请已处理、重复待审
- 429：注册请求过快（触发限流）
- 400：参数校验失败（长度/字符不合法、密码是保留值）
- 500：数据库错误

## 校验规则

- 账号长度：4-16
- 账号字符：仅字母、数字、下划线
- 密码长度：6-32
- 禁用密码（与登录逻辑一致）：`disconnect`、`fixme`、`admin`、`000000`

## 安全建议

- 只监听本地回环地址（`127.0.0.1`），通过 SSH 隧道或内网访问。
- 生产环境使用复杂 token，不要使用默认值。
- 若必须公网访问，请增加反向代理鉴权（如 BasicAuth、IP ACL、WAF）。
- 定期轮换 `RoyMS.WebAdminToken`。


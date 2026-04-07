package com.ruoyi.system.service;

import com.ruoyi.web.bootstrap.WebModuleConfig;
import java.security.MessageDigest;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class WebAccountService {
    private final WebModuleConfig config;

    public WebAccountService(WebModuleConfig config) {
        this.config = config;
    }

    public ServiceResult createDirect(String username, String password, String ip) {
        String u = trim(username);
        String p = trim(password);
        ServiceResult v = validate(u, p);
        if (!v.isSuccess()) {
            return v;
        }
        try (Connection con = openConnection()) {
            if (existsAccount(con, u)) {
                return ServiceResult.fail(409, "账号已存在");
            }
            insertAccount(con, u, sha1Hex(p), ip);
            return ServiceResult.ok(201, "创建成功");
        } catch (Exception ex) {
            return ServiceResult.fail(500, "数据库错误: " + ex.getMessage());
        }
    }

    public ServiceResult submitRequest(String username, String password, String ip) {
        String u = trim(username);
        String p = trim(password);
        ServiceResult v = validate(u, p);
        if (!v.isSuccess()) {
            return v;
        }
        try (Connection con = openConnection()) {
            if (existsAccount(con, u)) {
                return ServiceResult.fail(409, "账号已存在");
            }
            if (existsPending(con, u)) {
                return ServiceResult.fail(409, "该账号已有待审核申请");
            }
            PreparedStatement ps = con.prepareStatement(
                    "INSERT INTO account_register_requests (username,password_sha1,status,created_at,request_ip) VALUES (?,?,'PENDING',?,?)");
            ps.setString(1, u);
            ps.setString(2, sha1Hex(p));
            ps.setTimestamp(3, new Timestamp(new Date().getTime()));
            ps.setString(4, ip);
            ps.executeUpdate();
            ps.close();
            return ServiceResult.ok(200, "申请已提交，等待管理员审核");
        } catch (Exception ex) {
            return ServiceResult.fail(500, "数据库错误: " + ex.getMessage());
        }
    }

    public List<RegisterRow> listPending() {
        List<RegisterRow> out = new ArrayList<RegisterRow>();
        try (Connection con = openConnection()) {
            PreparedStatement ps = con.prepareStatement(
                    "SELECT id,username,created_at,request_ip FROM account_register_requests WHERE status='PENDING' ORDER BY id ASC");
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                out.add(new RegisterRow(rs.getInt("id"), rs.getString("username"), rs.getTimestamp("created_at"), rs.getString("request_ip")));
            }
            rs.close();
            ps.close();
        } catch (Exception ignored) {
        }
        return out;
    }

    public ServiceResult approve(int id, String reviewerIp) {
        Connection con = null;
        try {
            con = openConnection();
            con.setAutoCommit(false);
            PreparedStatement ps = con.prepareStatement(
                    "SELECT username,password_sha1,status FROM account_register_requests WHERE id=? FOR UPDATE");
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                rs.close();
                ps.close();
                con.rollback();
                return ServiceResult.fail(404, "申请不存在");
            }
            String username = rs.getString("username");
            String sha1 = rs.getString("password_sha1");
            String status = rs.getString("status");
            rs.close();
            ps.close();
            if (!"PENDING".equals(status)) {
                con.rollback();
                return ServiceResult.fail(409, "申请已处理");
            }
            if (existsAccount(con, username)) {
                rejectInternal(con, id, reviewerIp, "审批时发现账号已存在");
                con.commit();
                return ServiceResult.fail(409, "账号已存在，申请已自动拒绝");
            }
            insertAccount(con, username, sha1, reviewerIp);
            PreparedStatement up = con.prepareStatement(
                    "UPDATE account_register_requests SET status='APPROVED',reviewed_at=?,reviewer_ip=? WHERE id=?");
            up.setTimestamp(1, new Timestamp(new Date().getTime()));
            up.setString(2, reviewerIp);
            up.setInt(3, id);
            up.executeUpdate();
            up.close();
            con.commit();
            return ServiceResult.ok(200, "审批通过并已创建账号: " + username);
        } catch (Exception ex) {
            if (con != null) {
                try {
                    con.rollback();
                } catch (SQLException ignored) {
                }
            }
            return ServiceResult.fail(500, "数据库错误: " + ex.getMessage());
        } finally {
            if (con != null) {
                try {
                    con.setAutoCommit(true);
                    con.close();
                } catch (SQLException ignored) {
                }
            }
        }
    }

    public ServiceResult reject(int id, String reviewerIp, String note) {
        try (Connection con = openConnection()) {
            PreparedStatement ps = con.prepareStatement(
                    "UPDATE account_register_requests SET status='REJECTED',reviewed_at=?,reviewer_ip=?,review_note=? WHERE id=? AND status='PENDING'");
            ps.setTimestamp(1, new Timestamp(new Date().getTime()));
            ps.setString(2, reviewerIp);
            ps.setString(3, trim(note));
            ps.setInt(4, id);
            int updated = ps.executeUpdate();
            ps.close();
            if (updated == 0) {
                return ServiceResult.fail(404, "申请不存在或已处理");
            }
            return ServiceResult.ok(200, "已拒绝申请");
        } catch (Exception ex) {
            return ServiceResult.fail(500, "数据库错误: " + ex.getMessage());
        }
    }

    private void rejectInternal(Connection con, int id, String reviewerIp, String note) throws SQLException {
        PreparedStatement ps = con.prepareStatement(
                "UPDATE account_register_requests SET status='REJECTED',reviewed_at=?,reviewer_ip=?,review_note=? WHERE id=?");
        ps.setTimestamp(1, new Timestamp(new Date().getTime()));
        ps.setString(2, reviewerIp);
        ps.setString(3, trim(note));
        ps.setInt(4, id);
        ps.executeUpdate();
        ps.close();
    }

    private Connection openConnection() throws Exception {
        Class.forName(config.getDbDriver());
        return DriverManager.getConnection(config.getDbUrl(), config.getDbUser(), config.getDbPassword());
    }

    private boolean existsAccount(Connection con, String username) throws SQLException {
        PreparedStatement ps = con.prepareStatement("SELECT id FROM accounts WHERE name=?");
        ps.setString(1, username);
        ResultSet rs = ps.executeQuery();
        boolean exists = rs.next();
        rs.close();
        ps.close();
        return exists;
    }

    private boolean existsPending(Connection con, String username) throws SQLException {
        PreparedStatement ps = con.prepareStatement(
                "SELECT id FROM account_register_requests WHERE username=? AND status='PENDING'");
        ps.setString(1, username);
        ResultSet rs = ps.executeQuery();
        boolean exists = rs.next();
        rs.close();
        ps.close();
        return exists;
    }

    private void insertAccount(Connection con, String username, String sha1, String ip) throws SQLException {
        PreparedStatement ps = con.prepareStatement(
                "INSERT INTO accounts (name,password,email,birthday,createdat,lastlogon,SessionIP) VALUES (?,?,?,?,?,?,?)");
        ps.setString(1, username);
        ps.setString(2, sha1);
        ps.setString(3, "webadmin@local");
        ps.setString(4, "2008-04-07");
        Timestamp now = new Timestamp(new Date().getTime());
        ps.setTimestamp(5, now);
        ps.setTimestamp(6, now);
        ps.setString(7, ip == null ? "/127.0.0.1" : ip);
        ps.executeUpdate();
        ps.close();
    }

    private ServiceResult validate(String username, String password) {
        if (username.length() < 4 || username.length() > 16) {
            return ServiceResult.fail(400, "账号长度必须在 4-16 之间");
        }
        if (!username.matches("^[A-Za-z0-9_]+$")) {
            return ServiceResult.fail(400, "账号仅支持字母、数字、下划线");
        }
        if (password.length() < 6 || password.length() > 32) {
            return ServiceResult.fail(400, "密码长度必须在 6-32 之间");
        }
        String lower = password.toLowerCase();
        if ("disconnect".equals(lower) || "fixme".equals(lower) || "admin".equals(lower) || "000000".equals(lower)) {
            return ServiceResult.fail(400, "该密码不允许使用");
        }
        return ServiceResult.ok(200, "ok");
    }

    private String trim(String value) {
        return value == null ? "" : value.trim();
    }

    private String sha1Hex(String value) throws Exception {
        MessageDigest md = MessageDigest.getInstance("SHA-1");
        byte[] hash = md.digest(value.getBytes("UTF-8"));
        StringBuilder sb = new StringBuilder();
        for (byte b : hash) {
            String s = Integer.toHexString(b & 0xFF);
            if (s.length() == 1) {
                sb.append('0');
            }
            sb.append(s);
        }
        return sb.toString();
    }

    public static class RegisterRow {
        private final int id;
        private final String username;
        private final Timestamp createdAt;
        private final String requestIp;

        public RegisterRow(int id, String username, Timestamp createdAt, String requestIp) {
            this.id = id;
            this.username = username;
            this.createdAt = createdAt;
            this.requestIp = requestIp;
        }

        public int getId() {
            return id;
        }

        public String getUsername() {
            return username;
        }

        public Timestamp getCreatedAt() {
            return createdAt;
        }

        public String getRequestIp() {
            return requestIp;
        }
    }

    public static class ServiceResult {
        private final boolean success;
        private final int status;
        private final String message;

        public ServiceResult(boolean success, int status, String message) {
            this.success = success;
            this.status = status;
            this.message = message;
        }

        public static ServiceResult ok(int status, String message) {
            return new ServiceResult(true, status, message);
        }

        public static ServiceResult fail(int status, String message) {
            return new ServiceResult(false, status, message);
        }

        public boolean isSuccess() {
            return success;
        }

        public int getStatus() {
            return status;
        }

        public String getMessage() {
            return message;
        }
    }
}


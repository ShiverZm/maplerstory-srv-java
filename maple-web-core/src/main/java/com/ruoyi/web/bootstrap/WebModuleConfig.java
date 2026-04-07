package com.ruoyi.web.bootstrap;

import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Properties;
import java.util.Set;
import org.springframework.stereotype.Component;

@Component
public class WebModuleConfig {
    private final Properties props = new Properties();
    private final Properties dbProps = new Properties();

    public WebModuleConfig() {
        load();
    }

    private void load() {
        final String serverPath = System.getProperty("server_property_file_path");
        final String dbPath = System.getProperty("server_property_db_path");
        try {
            if (serverPath != null) {
                InputStreamReader fr = new InputStreamReader(new FileInputStream(serverPath), "UTF-8");
                props.load(fr);
                fr.close();
            }
        } catch (Exception ignored) {
        }
        try {
            if (dbPath != null) {
                InputStreamReader fr = new InputStreamReader(new FileInputStream(dbPath), "UTF-8");
                dbProps.load(fr);
                fr.close();
            }
        } catch (Exception ignored) {
        }
    }

    public boolean isWebAdminEnabled() {
        return Boolean.parseBoolean(props.getProperty("RoyMS.WebAdminEnabled", "false"));
    }

    public String getHost() {
        return props.getProperty("RoyMS.WebAdminHost", "127.0.0.1");
    }

    public int getPort() {
        return Integer.parseInt(props.getProperty("RoyMS.WebAdminPort", "8088"));
    }

    public String getToken() {
        return props.getProperty("RoyMS.WebAdminToken", "");
    }

    public boolean isRegisterEnabled() {
        return Boolean.parseBoolean(props.getProperty("RoyMS.WebRegisterEnabled", "false"));
    }

    public int getRegisterRateLimitSeconds() {
        return Integer.parseInt(props.getProperty("RoyMS.WebRegisterRateLimitSeconds", "30"));
    }

    public boolean isThymeleafCacheEnabled() {
        return Boolean.parseBoolean(props.getProperty("RoyMS.RuoYiThymeleafCache", "false"));
    }

    public int getSessionTimeoutMinutes() {
        return Integer.parseInt(props.getProperty("RoyMS.RuoYiSessionTimeoutMinutes", "30"));
    }

    public Set<String> getAllowIps() {
        final Set<String> out = new HashSet<String>();
        final String raw = props.getProperty("RoyMS.WebAdminAllowIps", "127.0.0.1,::1");
        for (String ip : Arrays.asList(raw.split(","))) {
            String t = ip.trim();
            if (!t.isEmpty()) {
                out.add(t);
            }
        }
        return out;
    }

    public String getDbUrl() {
        return dbProps.getProperty("url", "");
    }

    public String getDbUser() {
        return dbProps.getProperty("username", "");
    }

    public String getDbPassword() {
        return dbProps.getProperty("password", "");
    }

    public String getDbDriver() {
        return dbProps.getProperty("driverClassName", "com.mysql.jdbc.Driver");
    }
}


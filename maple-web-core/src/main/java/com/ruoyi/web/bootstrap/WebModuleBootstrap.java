package com.ruoyi.web.bootstrap;

import org.springframework.boot.WebApplicationType;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ConfigurableApplicationContext;

public class WebModuleBootstrap {
    private static volatile ConfigurableApplicationContext context;

    private WebModuleBootstrap() {
    }

    public static synchronized void start() {
        if (context != null) {
            return;
        }
        WebModuleConfig config = new WebModuleConfig();
        if (!config.isWebAdminEnabled()) {
            System.out.println("[WebRuoYi] 管理模块未启用");
            return;
        }
        Class<?> bootClass = resolveBootClass();
        context = new SpringApplicationBuilder(bootClass)
                .web(WebApplicationType.SERVLET)
                .properties(
                        "server.address=" + config.getHost(),
                        "server.port=" + config.getPort(),
                        "spring.thymeleaf.cache=" + config.isThymeleafCacheEnabled(),
                        "server.servlet.session.timeout=" + config.getSessionTimeoutMinutes() + "m"
                )
                .run();
        System.out.println("[WebRuoYi] 已启动 http://" + config.getHost() + ":" + config.getPort());
    }

    private static Class<?> resolveBootClass() {
        try {
            return Class.forName("com.ruoyi.RuoYiApplication");
        } catch (ClassNotFoundException ignore) {
            try {
                return Class.forName("com.ruoyi.web.RuoYiWebModuleApplication");
            } catch (ClassNotFoundException ex) {
                throw new RuntimeException("未找到 RuoYi 启动类: com.ruoyi.RuoYiApplication / com.ruoyi.web.RuoYiWebModuleApplication", ex);
            }
        }
    }

    public static synchronized void stop() {
        if (context != null) {
            context.close();
            context = null;
        }
    }
}


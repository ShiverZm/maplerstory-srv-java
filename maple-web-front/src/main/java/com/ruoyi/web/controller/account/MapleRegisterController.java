package com.ruoyi.web.controller.account;

import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.framework.web.controller.BaseController;
import com.ruoyi.system.domain.SimpleAccountRequest;
import com.ruoyi.system.service.WebAccountService;
import com.ruoyi.web.bootstrap.WebModuleConfig;
import java.util.concurrent.ConcurrentHashMap;
import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MapleRegisterController extends BaseController {
    private final WebModuleConfig config;
    private final WebAccountService service;
    private final ConcurrentHashMap<String, Long> ipTimes = new ConcurrentHashMap<String, Long>();

    public MapleRegisterController(WebModuleConfig config, WebAccountService service) {
        this.config = config;
        this.service = service;
    }

    @GetMapping("/register")
    public String registerPage() {
        return config.isRegisterEnabled() ? "maple/register" : "error/404";
    }

    @PostMapping(value = "/register", consumes = "application/json")
    @ResponseBody
    public AjaxResult registerSubmitJson(@RequestBody SimpleAccountRequest request, HttpServletRequest servletRequest) {
        return doSubmit(request, servletRequest);
    }

    @PostMapping(value = "/register", consumes = "application/x-www-form-urlencoded")
    @ResponseBody
    public AjaxResult registerSubmitForm(SimpleAccountRequest request, HttpServletRequest servletRequest) {
        return doSubmit(request, servletRequest);
    }

    private AjaxResult doSubmit(SimpleAccountRequest request, HttpServletRequest servletRequest) {
        if (!config.isRegisterEnabled()) {
            return AjaxResult.error("register disabled");
        }
        String ip = servletRequest.getRemoteAddr();
        long now = System.currentTimeMillis();
        Long last = ipTimes.get(ip);
        if (last != null && now - last.longValue() < config.getRegisterRateLimitSeconds() * 1000L) {
            return AjaxResult.error("请求过于频繁，请稍后重试");
        }
        WebAccountService.ServiceResult result = service.submitRequest(request.getUsername(), request.getPassword(), ip);
        if (result.isSuccess()) {
            ipTimes.put(ip, now);
            return toAjax(true, result.getMessage());
        }
        return toAjax(false, result.getMessage());
    }
}


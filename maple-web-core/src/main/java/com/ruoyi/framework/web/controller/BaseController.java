package com.ruoyi.framework.web.controller;

import com.ruoyi.common.core.domain.AjaxResult;

public class BaseController {
    protected AjaxResult toAjax(boolean ok, String message) {
        return ok ? AjaxResult.success(message) : AjaxResult.error(message);
    }
}


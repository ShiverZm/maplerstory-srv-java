-- RuoYi 风格菜单初始化（最小集）
-- 使用前请确认表名与字段与实际 RuoYi 版本一致（默认 sys_menu）

INSERT INTO sys_menu
(menu_name, parent_id, order_num, path, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
VALUES
('枫叶账号管理', 0, 90, 'maple', NULL, NULL, 1, 0, 'M', '0', '0', '', 'fa fa-gamepad', 'admin', NOW(), '', NULL, 'Maple 账号管理根菜单');

SET @maple_parent_id = LAST_INSERT_ID();

INSERT INTO sys_menu
(menu_name, parent_id, order_num, path, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
VALUES
('注册审批', @maple_parent_id, 1, 'admin/requests', NULL, NULL, 1, 0, 'C', '0', '0', 'maple:requests:list', '#', 'admin', NOW(), '', NULL, '注册申请审批页面'),
('直建账号', @maple_parent_id, 2, 'admin/accounts/new', NULL, NULL, 1, 0, 'C', '0', '0', 'maple:accounts:create', '#', 'admin', NOW(), '', NULL, '管理员直接创建账号');


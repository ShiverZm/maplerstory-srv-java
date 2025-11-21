# MapleStory

fork from https://github.com/aoaostar/MapleStory

> 能进来看的人大部分估计都是对这款2D游戏有着浓厚兴趣和深刻感情的

# 简单介绍一下安装吧

游戏安装大的步骤分为三步
* 第一步：

1. 安装mysql数据库、导入sql文件
2. 修改一下config下面的db.properties 文件中的数据库连接信息就行了
3. server.properties 是服务端的配置信息，可看着修改
4. 开放端口：9595、8600、2525~2530

* 第二步：运行服务端
    
    windows:
    ```shell
    ./start.bat
    ```

    linux:
    ```shell
    nohup ./start.sh 2>&1 &
    ```

* 第三步：运行游戏
下载个客户端，双击登录器就进入游戏了

客户端，关注微信公众号【二进制怪兽】 发送【冒险岛】 获得下载链接

# 二次开发
## 环境
java1.7
idea
mysql5.7
maven

## 步骤
1. idea 导入该项目
2. 修改config目录下的db.properties数据库信息
3. mysql导入sql数据库
4. 进入src/java/server/Start.java
5. 点击运行main
注意：需要edit configuration
在VM options添加这一行，才能运行成功:
```
-DhomePath=$ProjectFileDir$/config/ -DscriptsPath=$ProjectFileDir$/scripts/ -DwzPath=$ProjectFileDir$/scripts/wz
```


# 提issue
有着各种问题，我有点自己解决了，有的问题希望大家提出来我们一起来改进。

问题模板：
现象+复现步骤+系统环境+报错的打印输出（必要时附上当时sql文件）

---
如果觉得项目不错，可以请我喝杯咖啡，您的鼓励是我最大的动力。




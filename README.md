# MapleStory

fork from https://github.com/aoaostar/MapleStory

> �ܽ��������˴󲿷ֹ��ƶ��Ƕ����2D��Ϸ����Ũ����Ȥ����̸����

# �򵥽���һ�°�װ��

��Ϸ��װ��Ĳ����Ϊ����
* ��һ����

1. ��װmysql���ݿ⡢����sql�ļ�
2. �޸�һ��config�����db.properties �ļ��е����ݿ�������Ϣ������
3. server.properties �Ƿ���˵�������Ϣ���ɿ����޸�
4. ���Ŷ˿ڣ�9595��8600��2525~2530

* �ڶ��������з����
    
    windows:
    ```shell
    ./start.bat
    ```

    linux:
    ```shell
    nohup ./start.sh 2>&1 &
    ```

* ��������������Ϸ
���ظ��ͻ��ˣ�˫����¼���ͽ�����Ϸ��

�ͻ��ˣ���ע΢�Ź��ںš������ƹ��ޡ� ���͡�ð�յ� 079�� �����������

# ���ο���
## ����
java1.7
idea
mysql5.7
maven

## ����
1. idea �������Ŀ
2. �޸�configĿ¼�µ�db.properties���ݿ���Ϣ
3. mysql����sql���ݿ�
4. ����src/java/server/Start.java
5. �������main
ע�⣺��Ҫedit configuration
��VM options�����һ�У��������гɹ�:
```
-DhomePath=$ProjectFileDir$/config/ -DscriptsPath=$ProjectFileDir$/scripts/ -DwzPath=$ProjectFileDir$/scripts/wz
```


# ��issue
���Ÿ������⣬���е��Լ�����ˣ��е�����ϣ��������������һ�����Ľ���

����ģ�壺
����+���ֲ���+ϵͳ����+����Ĵ�ӡ�������Ҫʱ���ϵ�ʱsql�ļ���

---
���������Ŀ�����������Һȱ����ȣ����Ĺ����������Ķ�����

![����·��](./img/dashang_pic.png)



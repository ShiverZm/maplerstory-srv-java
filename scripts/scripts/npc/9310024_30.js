status = -1;
//刚刚找你 你不在 所以我就给你写这套脚本出来了 我给你解说下 
var itemList = Array(//首先我们要接触到的 就是 Array函数系列的运用
			/*Array(1032027,800, 1, 1), //黑水晶耳环
			如上面一排格式大概就是这样   Array(物品ID,概率,数量,播报),//物品名字
			大概格式就是这样然后我给你解说下 概率和播报这两个
			概率这个值是怎么算高或者怎么算低呢？？ 就是全部所有的物品的暴率都加起来然后用这个数除以总暴率就是 这件物品的暴率了
			播报很简单 0就是抽中奖品后不发公告内容 1就是中奖之后要发一条喇叭说 谁谁谁中奖了*/
			Array(1051098,300,1,1),//红浴巾
			Array(1050100,300,1,1),//蓝浴巾
			Array(1032026,300,1,1),//黄水晶耳环
			Array(1032027,300,1,1),//黑水晶耳环
			Array(1032028,300,1,1),//红水晶耳环
			Array(1032035,300,1,1),//枫叶耳环
			Array(1032040,300,1,1),//枫叶型耳环
			Array(1002677,300,1,1),//玩具匠人帽
			Array(1002699,300,1,1),//南瓜帽子
			Array(1002238,300,1,1),//工地帽
			Array(1102040,300,1,1),//浪人披风（黄）
			Array(1102041,300,1,1),//浪人披风（粉）
			Array(1102042,300,1,1),//浪人披风（紫）
			Array(1122015,300,1,1),//枫叶围巾
			Array(1122058,100,1,1),//休彼德蔓的混沌项链
			Array(1132000,100,1,1),//白色腰带
			Array(1132001,100,1,1),//黄色腰带
			Array(1132002,100,1,1),//蓝色腰带
			Array(1132003,100,1,1),//红色腰带
			Array(1132012,100,1,1),//法老的腰带
			Array(1002390,10,1,1),//真扎昆头盔
			Array(1002418,300,1,1),//报废报纸头盔
			Array(1002419,300,1,1),//枫叶帽
			Array(1002424,300,1,1),//红马术帽
			Array(1002425,300,1,1),//蓝马术帽
			Array(1332053,300,1,1),//野外烧烤串
			Array(1332114,500,1,1),//黄金枫叶短刀
			Array(1492073,500,1,1),//黄金枫叶短枪
			Array(1312056,500,1,1),//黄金枫叶斧子
			Array(1422057,500,1,1),//黄金枫叶巨锤
			Array(1482073,500,1,1),//黄金枫叶指节
			Array(1402085,500,1,1),//黄金枫叶双手剑
			Array(1372071,500,1,1),//黄金枫叶短杖
			Array(1432075,500,1,1),//黄金枫叶抢
			Array(1462085,500,1,1),//黄金枫叶弩
			Array(1452100,500,1,1),//黄金枫叶弓
			Array(1472111,500,1,1),//黄金枫叶拳套
			Array(1382093,500,1,1),//黄金枫叶长杖
			Array(1442023,100,1,1),//黑拖把
			Array(1302087,300,1,1),//火炬	
			Array(1402014,300,1,1),//温度计
			Array(1012179,300,1,1),//鹿鼻子
			Array(1012056,300,1,1),//狗狗鼻
			Array(1022047,300,1,1),//猫头鹰
			Array(1022058,300,1,1),//狸猫
			Array(1022060,300,1,1),//狐猴
			Array(1122001,300,1,1),//绿色蝶形领结
			Array(1122002,300,1,1),//红色蝶形领结
			Array(1122003,300,1,1),//黄色蝶形领结
			Array(1122004,300,1,1),//粉红蝶形领结
			Array(1122006,300,1,1),//蓝色蝶形领结
			Array(1122005,300,1,1),//黑色蝶形领结
			Array(1102085,300,1,1),//黄色盖亚披风
			Array(1102084,300,1,1),//粉色盖亚披风
			Array(1102086,300,1,1),//紫色盖亚披风
			Array(1302035,300,1,1),//枫叶大旗
			Array(1302063,300,1,1),//然烧的火焰刀
			Array(1002939,100,1,1),//安全帽
			Array(1102163,300,1,1),//贵族披风
			Array(1082145,300,1,1),//工地手套（各种颜色全部+进去）
			Array(1082146,300,1,1),//工地手套（各种颜色全部+进去）
			Array(1082147,300,1,1),//工地手套（各种颜色全部+进去）
			Array(1082148,300,1,1),//工地手套（各种颜色全部+进去）
			Array(1082149,300,1,1),//工地手套（各种颜色全部+进去）
			Array(1082150,300,1,1),//工地手套（各种颜色全部+进去）
			Array(1102206,300,1,1),//黑色野兽披风
			Array(1102207,300,1,1),//金魂披风
			Array(1002743,300,1,1),//海洋之帽
			Array(1002758,300,1,1),//强化版枫叶头盔
			Array(1002511,300,1,1),//枫叶头盔
			Array(1002510,300,1,1),//枫叶头盔
			Array(1122074,300,1,1),//枫叶吊坠
			Array(1122075,200,1,1),//黄金枫叶魔法吊坠
			Array(1082252,300,1,1),//枫叶手套
			Array(1012102,300,1,1),//枫叶
			Array(1012103,300,1,1),//枫叶
			Array(1102071,250,1,1),//枫叶披风
			Array(1102166,250,1,1),//枫叶披风
			Array(1102167,250,1,1),//枫叶披风
			Array(1102168,250,1,1),//枫叶披风
			Array(1012071,300,1,1),//巧克力雪糕
			Array(1012072,300,1,1),//甜瓜雪糕
			Array(1012073,300,1,1)//西瓜雪糕
			//Array(1432182,20, 1, 1), //红色枪
			//Array(1382226,20, 1, 1), //红色长杖  
			//Array(1452220,20, 1, 1), //红色弓                           
			//Array(1462208,20, 1, 1), //红色之弩
			//Array(1332242,20, 1, 1), //红色切割者
			//Array(1472230,20, 1, 1), //红色拳套 
			//Array(1482183,20, 1, 1), //红色拳甲
			//Array(1302012,50,1,1),//火焰刀
			//Array(1092030,50,1,1)//枫叶盾
			
			
			
			
			/*
			
        这里很重要  这里是Array的结束段落 记住最后一排的 Array函数后面是没有逗号的  这个逗号我截图在你QQ上去 
			*/

);

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.sendOk("再见。加把油。");
            cm.dispose();
        }
        status--;
    }
		if (status == 0) {//这里就是脚本开始的地方
			if (cm.getPlayer().getNX() >= 2000) {
				var str1="";
				//if(cm.getPlayer().isGM()){
					for (var i = 0; i < itemList.length; i++){
					   str1 += "#v"+itemList[i][0]+"#";
					}
				//}
				cm.sendYesNo("消耗#r2000#k点券随机抽取物品!\r\n :" +str1);
			}
			else{
				cm.sendOk("你不够点卷啊。。");
				cm.dispose();
			}
		} else if (status == 1){	
        var chance = Math.floor(Math.random() * 400);
        var finalitem = Array();
        for (var i = 0; i < itemList.length; i++) {
            if (itemList[i][1] >= chance) {
                finalitem.push(itemList[i]);
            }
        }
		
		
        if (finalitem.length != 0) {
            var item;
            var random = new java.util.Random();
            var finalchance = random.nextInt(finalitem.length);
            var itemId = finalitem[finalchance][0];
            var quantity = finalitem[finalchance][2];
            var notice = finalitem[finalchance][3];
            item = cm.gainGachaponItem(itemId, quantity, "青柠抽奖中心", notice);
            if (item != -1) {
				cm.gainNX(-2000);
                cm.sendOk("你获得了 #b#t" + item + "##k " + quantity + "个。");
            } else {
                cm.sendOk("请你确认在背包的装备，消耗，其他窗口中是否有一格以上的空间。");
            }
            cm.safeDispose();
        } else {
            cm.sendOk("今天的运气可真差，什么都没有拿到。\r\n");
            cm.gainNX(-2000);//没有中奖扣除的充值币函数
            //cm.gainItem(4001322, 1);
            cm.safeDispose();
        }
    }
}





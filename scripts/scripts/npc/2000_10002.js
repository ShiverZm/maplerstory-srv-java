status = -1;
var maxTcmes = 900;
var itemList = Array(
//�ر��
Array(3994046,30,1), //��

//����ϵ��
Array(2340000,900,1), //ף������
Array(2340000,700,2), //ף������
Array(2340000,500,3), //ף������
Array(2340000,300,4), //ף������
Array(2340000,100,5), //ף������
Array(2049100,900,1), //�������
Array(2049100,700,2), //�������
Array(2049100,500,3), //�������
Array(2049100,300,4), //�������
Array(2049100,100,5), //�������
Array(2040506,300,1), //ȫ���������ݱسɾ�
Array(2040710,300,2), //Ь����Ծ�سɾ�
Array(2040806,300,2), //�������ݱسɾ�
Array(2040807,150,1), //���׹�����100
Array(2040303,150,1), //���������سɾ�
Array(2040903,150,2), //���Ʒ����سɾ�
Array(2043003,150,1), //���ֽ������سɾ�
Array(2044003,150,1), //˫�ֽ������سɾ�
Array(2043203,150,1), //���ֶ��������سɾ�
Array(2044203,150,1), //˫�ֶ��������سɾ�
Array(2044303,150,1), //ǹ�������سɾ�
Array(2044403,150,1), //ì�������سɾ�
Array(2043703,150,1), //���ȹ����سɾ�
Array(2043803,150,1), //���ȹ����سɾ�
Array(2044503,150,1), //�������سɾ�
Array(2044603,150,1), //�󹥻��سɾ�
Array(2044703,150,1), //ȭ�׹����سɾ�
Array(2043303,150,1), //�̽������سɾ�

//��������ϵ��
Array(2043001,500,2), //���ֽ�������60
Array(2043002,500,2), //���ֽ�������10
Array(2043004,500,2), //���ֽ�������70
Array(2043005,500,2), //���ֽ�������30
Array(2043011,500,2), //���ֽ�������65
Array(2043012,500,2), //���ֽ�������15
Array(2044001,500,2), //˫�ֽ�������60
Array(2044002,500,2), //˫�ֽ�������10
Array(2044004,500,2), //˫�ֽ�������70
Array(2044005,500,2), //˫�ֽ�������30
Array(2044006,500,2), //˫�ֽ�������65
Array(2044007,500,2), //˫�ֽ�������15
Array(2043201,500,2), //���ֶ���������60
Array(2043202,500,2), //���ֶ���������10
Array(2043204,500,2), //���ֶ���������70
Array(2043205,500,2), //���ֶ���������30
Array(2043206,500,2), //���ֶ���������65
Array(2043207,500,2), //���ֶ���������15
Array(2044201,500,2), //˫�ֶ���������60
Array(2044202,500,2), //˫�ֶ���������10
Array(2044204,500,2), //˫�ֶ���������70
Array(2044205,500,2), //˫�ֶ���������30
Array(2044206,500,2), //˫�ֶ���������65
Array(2044207,500,2), //˫�ֶ���������15
Array(2044301,500,2), //ǹ������60
Array(2044302,500,2), //ǹ������10
Array(2044304,500,2), //ǹ������70
Array(2044305,500,2), //ǹ������30
Array(2044306,500,2), //ǹ������65
Array(2044307,500,2), //ǹ������15
Array(2044401,500,2), //ì������60
Array(2044402,500,2), //ì������10
Array(2044404,500,2), //ì������70
Array(2044405,500,2), //ì������30
Array(2044406,500,2), //ì������65
Array(2044407,500,2), //ì������15
Array(2043701,500,2), //����ħ����60
Array(2043702,500,2), //����ħ����10
Array(2043704,500,2), //����ħ����70
Array(2043705,500,2), //����ħ����30
Array(2043706,500,2), //����ħ����65
Array(2043707,500,2), //����ħ����15
Array(2043801,500,2), //����ħ����60
Array(2043802,500,2), //����ħ����10
Array(2043804,500,2), //����ħ����70
Array(2043805,500,2), //����ħ����30
Array(2043806,500,2), //����ħ����65
Array(2043807,500,2), //����ħ����15
Array(2044501,500,2), //��������60
Array(2044502,500,2), //��������10
Array(2044504,500,2), //��������70
Array(2044505,500,2), //��������30
Array(2044506,500,2), //��������65
Array(2044507,500,2), //��������15
Array(2044601,500,2), //�󹥻���60
Array(2044602,500,2), //�󹥻���10
Array(2044604,500,2), //�󹥻���70
Array(2044605,500,2), //�󹥻���30
Array(2044606,500,2), //�󹥻���65
Array(2044607,500,2), //�󹥻���15
Array(2044701,500,2), //ȭ�׹�����60
Array(2044702,500,2), //ȭ�׹�����10
Array(2044704,500,2), //ȭ�׹�����70
Array(2044705,500,2), //ȭ�׹�����30
Array(2044706,500,2), //ȭ�׹�����65
Array(2044707,500,2), //ȭ�׹�����15
Array(2043301,500,2), //�̽�������60
Array(2043302,500,2), //�̽�������10
Array(2043304,500,2), //�̽�������70
Array(2043305,500,2), //�̽�������30
Array(2043306,500,2), //�̽�������65
Array(2043307,500,2), //�̽�������15

//���߾���ϵ��
Array(2040012,600,3),// ͷ��������70
Array(2040013,600,3),// ͷ��������30
Array(2040014,600,3),// ͷ�����о�70
Array(2040015,600,3),// ͷ�����о�30
Array(2040016,600,3),// ͷ�����о�10
Array(2040017,600,3),// ͷ�����о�60
Array(2040025,600,3),// ͷ��������60
Array(2040026,600,3),// ͷ��������10
Array(2040028,600,3),// ͷ�����ݾ�70
Array(2040029,600,3),// ͷ�����ݾ�60
Array(2040030,600,3),// ͷ�����ݾ�30
Array(2040031,600,3),// ͷ�����ݾ�10
Array(2040406,600,3),// ����������70
Array(2040407,600,3),// ����������30
Array(2040410,600,3),// ����������70
Array(2040411,600,3),// ����������30
Array(2040412,600,3),// ����������10
Array(2040413,600,3),// ����������60
Array(2040418,600,3),// ����������60
Array(2040419,600,3),// ����������10
Array(2040424,600,3),// ����������70
Array(2040425,600,3),// ����������60
Array(2040426,600,3),// ����������30
Array(2040427,600,3),// ����������10
Array(2040610,600,3),// ��ȹ���ݾ�70
Array(2040611,600,3),// ��ȹ���ݾ�30
Array(2040612,600,3),// ��ȹ���ݾ�10
Array(2040613,600,3),// ��ȹ���ݾ�60
Array(2040624,600,3),// ��ȹ���ݾ�70
Array(2040625,600,3),// ��ȹ���ݾ�60
Array(2040626,600,3),// ��ȹ���ݾ�30
Array(2040627,600,3),// ��ȹ���ݾ�10
Array(2040501,600,3),// ȫ���������ݾ�60
Array(2040502,600,3),// ȫ���������ݾ�10
Array(2040508,600,3),// ȫ���������ݾ�70
Array(2040509,600,3),// ȫ���������ݾ�30
Array(2040513,600,3),// ȫ������������60
Array(2040514,600,3),// ȫ������������10
Array(2040516,600,3),// ȫ������������60
Array(2040517,600,3),// ȫ������������10
Array(2040518,600,3),// ȫ������������70
Array(2040519,600,3),// ȫ������������30
Array(2040520,600,3),// ȫ������������70
Array(2040521,600,3),// ȫ������������30
Array(2040522,600,3),// ȫ���������ݾ�65
Array(2040523,600,3),// ȫ���������ݾ�15
Array(2040526,600,3),// ȫ������������65
Array(2040527,600,3),// ȫ������������15
Array(2040528,600,3),// ȫ������������65
Array(2040529,600,3),// ȫ������������15
Array(2040531,600,3),// ȫ������������70
Array(2040532,600,3),// ȫ������������60
Array(2040533,600,3),// ȫ������������30
Array(2040534,600,3),// ȫ������������10
Array(2040701,600,3),// Ь�����ݾ�60
Array(2040702,600,3),// Ь�����ݾ�10
Array(2040704,600,3),// Ь����Ծ��60
Array(2040705,600,3),// Ь����Ծ��10
Array(2040712,600,3),// Ь�����ݾ�70
Array(2040713,600,3),// Ь�����ݾ�30
Array(2040718,600,3),// Ь�����ݾ�65
Array(2040719,600,3),// Ь�����ݾ�15
Array(2040720,600,3),// Ь����Ծ��65
Array(2040721,600,3),// Ь����Ծ��15
Array(2040801,600,3),// �������ݾ�60
Array(2040802,600,3),// �������ݾ�10
Array(2040804,600,3),// ���׹�����60
Array(2040805,600,3),// ���׹�����10
Array(2040808,600,3),// �������ݾ�70
Array(2040809,600,3),// �������ݾ�30
Array(2040810,600,3),// ���׹�����70
Array(2040811,600,3),// ���׹�����30
Array(2040814,600,3),// ����ħ����70
Array(2040815,600,3),// ����ħ����30
Array(2040816,600,3),// ����ħ����10
Array(2040817,600,3),// ����ħ����60
Array(2040819,600,3),// �������ݾ�65
Array(2040820,600,3),// �������ݾ�15
Array(2040821,600,3),// ���׹�����65
Array(2040822,600,3),// ���׹�����15
Array(2041013,600,3),// ����������60
Array(2041014,600,3),// ����������10
Array(2041016,600,3),// ����������60
Array(2041017,600,3),// ����������10
Array(2041019,600,3),// �������ݾ�60
Array(2041020,600,3),// �������ݾ�10
Array(2041022,600,3),// ����������60
Array(2041023,600,3),// ����������10
Array(2041034,600,3),// ����������70
Array(2041035,600,3),// ����������30
Array(2041036,600,3),// ����������70
Array(2041037,600,3),// ����������30
Array(2041038,600,3),// �������ݾ�70
Array(2041039,600,3),// �������ݾ�30
Array(2041040,600,3),// ����������70
Array(2041041,600,3),// ����������30
Array(2041050,600,3),// ����������65
Array(2041051,600,3),// ����������15
Array(2041052,600,3),// ����������65
Array(2041053,600,3),// ����������15
Array(2041054,600,3),// �������ݾ�65
Array(2041055,600,3),// �������ݾ�15
Array(2041056,600,3),// ����������65
Array(2041057,600,3),// ����������15
Array(2040301,600,3),// ����������60
Array(2040302,600,3),// ����������10
Array(2040304,600,3),// ����������70
Array(2040305,600,3),// ����������30
Array(2040306,600,3),// �������ݾ�70
Array(2040307,600,3),// �������ݾ�30
Array(2040313,600,3),// ����������65
Array(2040314,600,3),// ����������15
Array(2040317,600,3),// �������ݾ�60
Array(2040318,600,3),// �������ݾ�10
Array(2040320,600,3),// ����������70
Array(2040321,600,3),// ����������60
Array(2040322,600,3),// ����������30
Array(2040323,600,3),// ����������10
Array(2040329,600,3),// �������ݾ�10
Array(2040330,600,3),// ����������10
Array(2040331,600,3),// ����������10
Array(2041101,600,3),// ��ָ������60
Array(2041102,600,3),// ��ָ������10
Array(2041104,600,3),// ��ָ������60
Array(2041105,600,3),// ��ָ������10
Array(2041107,600,3),// ��ָ���ݾ�60
Array(2041108,600,3),// ��ָ���ݾ�10
Array(2041110,600,3),// ��ָ������60
Array(2041111,600,3),// ��ָ������10
Array(2041112,600,3),// ��ָ������70
Array(2041113,600,3),// ��ָ������30
Array(2041114,600,3),// ��ָ������70
Array(2041115,600,3),// ��ָ������30
Array(2041116,600,3),// ��ָ���ݾ�70
Array(2041117,600,3),// ��ָ���ݾ�30
Array(2041118,600,3),// ��ָ������70
Array(2041119,600,3),// ��ָ������30
Array(2040105,600,3),// �����رܾ�10
Array(2040106,600,3),// �����رܾ�60
Array(2040108,600,3),// �����رܾ�30
Array(2040109,600,3),// �����رܾ�70
Array(2040200,600,3),// �۲����о�10
Array(2040201,600,3),// �۲����о�60
Array(2040203,600,3),// �۲����о�30
Array(2040204,600,3),// �۲����о�70
Array(2040205,600,3),// �۲�������10
Array(2040206,600,3),// �۲�������60
Array(2040208,600,3),// �۲�������30
Array(2040209,600,3),// �۲�������70
Array(2041201,600,3),// ����������10
Array(2041202,600,3),// ����������60
Array(2041204,600,3),// ����������30
Array(2041205,600,3),// ����������70
Array(2041206,600,3),// ����������10
Array(2041207,600,3),// ����������60
Array(2041209,600,3),// ����������30
Array(2041210,600,3),// ����������70
Array(2041301,600,3),// ����������60
Array(2041302,600,3),// ����������10
Array(2041304,600,3),// ����������60
Array(2041305,600,3),// ����������10
Array(2041307,600,3),// �������ݾ�60
Array(2041308,600,3),// �������ݾ�10
Array(2041310,600,3),// ����������60
Array(2041311,600,3),// ����������10
Array(2041312,600,3),// ����������70
Array(2041313,600,3),// ����������30
Array(2041314,600,3),// ����������70
Array(2041315,600,3),// ����������30
Array(2041316,600,3),// �������ݾ�70
Array(2041317,600,3),// �������ݾ�30
Array(2041318,600,3),// ����������70
Array(2041319,600,3),// ����������30
Array(2040906,600,3),// ����������70
Array(2040907,600,3),// ����������30
Array(2040914,600,3),// ���ƹ�����60
Array(2040915,600,3),// ���ƹ�����10
Array(2040916,600,3),// ���ƹ�����70
Array(2040917,600,3),// ���ƹ�����30
Array(2040919,600,3),// ����ħ����60
Array(2040920,600,3),// ����ħ����10
Array(2040921,600,3),// ����ħ����70
Array(2040922,600,3),// ����ħ����30
Array(2040924,600,3),// ����������60
Array(2040925,600,3),// ����������10
Array(2040930,600,3),// ����������70
Array(2040931,600,3),// ����������60
Array(2040932,600,3),// ����������30
Array(2040933,600,3),// ����������10

//��˵��Ҷϵ��
Array(1003296,800,1), //��˵��Ҷ����ñ1
Array(1003349,500,1), //��˵��Ҷ����ñ1
Array(1003350,300,1), //��˵��Ҷ����ñ1
Array(1032111,800,1), //��˵��Ҷ����1
Array(1032112,500,1), //��˵��Ҷ����2
Array(1032113,300,1), //��˵��Ҷ����3
Array(1122152,800,1), //��˵��ҶΧ��1
Array(1122153,500,1), //��˵��ҶΧ��2
Array(1122154,300,1), //��˵��ҶΧ��3
Array(1012286,900,1), //��˵��Ҷ1
Array(1012287,800,1), //��˵��Ҷ2
Array(1012288,700,1), //��˵��Ҷ3
Array(1012308,700,1), //��˵��Ҷ3(�ɽ���)
Array(1082343,800,1), //��˵��Ҷ����1
Array(1082344,500,1), //��˵��Ҷ����2
Array(1082345,300,1), //��˵��Ҷ����3

//��Ҷϵ��
Array(1132151,250,1), //����
Array(1003529,250,1), //ñ��
Array(1102394,250,1), //����
Array(1052457,250,1), //��װ
Array(1072660,250,1), //Ь��
Array(1082430,250,1), //����
Array(1132154,150,1), //ר������
Array(1003552,150,1), //ר��ñ��
Array(1102441,150,1), //ר������
Array(1052461,150,1), //ר����װ
Array(1072666,150,1), //ר��Ь��
Array(1082433,150,1), //ר������
Array(1302212,200,1), //���ֽ�
Array(1322154,200,1), //���ֶ���
Array(1332186,200,1), //�̵�
Array(1372131,200,1), //����
Array(1382160,200,1), //����
Array(1402145,200,1), //˫�ֽ�
Array(1422105,200,1), //˫�ֶ���
Array(1432135,200,1), //ǹ
Array(1442173,200,1), //ì
Array(1452165,200,1), //��
Array(1462156,200,1), //��
Array(1472177,200,1), //ȭ��
Array(1482138,200,1), //ָ��
Array(1492138,200,1), //��ǹ
Array(1302142,300,1), //���ֽ�
Array(1322084,300,1), //���ֶ���
Array(1402085,300,1), //˫�ֽ�
Array(1422057,300,1), //˫�ֶ���
Array(1432075,300,1), //ǹ
Array(1442104,300,1), //ì
Array(1372071,300,1), //����
Array(1382093,300,1), //����
Array(1452100,300,1), //��
Array(1462085,300,1), //��
Array(1472111,300,1), //ȭ��
Array(1332114,300,1), //�̵�

//���
Array(1332053,300,1), //�տ���
Array(1322051,300,1), //��Ϧ
Array(1332021,500,1), //������
Array(1402037,150,1), //����
Array(1442039,300,1), //������
Array(1302013,500,1), //��ɫ����
Array(1302049,300,1), //���߱���
Array(1302063,200,1), //���浶
Array(1302106,200,1), //���浶
Array(1402014,150,1), //�¶ȼ�
Array(1402013,500,1), //���ս�
Array(1432037,150,1), //��Ҷ����
Array(1322031,300,1), //��������
Array(1302037,300,1), //С��
Array(1332054,150,1), //����ɵ�
Array(1302019,150,1), //������
Array(1322027,300,1), //ƽ�׹�
Array(1302024,350,1), //�ϱ�ֽ��
Array(1432015,350,1), //��ɫ��ѩ��
Array(1432016,350,1), //��ɫ��ѩ��
Array(1432017,350,1), //��ɫ��ѩ��
Array(1432018,350,1), //��ɫ��ѩ��
Array(1442046,300,1), //������ѩ��
Array(1382015,250,1), //��Ģ��
Array(1382016,250,1), //�㹽
Array(1302084,300,1), //���
Array(1302087,200,1), //���
Array(1332032,350,1), //ʥ����
Array(1302026,350,1), //����ɡ
Array(1302025,350,1), //����ɡ
Array(1302017,350,1), //����ɡ
Array(1302027,350,1), //����ɡ
Array(1302029,350,1), //����ɡ
Array(1302028,350,1), //����ɡ
Array(1302016,350,1), //����ɡ
Array(1442026,350,1), //��ɫ���˰�
Array(1442029,350,1), //��ɫ���˰�
Array(1442011,350,1), //���˰�
Array(1442070,350,1), //��ɫ���˰�
Array(1442028,350,1), //��ɫ���˰�
Array(1442065,350,1), //��ɫ���˰�
Array(1442027,350,1), //��ɫ���˰�
Array(1442066,350,1), //��ɫ���˰�
Array(1442029,350,1), //��ɫ���˰�
Array(1422031,200,1), //��ɫ��������
Array(1422031,200,1), //��ɫ��������

//���˹���ϵ��
Array(1102040,800,1), //���������
Array(1102041,400,1), //���������
Array(1102042,400,1), //����������
Array(1102043,800,1), //���������
Array(1082002,900,1), //��������
Array(1082145,800,1), //�������׻�
Array(1082146,800,1), //�������׺�
Array(1082147,800,1), //����������
Array(1082148,800,1), //����������
Array(1082149,600,1), //�������׺�
Array(1082150,800,1), //�������׻�

//ð�յ�����
Array(1092045,750,1), //սʿ��
Array(1092046,450,1), //��ʦ��
Array(1092045,450,1), //������

//սʿװ��
Array(1002028,900,1), //50ñ��
Array(1002029,800,1), //60ñ��
Array(1002030,700,1), //70ñ��
Array(1002340,600,1), //80ñ��
Array(1002532,500,1), //90ñ��
Array(1002379,400,1), //100ñ��
Array(1002339,300,1), //110ñ��
Array(1002776,200,1), //120ñ��
Array(1072135,900,1), //50Ь��
Array(1072149,800,1), //60Ь��
Array(1072156,700,1), //70Ь��
Array(1072212,600,1), //80Ь��
Array(1072198,500,1), //90Ь��
Array(1072222,400,1), //100Ь��
Array(1072273,300,1), //110Ь��
Array(1072355,200,1), //120Ь��
Array(1082011,900,1), //50����
Array(1082061,800,1), //60����
Array(1082105,700,1), //70����
Array(1082119,600,1), //80����
Array(1082129,500,1), //90����
Array(1082140,400,1), //100����
Array(1082168,300,1), //110����
Array(1082234,200,1), //120����
Array(1092004,900,1), //50����
Array(1092011,800,1), //60����
Array(1092017,700,1), //70����
Array(1092025,600,1), //80����
Array(1092028,500,1), //90����
Array(1092038,400,1), //100����
Array(1092060,300,1), //110����
Array(1092058,200,1), //120����
Array(1040087,900,1), //50����
Array(1041087,900,1), //50����
Array(1040091,800,1), //60����
Array(1041092,800,1), //60����
Array(1040104,700,1), //70����
Array(1041098,700,1), //70����
Array(1040112,500,1), //90����
Array(1041120,500,1), //90����
Array(1040121,400,1), //100����
Array(1041123,400,1), //100����
Array(1060076,900,1), //50����
Array(1061086,900,1), //50����
Array(1060080,800,1), //60����
Array(1061091,800,1), //60����
Array(1060092,700,1), //70����
Array(1061097,700,1), //70����
Array(1060101,500,1), //90����
Array(1061119,500,1), //90����
Array(1060110,400,1), //100����
Array(1061122,400,1), //100����
Array(1050082,600,1), //80��װ
Array(1051079,600,1), //80��װ
Array(1052075,300,1), //110��װ
Array(1052155,200,1), //120��װ
Array(1302010,900,1), //50���ֽ�
Array(1302011,800,1), //60���ֽ�
Array(1302012,700,1), //70���ֽ�
Array(1302018,600,1), //80���ֽ�
Array(1302023,500,1), //90���ֽ�
Array(1302056,400,1), //100���ֽ�
Array(1302059,300,1), //110���ֽ�
Array(1302081,200,1), //120���ֽ�
Array(1402003,900,1), //50˫�ֽ�
Array(1402011,800,1), //60˫�ֽ�
Array(1402012,700,1), //70˫�ֽ�
Array(1402004,600,1), //80˫�ֽ�
Array(1402016,500,1), //90˫�ֽ�
Array(1402035,400,1), //100˫�ֽ�
Array(1402036,300,1), //110˫�ֽ�
Array(1402046,200,1), //120˫�ֽ�
Array(1322017,900,1), //50���ֶ���
Array(1322018,800,1), //60���ֶ���
Array(1322019,700,1), //70���ֶ���
Array(1322028,600,1), //80���ֶ���
Array(1322029,500,1), //90���ֶ���
Array(1322045,400,1), //100���ֶ���
Array(1322052,300,1), //110���ֶ���
Array(1322060,200,1), //120���ֶ���
Array(1422005,900,1), //50˫�ֶ���
Array(1422005,800,1), //60˫�ֶ���
Array(1422005,700,1), //70˫�ֶ���
Array(1422005,600,1), //80˫�ֶ���
Array(1422005,500,1), //90˫�ֶ���
Array(1422005,400,1), //100˫�ֶ���
Array(1422005,300,1), //110˫�ֶ���
Array(1422005,200,1), //120˫�ֶ���
Array(1432004,900,1), //50ǹ
Array(1432006,800,1), //60ǹ
Array(1432007,700,1), //70ǹ
Array(1432010,600,1), //80ǹ
Array(1432011,500,1), //90ǹ
Array(1432030,400,1), //100ǹ
Array(1432038,300,1), //110ǹ
Array(1432047,200,1), //120ǹ
Array(1442005,900,1), //50ì
Array(1442010,800,1), //60ì
Array(1442008,700,1), //70ì
Array(1442019,600,1), //80ì
Array(1442020,500,1), //90ì
Array(1442044,400,1), //100ì
Array(1442045,300,1), //110ì
Array(1442063,200,1), //120ì

//��ʦװ��
Array(1002218,900,1), //50ñ��
Array(1002246,800,1), //60ñ��
Array(1002254,700,1), //70ñ��
Array(1002274,600,1), //80ñ��
Array(1002366,500,1), //90ñ��
Array(1002401,400,1), //100ñ��
Array(1002773,300,1), //110ñ��
Array(1002777,200,1), //120ñ��
Array(1072595,900,1), //50Ь��
Array(1072139,800,1), //60Ь��
Array(1072160,700,1), //70Ь��
Array(1072179,600,1), //80Ь��
Array(1072209,500,1), //90Ь��
Array(1072226,400,1), //100Ь��
Array(1072268,300,1), //110Ь��
Array(1072356,200,1), //120Ь��
Array(1082080,900,1), //50����
Array(1082088,800,1), //60����
Array(1082100,700,1), //70����
Array(1082122,600,1), //80����
Array(1082134,500,1), //90����
Array(1082134,400,1), //100����
Array(1082164,300,1), //110����
Array(1082235,200,1), //120����
Array(1050047,900,1), //50��װ
Array(1051034,900,1), //50��װ
Array(1050055,800,1), //60��װ
Array(1051046,800,1), //60��װ
Array(1050069,700,1), //70��װ
Array(1051054,700,1), //70��װ
Array(1050075,600,1), //80��װ
Array(1051057,600,1), //80��װ
Array(1050095,500,1), //90��װ
Array(1051096,500,1), //90��װ
Array(1050105,400,1), //100��װ
Array(1051104,400,1), //100��װ
Array(1052076,300,1), //110��װ
Array(1052156,200,1), //120��װ
Array(1372007,900,1), //50����
Array(1372014,800,1), //60����
Array(1372015,700,1), //70����
Array(1372016,600,1), //80����
Array(1372009,500,1), //90����
Array(1372010,400,1), //100����
Array(1372032,300,1), //110����
Array(1372044,200,1), //120����
Array(1382006,800,1), //55����
Array(1382007,700,1), //65����
Array(1382010,600,1), //75����
Array(1382008,500,1), //85����
Array(1382035,400,1), //95����
Array(1382036,300,1), //105����
Array(1382057,200,1), //115����
Array(1092057,200,1), //120����

//����װ��
Array(1002213,900,1), //50ñ��
Array(1002269,800,1), //60ñ��
Array(1002288,700,1), //70ñ��
Array(1002277,600,1), //80ñ��
Array(1002404,500,1), //90ñ��
Array(1002408,400,1), //100ñ��
Array(1002547,300,1), //110ñ��
Array(1002778,200,1), //120ñ��
Array(1072125,900,1), //50Ь��
Array(1072146,800,1), //60Ь��
Array(1072167,700,1), //70Ь��
Array(1072182,600,1), //80Ь��
Array(1072205,500,1), //90Ь��
Array(1072229,400,1), //100Ь��
Array(1072269,300,1), //110Ь��
Array(1072357,200,1), //120Ь��
Array(1082085,900,1), //50����
Array(1082091,800,1), //60����
Array(1082108,700,1), //70����
Array(1082112,600,1), //80����
Array(1082127,500,1), //90����
Array(1082160,400,1), //100����
Array(1082163,300,1), //110����
Array(1082236,200,1), //120����
Array(1050052,900,1), //50��װ
Array(1051038,900,1), //50��װ
Array(1050059,800,1), //60��װ
Array(1051042,800,1), //60��װ
Array(1050063,700,1), //70��װ
Array(1051064,700,1), //70��װ
Array(1050077,600,1), //80��װ
Array(1051068,600,1), //80��װ
Array(1050090,500,1), //90��װ
Array(1051084,500,1), //90��װ
Array(1050108,400,1), //100��װ
Array(1051107,400,1), //100��װ
Array(1052071,300,1), //110��װ
Array(1052157,200,1), //120��װ
Array(1452008,900,1), //50��
Array(1452004,800,1), //60��
Array(1452011,700,1), //70��
Array(1452015,600,1), //80��
Array(1452017,500,1), //90��
Array(1452021,400,1), //100��
Array(1452044,300,1), //110��
Array(1452008,200,1), //120��
Array(1462007,900,1), //50��
Array(1462008,800,1), //60��
Array(1462009,700,1), //70��
Array(1462013,600,1), //80��
Array(1462018,500,1), //90��
Array(1462017,400,1), //100��
Array(1462039,300,1), //110��
Array(1462050,200,1), //120��

//����װ��
Array(1002210,900,1), //50ñ��
Array(1002249,800,1), //60ñ��
Array(1002284,700,1), //70ñ��
Array(1002330,600,1), //80ñ��
Array(1002326,500,1), //90ñ��
Array(1002383,400,1), //100ñ��
Array(1002550,300,1), //110ñ��
Array(1002779,200,1), //120ñ��
Array(1082067,900,1), //50����
Array(1082094,800,1), //60����
Array(1082096,700,1), //70����
Array(1082120,600,1), //80����
Array(1082144,500,1), //90����
Array(1082138,400,1), //100����
Array(1082167,300,1), //110����
Array(1082237,200,1), //120����
Array(1072131,900,1), //50Ь��
Array(1072152,800,1), //60Ь��
Array(1072163,700,1), //70Ь��
Array(1072174,600,1), //80Ь��
Array(1072195,500,1), //90Ь��
Array(1072216,400,1), //100Ь��
Array(1072272,300,1), //110Ь��
Array(1072358,200,1), //120Ь��
Array(1040096,900,1), //50����
Array(1041079,900,1), //50����
Array(1040100,800,1), //60����
Array(1041096,800,1), //60����
Array(1040106,700,1), //70����
Array(1041101,700,1), //70����
Array(1040109,600,1), //80����
Array(1041106,600,1), //80����
Array(1040118,500,1), //90����
Array(1041118,500,1), //90����
Array(1060085,900,1), //50����
Array(1061078,900,1), //50����
Array(1060088,800,1), //60����
Array(1061094,800,1), //60����
Array(1060094,700,1), //70����
Array(1061101,700,1), //70����
Array(1060098,600,1), //80����
Array(1061105,600,1), //80����
Array(1060107,500,1), //90����
Array(1061107,500,1), //90����
Array(1050099,400,1), //100�׷�
Array(1051093,400,1), //100�׷�
Array(1052072,300,1), //110�׷�
Array(1052158,200,1), //120�׷�
Array(1092059,200,1), //120����
Array(1332003,900,1), //50�̵�
Array(1332015,800,1), //60�̵�
Array(1332018,700,1), //70�̵�
Array(1332023,600,1), //80�̵�
Array(1332027,500,1), //90�̵�
Array(1332052,400,1), //100�̵�
Array(1332050,300,1), //110�̵�
Array(1332075,200,1), //120�̵�
Array(1472020,900,1), //50ȭ��
Array(1472025,800,1), //60ȭ��
Array(1472029,700,1), //70ȭ��
Array(1472031,600,1), //80ȭ��
Array(1472033,500,1), //90ȭ��
Array(1472053,400,1), //100ȭ��
Array(1472052,300,1), //110ȭ��
Array(1472068,200,1), //120ȭ��

//����װ��
Array(1002631,900,1),
Array(1002634,800,1),
Array(1002637,700,1),
Array(1002640,600,1),
Array(1002643,500,1),
Array(1002646,400,1),
Array(1002649,300,1),
Array(1002780,200,1),
Array(1052116,900,1),
Array(1052119,800,1),
Array(1052122,700,1),
Array(1052125,600,1),
Array(1052128,500,1),
Array(1052131,400,1),
Array(1052134,300,1),
Array(1052159,200,1),
Array(1072303,900,1),
Array(1072306,800,1),
Array(1072309,700,1),
Array(1072312,600,1),
Array(1072315,500,1),
Array(1072318,400,1),
Array(1072321,300,1),
Array(1072359,200,1),
Array(1082198,900,1),
Array(1082201,800,1),
Array(1082204,700,1),
Array(1082207,600,1),
Array(1082210,500,1),
Array(1082213,400,1),
Array(1082216,300,1),
Array(1082238,200,1),
Array(1482007,900,1),
Array(1482008,800,1),
Array(1482009,700,1),
Array(1482010,600,1),
Array(1482011,500,1),
Array(1482012,400,1),
Array(1482013,300,1),
Array(1482023,200,1),
Array(1492007,900,1),
Array(1492008,800,1),
Array(1492009,700,1),
Array(1492010,600,1),
Array(1492011,500,1),
Array(1492012,400,1),
Array(1492013,300,1),
Array(1492023,200,1)
);
var transId = 2022336;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        var chance = Math.floor(Math.random() * maxTcmes);
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
            if(!cm.haveItem(transId)){
                cm.sendOk("��û��#b#t"+ transId +"##k�����޷�Ϊ���齱");
                cm.dispose();
		return;
            }
            if (cm.getInventory(1).isFull()){
                cm.sendOk("#b�뱣֤װ����λ������2���ո�,�����޷���ȡ.");
                cm.dispose();
				return;
            } else if (cm.getInventory(2).isFull()){
                cm.sendOk("#b�뱣֤������λ������2���ո�,�����޷���ȡ.");
                cm.dispose();
				return;
            } else if (cm.getInventory(3).isFull()){
                cm.sendOk("#b�뱣֤������λ������2���ո�,�����޷���ȡ.");
                cm.dispose();
				return;
            } else if (cm.getInventory(4).isFull()){
                cm.sendOk("#b�뱣֤������λ������2���ո�,�����޷���ȡ.");
                cm.dispose();
				return;
            } else if (cm.getInventory(5).isFull()){
                cm.sendOk("#b�뱣֤������λ������2���ո�,�����޷���ȡ.");
                cm.dispose();
				return;
            }
            cm.gainItem(itemId,quantity);
            cm.gainItem(transId,-1);
            cm.sendOk("��ϲ����ȡ����#z"+itemId+"##v"+itemId+"# x #r" + quantity + " #k��");
            cm.dispose();
        } else {
		
            cm.sendOk("�������������ʲô��û���õ���");
            cm.dispose();
        }
    }
}

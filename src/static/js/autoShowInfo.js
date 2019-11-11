//get请求封装
function getData(url, data) {
    var result;
    $.ajax({
        type: "GET",
        data: {
            param: JSON.stringify(data)
        },

        dataType: 'json',
        url: url,
        async: false,
        success: function (data) {
            result = data;
        }
    });
    return result;
}
//post请求封装
function postData(url, data) {
    var result;
    $.ajax({
        type: "POST",
        data: data,
        dataType: 'json',
        url: url,
        async: false,
        success: function (data) {
            result = data;
        }
    });
    return result;
}
var data = {
    tagIds: 1, //标签ID，多个以逗号隔开（暂时传1）
    categoryIds: '634', //独家解析：640；车展资讯：634；高端访谈：8
    page: 1, //页码 默认第1页
    size: 8, //返回的条数 默认10条
    uid: '', //todo 当前用户id，未登录时传 0
}
var loadMore = true; //默认加载
function getListData() {
    console.log('车展资讯');
    console.log('111111', window.Bitauto.Login.result);
    var uid = 0; //公参uid
    if (window.Bitauto.Login.result.isLogined) {
        uid = window.Bitauto.Login.result.userId;
    }
    // 请求列表
    // var baseUrl = "https://mapi.yiche.com"; //线上环境
    var baseUrl = "http://192.168.87.105:18769"; //测试环境
    var dataList = []; //列表数据
    var renderDat = {}; //渲染数据
    var initUrl = baseUrl + "/web_exhibition/api/v1/information/get_information_list?cid=502&ver=6.6.3&uid=" + uid; //列表接口

    var res = getData(initUrl, data);
    // res = {
    //     "status": "1",
    //     "message": "success",
    //     "data": {
    //         "total": 2312,
    //         "list": [{
    //                 "newsId": 6818106,
    //                 "title": "实拍SWM斯威X3  国产7座SUV“新兵”空间表现出色",
    //                 "publishTime": "2017-05-15 00:00:47",
    //                 "cover": [
    //                     "http://image.bitautoimg.com/bitauto/2017/05/14/fc23fb07-6f0f-4c3e-9f8b-3c79227565e5.jpg"
    //                 ],
    //                 "summary": "斯威X3曾亮相在2017年上海车展，作为斯威品牌旗下的第二款车型，提供5座、6座和7座车型选择。新车定位于紧凑级SUV，不过空间表现较为出色，售价区间或为6-8万元。目前新车已经到店，易车网编辑对这款国产SUV\"新兵\"进行了实拍详解。● 看斯威X3前先来了解下SWM斯威汽车吧SWM斯威品牌于1971年在意大利建立，有半个多世纪的沉淀。2014年，SWM品牌被鑫源控股全资收购，同时收购原宝马旗下Hu",
    //                 "url": "/info/6818106.html",
    //                 "user": {
    //                     "uid": 2243319,
    //                     "followType": 0,
    //                     "showname": "赵石林",
    //                     "avatarpath": "//img4.baa.bitautotech.com/newavatar/2017/09/27/2243319_120_85ba125c-bb52-4ca8-869a-c272970e7db1.jpg",
    //                     "fanscount": 4096
    //                 },
    //                 "pv": "124723",
    //                 "comments": "333"
    //             },
    //             {
    //                 "newsId": 6815316,
    //                 "title": "领克03路试谍照曝光 预计搭载1.5T和2.0T发动机",
    //                 "publishTime": "2017-05-05 07:17:35",
    //                 "cover": [
    //                     "http://img2.bitautoimg.com/bitauto/2017/05/05/34557520-7763-4e4f-9363-5246bc1803fc.jpg"
    //                 ],
    //                 "summary": "易车讯 海外媒体报道了领克03的路试谍照，这款三厢轿车的造型设计和在2017年上海车展亮相的领克03概念车颇为相似，新车预计搭载1.5T和2.0T发动机。领克03路试谍照领克03概念车从最新谍照来看，领克03路试车采用了分体式前大灯组设计，前脸大嘴格栅设计。不过整车造型和概念车非常接近。领克03路试谍照领克03概念车据悉，领克03将基于吉利与沃尔沃共同开发的CMA平台打造，其将是领克品牌推出的首款",
    //                 "url": "/info/6815316.html",
    //                 "user": {
    //                     "uid": 2243319,
    //                     "followType": 0,
    //                     "showname": "赵石林",
    //                     "avatarpath": "//img4.baa.bitautotech.com/newavatar/2017/09/27/2243319_120_85ba125c-bb52-4ca8-869a-c272970e7db1.jpg",
    //                     "fanscount": 4096
    //                 },
    //                 "pv": "84622",
    //                 "comments": "363"
    //             },
    //             {
    //                 "newsId": 6800248,
    //                 "title": "上海车展奥迪展台解读 酷炫!科技!运动!环保!",
    //                 "publishTime": "2017-04-27 00:00:00",
    //                 "cover": [
    //                     "http://image.bitautoimg.com/bitauto/2017/04/25/1a0edbc1-0443-4ea7-8e5d-9f0736f88f4f.jpg"
    //                 ],
    //                 "summary": "奥迪是一个以“科技”立足的豪华品牌，它们生产的汽车一向都充满了十足的科技感，总能用最新的技术给广大消费者们带来惊喜。本次上海车展，奥迪来到了全球最大的市场之一----中国，自然也是毫不怠慢：在5.1馆奥迪展台，新款A3全系上市、e-tron Sportback概念车全球首发，Audi Sport更是带来了全系RS车型，让性能车迷们大呼过瘾。快来一起围观一下这个精彩展台吧！",
    //                 "url": "/info/6800248.html",
    //                 "user": {
    //                     "uid": 16376446,
    //                     "followType": 0,
    //                     "showname": "彭佳禾",
    //                     "avatarpath": "//img4.baa.bitautotech.com/newavatar/2017/06/26/16376446_120_75509215-f065-424b-993f-ad560695dc33.jpg",
    //                     "fanscount": 1
    //                 },
    //                 "pv": "47353",
    //                 "comments": "233"
    //             },
    //             {
    //                 "newsId": 6800552,
    //                 "title": "阿尔法·罗密欧Stelvio或5月18日公布售价 预计43万起售",
    //                 "publishTime": "2017-04-24 08:13:33",
    //                 "cover": [
    //                     "http://img2.bitautoimg.com/autoalbum/files/20170419/033/15212503386719_5461717_630x420__m2.jpg"
    //                 ],
    //                 "summary": "易车讯 日前，我们从相关渠道了解到阿尔法·罗密欧Stelvio有望在5月18日公布其国内售价，预计售价43万元起，Stelvio定位中型SUV。外观方面，Stelvio车身尺寸为4687×1903×1648mm，轴距为2818mm。其外观采用家族设计，前脸造型犀利，车尾采用LED尾灯和双边共双出排气。将进入国内市场的Stelvio将会是普通版车型，高性能QV版车型在短时间内或将无缘国内。动力方面，",
    //                 "url": "/info/6800552.html",
    //                 "user": {
    //                     "uid": 2622447,
    //                     "followType": 0,
    //                     "showname": "于皓",
    //                     "avatarpath": "//img4.baa.bitautotech.com/newavatar/2017/06/26/2622447_120_9f840a9b-52bf-4c27-93b5-d28d3442cb17.jpg",
    //                     "fanscount": 2307
    //                 },
    //                 "pv": "108420",
    //                 "comments": "255"
    //             },
    //             {
    //                 "newsId": 6800386,
    //                 "title": "奥迪RS 3 Limousine将于9月上市 预售57.5万元",
    //                 "publishTime": "2017-04-22 17:52:05",
    //                 "cover": [
    //                     "http://image.bitautoimg.com/bitauto/2017/04/22/ebb82007-9e92-4c74-9106-064cdb6de3f7.png"
    //                 ],
    //                 "summary": "易车讯 日前，我们从奥迪官方获悉奥迪旗下高性能紧凑型车——RS 3 Limousine（三厢版）目前已经开始接受预定，预售价格为57.50万元，新车将于9月上市销售。同时，奥迪官方称，同台展示的奥迪S3 Sportback（两厢版）车型暂无销售计划。外观方面，RS 3 Limousine基于新款的A3 Limousine车型打造，细节方面有所不同，采用了更加夸张的车身包围，前后保险杠加入了更多哑光",
    //                 "url": "/info/6800386.html",
    //                 "user": {
    //                     "uid": 2622447,
    //                     "followType": 0,
    //                     "showname": "于皓",
    //                     "avatarpath": "//img4.baa.bitautotech.com/newavatar/2017/06/26/2622447_120_9f840a9b-52bf-4c27-93b5-d28d3442cb17.jpg",
    //                     "fanscount": 2307
    //                 },
    //                 "pv": "148099",
    //                 "comments": "157"
    //             },
    //             {
    //                 "newsId": 6800385,
    //                 "title": "东风日产劲客将于7月正式上市 定位小型SUV",
    //                 "publishTime": "2017-04-22 17:31:49",
    //                 "cover": [
    //                     "http://img2.bitautoimg.com/bitauto/2017/04/22/90026e2a-9f1e-4b80-bd74-b57bb40a90e2.png"
    //                 ],
    //                 "summary": "易车讯 在本届上海国际车展上，东风日产全新小型SUV——劲客正式国内首发，新车将于2017年7月正式上市。新车基于海外版Kicks打造，并保留了海外版车型的大部分设计元素。外观方面，劲客基本保留了海外版Kicks的设计。新车的前脸造型带有日产最新家族风格，整体线条十分活跃。V型进气格栅配合犀利的前大灯组营造出强烈的动感气质。细节方面，新车的前灯组内部还配有回旋镖式LED日间行车灯。内饰方面，日产K",
    //                 "url": "/info/6800385.html",
    //                 "user": {
    //                     "uid": 2622447,
    //                     "followType": 0,
    //                     "showname": "于皓",
    //                     "avatarpath": "//img4.baa.bitautotech.com/newavatar/2017/06/26/2622447_120_9f840a9b-52bf-4c27-93b5-d28d3442cb17.jpg",
    //                     "fanscount": 2307
    //                 },
    //                 "pv": "247833",
    //                 "comments": "658"
    //             },
    //             {
    //                 "newsId": 6800384,
    //                 "title": "中华新款V3或将于7月上市 外观变化明显",
    //                 "publishTime": "2017-04-22 17:23:24",
    //                 "cover": [
    //                     "http://image.bitautoimg.com/bitauto/2017/04/22/3de52be9-99e9-4e92-9baf-9bedb41544c4.png"
    //                 ],
    //                 "summary": "易车讯 日前，我们从相关渠道获悉，在2017上海国际车展上发布的中华新款V3或将于2017年7月上市。新车在外观方面变化明显。外观方面，新款V3采用了竖条镀铬进气格栅，与两侧的大灯很自然的融合。此外，新车还升级了保险杠的造型，整体霸气很多。尺寸方面，新车的长宽高分别为4240/1803/1600mm，轴距为2570mm，长度和宽度有所增加。动力部分，新车将延续搭载1.5L和1.5T两款发动机可选，",
    //                 "url": "/info/6800384.html",
    //                 "user": {
    //                     "uid": 2622447,
    //                     "followType": 0,
    //                     "showname": "于皓",
    //                     "avatarpath": "//img4.baa.bitautotech.com/newavatar/2017/06/26/2622447_120_9f840a9b-52bf-4c27-93b5-d28d3442cb17.jpg",
    //                     "fanscount": 2307
    //                 },
    //                 "pv": "203626",
    //                 "comments": "177"
    //             },
    //             {
    //                 "newsId": 6800381,
    //                 "title": "路虎揽胜星脉或将于今年第三季度国内上市",
    //                 "publishTime": "2017-04-22 17:01:34",
    //                 "cover": [
    //                     "http://img2.bitautoimg.com/bitauto/2017/04/22/b2297184-f0d8-4fe8-937b-138014d61222.png"
    //                 ],
    //                 "summary": "易车讯 日前，我们从路虎官方获悉，路虎揽胜星脉将于2017年第三季度在中国市场上市销售。在2017上海车展期间，路虎旗下的新车揽胜星脉进行了中国首发。该车介于揽胜极光和揽胜运动版之间，未来主要竞争对手包括价格和级别相当的奔驰GLC、奥迪Q5和保时捷Macan等产品。据悉，新车在中国上市时，或将推出2.0T涡轮增压和3.0T机械增压V6两种发动机，其最大功率分别为184kW和280kW。传动系统方面",
    //                 "url": "/info/6800381.html",
    //                 "user": {
    //                     "uid": 2622447,
    //                     "followType": 0,
    //                     "showname": "于皓",
    //                     "avatarpath": "//img4.baa.bitautotech.com/newavatar/2017/06/26/2622447_120_9f840a9b-52bf-4c27-93b5-d28d3442cb17.jpg",
    //                     "fanscount": 2307
    //                 },
    //                 "pv": "224755",
    //                 "comments": "414"
    //             },
    //             {
    //                 "newsId": 6800377,
    //                 "title": "雪铁龙天逸C5 AIRCROSS将于今年第四季度上市",
    //                 "publishTime": "2017-04-22 16:46:03",
    //                 "cover": [
    //                     "http://img1.bitautoimg.com/bitauto/2017/04/22/fdbf5f95-78b5-46bd-b332-db2a3ba0a13c.png"
    //                 ],
    //                 "summary": "易车讯 日前，我们从雪铁龙官方了解到刚刚在上海车展发布的天逸C5 AIRCROSS将于2017年第四季度上市销售，该车定位紧凑型SUV，搭载1.6T和1.8T两款涡轮增压发动机。雪铁龙天逸C5 AIRCROSS的外观造型十分个性，新车头部采用了雪铁龙最新家族式设计风格，头灯组隐藏于分层式前进气格栅中，搭配前保险杠下方两侧梯形装饰罩，给人很强的视觉冲击力。新车尾部的设计十分饱满，两侧尾灯组点亮后有着",
    //                 "url": "/info/6800377.html",
    //                 "user": {
    //                     "uid": 2622447,
    //                     "followType": 0,
    //                     "showname": "于皓",
    //                     "avatarpath": "//img4.baa.bitautotech.com/newavatar/2017/06/26/2622447_120_9f840a9b-52bf-4c27-93b5-d28d3442cb17.jpg",
    //                     "fanscount": 2307
    //                 },
    //                 "pv": "209880",
    //                 "comments": "482"
    //             },
    //             {
    //                 "newsId": 6800175,
    //                 "title": "实拍猎豹汽车CS9 冷门SUV有多少诚意？",
    //                 "publishTime": "2017-04-21 15:37:36",
    //                 "cover": [
    //                     "http://image.bitautoimg.com/bitauto/2017/04/21/b05f2ecd-0372-4670-b2b7-8b57f467c329.jpg"
    //                 ],
    //                 "summary": "易车实拍图解 SUV市场在国内可谓是风生水起，无论是哪个品牌都想分得一杯\"美羹\"。而这次猎豹汽车再次出击，继猎豹CS10之后，为了面向年轻首购人群又推出了一款全新的小型SUV--猎豹CS9，来让自己的产品线更丰富。外观方面，猎豹CS9的前进气格栅采用与CS10相似的多边形镂空设计，下格栅采用贯穿式设计，前大灯组带有蓝色透镜，雾灯两侧采用大面积的\"C\"型镀铬装饰。另外，新车的五辐式双色轮圈样式十分时",
    //                 "url": "/info/6800175.html",
    //                 "user": {
    //                     "uid": 12130201,
    //                     "followType": 0,
    //                     "showname": "朱永磊",
    //                     "avatarpath": "//img4.baa.bitautotech.com/newavatar/2017/07/12/12130201_120_89d868c6-6e26-4dd2-a9a4-323d4868d59f.jpg",
    //                     "fanscount": 849
    //                 },
    //                 "pv": "708247",
    //                 "comments": "1081"
    //             }
    //         ]
    //     }
    // }
    // console.log('res.data.list', res.data.list);
    if (res.status == 1 && res.data.list) {
        dataList = res.data.list;
        console.log('车展资讯列表数据===', dataList);
        // 当前页*页码 大于等于 总条数 停止请求接口
        if (data.page * data.size >= res.data.total && dataList.length == 0) {
            console.log('111页面 和返回条数为0 不加载接口')
            loadMore = false;
            $('.load_more').text('');
            return;
        } else {
            console.log('222')
            loadMore = true;
            renderDat.dataList = dataList
            $('#dataListObj').append(template('data-list-tpl', renderDat));
        }
        // renderDat.dataList = dataList
        // console.log(renderDat);
        // $('#dataListObj').html(template('data-list-tpl', renderDat));
    }
}
getListData();
//懒加载
$(window).on('scroll', function () {
    var scrollT = document.documentElement.scrollTop || document.body.scrollTop; //滚动条的垂直偏移
    var scrollH = document.documentElement.scrollHeight || document.body.scrollHeight; //元素的整体高度
    var clientH = document.documentElement.clientHeight || document.body.clientHeight; //元素的可见高度
    if (scrollT >= scrollH - clientH - 100) {
        console.log('loadMore', loadMore);
        if (loadMore) {
            data.page += 1;
            $('.load_more').text('正在加载...');
            getListData();
        }
    }
});
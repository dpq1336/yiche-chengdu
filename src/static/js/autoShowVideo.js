    // 选项卡
    $(".tabbox li").click(function () {
        //获取点击的元素给其添加样式，讲其兄弟元素的样式移除
        // $(this).addClass("active").siblings().removeClass("active");
        //获取选中元素的下标
        var index = $(this).index();
        console.log(index, 'index');
        switch (index) {
            case 0:
                videoParamData.pageIndex = 0
                videoParamData.sort = '0'
                renderDat = {}
                $('#videoObj').html(template('video-tpl', renderDat));
                getVideoData();
                break;
            case 1:
                videoParamData.pageIndex = 0
                videoParamData.sort = '2'
                renderDat = {}
                $('#videoObj').html(template('video-tpl', renderDat));
                getVideoData();
                break;
            default:
                return
        }
        $(this).addClass("active").siblings().removeClass("active");
        $(".main_card>div").eq(index).show().siblings().hide();

        // $(this).parent().siblings().children().eq(index).addClass("active")
        //     .siblings().removeClass("active");
    });
    // 换一换
    $(".change").click(function () {
        sortExpertList = renderDat.expertList;
        // 随机
        sortExpertList.sort(randomSort);
        renderDat.expertList = sortExpertList;
        console.log('换一换', renderDat.expertList);
        $('#yicheObj').html(template('yiche-tpl', renderDat));
    });

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

    function postData(url, param) {
        var result;
        $.ajax({
            type: "POST",
            data: JSON.stringify(param),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            url: url,
            async: false,
            success: function (data) {
                result = data;
            }
        });
        return result;
    }
    var publicParam = {
        "cid": "502",
        "ver": "6.6.3",
        "uid": "45022498"
    };
    //增加公共参数
    function setParamFun(ary) {
        publicParam["param"] = ary
        return publicParam
    }
    // 随机数
    function randomSort(a, b) {
        return Math.random() > 0.5 ? -1 : 1
    };

    //换一换 关注
    $('#yicheObj').on('click', 'a.btn_fllow', function (e) {
        console.log('换一换--关注', $(this).attr('uid'));
        if (isLoginFlag) {
            fllow($(this), 'btn_gray', 'btn_fllow');
        }
    });

    // 关注事件
    function fllow(param, styFllow, styUnFllow) {
        console.log('关注=============', param);
        // 4.关注、取消关注易车号 http://wiki.bitautotech.com/pages/viewpage.action?pageId=13018074
        var followUrl = baseUrl + "/web_exhibition/api/v1/common/follow"; //关注、取消关注易车号
        var followParamData = {
            uid: uid || '45022498', //当前用户id
            type: 1, //1.关注 2.取消	
            followUid: param.attr('uid'), //关注/取消关注的用户id
        }
        var res = postData(followUrl, setParamFun(followParamData)); //关注请求接口
        if (res.status == 1) {
            console.log('关注成功');
            param.addClass(styFllow);
            param.removeClass(styUnFllow);
            param.html("已关注");
        } else {
            console.log('关注失败');
        }
    }
    // 取消关注事件
    function unFllow(param, styFllow, styUnFllow) {
        console.log('取消关注=============', param);
        // 4.关注、取消关注易车号 http://wiki.bitautotech.com/pages/viewpage.action?pageId=13018074
        var followUrl = baseUrl + "/web_exhibition/api/v1/common/follow"; //关注、取消关注易车号
        var followParamData = {
            uid: uid || '45022498', //当前用户id
            type: 2, //1.关注 2.取消	
            followUid: param.attr('uid'), //关注/取消关注的用户id
        }
        var res = postData(followUrl, setParamFun(followParamData)); //关注请求接口
        if (res.status == 1) {
            console.log('取消关注成功');
            param.addClass(styFllow);
            param.removeClass(styUnFllow);
            param.html("关注TA");
        } else {
            console.log('取消关注失败');
        }
    }
    //换一换 取消关注
    $('#yicheObj').on('click', 'a.btn_gray', function (e) {
        console.log('换一换--取消关注', $(this).attr('uid'));
        if (isLoginFlag) {
            unFllow($(this), 'btn_fllow', 'btn_gray'); //取消关注
        }

    });
    // videoObj
    //热门推荐/全部视频列表 关注
    $('#videoObj').on('click', 'a.guanz', function (e) {
        console.log('推荐列表关注', $(this).attr('uid'));
        if (isLoginFlag) {
            fllow($(this), 'yiguanzhu', 'guanz');
        }
    });
    //热门推荐/全部视频列表 已关注
    $('#videoObj').on('click', 'a.yiguanzhu', function (e) {
        console.log('推荐列表关注', $(this).attr('uid'));
        if (isLoginFlag) {
            unFllow($(this), 'guanz', 'yiguanzhu'); //取消关注
        }
    });

    /** 
     * 请求接口参数开始
     * */

    // 请求列表
    var baseUrl = "https://mapi.yiche.com"; //线上环境
    // var baseUrl = "http://192.168.87.105:18769"; //测试环境
    var uid = 0; //公参uid
    var isLoginFlag = window.Bitauto.Login.result.isLogined; //登录状态
    if (isLoginFlag) {
        uid = window.Bitauto.Login.result.userId;
    }
    var bannerList = []; //焦点图数据
    var expertList = []; //专家列表数据
    var sortExpertList = []; //随机10个专家列表数据
    var videoList = []; //视频列表数据
    var renderDat = {}; //渲染数据
    // 5.二级页焦点图接口 http://wiki.bitautotech.com/pages/viewpage.action?pageId=13018076
    var bannerUrl = baseUrl + "/web_exhibition/api/v1/common/get_focus_frame?cid=502&ver=6.6.3&uid=" + uid; //焦点图接口
    var banneParamData = {
        frameId: 153, //车展视频_焦点图
    }

    // 8.推荐易车号 http://wiki.bitautotech.com/pages/viewpage.action?pageId=13017201
    var expertUrl = baseUrl + "/web_exhibition/api/v1/common/author_recommend_list?cid=502&ver=6.6.3&uid=" + uid; //专家列表接口
    var expertParamData = {
        frameId: 1, //标签ID，多个以逗号隔开（暂时传1）
        categoryIds: '122', //122 ----------车展直播_焦点图
    }

    // 10.视频列表接口 http://wiki.bitautotech.com/pages/viewpage.action?pageId=13017267
    var videoUrl = baseUrl + "/web_exhibition/api/v1/vedio/get_vedio_list?cid=502&ver=6.6.3&uid=" + uid; //视频列表接口
    var videoParamData = {
        tagIds: 229427, //标签ID 车展229427
        // startTime: '2019-10-01', //开始时间 2019-04-01  todo需修改
        // endTime: '2019-12-31', //结束时间 2019-05-01
        startTime: '2019-04-01', //开始时间 2019-04-01
        // endTime: '2019-10-15', //结束时间 2019-05-01
        endTime: '2019-04-15', //结束时间 2019-05-01
        sort: 0, //全部视频用0，热门推荐用 2
        pageIndex: 0, //页号0开始
        pageSize: 12, //每页数量
        type: 1, //类型，是否需要获取已关注状态 0：否，1：是
        // loadOpData: 1, //是否加载运营数据 0.不加载 1.加载
        uid: '', //当前登录用户id 未登录传0
    }


    var loadMore = true; //默认加载



    // console.log('车展视频');
    /** 
     * 请求接口方法开始
     * */
    //焦点图接口请求
    function getBannerData() {
        var res = getData(bannerUrl, banneParamData); //焦点图接口请求
        // res = {
        //     "status": "1",
        //     "message": "success",
        //     "data": [{
        //             "pic1": "http://image.bitautoimg.com/bitauto/2018/04/27/cca0815f-adbe-49d3-9f43-69b527e088d8.jpg",
        //             "summary": "",
        //             "title": "加长77mm 旭子解析一汽大众探歌",
        //             "url": "http://vc.yiche.com/vplay/362049.html"
        //         },
        //         {
        //             "pic1": "http://img1.bitautoimg.com/bitauto/2018/04/27/a70053d8-dc56-4505-a2b0-51bded76ef05.jpg",
        //             "summary": "",
        //             "title": "李寅带你看C-HR 秀气时尚",
        //             "url": "http://vc.yiche.com/vplay/362010.html"
        //         },
        //         {
        //             "pic1": "http://image.bitautoimg.com/bitauto/2018/04/27/d5f7827f-19c0-4f55-8bea-3898c64523b3.jpg",
        //             "summary": "",
        //             "title": "木木子抢先解读奔驰新G级",
        //             "url": "http://vc.yiche.com/vplay/361665.html"
        //         },
        //         {
        //             "pic1": "http://img2.bitautoimg.com/bitauto/2018/04/27/4e06b104-7985-44d5-a0c7-7d9870e1827d.jpg",
        //             "summary": "",
        //             "title": "薄荷Car 大众全新CC解析",
        //             "url": "http://vc.yiche.com/vplay/361231.html"
        //         },
        //         {
        //             "pic1": "http://img2.bitautoimg.com/bitauto/2018/04/27/cf08661a-875c-46e6-8db9-f04b2f919738.jpg",
        //             "summary": "",
        //             "title": "萝卜报告 长安福特福睿斯",
        //             "url": "http://vc.yiche.com/vplay/361720.html"
        //         },
        //         {
        //             "pic1": "http://img2.bitautoimg.com/bitauto/2018/04/27/1a8e3af9-3fb4-44d3-891f-b9e978b99f0b.jpg",
        //             "summary": "",
        //             "title": "爽爽解读 加长奥迪Q5L",
        //             "url": "http://vc.yiche.com/vplay/361734.html"
        //         },
        //         {
        //             "pic1": "http://img1.bitautoimg.com/bitauto/2018/04/27/c09aed90-6098-4342-916d-3f43fe6d7a2d.jpg",
        //             "summary": "",
        //             "title": "华晨中华SUV 旗舰中华V7",
        //             "url": "http://vc.yiche.com/vplay/361725.html"
        //         }
        //     ]
        // }
        // console.log('res.data', res.data);
        if (res.status == 1 && res.data) {
            bannerList = res.data;
            // console.log('车展视频顶部焦点图数据===', bannerList);
            renderDat.bannerListA = bannerList.slice(0, 1);
            renderDat.bannerListB = bannerList.slice(1, 5);
            $('#bannerObj').html(template('banner-tpl', renderDat));
        }
    }
    getBannerData(); //焦点图接口请求


    //专家列表接口请求
    function getExpertData() {
        var resYicheData = getData(expertUrl, expertParamData); //专家列表接口请求
        // 专家列表数据
        // resYicheData 是否关注:0:未关注,1:已关注
        // resYicheData = {
        //     "status": "1",
        //     "message": "success",
        //     "data": [{
        //             "avatarPath": "//pic.baa.bitautotech.com/newavatar/120.jpg",
        //             "userId": "1",
        //             "showName": "张三",
        //             "fansCount": "100",
        //             "followType": 0
        //         },
        //         {
        //             "avatarPath": "//pic.baa.bitautotech.com/newavatar/120.jpg",
        //             "userId": "2",
        //             "showName": "李四",
        //             "fansCount": "200",
        //             "followType": 1
        //         },
        //         {
        //             "avatarPath": "//img2.baa.bitautotech.com/newavatar/2018/04/20/7078571_120_83e69c95-ad13-4da8-a1bd-d21af3eecf6c.jpg",
        //             "userId": "3",
        //             "showName": "王五",
        //             "fansCount": "300",
        //             "followType": 0
        //         }
        //     ]
        // }
        if (resYicheData.status == 1 && resYicheData.data) {
            expertList = resYicheData.data;
            for (var i = 0; i < expertList.length; i++) {
                if (expertList[i].avatarpath != null) {
                    expertList[i].avatarpath = expertList[i].avatarpath.replace(/\{0\}/, 120)
                } else {
                    expertList[i].avatarpath = "https://pic.baa.bitautotech.com/newavatar/120.jpg"
                }
            }
            console.log('车展视频专家列表数据===', expertList);
            renderDat.expertList = expertList.slice(0, 10);
            var listObj = {};
            listObj.isLogin = isLoginFlag;
            listObj.expertList = renderDat.expertList
            // console.log('renderDat.expertList', renderDat.expertList);
            $('#yicheObj').html(template('yiche-tpl', listObj));
        }
    }
    getExpertData(); //专家列表接口请求

    //视频列表接口请求
    function getVideoData() {
        var videoResData = getData(videoUrl, videoParamData); //视频列表接口请求
        // 视频列表数据
        // videoResData = {
        //     "status": "1",
        //     "message": "success",
        //     "data": {
        //         "count": 1195,
        //         "list": [{
        //                 "title": "大炮评车：让油腻大叔失望的新款凯美瑞",
        //                 "imageUrl": "http://img4.bitautoimg.com/wapimg-300-0/video/2017/11/9/5594db87-65f5-4f3f-952b-82bd366a68ea_.jpg",
        //                 "playMUrl": "http://vc.m.yiche.com/vplay/220201.html",
        //                 "playUrl": "http://vc.yiche.com/vplay/220201.html",
        //                 "videoId": 220201,
        //                 "sourceType": 2,
        //                 "userId": 7725799,
        //                 "userData": {
        //                     "uid": 7725799,
        //                     "followType": 0,
        //                     "showname": "大炮评车",
        //                     "avatarpath": "//img1.baa.bitautotech.com/newavatar/2017/09/26/7725799_120_414d0787-cdb7-44b0-bcdb-833ac27d222d.jpg",
        //                     "fanscount": 17835
        //                 }
        //             },
        //             {
        //                 "title": "《萝卜报告》2017广州车展 哈弗H4",
        //                 "imageUrl": "http://img4.bitautoimg.com/wapimg-300-0/video/2017/11/18/3e56bccb-e46e-411d-9d18-aded85a1d107_.jpg",
        //                 "playMUrl": "http://vc.m.yiche.com/vplay/227081.html",
        //                 "playUrl": "http://vc.yiche.com/vplay/227081.html",
        //                 "videoId": 227081,
        //                 "sourceType": 2,
        //                 "userId": 4394078,
        //                 "userData": {
        //                     "uid": 4394078,
        //                     "followType": 0,
        //                     "showname": "萝卜报告",
        //                     "avatarpath": "//img1.baa.bitautotech.com/newavatar/2017/09/13/4394078_120_00bd6bde-298d-4233-8a69-a5edd9ce222b.jpg",
        //                     "fanscount": 94815
        //                 }
        //             },
        //             {
        //                 "title": "大炮评车：商界大佬豪车内语出惊人",
        //                 "imageUrl": "http://img1.bitautoimg.com/wapimg-300-0/video/2017/11/23/5894e488-4f27-42af-9ab5-3d9e7079d581_.jpg",
        //                 "playMUrl": "http://vc.m.yiche.com/vplay/233668.html",
        //                 "playUrl": "http://vc.yiche.com/vplay/233668.html",
        //                 "videoId": 233668,
        //                 "sourceType": 2,
        //                 "userId": 7725799,
        //                 "userData": {
        //                     "uid": 7725799,
        //                     "followType": 0,
        //                     "showname": "大炮评车",
        //                     "avatarpath": "//img1.baa.bitautotech.com/newavatar/2017/09/26/7725799_120_414d0787-cdb7-44b0-bcdb-833ac27d222d.jpg",
        //                     "fanscount": 17835
        //                 }
        //             }
        //         ]
        //     }
        // }
        if (videoResData.status == 1 && videoResData.data.list) {
            videoList = videoResData.data.list;
            console.log('车展视频列表数据===', videoList);
            // 当前页*页码 大于等于 总条数 停止请求接口
            console.log('videoParamData.pageIndex', videoParamData.pageIndex);
            if (videoParamData.pageIndex * videoParamData.pageSize >= videoResData.data.count && videoList.length == 0) {
                console.log('111页面 和返回条数为0 不加载接口')
                loadMore = false;
                $('.load_more').text('');
                return;
            } else {
                console.log('222')
                loadMore = true;
                renderDat.videoList = videoList;
                var listObj = {};
                listObj.isLogin = isLoginFlag;
                listObj.videoList = renderDat.videoList
  
                console.log('新数组======', listObj);
                $('#videoObj').append(template('video-tpl', listObj));
            }
        }
    }
    getVideoData(); //视频列表接口请求

    //懒加载
    $(window).on('scroll', function () {
        var scrollT = document.documentElement.scrollTop || document.body.scrollTop; //滚动条的垂直偏移
        var scrollH = document.documentElement.scrollHeight || document.body.scrollHeight; //元素的整体高度
        var clientH = document.documentElement.clientHeight || document.body.clientHeight; //元素的可见高度
        if (scrollT >= scrollH - clientH - 100) {
            console.log('loadMore', loadMore);
            if (loadMore) {
                videoParamData.pageIndex += 1;
                $('.load_more').text('正在加载...');
                getVideoData();
            }
        }
    });
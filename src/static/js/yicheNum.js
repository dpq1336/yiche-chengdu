$(function () {
  $(".tabbox li").click(function () {
    //获取点击的元素给其添加样式，讲其兄弟元素的样式移除
    // $(this).addClass("active").siblings().removeClass("active");
    //获取选中元素的下标
    var index = $(this).index();
    console.log(index, 'index');

    switch (index) {
      case 0:
        // data.ids = '756'
        data.ids = "44005" //todo 需修改
        renderDat = {}
        dataList = []
        $('#dataListObj').html(template('data-list-tpl', renderDat));
        getListData();
        break;
      case 1:
        // data.ids = '450,24522'
        data.ids = "44005" //todo 需修改
        renderDat = {}
        dataList = []
        $('#dataListObj').html(template('data-list-tpl', renderDat));
        getListData();
        break;
      case 2:
        // data.ids = '3508'
        data.ids = "44005" //todo 需修改
        renderDat = {}
        dataList = []
        $('#dataListObj').html(template('data-list-tpl', renderDat));
        getListData();
        break;
      default:
        return
    }
    $(this).addClass("active").siblings().removeClass("active");
    $(".main_card>div").eq(index).show().siblings().hide();
    //   $(this).parent().siblings().children().eq(index).addClass("active")
    //       .siblings().removeClass("active");
  });
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
// var baseUrl = "https://mapi.yiche.com";//线上环境
var baseUrl = "http://192.168.87.105:18769"; //测试环境
var uid = 0; //公参uid
if (window.Bitauto.Login.result.isLogined) {
  uid = window.Bitauto.Login.result.userId;
}
var dataList = []; //列表数据
var renderDat = {}; //渲染数据
// 6.易车号(首页、二级页) http://wiki.bitautotech.com/pages/viewpage.action?pageId=13017195
var initUrl = baseUrl + "/web_exhibition/api/v1/ych/news_list?cid=502&ver=6.6.3&uid=" + uid; //列表接口
var data = {
  // ids: '756', //多个活动ID,字符串逗号分隔 轿车 756、SUV/MPV450,24522 新能源 3508
  pageIndex: 1, //页码
  pageSize: 10, //每页条数
  ids: "44005",
  startTime: "2018-11-23",
  endTime: "2019-10-08",
  // startTime:2019-10-1,
  // endTime:2019-12-31
}
// 请求列表 todo 需修改点击当前页卡 分别传不同的活动ID
function getListData() {
  console.log('易车号页卡活动id', data.ids);
  var res = postData(initUrl, setParamFun(data));
  // res = {
  //   "status": "1",
  //   "message": "成功",
  //   "data": [{
  //     "id": 442494,
  //     "contentType": 2,
  //     "title": "10万能买的轿跑SUV 广州车展辣评东风风光iX5",
  //     "coverImgs": [
  //       "http://img4.bitautoimg.com/wapimg-300-0/video/2018/11/22/918f6778-961c-40a2-9683-ac10839f7857_.jpg"
  //     ],
  //     "commentCount": 0,
  //     "visitCount": 43261,
  //     "publishTime": "2018-11-22 20:15:19",
  //     "jumpUrl": "http://vc.yiche.com/vplay/442494.html",
  //     "userData": {
  //       "uid": 24654649,
  //       "followType": 0,
  //       "showname": "辣车TV",
  //       "avatarpath": "//img4.baa.bitautotech.com/newavatar/2017/06/01/24654649_120_2f5c741e-735e-453b-a257-252e5256021a.jpg",
  //       "fanscount": 638
  //     },
  //     "userId": 24654649
  //   }]
  // }
  // console.log('res.data', res.data);
  if (res.status == 1 && res.data) {
    dataList = res.data;
    console.log('易车号列表数据===', dataList);
    renderDat.dataList = dataList
    console.log(renderDat);
    $('#dataListObj').html(template('data-list-tpl', renderDat));
  }
}
getListData();
//懒加载
// $(window).on('scroll', function () {
//   var scrollT = document.documentElement.scrollTop || document.body.scrollTop; //滚动条的垂直偏移
//   var scrollH = document.documentElement.scrollHeight || document.body.scrollHeight; //元素的整体高度
//   var clientH = document.documentElement.clientHeight || document.body.clientHeight; //元素的可见高度
//   if (scrollT >= scrollH - clientH - 100) {
//     // console.log('loadMore', loadMore);
//     if (loadMore) {
//       videoParamData.pageIndex += 1;
//       // $('.load_more').text('正在加载...');
//       getVideoData();
//     }
//   }
// });
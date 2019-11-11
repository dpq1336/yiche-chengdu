      // 选项卡
      $(".tabbox li").click(function () {
          //获取点击的元素给其添加样式，讲其兄弟元素的样式移除
          $(this).addClass("active").siblings().removeClass("active");
          //获取选中元素的下标
          var index = $(this).index();
          switch (index) {
              case 0:
                  videoParamData.pageIndex = 0
                  videoParamData.statuses = '1,2'
                  renderDat = {}
                  videoList = []
                  $('#videoObj').html(template('video-tpl', renderDat));
                  getVideoData();
                  break;
              case 1:
                  videoParamData.pageIndex = 0
                  videoParamData.statuses = '4'
                  renderDat = {}
                  videoList = []
                  $('#videoObj').html(template('video-tpl', renderDat));
                  getVideoData();
                  break;
              default:
                  return
          }
          $(this).addClass("active").siblings().removeClass("active");
          $(".main_card>div").eq(index).show().siblings().hide();
          //   $(this).parent().siblings().children().eq(index).addClass("active")
          //       .siblings().removeClass("active");
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
              // 4.关注、取消关注易车号 http://wiki.bitautotech.com/pages/viewpage.action?pageId=13018074
              var followUrl = baseUrl + "/web_exhibition/api/v1/common/follow"; //关注、取消关注易车号
              var followParamData = {
                  uid: uid || '45022498', //当前用户id
                  type: 1, //1.关注 2.取消	
                  followUid: $(this).attr('uid'), //关注/取消关注的用户id
              }
              var res = postData(followUrl, setParamFun(followParamData)); //关注请求接口
              // var res = postData(followUrl, followParamData); //关注请求接口

              if (res.status == 1) {
                  console.log('关注成功');
                  $(this).addClass('btn_gray');
                  $(this).html("已关注");
                  $(this).removeClass('btn_fllow');
              } else {
                  console.log('关注失败');
              }
          }

      });
      //换一换 取消关注
      $('#yicheObj').on('click', 'a.btn_gray', function (e) {
          console.log('换一换--取消关注', $(this).attr('uid'));
          if (isLoginFlag) {
              // 4.关注、取消关注易车号 http://wiki.bitautotech.com/pages/viewpage.action?pageId=13018074
              var followUrl = baseUrl + "/web_exhibition/api/v1/common/follow"; //关注、取消关注易车号
              var followParamData = {
                  uid: uid || '45022498', //当前用户id
                  type: 2, //1.关注 2.取消	
                  followUid: $(this).attr('uid'), //关注/取消关注的用户id
              }
              var res = postData(followUrl, setParamFun(followParamData)); //关注请求接口
              // var res = postData(followUrl, followParamData); //关注请求接口
              if (res.status == 1) {
                  console.log('取消关注成功');
                  $(this).removeClass('btn_gray');
                  $(this).addClass('btn_fllow');
                  $(this).html("关注TA");
              } else {
                  console.log('取消关注失败');
              }
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
      var dataList = []; //列表数据
      var bannerList = []; //焦点图数据
      var expertList = []; //专家列表数据
      var videoList = []; //视频列表数据
      var renderDat = {}; //渲染数据
      // 5.二级页焦点图接口 http://wiki.bitautotech.com/pages/viewpage.action?pageId=13018076
      var bannerUrl = baseUrl + "/web_exhibition/api/v1/common/get_focus_frame?cid=502&ver=6.6.3&uid=" + uid; //焦点图接口
      var banneParamData = {
          frameId: 152, //车展直播_焦点图车展直播_焦点图 152
      }
      // 8.推荐易车号 http://wiki.bitautotech.com/pages/viewpage.action?pageId=13017201
      var expertUrl = baseUrl + "/web_exhibition/api/v1/common/author_recommend_list?cid=502&ver=6.6.3&uid=" + uid; //专家列表接口
      var expertParamData = {
          frameId: 1, //标签ID，多个以逗号隔开（暂时传1）
          categoryIds: '122', //122 ----------车展直播_焦点图
      }

      //  11.直播列表  http://wiki.bitautotech.com/pages/viewpage.action?pageId=13017272
      var videoUrl = baseUrl + "/web_exhibition/api/v1/live_broadcast/get_live_broadcast_list?cid=502&ver=6.6.3&uid=" + uid; //专家列表接口
      var videoParamData = {
          tagId: 0,
          categroyId: 0,
          statuses: '1,2', //状态，直播时标签下为 1预告，2直播中 回看标签时为4，可以传多个逗号分割
          beginDate: '2019-01-01',
          endDate: '2019-12-31',
          pageIndex: 0,
          pageSize: 10,
          manualRecommendKey: 'Guangzhou2018RecommendUrl'
      }
      var videoHkParamData = {
          tagId: 0,
          categroyId: 0,
          statuses: '4', //状态，直播时标签下为 1预告，2直播中 回看标签时为4，可以传多个逗号分割
          beginDate: '2019-01-01',
          endDate: '2019-12-31',
          pageIndex: 0,
          pageSize: 10,
          manualRecommendKey: 'Guangzhou2018RecommendUrl'
      }
      var loadMore = true; //默认加载
      /** 
       * 请求接口方法开始
       * */

      // 数组排序
      function sortArr(data) {
          console.log('data', data);
          var listArr = [];
          data.forEach(function (el, index) {
              for (var i = 0; i < listArr.length; i++) {
                  if (listArr[i].timeLabel == el.timeLabel) {
                      listArr[i].listInfo.push({
                          mobileImageUrl: el.mobileImageUrl,
                          status: el.status,
                          userName: el.userName,
                          title: el.title,
                          key: handleTimeData(el.key),
                          url: el.url,
                          videoId: el.videoId
                      });
                      return;
                  }
              }
              listArr.push({
                  timeLabel: el.timeLabel,
                  listInfo: [{
                      mobileImageUrl: el.mobileImageUrl,
                      status: el.status,
                      userName: el.userName,
                      title: el.title,
                      key: handleTimeData(el.key),
                      url: el.url,
                      videoId: el.videoId
                  }]
              });
          });
          return listArr;
      }

      // 时间格式化
      function handleTimeData(timeStr) {
          if (timeStr) {
              timeStr = timeStr.split('-');
              timeStr = timeStr[0] + '-' + timeStr[1] + '-' + timeStr[2]
          }
          return timeStr
      }

      var zbFlag = false; //默认直播没数据
      var hkFlag = false; //默认回看无数据
      //   判断视频是否有数据 无直播/回看隐藏页卡
      function isVideoList() {
          console.log('请求两次接口看是否有数据');
          var videoZbResData = getData(videoUrl, videoParamData); //直播视频列表接口请求
          videoZbResData.data.list.length == 0 ? zbFlag = false : zbFlag = true; //直播数据有，zbFlag展示
          if (zbFlag) { //展示直播
              $('.zb').addClass("active");
          } else { //隐藏直播
              $('.zb').hide();
          }
          var videoHkResData = getData(videoUrl, videoHkParamData); //回看视频列表接口请求
          videoHkResData.data.list.length == 0 ? hkFlag = false : hkFlag = true; //回看数据有，hkFlag展示
          if (hkFlag) { //展示回看
              zbFlag ? '' : $('.hk').addClass("active");
          } else { //隐藏回看
              $('.hk').hide();
          }
          //   if (!zbFlag) {
          //       videoParamData.statuses = '4';
          //   }
          videoParamData.statuses = '4';
          getVideoData(); //视频列表接口请求

      }
      isVideoList();
      //直播列表接口请求
      function getVideoData() {
          var videoResData = getData(videoUrl, videoParamData); //视频列表接口请求
          //   videoResData=
          if (videoResData.status == 1 && videoResData.data.list) {
              console.log('视频列表数据===前', videoList);
              // 源数据
              videoList = videoList.concat(videoResData.data.list)
              //   tempArr处理后的数据
              tempArr = sortArr(videoList);
              // 当前页*页码 大于等直播于 总条数 停止请求接口
              console.log('videoParamData.pageIndex', videoParamData.pageIndex);
              if (videoParamData.pageIndex * videoParamData.pageSize >= videoResData.data.count && videoResData.data.list.length == 0) {
                  console.log('111页面 和返回条数为0 不加载接口');
                  loadMore = false;
                  $('.load_more').text('');
                  return;
              } else {
                  console.log('222')
                  loadMore = true;
                  renderDat.videoList = tempArr;
                  console.log('videoList0000000000000', renderDat);
                  $('#videoObj').html(template('video-tpl', renderDat));
              }
          }
      }


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

      //焦点图接口请求
      function getBannerData() {
          //   console.log('车展直播');
          var res = getData(bannerUrl, banneParamData);
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
          // 顶部焦点图数据
          if (res.status == 1 && res.data) {
              bannerList = res.data;
              //   console.log('车展直播顶部焦点图数据===', bannerList);
              renderDat.bannerListA = bannerList.slice(0, 1);
              renderDat.bannerListB = bannerList.slice(1, 5);
              //   console.log(renderDat);
              $('#bannerObj').html(template('banner-tpl', renderDat));
          }
      }
      getBannerData(); //焦点图接口请求
      //专家列表接口请求
      function getExpertData() {
          var resYicheData = getData(expertUrl, expertParamData);
          // 专家列表数据
          // followType 是否关注:0:未关注,1:已关注
          if (resYicheData.status == 1 && resYicheData.data) {
              expertList = resYicheData.data;
              for (var i = 0; i < expertList.length; i++) {
                  if (expertList[i].avatarpath != null) {
                      expertList[i].avatarpath = expertList[i].avatarpath.replace(/\{0\}/, 120)
                  } else {
                      expertList[i].avatarpath = "https://pic.baa.bitautotech.com/newavatar/120.jpg"
                  }
              }
              //   console.log('车展视频专家列表数据===', expertList);
              renderDat.expertList = expertList.slice(0, 10);
              var listObj = {};
              listObj.isLogin = isLoginFlag;
              listObj.expertList = renderDat.expertList

              console.log('新数组', listObj);


              console.log('renderDat.expertList121212121==========', listObj);
              $('#yicheObj').html(template('yiche-tpl', listObj));
          }
      }
      getExpertData(); //专家列表接口请求
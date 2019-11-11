var pageIndex = 1;
var isLoad = true
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
//车型报道弹出层显示
var timeoutflag = null;
$('.carShow ul').on('mouseover', 'span', function (e) {
  $(this).next().css('display', 'block')
  // window.setTimeout(function () {
  if (timeoutflag != null) {
    clearTimeout(timeoutflag);
  }
  timeoutflag = setTimeout(function () {
    // dosomething();//此处是一个会请求远程的ajax 异步操作;
    getCarReport($(this).attr('brandid'))

  }, 500);


  // }, 200)

})
//车型报道弹出层隐藏
$('.carShow ul ').on('mouseleave', '.report', function (e) {
  $(this).find('.carreport').css('display', 'none')

})
//搜索级别点击
$('.search .level span').click(function () {
  $(this).addClass('click-chinese').siblings().removeClass('click-chinese')
  $('.brand span').removeClass('click-chinese click-english')
  $('.venue span').removeClass('click-chinese')
  // console.log($(this).attr('level'))
  getSearch(level = $(this).attr('level'))
  pageIndex = 1
  isLoad = true
})
//搜索品牌点击
$('.search .brand ').children().eq(1).click(function () {
  $(this).addClass('click-chinese').siblings().removeClass('click-chinese click-english')
  $('.level span').removeClass('click-chinese')
  $('.venue span').removeClass('click-chinese')
  console.log($('.search_brand span'))
  $('.search_brand').empty()
  getSearch()

})
// $('.search .brand ').children().eq(1).siblings().filter('span').click(function () {
//   $(this).addClass('click-english').siblings().removeClass('click-english')
//   $(this).parent().find('.nolimit').removeClass('click-chinese')
//   $('.level span').removeClass('click-chinese')
//   $('.venue span').removeClass('click-chinese')

// })
//搜索品牌结果点击
$('.search .brand .search_brand ').on('click', 'span', (function () {
  $(this).addClass('click-chinese').siblings().removeClass('click-chinese')
  $('.level span').removeClass('click-chinese')
  $('.venue span').removeClass('click-chinese')
  getSearch(-1, $(this).attr('mab'), -1)
  pageIndex = 1
  isLoad = true

}))
//搜索场馆点击
$('.search .venue ').on('click', 'span', (function () {
  $(this).addClass('click-chinese').siblings().removeClass('click-chinese')
  $('.level span').removeClass('click-chinese')
  $('.brand span').removeClass('click-chinese click-english')
  console.log(2233)
  getSearch(-1, -1, $(this).attr('pavilion'))
  pageIndex = 1
  isLoad = true

}))
//清空条件点击
$('.search button').click(function () {
  $('.level span').removeClass('click-chinese')
  $('.brand span').removeClass('click-chinese click-english')
  $('.venue span').removeClass('click-chinese')
  getSearch()

})
//获取搜索条件
if (window.Bitauto.Login.result.isLogined) {
  var uid = window.Bitauto.Login.result.userId
} else {
  var uid = 0
}
var url = 'https://mapi.yiche.com/web_exhibition/api/v1/new_car_exhibition/get_car_conditions?cid=502&ver=6.6.3&uid=' + uid
var res = getData(url, {
  exhibitionId: 273
})
console.log(res)
// var data = {
//   "status": 1,
//   "message": "成功",
//   "data": {
//     "mabPara": [{
//         "spellFirst": "A",
//         "mabs": [{
//             "mabId": 9,
//             "mabName": "奥迪",
//             "logoUrl": "http://image.bitautoimg.com/bt/car/default/images/logo/masterbrand/png/100/m_9_100.png"
//           },
//           {
//             "mabId": 92,
//             "mabName": "阿尔法",
//             "logoUrl": "http://image.bitautoimg.com/bt/car/default/images/logo/masterbrand/png/100/m_92_100.png"
//           }
//         ]
//       },
//       {
//         "spellFirst": "B",
//         "mabs": [{
//             "mabId": 3,
//             "mabName": "宝马",
//             "logoUrl": "http://image.bitautoimg.com/bt/car/default/images/logo/masterbrand/png/100/m_3_100.png"
//           },
//           {
//             "mabId": 82,
//             "mabName": "宝沃",
//             "logoUrl": "http://image.bitautoimg.com/bt/car/default/images/logo/masterbrand/png/100/m_82_100.png"
//           }
//         ]
//       }
//     ],
//     "pavilionPara": [{
//         "pavilionId": 1,
//         "pavilionName": "E1"
//       },
//       {
//         "pavilionId": 2,
//         "pavilionName": "E2"
//       },
//       {
//         "pavilionId": 3,
//         "pavilionName": "E3"
//       }
//     ]
//   }
// }
//点击首字母显示车名
$('.up').on('click', 'span', function () {
  $(this).addClass('click-english').siblings().removeClass('click-english')
  $(this).parent().find('.nolimit').removeClass('click-chinese')
  $('.level span').removeClass('click-chinese')
  $('.venue span').removeClass('click-chinese')
  $('.nolimit').removeClass('click-chinese')
  var letter = $(this).text()
  console.log(res.data.mabPara, 333)
  res.data.mabPara.map(function (value, index, array) {
    if (value.spellFirst == letter) {
      console.log(value)
      $('.search_brand').html(template('search-mab', value))


    }
  })

})

//渲染搜索条件
$('.up').html(template('search', res.data))
$('.venue').append(template('search-venue', res.data))

//搜索功能
function getSearch(level, mab, pavilion) {
  var data = {
    exhibitionId: 273,
    level: level || -1,
    mab: mab || -1,
    pavilion: pavilion || -1,
    size: 12,
    pageIndex: 1
  }
  if (window.Bitauto.Login.result.isLogined) {
    var uid = window.Bitauto.Login.result.userId
  } else {
    var uid = 0
  }
  var url = 'https://mapi.yiche.com/web_exhibition/api/v1/new_car_exhibition/get_car_search_result?cid=502&ver=6.6.3&uid=' + uid
  var res = getData(url, data)
  // console.log(res, 222)
  // var res = {
  //   "status": "1",
  //   "message": "success",
  //   "data": {
  //     "total": 6,
  //     "list": [{
  //         "csId": 2128,
  //         "csName": "166",
  //         "csAllSpell": "aerfa166",
  //         "brandId": 92,
  //         "brandName": "阿尔法·罗密欧",
  //         "csTag": "测试标签",
  //         "guidPrice": "",
  //         "pavilionId": [
  //           270,
  //           271
  //         ],
  //         "pavilionNames": [
  //           "场馆1",
  //           "场馆2"
  //         ],
  //         "path": null
  //       },
  //       {
  //         "csId": 3781,
  //         "csName": "S3",
  //         "csAllSpell": "s3",
  //         "brandId": 9,
  //         "brandName": "奥迪",
  //         "csTag": "",
  //         "guidPrice": "37.15-37.15万",
  //         "pavilionId": [
  //           270,
  //           271
  //         ],
  //         "pavilionNames": [
  //           "场馆1",
  //           "场馆2"
  //         ],
  //         "path": "http://img4.bitautoimg.com/wapimg-660-0/autoalbum/files/20180412/014/2018041208475547555763_5959155_3.jpg"
  //       },
  //       {
  //         "csId": 4985,
  //         "csName": "Stelvio",
  //         "csAllSpell": "aerfaluomioustelvio",
  //         "brandId": 92,
  //         "brandName": "阿尔法·罗密欧",
  //         "csTag": "测试标签",
  //         "guidPrice": "39.98-96.98万",
  //         "pavilionId": [
  //           270,
  //           271
  //         ],
  //         "pavilionNames": [
  //           "场馆1",
  //           "场馆2"
  //         ],
  //         "path": "http://img2.bitautoimg.com/wapimg-660-0/autoalbum/files/20171211/401/201712111337403740148423_5759721_3.jpg"
  //       },
  //       {
  //         "csId": 5146,
  //         "csName": "A3 插电混动",
  //         "csAllSpell": "aodia6lchadianhundong",
  //         "brandId": 9,
  //         "brandName": "奥迪",
  //         "csTag": "测试标签1",
  //         "guidPrice": "39.98-39.98万",
  //         "pavilionId": [
  //           270,
  //           271
  //         ],
  //         "pavilionNames": [
  //           "场馆1",
  //           "场馆2"
  //         ],
  //         "path": null
  //       },
  //       {
  //         "csId": 4618,
  //         "csName": "330",
  //         "csAllSpell": "baojun330",
  //         "brandId": 157,
  //         "brandName": "宝骏",
  //         "csTag": "测试标签",
  //         "guidPrice": "",
  //         "pavilionId": [
  //           270
  //         ],
  //         "pavilionNames": [
  //           "场馆1"
  //         ],
  //         "path": null
  //       },
  //       {
  //         "csId": 2412,
  //         "csName": "5系",
  //         "csAllSpell": "baoma5xichangzhoujuban",
  //         "brandId": 3,
  //         "brandName": "宝马",
  //         "csTag": "",
  //         "guidPrice": "43.69-65.99万",
  //         "pavilionId": [],
  //         "pavilionNames": [],
  //         "path": "http://img2.bitautoimg.com/wapimg-660-0/autoalbum/files/20180427/485/20180427141929192923222_5991849_3.jpg"
  //       }
  //     ]
  //   }
  // }

  res.data.list.map(function (value) {
    if (value.pavilionNames) {
      value.pavilionNames = value.pavilionNames.join(' ')
    } else {
      value.pavilionNames = ''

    }


  })
  console.log(res.data.list)
  $('.clear').html(template('carShow', res.data))

}
getSearch()
//追加搜索功能
function addSearch(level, mab, pavilion, pageIndex) {
  var data = {
    exhibitionId: 273,
    level: level || -1,
    mab: mab || -1,
    pavilion: pavilion || -1,
    size: 12,
    pageIndex: pageIndex
  }
  if (window.Bitauto.Login.result.isLogined) {
    var uid = window.Bitauto.Login.result.userId
  } else {
    var uid = 0
  }
  var url = 'https://mapi.yiche.com/web_exhibition/api/v1/new_car_exhibition/get_car_search_result?cid=502&ver=6.6.3&uid=' + uid
  var res = getData(url, data)
  if (res.data.list.length == 0) {
    isLoad = false
  }
  // console.log(res, 222)
  // var res = {
  //   "status": "1",
  //   "message": "success",
  //   "data": {
  //     "total": 6,
  //     "list": [{
  //         "csId": 2128,
  //         "csName": "166",
  //         "csAllSpell": "aerfa166",
  //         "brandId": 92,
  //         "brandName": "阿尔法·罗密欧",
  //         "csTag": "测试标签",
  //         "guidPrice": "",
  //         "pavilionId": [
  //           270,
  //           271
  //         ],
  //         "pavilionNames": [
  //           "场馆1",
  //           "场馆2"
  //         ],
  //         "path": null
  //       },
  //       {
  //         "csId": 3781,
  //         "csName": "S3",
  //         "csAllSpell": "s3",
  //         "brandId": 9,
  //         "brandName": "奥迪",
  //         "csTag": "",
  //         "guidPrice": "37.15-37.15万",
  //         "pavilionId": [
  //           270,
  //           271
  //         ],
  //         "pavilionNames": [
  //           "场馆1",
  //           "场馆2"
  //         ],
  //         "path": "http://img4.bitautoimg.com/wapimg-660-0/autoalbum/files/20180412/014/2018041208475547555763_5959155_3.jpg"
  //       },
  //       {
  //         "csId": 4985,
  //         "csName": "Stelvio",
  //         "csAllSpell": "aerfaluomioustelvio",
  //         "brandId": 92,
  //         "brandName": "阿尔法·罗密欧",
  //         "csTag": "测试标签",
  //         "guidPrice": "39.98-96.98万",
  //         "pavilionId": [
  //           270,
  //           271
  //         ],
  //         "pavilionNames": [
  //           "场馆1",
  //           "场馆2"
  //         ],
  //         "path": "http://img2.bitautoimg.com/wapimg-660-0/autoalbum/files/20171211/401/201712111337403740148423_5759721_3.jpg"
  //       },
  //       {
  //         "csId": 5146,
  //         "csName": "A3 插电混动",
  //         "csAllSpell": "aodia6lchadianhundong",
  //         "brandId": 9,
  //         "brandName": "奥迪",
  //         "csTag": "测试标签1",
  //         "guidPrice": "39.98-39.98万",
  //         "pavilionId": [
  //           270,
  //           271
  //         ],
  //         "pavilionNames": [
  //           "场馆1",
  //           "场馆2"
  //         ],
  //         "path": null
  //       },
  //       {
  //         "csId": 4618,
  //         "csName": "330",
  //         "csAllSpell": "baojun330",
  //         "brandId": 157,
  //         "brandName": "宝骏",
  //         "csTag": "测试标签",
  //         "guidPrice": "",
  //         "pavilionId": [
  //           270
  //         ],
  //         "pavilionNames": [
  //           "场馆1"
  //         ],
  //         "path": null
  //       },
  //       {
  //         "csId": 2412,
  //         "csName": "5系",
  //         "csAllSpell": "baoma5xichangzhoujuban",
  //         "brandId": 3,
  //         "brandName": "宝马",
  //         "csTag": "",
  //         "guidPrice": "43.69-65.99万",
  //         "pavilionId": [],
  //         "pavilionNames": [],
  //         "path": "http://img2.bitautoimg.com/wapimg-660-0/autoalbum/files/20180427/485/20180427141929192923222_5991849_3.jpg"
  //       }
  //     ]
  //   }
  // }

  res.data.list.map(function (value) {
    if (value.pavilionNames) {
      value.pavilionNames = value.pavilionNames.join(' ')
    } else {
      value.pavilionNames = ''

    }


  })
  console.log(res.data.list)
  $('.clear').append(template('carShowAdd', res.data))

}
//车型报道
function getCarReport(serialIds) {
  var data = {
    tagIds: 1,
    serialIds: serialIds
  }
  if (window.Bitauto.Login.result.isLogined) {
    var uid = window.Bitauto.Login.result.userId
  } else {
    var uid = 0
  }
  var url = 'https://mapi.yiche.com/web_exhibition/api/v1/new_car_exhibition/get_car_report?cid=502&ver=6.6.3&uid=' + uid

  var res = getData(url, data)
  console.log(res, 1111111)
  var r = {
    "status": "1",
    "message": "success",
    "data": {
      "total": 2,
      "list": [{
          "newsId": 6798277,
          "title": "丰田发布两款全新概念车 丰巢FUN/丰巢WAY",
          "url": "/info/6798277.html"
        },
        {
          "newsId": 6795264,
          "title": "丰田携两款概念车亮相上海车展 共同领略丰田TNGA",
          "url": "/info/6795264.html"
        },
        {
          "newsId": 6795268,
          "title": "丰田携两款概念车亮相上海车展 一起来看吧",
          "url": "/info/6795264.html"
        }
      ]
    }
  }
  if (res.data) {
    $('.carreport').html(template('search-carreport', r.data))

  }


}
//懒加载
window.onscroll = function (event) {
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
  var clientHeight = document.documentElement.clientHeight || document.body.clientHeight
  console.log(scrollTop, scrollHeight, clientHeight)
  if (scrollTop >= scrollHeight - clientHeight) {

    $('.search span').map(function (value, index) {
      // console.log(index.className)
      if (index.className.indexOf('click-chinese') != -1) {
        var moment = $('.search span').eq(value)
        var level = moment.attr('level')
        var mab = moment.attr('mab')
        var pavilion = moment.attr('pavilion')
        console.log(level, mab, pavilion)
        if (level) {
          if (isLoad) {
            console.log('懒加载开始')
            addSearch(level, -1, -1, pageIndex)
            pageIndex++
          }

        } else if (mab) {
          if (isLoad) {
            console.log('懒加载开始')
            addSearch(-1, mab, -1, pageIndex)
            pageIndex++
          }



        } else {
          if (isLoad) {
            console.log('懒加载开始')
            addSearch(-1, -1, pavilion, pageIndex)
            pageIndex++
          }



        }

      } else {
        if (isLoad) {
          console.log('懒加载开始')
          addSearch(-1, -1, -1, pageIndex)
          pageIndex++

        }

      }

    })
    // if (that.scrollTop < scrollTop) {
    //   pageIndex++
    //   scrollTop = scrollTop
    // }
  }
}
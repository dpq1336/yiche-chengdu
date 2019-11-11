function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
var timmer = null;
//播放时间
function timeChange(time) {//默认获取的时间是时间戳改成我们常见的时间格式
    //分钟
    var minute = time / 60;
    var minutes = parseInt(minute);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    //秒
    var second = time % 60;
    seconds = parseInt(second);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var allTime = "" + minutes + "" + ":" + "" + seconds + "";
    return allTime;
}
function playMusicFn() {
    var myAudio = document.getElementById('music');
    if (myAudio.paused) {
        var allTime = myAudio.getAttribute('data-allTime');
        timmer = setInterval(function () {

            var currentTime = myAudio.currentTime;

            if (allTime - currentTime <= 0) {
                clearInterval(timmer);

                $(".des-music-date").html(timeChange(allTime));
            } else {
                $(".des-music-date").html(timeChange(allTime - currentTime));
            }
        }, 1000);
        myAudio.play();
    } else {
        clearInterval(timmer);
        myAudio.pause();
    }

}

$(function () {
    function getTopicsById() {
        $.ajax({
            type: 'GET',
           // url: 'https://mapi.yiche.com/app_review/api/v1/review/web/getTopicsByIds',
           url: 'http://mapi.yiche.com/app_review/api/v1/review/web/getTopicsByIds',
            data: {
                topicId: getQueryString("topicId"),
                sign: getQueryString("sign")
            },
            dataType: 'json',
            success: function (res) {
                dataToTemplate(res.data);
            },
            error: function (xhr, type) {
                console.log("网络出错，请重试");
            }
        })
    }
    function dataToTemplate(jsonData) {
        if (jsonData) {
            if (jsonData.isSuccess == 1) {
                var userInfo = '<img class="user-photo" src="{avatarpath}" /> \
                                       <span class="cm-user-nick">{showname}</span>';
                if (jsonData.user && jsonData.user.roles && jsonData.user.roles.caridentification && jsonData.user.roles.caridentification.state && jsonData.user.roles.caridentification.defaultcar) {
                    var masterbrandid = jsonData.user.roles.caridentification.defaultcar.masterbrandid;
                    var iconUrl = 'https://image.bitautoimg.com/yc-h5/comment/images/img_headpic@3x.png';
                    if (masterbrandid) {
                        iconUrl = 'https://image.bitautoimg.com/bt/car/default/images/logo/masterbrand/png/100/m_' + masterbrandid + '_100.png';
                    }
                    userInfo += '<span class="cm-user-car"><img class="user-photo" src="' + iconUrl + '" /><span>车主</span></span>';
                    userInfo = userInfo.replace('{avatarpath}',  jsonData.user.avatarpath&&jsonData.user.avatarpath.replace("{0}", 120)).replace('{showname}', jsonData.user.showname)
                }else{
                    userInfo="";
                }
                
                $(".cm-user-info").html(userInfo);


                var carInfo = '<div class="cm-car-item cm-car-r"><div class="cm-car-title">{carName}</div></div>';
                carInfo = carInfo.replace('{carName}', jsonData.topicInfo.carName);
                carInfo += '<div class="cm-type">'
                var tempClassName = '';
                if (jsonData.topicInfo.isDigest == 1 || jsonData.topicInfo.isRecommend == 1) {
                    tempClassName = "jh";
                    jsonData.topicInfo.isRecommend == 1 ? tempClassName = "tj" : null;
                    carInfo += '<div class="' + tempClassName + '"></div>'
                }

                if (jsonData.topicInfo.isAuthen == 1) {
                    carInfo += '<div class="rz"></div>'
                }

                carInfo += '</div>'

                $(".cm-car-info").html(carInfo);
                var carInfo = '';
                if (jsonData.topicInfo.purchaseDate) {
                    carInfo += '<span class="des-time">' + jsonData.topicInfo.purchaseDate + '提车</span>'
                }
                carInfo += '<span class="des-star-lable">综合评价 </span>';
                for (var i = 1; i <= 5; i++) {
                    if ((jsonData.topicInfo.rating / 2) >= i) {
                        carInfo += '<img class="star" src="https://image.bitautoimg.com/yc-h5/comment/images/star.png">'
                    } else {
                        carInfo += '<img class="star" src="https://image.bitautoimg.com/yc-h5/comment/images/star-gray.png">'
                    }
                }

                $(".cm-car-des-top").html(carInfo);

                var buyCarInfo = '<div class="des-bot-item">\
                                        <div class="des-bot-title">裸车价</div>\
                                        <div class="des-bot-value c_red">{purchasePrice}</div>\
                                    </div>\
                                    <div class="des-bot-item">\
                                        <div class="des-bot-title">购车地</div>\
                                        <div class="des-bot-value">{purchaseCityName}</div>\
                                    </div>' ;
                buyCarInfo = buyCarInfo.replace('{purchasePrice}', jsonData.topicInfo.purchasePrice ? jsonData.topicInfo.purchasePrice + '万元' : '暂无').replace('{purchaseCityName}', jsonData.topicInfo.purchaseCityName ? jsonData.topicInfo.purchaseCityName : '暂无');
                var fuelValue = jsonData.topicInfo.fuelValue;
                if (jsonData.topicInfo.carType == 1) {
                    if (!fuelValue) {
                        fuelValue = '暂无';
                    } else {
                        fuelValue = fuelValue + 'L/100km';
                    }
                    buyCarInfo += '<div class="des-bot-item"> <div class="des-bot-title">油耗</div>';
                    buyCarInfo += '<div class="des-bot-value">' + fuelValue + '</div></div>';
                } else {

                    if (!fuelValue) {
                        fuelValue = '暂无';
                    } else {
                        fuelValue = fuelValue + 'km';
                    }
                    buyCarInfo += '<div class="des-bot-item"> <div class="des-bot-title">续航</div>';
                    buyCarInfo += '<div class="des-bot-value">' + fuelValue + '</div></div>';
                }

                $(".cm-car-des-bot").html(buyCarInfo);
                var musicTpl = '';
                if (jsonData.topicInfo.dataType == 3) {
                    var musicDate = timeChange(jsonData.topicInfo.metaDuration || 0);
                    musicTpl += '<div class="des-music-item" onClick="playMusicFn()"><audio id="music" data-allTime="' + jsonData.topicInfo.metaDuration + '" src="' + jsonData.topicInfo.metaUrl + '" style="opacity:0;"> </audio><div class="des-music-icon"></div> <div class="des-music-date">' + musicDate + '</div></div>'
                }
                $(".cm-car-des").append(musicTpl);
                setContentTpl({
                    createTime: jsonData.topicInfo.createTime,
                    tagInfoList: jsonData.topicInfo.tagInfoList,
                    topicImages: jsonData.topicInfo.topicImages,
                    useTime: jsonData.topicInfo.useTime,
                    id: 0,

                });

                if (jsonData.topicInfo.haveAddTopic == 1) {
                    var addTopicList = jsonData.topicInfo.addTopicList;
                    for (var z = 0; z < addTopicList.length; z++) {
                        setContentTpl({
                            createTime: addTopicList[z].addCreateTime,
                            tagInfoList: addTopicList[z].addTagsContent,
                            topicImages: addTopicList[z].addTopicImages,
                            useTime: addTopicList[z].useTime,
                            type: 1,

                        });
                    }
                }
                if (jsonData.topicInfo.schemeUrl) {
                    var schemeUrl=jsonData.topicInfo.schemeUrl;
                
                    
                }
                $(".download-btn").click(function(){
                    
                    location.href="bitauto.yicheapp://yiche.app/xuanche.reputationdetail?id=2370806492237952";
                    var _url= $(this).attr("data-url");
                     t = Date.now();
                     setTimeout(function(){
                         if (Date.now() - t < 1200) {
                             location.href = _url
                         }
                     }, 1000);
                     return false;
                 });
                
                $(".cm-no-update").show();
            } else {
                $("#cm-update").show();
            }
        } else {
            $("#cm-error").show();
        }
    }

    function setContentTpl(contentData) {
        var contentTpl = '<div class="cm-content-date">' + contentData.createTime;
        if (contentData.useTime) {
            contentTpl += '<span class="cm-content-month">用车' + contentData.useTime + '</span>';
        }
        if (contentData.type == 1) {
            contentTpl += '<span class="cm-content-tag">追评</span>';
        }

        contentTpl += '</div>';

        for (var j = 0; j < contentData.tagInfoList.length; j++) {
            contentTpl += '<div class="cm-content-con"><div class="cm-tag-name"><span class="cm-tag-lable">' + contentData.tagInfoList[j].name + '</span>';
            if (contentData.tagInfoList[j].rating) {
                for (var i = 1; i <= 5; i++) {
                    if ((contentData.tagInfoList[j] / 2) >= i) {
                        contentTpl += '<img class="star" src="https://image.bitautoimg.com/yc-h5/comment/images/star.png">'
                    } else {
                        contentTpl += '<img class="star" src="https://image.bitautoimg.com/yc-h5/comment/images/star-gray.png">'
                    }
                }
            }
            contentTpl += '</div>'
            contentTpl += '<div class="cm-tag-info">' + contentData.tagInfoList[j].content + '</div></div>';
        }
        var topicImages = contentData.topicImages;
        contentTpl += '<div class="cm-content-imgs">';
        if (topicImages) {
            topicImages = topicImages.split(',');
        }
        for (var k = 0; k < topicImages.length; k++) {
            contentTpl += '<img src="' + topicImages[k].replace('{0}', 375).replace('{1}', 0) + '" >'
        }
        contentTpl += '</div>'
        if (contentData.type == 0) {
            $("#f-content").html(contentTpl);
        } else {
            $("#s-content").append(contentTpl);
        }
    };
    getTopicsById();
})
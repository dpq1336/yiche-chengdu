function getQueryString(e){var a=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),t=window.location.search.substr(1).match(a);return null!=t?unescape(t[2]):null}var timmer=null;function timeChange(e){var a=parseInt(e/60);return a<10&&(a="0"+a),seconds=parseInt(e%60),seconds<10&&(seconds="0"+seconds),a+":"+seconds}function playMusicFn(){var a=document.getElementById("music");if(a.paused){var t=a.getAttribute("data-allTime");timmer=setInterval(function(){var e=a.currentTime;t-e<=0?(clearInterval(timmer),$(".des-music-date").html(timeChange(t))):$(".des-music-date").html(timeChange(t-e))},1e3),a.play()}else clearInterval(timmer),a.pause()}$(function(){function v(e){var a='<div class="cm-content-date">'+e.createTime;e.useTime&&(a+='<span class="cm-content-month">用车'+e.useTime+"</span>"),1==e.type&&(a+='<span class="cm-content-tag">追评</span>'),a+="</div>";for(var t=0;t<e.tagInfoList.length;t++){if(a+='<div class="cm-content-con"><div class="cm-tag-name"><span class="cm-tag-lable">'+e.tagInfoList[t].name+"</span>",e.tagInfoList[t].rating)for(var i=1;i<=5;i++)e.tagInfoList[t]/2>=i?a+='<img class="star" src="https://image.bitautoimg.com/yc-h5/comment/images/star.png">':a+='<img class="star" src="https://image.bitautoimg.com/yc-h5/comment/images/star-gray.png">';a+="</div>",a+='<div class="cm-tag-info">'+e.tagInfoList[t].content+"</div></div>"}var s=e.topicImages;a+='<div class="cm-content-imgs">',s=s&&s.split(",");for(var c=0;c<s.length;c++)a+='<img src="'+s[c].replace("{0}",375).replace("{1}",0)+'" >';a+="</div>",0==e.type?$("#f-content").html(a):$("#s-content").append(a)}$.ajax({type:"GET",url:"http://mapi.yiche.com/app_review/api/v1/review/web/getTopicsByIds",data:{topicId:getQueryString("topicId"),sign:getQueryString("sign")},dataType:"json",success:function(e){!function(e){if(e)if(1==e.isSuccess){var a='<img class="user-photo" src="{avatarpath}" />                                        <span class="cm-user-nick">{showname}</span>';if(e.user&&e.user.roles&&e.user.roles.caridentification&&e.user.roles.caridentification.state&&e.user.roles.caridentification.defaultcar){var i=e.user.roles.caridentification.defaultcar.masterbrandid,s="https://image.bitautoimg.com/yc-h5/comment/images/img_headpic@3x.png";i&&(s="https://image.bitautoimg.com/bt/car/default/images/logo/masterbrand/png/100/m_"+i+"_100.png"),a=(a+='<span class="cm-user-car"><img class="user-photo" src="'+s+'" /><span>车主</span></span>').replace("{avatarpath}",e.user.avatarpath&&e.user.avatarpath.replace("{0}",120)).replace("{showname}",e.user.showname)}else a="";$(".cm-user-info").html(a),o=(o='<div class="cm-car-item cm-car-r"><div class="cm-car-title">{carName}</div></div>').replace("{carName}",e.topicInfo.carName),o+='<div class="cm-type">';var c="";1!=e.topicInfo.isDigest&&1!=e.topicInfo.isRecommend||(c="jh",1==e.topicInfo.isRecommend&&(c="tj"),o+='<div class="'+c+'"></div>'),1==e.topicInfo.isAuthen&&(o+='<div class="rz"></div>'),o+="</div>",$(".cm-car-info").html(o);var o="";e.topicInfo.purchaseDate&&(o+='<span class="des-time">'+e.topicInfo.purchaseDate+"提车</span>"),o+='<span class="des-star-lable">综合评价 </span>';for(var n=1;n<=5;n++)e.topicInfo.rating/2>=n?o+='<img class="star" src="https://image.bitautoimg.com/yc-h5/comment/images/star.png">':o+='<img class="star" src="https://image.bitautoimg.com/yc-h5/comment/images/star-gray.png">';$(".cm-car-des-top").html(o);var r='<div class="des-bot-item">                                        <div class="des-bot-title">裸车价</div>                                        <div class="des-bot-value c_red">{purchasePrice}</div>                                    </div>                                    <div class="des-bot-item">                                        <div class="des-bot-title">购车地</div>                                        <div class="des-bot-value">{purchaseCityName}</div>                                    </div>';r=r.replace("{purchasePrice}",e.topicInfo.purchasePrice?e.topicInfo.purchasePrice+"万元":"暂无").replace("{purchaseCityName}",e.topicInfo.purchaseCityName?e.topicInfo.purchaseCityName:"暂无");var m=e.topicInfo.fuelValue;1==e.topicInfo.carType?(m?m+="L/100km":m="暂无",r+='<div class="des-bot-item"> <div class="des-bot-title">油耗</div>'):(m?m+="km":m="暂无",r+='<div class="des-bot-item"> <div class="des-bot-title">续航</div>'),r+='<div class="des-bot-value">'+m+"</div></div>",$(".cm-car-des-bot").html(r);var d="";if(3==e.topicInfo.dataType){var p=timeChange(e.topicInfo.metaDuration||0);d+='<div class="des-music-item" onClick="playMusicFn()"><audio id="music" data-allTime="'+e.topicInfo.metaDuration+'" src="'+e.topicInfo.metaUrl+'" style="opacity:0;"> </audio><div class="des-music-icon"></div> <div class="des-music-date">'+p+"</div></div>"}if($(".cm-car-des").append(d),v({createTime:e.topicInfo.createTime,tagInfoList:e.topicInfo.tagInfoList,topicImages:e.topicInfo.topicImages,useTime:e.topicInfo.useTime,id:0}),1==e.topicInfo.haveAddTopic)for(var l=e.topicInfo.addTopicList,u=0;u<l.length;u++)v({createTime:l[u].addCreateTime,tagInfoList:l[u].addTagsContent,topicImages:l[u].addTopicImages,useTime:l[u].useTime,type:1});if(e.topicInfo.schemeUrl)e.topicInfo.schemeUrl;$(".download-btn").click(function(){location.href="bitauto.yicheapp://yiche.app/xuanche.reputationdetail?id=2370806492237952";var e=$(this).attr("data-url");return t=Date.now(),setTimeout(function(){Date.now()-t<1200&&(location.href=e)},1e3),!1}),$(".cm-no-update").show()}else $("#cm-update").show();else $("#cm-error").show()}(e.data)},error:function(e,a){console.log("网络出错，请重试")}})});
//# sourceMappingURL=indexUtitls.js.map

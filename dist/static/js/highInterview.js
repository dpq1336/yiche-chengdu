function getData(t,i){var a;return $.ajax({type:"GET",data:{param:JSON.stringify(i)},dataType:"json",url:t,async:!1,success:function(t){a=t}}),a}function postData(t,i){var a;return $.ajax({type:"POST",data:i,dataType:"json",url:t,async:!1,success:function(t){a=t}}),a}function getPic(){if(window.Bitauto.Login.result.isLogined)var t=window.Bitauto.Login.result.userId;else t=0;var i=getData(" https://mapi.yiche.com/web_exhibition/api/v1/common/get_focus_frame?cid=502&ver=6.6.3&uid="+t,{frameId:124});console.log(i),$(".banner").html(template("pic",i))}function getList(){var t={tagIds:1,categoryIds:8,page:1,size:20};if(window.Bitauto.Login.result.isLogined)var i=window.Bitauto.Login.result.userId;else i=0;var a=getData("https://mapi.yiche.com/web_exhibition/api/v1/information/get_information_list?cid=502&ver=6.6.3&uid="+i,t);console.log(a),(t=a.data).list.map(function(t){t.summary=t.summary.slice(0,37)}),console.log(t),$(".highlist").html(template("highitem",t))}getPic(),getList();
//# sourceMappingURL=highInterview.js.map
!function(){var i=function(){$(document).bind("keyup.left",function(i){$("#firstPage:visible").click()}),$(document).bind("keyup.up",function(i){$("#prevPage:visible").click()}),$(document).bind("keyup.space",function(i){$("#playPause:visible").click()}),$(document).bind("keyup.down",function(i){$("#nextPage:visible").click()}),$(document).bind("keyup.right",function(i){$("#lastPage:visible").click()})},n=function(){$(document).unbind("keyup.left"),$(document).unbind("keyup.up"),$(document).unbind("keyup.space"),$(document).unbind("keyup.down"),$(document).unbind("keyup.right")},t=function(){this.id=0,this.imgPath="",this.style=""},e=function(){this.onWallPicture=[],this.allPic=[],this.wallpicConfig=null,this.againControl=null,this.picdbUtil=new Hi.DbUtil(flag,"pic"),this.msgdbUtil=new Hi.DbUtil(flag,"msg")};e.prototype={init:function(){var i=$.Deferred(),n=this,e=function(){var i=$.Deferred(),n=function(){var i=$.Deferred();return Hi.Message.init("pic").always(i.resolve),i.promise()},t=function(){var i=$.Deferred();return Hi.Message.init("msg").always(i.resolve),i.promise()};return n().then(t).always(i.resolve),i.promise()},o=function(){var i=$.Deferred();return Hi.Db.get("global","wallpicConfig").then(function(t){n.wallpicConfig&&n.wallpicConfig.source!=t.source&&(n.onWallPicture=[]),n.wallpicConfig=t,i.resolve()}),i.promise()},l=function(){var i=$.Deferred();return Hi.Note.r(Hi.Note.type.NEW_MESSAGE,function(i){if(n.wallpicConfig&&"LocalPic"!=n.wallpicConfig.source&&"image"==i.contentType){console.log("imagebox",i);var e=new t;e.id=i.id,e.imgPath=i.content,e.style=i.style,n.allPic.indexOf(e)==-1&&n.allPic.insert(n.currentIndex+1,e)}}),Hi.Note.r(Hi.Note.type.UPDATE_GLOBAL,function(i){"wallpicConfig"==i.noteType&&(n.wallpicConfig.source!=i.source?(n.wallpicConfig=i,n.onWallPicture=[]):n.wallpicConfig=i)}),i.resolve(),i.promise()};return e().then(o).then(l).always(i.resolve),i.promise()},in:function(){var n=this;i(),Hi.Control.bindEvent(),$("#pic-wall-block").show(),$("#wallcontrol #play-handle").show(),Hi.Control.time(3).fn=function(i){var t=$.Deferred();return n.control(i,function(){t.resolve()}),t.promise()},$("#pic-wall-block .slider img").attr("src")||Hi.Control.go(),Hi.Control.state(n.btnPause)},leave:function(){this.btnPause=Hi.Control.state(),Hi.Control.unbindEvent(),$("#pic-wall-block").hide(),$("#wallcontrol .fr").hide(),n()},control:function(i,n){var t=this;t.data(i).then(function(){},function(){console.log("播放完成"),t.onWallPicture=[]}).always(n)},data:function(i){var n=this,t=$.Deferred(),e=i;switch(i){case"first":n.onWallPicture=[],i="next";break;case"last":n.onWallPicture=[],i="prev";break;case"prev":case"next":n.onWallPicture.length&&0==n.onWallPicture[0][i]&&(n.onWallPicture=[])}var o=function(i){i.length?(n.onWallPicture[0]=i[0],n.animation(e,i[0].data,function(){t.resolve()})):t.reject()};return"LocalPic"==n.wallpicConfig.source?n.picdbUtil.getMsg(n.onWallPicture,i,1).then(function(i){o(i)},function(){t.reject()}):n.msgdbUtil.getMsg(n.onWallPicture,i,1,function(i){return!(!i||"Y"==i.delete||"image"!=i.data.msgType||"Y"==i.data.hide)}).then(function(i){o(i)},function(){t.reject()}),t.promise()},animation:function(i,n,t){var e=n.content;if("LocalPic"==this.wallpicConfig.source&&(e=n.imgPath),e=Hi.String.dealUrl(e),$("#pic-wall-block .slider img").attr("src")==e)return void t();var o=$("#pic-wall-block .slider .first img"),l=$("#pic-wall-block .slider .second img"),r=$("#pic-wall-block .slider"),c=r.width()/r.height(),a=0,u=0,s=new Image,f=function(){a=s.width,u=s.height;var n,f;a&&u&&(c<a/u?(n={width:r.width()+"px"},f="height"):(n={height:r.height()+"px"},f="width"));var p=$("#wallCont").width();"prev"!=i&&"first"!=i||(p=-p),snabbt($("#pic-wall-block .slider img"),{start:function(i,t){i&&(l.attr("src",e),l.attr(n).removeAttr(f))},fromPosition:function(i,n){return i?[p,0,0]:[0,0,0]},position:function(i,n){return i?[0,0,0]:[-p,0,0]},fromRotation:[0,0,0],rotation:[0,2*Math.PI,0],fromScale:function(i,n){return i?[.2,.2]:[1,1]},scale:function(i,n){return i?[1,1]:[.2,.2]},easing:"spring",springConstant:.5,springDeceleration:.7,complete:function(i,l){i&&(o.attr("src",e),o.attr(n).removeAttr(f),t())}})};s.onload=f,s.onerror=f,s.src=e}};var o=new e;Hi.Activity.r("pic",o)}(jQuery);
<?php
if(!empty($_GET['ty'])){
    echo json_encode(['tc'=>rand(10,30),'time'=>time()]);
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>飞友科技2016年会现场消息数统计</title>
<link rel="stylesheet" href="style/style.css" media="screen" type="text/css" />
<style>

@charset "utf-8";/* CSS Document */body, div, dl, dt, dd, ul, ol, li,h1, h2, h3, h4, h5, h6, pre, code,form, fieldset, legend, input, button,textarea, p, blockquote, th, td {margin: 0; padding: 0; }
fieldset, img {border: 0;}
h1, h2, h3, h4, h5, h6 {font-size:12px;}
ol, ul {list-style: none;}
table {border-collapse: collapse;}
body,font{ font-size:12px; color:#666; font-family:"微软雅黑","宋体"; }
a{color:#666;text-decoration:none; outline:none !important; blr:expression(this.onFocus=this.blur());}
a:hover{color:#e50015; cursor:pointer}
img { margin:0; padding:0; border:0; }
body {background: #152442 ;	}
.tj_top{width: 457px; height: 77px;margin: 0 auto; background: url(images/tj_top.png) no-repeat center top; position: relative; z-index: 2;}
.tj_tit{width: 821px; height: 105px;  background: url(images/tj_tit.png) no-repeat center top; margin: 63px auto 42px; position: relative; z-index: 2;}
.tj_foot{width: 100%; height: 900px; position: fixed; left: 0; bottom: 0; background: url(images/foot.jpg) no-repeat center bottom; }
.nums_txt{position: absolute; color: #423424; text-align: center; font-size: 28px;}
.nums_txt span{ font-size: 44px;}
.nums_txt1{left: 295px; top: 132px; width: 180px;}
.nums_txt2{left: 85px; top: 35px; width: 200px;}
.nums_txt3{left: 105px; top:200px; width: 170px;}

/*翻页动画*/
@-webkit-keyframes flipTop {
0% {
-webkit-transform: perspective(400px) rotateX(0deg); }

100% {
-webkit-transform: perspective(400px) rotateX(-90deg); } }

@-webkit-keyframes flipBottom {
0% {
-webkit-transform: perspective(400px) rotateX(90deg); }

100% {
-webkit-transform: perspective(400px) rotateX(0deg); } }

@-moz-keyframes flipTop {
0% {
-moz-transform: perspective(400px) rotateX(0deg); }

100% {
-moz-transform: perspective(400px) rotateX(-90deg); } }

@-moz-keyframes flipBottom {
0% {
-moz-transform: perspective(400px) rotateX(90deg); }

100% {
-moz-transform: perspective(400px) rotateX(0deg); } }

@-ms-keyframes flipTop {
0% {
-ms-transform: perspective(400px) rotateX(0deg); }

100% {
-ms-transform: perspective(400px) rotateX(-90deg); } }

@-ms-keyframes flipBottom {
0% {
-ms-transform: perspective(400px) rotateX(90deg); }

100% {
-ms-transform: perspective(400px) rotateX(0deg); } }

@-keyframes flipTop {
0% {
transform: perspective(400px) rotateX(0deg); }

100% {
transform: perspective(400px) rotateX(-90deg); } }

@-keyframes flipBottom {
0% {
transform: perspective(400px) rotateX(90deg); }

100% {
transform: perspective(400px) rotateX(0deg); } }

.dataStatistics {color: #fedec2;font-family: "Helvetica Neue", Helvetica, sans-serif;font-size: 160px;font-weight: bold;line-height: 170px;height: 170px;  width: 746px; margin: 0 auto;}

.dataStatistics .seperator {vertical-align: top;margin: 0 -20px;display: inline; }
.dataStatistics .seconds,.dataStatistics .minutes,.dataStatistics .hours,.dataStatistics .days {height: 100%;display: inline; }
.dataStatistics .digit_set { float: left;border-radius: 10px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);border: 1px solid #111111;width: 120px;height: 100%;display: inline-block;position: relative;margin: 0 1px; }

.dataStatistics .digit {position: absolute;height: 100%; }
.dataStatistics .digit > div {position: absolute;left: 0;overflow: hidden;height: 50%;width: 90px;padding: 0 15px; }

.dataStatistics .digit > div.digit_top, .dataStatistics .digit > div.shadow_top { width: 120px;background-color: #e38538;border-bottom: 1px solid #e38538;box-sizing: border-box;top: 0;z-index: 0;border-radius: 10px 10px 0 0; }
.dataStatistics .digit > div.digit_top:before, .dataStatistics .digit > div.shadow_top:before {content: "";
height: 100%;width: 100%;position: absolute;left: 0;top: 0; }
.dataStatistics .digit > div.shadow_top {width: 120px;opacity: 0;-webkit-transition: opacity 0.3s ease-in; }
.dataStatistics .digit > div.digit_bottom, .dataStatistics .digit > div.shadow_bottom {background-color: #e38538;bottom: 0;z-index: 0;border-radius: 0 0 10px 10px; }
.dataStatistics .digit > div.digit_bottom .digit_wrap, .dataStatistics .digit > div.shadow_bottom .digit_wrap {display: block;margin-top: -95%; }
.dataStatistics .digit > div.digit_bottom:before, .dataStatistics .digit > div.shadow_bottom:before {content: "";border-radius: 0 0 10px 10px;height: 100%;width: 100%;position: absolute;left: 0;top: 0; }
.digit_wrap{line-height: 170px; display: block; overflow: hidden;}
.dataStatistics .digit > div.shadow_bottom {opacity: 0;-webkit-transition: opacity 0.3s ease-in; }
.dataStatistics .digit.previous .digit_top,.dataStatistics .digit.previous .shadow_top {opacity: 1;z-index: 2;
-webkit-transform-origin: 50% 100%;-webkit-animation: flipTop 0.3s ease-in both;-moz-transform-origin: 50% 100%;-moz-animation: flipTop 0.3s ease-in both;-ms-transform-origin: 50% 100%;-ms-animation: flipTop 0.3s ease-in both; transform-origin: 50% 100%;animation: flipTop 0.3s ease-in both;}
.dataStatistics .digit.previous .digit_bottom,.dataStatistics .digit.previous .shadow_bottom {z-index: 1;opacity: 1; }
.dataStatistics .digit.active .digit_top {z-index: 1; }
.dataStatistics .digit.active .digit_bottom {z-index: 2;-webkit-transform-origin: 50% 0%;-webkit-animation: flipBottom 0.3s 0.3s ease-out both;-moz-transform-origin: 50% 0%;-moz-animation: flipBottom 0.3s 0.3s ease-out both;-ms-transform-origin: 50% 0%;-ms-animation: flipBottom 0.3s 0.3s ease-out both;transform-origin: 50% 0%;animation: flipBottom 0.3s 0.3s ease-out both; }
</style>
</head>
<body>
<div class="tj_top"></div>
<div class="tj_tit"></div>
<div class="dataStatistics">
	<div class="digit_set"></div>
	<div class="digit_set"></div>
	<div class="digit_set"></div>
	<div class="digit_set"></div>
	<div class="digit_set"></div>
	<div class="digit_set set_last"></div>
</div>
<div class="tj_foot"></div>
<script type="text/javascript" src='//cdn.bootcss.com/jquery/3.1.1/jquery.min.js'></script>
<script type="text/javascript">
var nowcount = 1500;
var nowtime='<?= time()?>';
$.fn.dataStatistics = function(options){
		options = $.extend({  
	        min  : 100,       //初始数值
	        max  : 150, //最大数字  
	        time : 60000,  //时长
	        len:6 //数字是几位数
	    },options || {}); 
	    
	    var ths = this;//解决this指向问题
	    
	    //初始化---------------------------------------start
  		
  		var el = ths.find('.set_last');
  		var html = '<div class="digit">' +
						      '  <div class="digit_top">' +
						      '    <span class="digit_wrap"></span>' +
						      '  </div>' +
						      '  <div class="shadow_top"></div>' +
						      '  <div class="digit_bottom">' +
						      '    <span class="digit_wrap"></span>' +
						      '  </div>' +
						      '  <div class="shadow_bottom"></div>' +
						      '</div>'
  		//初始化值
  		var nowNums=zfill(options.min, options.len).toString().split("");
  		
  		//补0
  		function zfill(num, size) {
			    var s = "000000000" + num;
			    return s.substr(s.length-size);
			}

			 ths.find('.digit_set').each(function() {
          for(i=0; i<=9; i++) {
            $(this).append(html);
            currentDigit = $(this).find('.digit')[i];
            $(currentDigit).find('.digit_wrap').append(i);
          }
        });
      
      //初始化数值填入
      $.each(nowNums, function(index,val) {
      	 var set =ths.find('.digit_set').eq(index);
      	 var i =parseInt(val)
      	 set.find('.digit').eq(i).addClass('active');
      	 set.find('.digit').eq(i+1).addClass('previous');
      });
      
      //初始化---------------------------------------end
      
      
      //执行			
			function run(){
				var difference =options.max-options.min;//要执行动画的次数
				
				//每次要执行动画的时间
				var t = options.time/difference;
				
				//后一位数
	  		function increase() {
	  			//执行次数为0时,停止执行
	  			if (difference<1) {
	        	clearInterval(timer1);
	        	return false;
	        	console.info('结束')
	     		}
	  			difference--;
	        console.info(difference);
	  	
	        //翻页动画
	        var current = el.find('.active'),
	        previous = el.find('.previous');
	        previous.removeClass('previous');
	        current.removeClass('active').addClass('previous');
	        
	        if (current.next().length == 0) {
	          el.find('.digit:first-child').addClass('active');
	          var prev = el.prev();
	          prevNumber(prev);
	        } else {
	          current.next().addClass('active');
	        }
	      }
	  		
	  		var timer1 = setInterval(increase,t);
	  		
			}
  		//当数字翻到9的时候，前一位数执行一次动画
  		function prevNumber(ths){
  			var current = ths.find('.active'),
            previous = ths.find('.previous');
        previous.removeClass('previous');
        current.removeClass('active').addClass('previous');
        
        if (current.next().length == 0) {
          ths.find('.digit:first-child').addClass('active');
          var prev = ths.prev();
          if (prev.length>0) {
          	prevNumber(prev);
          }
        } else {
          current.next().addClass('active');
        }
  		}
  		run();
	};
$(document).ready(function(){
    // 从服务器读取消息的计数器
    $.get('./show.php?ty=count&ti='+nowtime,function(data){
        var min = window.nowcount;
        window.nowcount+=data.tc;
        var max = window.nowcount;
        $('.dataStatistics').dataStatistics({min:min,max:max,time:3000,len:6});
    },'json');
});
</script>
</body>
</html>
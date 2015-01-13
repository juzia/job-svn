function postToWb(){
var _t = encodeURI(document.title);
var _url = encodeURI(document.location);
var _appkey = encodeURI("appkey");//你从腾讯获得的appkey
var _pic = encodeURI('');//（列如：var _pic='图片url1|图片url2|图片url3....）
var _site = '';//你的网站地址
var _u = 'http://v.t.qq.com/share/share.php?title='+_t+'&url='+_url+'&appkey='+_appkey+'&site='+_site+'&pic='+_pic;
 
window.open( _u,'转播到腾讯微博', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );
 
}



$('.js-ewm').click(function(){
	if($(this).hasClass('on')) {
		$('.ewm-box').hide();
		$(this).removeClass('on')
	}else {
		$('.ewm-box').show();
		$(this).addClass('on')
	}

});

$(document).ready(function(){

	if($('.carousel').length > 0) {

		$(".carousel-box").jCarouselLite({
		btnNext: ".bt-next",//下一个按钮的选择器
		btnPrev: ".bt-prev",//上一个按钮的选择器
		auto: null,//自动滚动
		speed: 200,//滚动速度
		vertical: false, //垂直滚动
		circular: true, //循环
		visible:1, //显示的个数
		start: 0, //第几个开始
		scroll: 1 //设置滚动的个数
		});

			
	}

});

$('body').delegate('.js-close','click',function(){

	$('.pop-box').hide();
	$('.pop-mask').hide();


})

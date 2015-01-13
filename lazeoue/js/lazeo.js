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



if($('.broadcast-in').length>0){
	(function(){
		$('.broadcast-in').each(function(){
			var _this=$(this),i = 0,w=_this.find('.broadcast-con').width(),speed=50;
			$(this).append($(this).html());
			var bt = setInterval(function(){i--;if((0-i) >= w){i = 0;} _this.css('marginLeft',i);},speed);
			$(this).hover(function(){clearInterval(bt)},function(){bt = setInterval(function(){i--;if((0-i) >= w){i = 0;} _this.css('marginLeft',i);},speed);})
		});
	})();
};


if($('.focus-num').length>0){
	$(".focus-num").tabs(".focus-item", {
			event:'mouseover',
			effect: 'fade',
			fadeOutSpeed: "300",
			rotate: true
		}).slideshow();
		$(".focus-num").data("slideshow").play();
}



$(function() {
	var jsToggleHead='.js-toggle-header';
	var jsToggleBody='.js-toggle-con';
	$(".js-toggle").delegate(jsToggleHead, "click", function() {
	 	var $this=$(this);
		if($this.hasClass('current'))
		{
			$this.next().slideUp();
			$this.removeClass('current');
		}
		else{
			$(jsToggleHead).removeClass('current');
			$(jsToggleBody).slideUp();
			$this.next().slideDown();
			$this.addClass('current');
		}
	});

})


function focusHeight(){
	var fh = $('.carousel-box').width()*420/1920;
	$('ul.banner-list').height(fh);
	$('.carousel .banner-list li').height(fh);
	$('.carousel-box').height(fh)
}
if($('.carousel-box').length) {

	focusHeight();
	$(window).resize(function(){
		focusHeight();
	});
}


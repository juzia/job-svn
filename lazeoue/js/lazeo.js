$(document).ready(function(){

	if($('.carousel').length > 0) {

	$(".carousel-box").jCarouselLite({
	btnNext: ".bt-next",//下一个按钮的选择器
	btnPrev: ".bt-prev",//上一个按钮的选择器
	auto: 2000,//自动滚动
	speed: 500,//滚动速度
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
function isMobile() {
	var userAgentInfo = navigator.userAgent;  
	//console.log(userAgentInfo);
	var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
	var flag = false;  
	for (var v = 0; v < Agents.length; v++) {  
	   if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = true; break; }  
	}
	return flag;  
}

function focusHeight(){
	var fh = $('.carousel-box').width()*420/1920;
	$('ul.banner-list').height(fh);
	$('.carousel .banner-list li').height(fh);
	$('.carousel .banner-list li img').height(fh);
	$('.carousel-box').height(fh)
}

if(!isMobile() ){

if($('.carousel-box').length) {
	focusHeight();
	$(window).resize(function(){
		focusHeight();
	});
}


} else{
	var fh = 180;
	$('ul.banner-list').height(fh);
	$('.carousel .banner-list li').height(fh);
	$('.carousel .banner-list li img').height(fh);
	$('.carousel .banner-list li img').width('auto')
	$('.carousel-box').height(fh)

}





  if($('#ng_scroll').length > 0) {
  		var scrtime;
		$("#ng_scroll").hover(function() {

			clearInterval(scrtime);
		},
		function() {
			scrtime = setInterval(function() {
				var $ul = $("#ng_scroll ul");
				var liHeight = $ul.find("li:first").height();
				$ul.animate({
					marginTop: -liHeight + "px"
				},
				1000, function() {
					$ul.find("li").removeClass('nob');
					$ul.find("li:first").appendTo($ul);
					$ul.find("li:last").hide();
					$ul.css({
						marginTop: 0
					});
					$ul.find("li:last").addClass('nob').fadeIn(1000);
				});
			},
			3000);
		}).trigger("mouseleave");
  	
  }



$('body').on('click','.btn-close',function(){
	$(this).parents('.pop-box').hide();
	$('.mask').hide()


})

$('.ourproject').last().css({'border-bottom':0});

$('.ourproject-list li a').click(function() {

	$('.pop-box').show();
	$('.mask').show();

})


$('#js-menuOpen').click(function(){
	$('.navigation').show();

})


$('#js-menuClose').click(function(){
	$('.navigation').hide()

})

if(isMobile()){
	$('.sub-list').width($('.project-list').width());
	$('.sub-list').hide()
	$('.js-toggle').click(function(){
		var num = Math.ceil( ($(this).parents(".project-list").find(".js-toggle").index($(this))+1) /3);
		$('.js-toggle-con').css({'top':40*num})

	});

	$('.project-list').height(Math.ceil($('.project-list .item1').length/3)*40);
	$('.pro-c1 .pro-box:odd').css({'float':'right'})
	
	$('.mask').click(function(){
		console.log(1)
		$('.pop-box').hide();
		$('.mask').hide()
	})

}








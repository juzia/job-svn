
$('.focus-num a').eq(0).addClass('current').siblings('a').removeClass('current')
var offsetTop = $('.focus-con .item1').offset().top,
screenTop1 = $('.focus-con .item2').offset().top,
screenTop2 = $('.focus-con .item3').offset().top,
screenTop3 = $('.focus-con .item4').offset().top,
screenTop4 = $('.focus-con .item5').offset().top,
screenTop5 = $('.focus-con .item6').offset().top;


var $html = $('html,body'),
timer;
$('html').mousewheel(function(e, delta) { 
		if ($html.is(':animated')) return;
		var scrollTop = $html.scrollTop() || $('body').scrollTop();
		if(delta < 0 ) {
			if(scrollTop >= 0 && scrollTop <= screenTop1-100) {
				$html.animate({scrollTop: screenTop1 -70}, 500);
				$('.focus-num a').eq(1).addClass('current').siblings('a').removeClass('current')
			} else if(scrollTop >= screenTop1- 70 && scrollTop < screenTop2 - 100) {
				$html.animate({scrollTop: screenTop2-70 }, 500);
				$('.focus-num a').eq(2).addClass('current').siblings('a').removeClass('current')
			} else if(scrollTop >= screenTop2 -70  && scrollTop < screenTop3 -100) {
				$html.animate({scrollTop: screenTop3 - 70 }, 500);
				$('.focus-num a').eq(3).addClass('current').siblings('a').removeClass('current')
			} else if(scrollTop >= screenTop3 -70 && scrollTop < screenTop4 -100  ) {
				$('.focus-num a').eq(4).addClass('current').siblings('a').removeClass('current')
				$html.animate({scrollTop: screenTop4 -70 }, 500);
			} else if(scrollTop >=screenTop4 -70 && scrollTop < screenTop5 -100  ) {
				$('.focus-num a').eq(5).addClass('current').siblings('a').removeClass('current')
				$html.animate({scrollTop: screenTop5 -70 }, 500);
			} 
		} else{ 
			if(scrollTop < screenTop1 ) {
				$html.animate({scrollTop: 0 }, 500);
				$('.focus-num a').eq(0).addClass('current').siblings('a').removeClass('current')
			} else if(scrollTop > screenTop1  && scrollTop < screenTop2 -30  ) {
				$('.focus-num a').eq(0).addClass('current').siblings('a').removeClass('current')
				$html.animate({scrollTop: screenTop1 -70 }, 500);
				$('.focus-num a').eq(1).addClass('current').siblings('a').removeClass('current')
			} else if(scrollTop >= screenTop2 && scrollTop < screenTop3  ) {
				$html.animate({scrollTop: screenTop2 -70 }, 500);
				$('.focus-num a').eq(2).addClass('current').siblings('a').removeClass('current')
			} else if(scrollTop >= screenTop3 && scrollTop < screenTop4 ) {
				$html.animate({scrollTop: screenTop3- 70 }, 500);
				$('.focus-num a').eq(3).addClass('current').siblings('a').removeClass('current')
			} else if(scrollTop >= screenTop4  && scrollTop < screenTop5 ) {
				$html.animate({scrollTop: screenTop4-70 }, 500);
				$('.focus-num a').eq(4).addClass('current').siblings('a').removeClass('current')
			} 
		}
});  


$('.focus-num a').click(function(event) {
		var i = $(this).data('num');
		var topheight = $('.focus-con .focus-item').eq(i-1) ;
		offset1 =topheight.offset().top;
		$html.animate({scrollTop: offset1 - 70 }, 500);
		$(this).addClass('current').siblings('a').removeClass('current')

});


$(window).scroll(function(event) {
	var scrollTop = $('html').scrollTop() || $('body').scrollTop();
		
		if(scrollTop >= 0 && scrollTop <= screenTop1-100) {
			$('.focus-num a').eq(0).addClass('current').siblings('a').removeClass('current')
		} else if(scrollTop >= screenTop1- 70 && scrollTop < screenTop2 - 100) {
			$('.focus-num a').eq(1).addClass('current').siblings('a').removeClass('current')
		} else if(scrollTop >= screenTop2 -70  && scrollTop < screenTop3 -100) {
			$('.focus-num a').eq(2).addClass('current').siblings('a').removeClass('current')
		} else if(scrollTop >= screenTop3 -70 && scrollTop < screenTop4 -100  ) {
			$('.focus-num a').eq(3).addClass('current').siblings('a').removeClass('current')
		} else if(scrollTop >=screenTop4 -70 && scrollTop < screenTop5 -100  ) {
			$('.focus-num a').eq(4).addClass('current').siblings('a').removeClass('current')
		} else if(scrollTop >= screenTop5 -100) {
			$('.focus-num a').eq(5).addClass('current').siblings('a').removeClass('current')
		}
}); 
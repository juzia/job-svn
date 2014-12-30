
if($('.focus-num').length>0){
	$(".focus-num").tabs(".focus-item", {
			event:'mouseover',
			effect: 'fade',
			fadeOutSpeed: "300",
			rotate: true
		}).slideshow();
		$(".focus-num").data("slideshow").play();
}



$(".js-tab").each(function(){
		$(".gb-tab:eq(0)",$(this)).tabs($(".gb-tab-pn:eq(0) > div",$(this)),{event:'mouseover'});
	});	

if($('.query-list').length ){
	$('.query-list li').hover(function(){
		$(this).addClass('current')
	},function(){

		$(this).removeClass('current')

	})


}
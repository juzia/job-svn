


if($('.focus-num').length>0){
  $(".focus-num").tabs(".focus-item", {
      event:'mouseover',
      effect: 'fade',
      fadeOutSpeed: "300",
      rotate: true
    }).slideshow();
    $(".focus-num").data("slideshow").play();
}


if($('.js-rank').length >0) {

	for(var i = 0; i<5; i++) {

		$('.js-rank li').eq(i).find('em').text(i+1)
	}
}


$(".js-tab").each(function(){
    $(".gb-tab:eq(0)",$(this)).tabs($(".gb-tab-pn:eq(0) > div",$(this)),{event:'mouseover'});
  }); 


$('.menu-list li a').eq(0).css({'border-left': 0})
$('.menu-list li a').last().css({'border-right': 0})
$('#setHomePage').click(function () {
  if (!window.ActiveXObject) {
    alert("\u8bf7\u62d6\u52a8\u672c\u7f51\u7ad9\u5730\u5740\u65c1\u8fb9\u7684\u5c0f\u56fe\u6807\u5230\u4e3b\u9875\u6309\u94ae");
  } else {
    document.body.style.behavior = 'url(#default#homepage)';
    document.body.setHomePage(window.location.href);
  }
});


$('#addBookMark').click(function () {
  if (!window.ActiveXObject) {
    alert("\u8bf7\u6309\u0043\u0074\u0072\u006c\u002b\u0044\u5c06\u672c\u9875\u6dfb\u52a0\u5230\u6536\u85cf\u5939");
  } else {
    try{
      var url = window.location.href;
      var title = window.title;
      window.external.addFavorite(url, title);
    } catch (e) {
      alert("\u8bf7\u6309\u0043\u0074\u0072\u006c\u002b\u0044\u5c06\u672c\u9875\u6dfb\u52a0\u5230\u6536\u85cf\u5939");
    }
  }
});


if($('.js-rank').length >0) {

	for(var i = 0; i<5; i++) {

		$('.js-rank li').eq(i).find('em').text(i+1)
	}
}
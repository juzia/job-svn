$('.btn-menu').click(function(event) {

  if( $(this).hasClass('on')) {
    $('.menu-list').hide();
    $(this).removeClass('on')

  } else {
    $('.menu-list').show();
    $(this).addClass('on')
  }
  
});
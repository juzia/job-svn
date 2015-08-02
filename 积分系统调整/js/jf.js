
		$('.prize-list tr:last').addClass('last')
		if($('.page1').height() < $(window).height()) {
					$('.page1').height($(window).height())


		}


		$('body').on('click','.btn-sure' ,function(){

			$(this).parents('.pop-box').hide();
			$('.mask').hide();

		})
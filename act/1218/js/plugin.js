// slide
(function($){$.fn.ueLevelGapSlide=function(N){var A=jQuery.extend({gsProductScrollWitch:"ul",gsList:"ul > li",gsStep:1,gsColumn:1,speed:"normal",timer:3000,orientation:"right",gsBtnLeft:"#left",gsBtnRight:"#right",gsBugD1Width:0},N),C=A.gsProductScrollWitch,Q=A.gsList,V=A.gsStep,a=A.gsColumn,P=A.speed,H=A.timer,O=A.orientation,_=$(A.gsBtnLeft),X=$(A.gsBtnRight),b=A.gsBugD1Width,c=$(this),R=c.selector,D=c,E=D.find(C),F=D.find(Q),K=D.width();if(b!=0)K=b;else if(K==0)alert("Err:d1Width==0");var B=F.size(),L=B*3,I=K/a,Z=V*I,T=I*B,U=T*3;if(T<K)return false;for(var W=0;W<B;W++){F.eq(W).clone(true).appendTo(E);F.eq(B-1-W).clone(true).prependTo(E)}E.width(U+100);D.animate({scrollLeft:T},P);var Y=true,J=function($){if(!Y)return false;Y=false;D.animate({scrollLeft:D.scrollLeft()+Z},P,function(){for(W=1;W<=V;W++)E.children().eq(0).appendTo(E);D.scrollLeft(T);Y=true});O="left";return false},M=function($){if(!Y)return false;Y=false;D.scrollLeft(T);D.animate({scrollLeft:D.scrollLeft()-Z},P,function(){for(W=1;W<=V;W++)E.children().eq(L-1).prependTo(E);D.scrollLeft(T);Y=true});O="right";return false},S,d=function(){switch(O){case"left":S=window.setInterval(J,H);break;case"right":S=window.setInterval(M,H);break}return false},G=function(){window.clearInterval(S);return false};$(document).ready(d);c.hover(G,d);_.click(J);_.hover(G,d);X.click(M);X.hover(G,d);return false}})(jQuery);
/* jquery.simpleTabs */
(function($){$.fn.simpleTabs=function(F){var A={current:"now",action:"mouseover",target:"",easing:"toggle",direction:"left",autoPlay:0,speed:3000,time:400,btnPrev:"",btnNext:""},N=this,R=$.fn.extend({},A,F),K=R.current,M=R.action,P=$(R.target),B=R.easing,E=R.direction,O=R.autoPlay,D=R.speed,J=R.time,H=$(R.btnPrev),S=$(R.btnNext),G="",_=P.length,C="",I=0,L=null;if(B=="slide"){if(E=="left"){C="width";G=P.eq(0).outerWidth(true)}else{C="height";G=P.eq(0).outerHeight(true)}}else{$(N).eq(0).addClass(K).siblings().removeClass(K);P.hide().eq(0).show()}S.click(function(){I=N.parent().children(".now").index();I++;if(I>=_)I=0;setTimeout(Q,200)});H.click(function(){I=N.parent().children(".now").index();I--;if(I<0)I=_-1;setTimeout(Q,200)});function Q(){N.eq(I).addClass(K).siblings().removeClass(K);if(B=="fade")P.hide().eq(I).fadeIn(J);else if(B=="slide"){P.parent("ul").css(C,G*_);if(E=="left")P.parent().animate({"left":-I*G},J);else P.parent().animate({"top":-I*G},J)}else if(B=="toggle")P.hide().eq(I).show();else alert("sorry, without this parameter!\ndefaults:toggle | slide | fade")}N.mouseover(function(){clearInterval(L)}).mouseout(function(){if(O)L=setInterval(function(){I++;if(I>=_)I=0;Q()},D)});if(O)L=setInterval(function(){I++;if(I>=_)I=0;Q()},D);return this.each(function(_){$(this).bind(M,function(){clearInterval(L);I=_;setTimeout(Q,200)})})};$.fn.simpleTabs.version="2.0"})(jQuery);

//\u5f39\u5c42
function openPop(popid){
	closePop();
	var pop=$(popid);
	var l=($(window).width()-pop.outerWidth())/2;
	var t=($(window).height()-pop.outerHeight())/2;
	t=(t<0?0:t)+$(window).scrollTop();
	pop.css({left:l,top:t}).show();
	$("#cover").css({left:0,width:$(document).width(),height:$(document).height()+30});
}
function closePop(){
	$(".pop,#vd_ct").hide();
	$("#cover").css({left:-9999,height:0});
}

$(document).ready(function(e) {
	$(".img-vd img").each(function(){
		$(this).click(function(){
			var video_src=$(this).parent().attr("data-video");
			$("#vd_con").html('<embed src="'+video_src+'" allowfullscreen="true" quality="high" wmode="transparent" width="800" height="500" align="middle" allowscriptaccess="always" type="application/x-shockwave-flash"></embed>');
			openPop("#vd_ct");
		});
	});
	
	$(".btn-closepop").click(function(){
		closePop();	
	});
});
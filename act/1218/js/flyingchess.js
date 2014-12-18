
function layerShow(){
//	$('.mask').show();
//	$('.box-layer').show();
//	alert("到达终点");
//	openPop('#pop_choose2');
	window.open("http://www.yy-wan.com/adforward/23037.html");
	isRolling = false;
}
function layerHide(){
	$('.mask').fadeOut();
	$('.box-layer').fadeOut();
}

var cur = -1;
var count = 0;
var arr = [
	{x:160,y:8,info:'pop'},//京东100元卡
	{x:322,y:8,info:'pop'},//ipadmin
	{x:485,y:8,info:'pop'},//雷蛇游戏键鼠套装	
	{x:487,y:105,info:'pop'},//京东50元卡
	{x:485,y:208,info:'text'},//谢谢
	{x:485,y:317,info:'pop'},//京东100元卡
	{x:322,y:316,info:'pop'},//耳机

	{x:160,y:316,info:'pop'},//5雷蛇游戏键鼠套装
	{x:0,y:316,info:'text'},//谢谢


	{x:0,y:213,info:'pop'},//6耳机
	{x:0,y:105,info:'pop'},//京东50元卡
	// {x:0,y:105,info:'text'},//7



	// {x:739,y:485,info:'pop'},//泳装
	// {x:622,y:485,info:'text'},//8
	// {x:502,y:485,info:'pop'},//耳麦
	// {x:382,y:485,info:'text'},//9
	// {x:264,y:485,info:'pop'},//机票
	// {x:144,y:485,info:'text'},//10
	// {x:7,y:485,info:'text'},//11
	// {x:7,y:380,info:'pop'},//大床房
	// {x:7,y:282,info:'text'},//12
	// {x:7,y:189,info:'pop'},//京东100元卡
	// {x:7,y:100,info:'text'},//13
	// {x:7,y:8,info:'final'}//1
];
var aniArr = [];

function random () {
    return Math.round(Math.random()*5)+1;
}

function aniDQ () {
    $('.move').dequeue('aniDQ');
}


function gogogo(step){
	moving(step);
}

function backShow(_backnum){//后退
	gogogo(_backnum);
    //layerShow();
	isRolling = false;
}

function gofinal(){
	layerShow();
    moving(arr.length-cur);
}


function goStart(){//回到起点
	$('.move').fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300,function(){
		$('.move').css({'left':'126px','top':'108px'});
	})
	cur = -1;
	count = 0;
}

function showText(c){//显示文案
	closeText();
	var l=($(window).width()-$("#pop").outerWidth())/2;
	var t=($(window).height()-$("#pop").outerHeight())/2;
	t=(t<0?0:t)+$(window).scrollTop();
//	$("#pop .content").html('<h5>'+gameHistory[c].title+'</h5><p>'+gameHistory[c].content+'</p>');
//	$("#cover").css({left:0,width:$(document).width(),height:$(document).height()+30});
//	$("#pop").css({left:l,top:t}).show();
	isRolling = false;


}

function closeText(){
	$("#pop").hide();
	$("#cover").css({left:-9999,height:0});
}

function showWin(c){
	isRolling = false;
	
	switch(c){
		case 0:
			checkAnswer(1);
			//console.log('抽奖'+c);
			break;
		case 2:
			checkAnswer(1);
			//console.log('抽奖'+c);
			break;
		case 4:
			checkAnswer(1);
			//console.log('抽奖'+c);
			break;
		case 6:
			checkAnswer(1);
			//console.log('抽奖'+c);
			break;
		case 8:
			checkAnswer(1);
			//console.log('抽奖'+c);
			break;
		case 10:
			checkAnswer(1);
			//console.log('抽奖'+c);
			break;
		case 12:
			checkAnswer(1);
			//console.log('抽奖'+c);
			break;
		case 16:
			checkAnswer(1);
			//console.log('抽奖'+c);
			break;
		case 19:
			checkAnswer(1);
			//console.log('抽奖'+c);
			break;
		case 21:
			checkAnswer(1);
			//console.log('抽奖'+c);
			break;

	}
}


function moving (r) {
 if (r>=0) {
        count++;
    }else{
        count--;
    }

    var c = cur+count;
        c = c >= arr.length?(arr.length-1):c;
    $('.move').animate({left: arr[c].x , top: arr[c].y },600,function(){       
        if(count != r){
            moving(r);
        }else if(count==r){                        
            count = 0;
            cur += r;
            cur = cur >= arr.length?(arr.length-1):cur;
            switch(arr[c].info){
                case 'pop': //抽奖
					if(arguments[0]) return false;
                	showWin(c);
                    break;
				case 'text':
                	showText(c);
					//$('#backwin .btn_layer, .btn-close, .box-layer').unbind('click');//不让关闭窗口			
                    break;	

                case 'final':
                	layerShow();
					//$('#backwin .btn_layer, .btn-close, .box-layer').unbind('click');//不让关闭窗口					
                    //moving(arr.length-cur);
                    break;
                case 'back':
                	backShow(arr[c].step);
                    break;
				case 'gostart':
					goStart();
                    break;
				default:
					isRolling = false;
					break;
            }
        }
    });       
}
var startRolling, isRolling = false;
var stopRolling = function () {
	$('.touzi').removeClass('rolling')
	rollResult();
}


function rollResult () {
	aniArr = [];
    var throwNum = random () ;
	$('.touzi').addClass('touzi-'+throwNum );
	$('.random-num').html(throwNum);
	moving(throwNum);
	clearTimeout(startRolling)
}

$(document).ready(function(){
	(function(){
		$('.box-num').click(function(event) {
			if(cur==-1){//回到起点时            		
				isRolling = false;
			}
			if(isRolling|| cur==23){//投骰子过程中，或者已到达终点，不让再点骰子
				return false;
			}else{
				layerHide();
				if(!$(".move").is(":animated")){
					isRolling = true;
					$('.touzi').removeClass('touzi-1').removeClass('touzi-2').removeClass('touzi-3').removeClass('touzi-4').removeClass('touzi-5').removeClass('touzi-6');
					$('.touzi').addClass('rolling');
					startRolling=setTimeout(stopRolling,1000)
					//rollResult()
				 }
			 }
		});
	})();       


})

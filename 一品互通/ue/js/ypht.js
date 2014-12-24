function postToWb(){
var _t = encodeURI(document.title);
var _url = encodeURI(document.location);
var _appkey = encodeURI("appkey");//你从腾讯获得的appkey
var _pic = encodeURI('');//（列如：var _pic='图片url1|图片url2|图片url3....）
var _site = '';//你的网站地址
var _u = 'http://v.t.qq.com/share/share.php?title='+_t+'&url='+_url+'&appkey='+_appkey+'&site='+_site+'&pic='+_pic;
 
window.open( _u,'转播到腾讯微博', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );
 
}
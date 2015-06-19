  $(document).ready(function(){
    $(".carousel-box").jCarouselLite({
    btnNext: ".bt-next",//下一个按钮的选择器
    btnPrev: ".bt-prev",//上一个按钮的选择器
    auto: null,//自动滚动
    speed: 200,//滚动速度
    vertical: false, //垂直滚动
    circular: true, //循环
    visible:1, //显示的个数
    start: 0, //第几个开始
    scroll: 1 //设置滚动的个数
    });
  });

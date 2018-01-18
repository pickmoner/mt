/* 首页屏幕自适应 */
$(window).resize(function(){
    WinResize();
    var winwid=$(window).width();
    $(".housetit").css({'width':winwid-60+'px'})
})
$(function(){
    WinResize();
})
function WinResize(){
    if($(window).height()<701){
        $('.warp').css('margin-top','0');
        $('.warp').css('top','0');
    }else{
        $('.warp').css('margin-top','-350px');
        $('.warp').css('top','50%');
    };
}
/* 弹框显示隐藏 弹框自适应 */
function PopHide(obj){
    $(obj).hide();
    $(obj).children('.PopDiv').removeAttr("style");
    $(".winpop .close").removeAttr("style");
    $(".BackTop").fadeOut();
}
function PopShow(obj){
    $(obj).fadeIn();
    var winhei=$(window).height();
    var boxwidth=$(obj).children('.PopDiv').width();
    var boxheight=$(obj).children('.PopDiv').height();
    if(boxheight>winhei){
        $(obj).children('.PopDiv').css({ 'width': boxwidth, 'top': '2%', 'margin-left': -boxwidth / 2, 'height': '96%', 'overflow-x': 'hidden', 'overflow-y': 'auto' });
        $(".BackTop").fadeIn();
    }else{
        $(obj).children('.PopDiv').css({ 'width': boxwidth, 'margin-top': -boxheight / 2, 'margin-left': -boxwidth / 2 });
    }
}
function PopShow1(obj){
    $(obj).fadeIn();
    var boxwidth=$(obj).children('.PopDiv').width();
    $(obj).children('.PopDiv').css({ 'width': boxwidth, 'margin-left': -boxwidth / 2 });
    $(".BackTop").fadeIn();
    $(".winpop .close").css({'position':'fixed'});
}
$(function(){
    /* 户型图切换 */
    $(".TabTit p").click(function(){
        $(this).addClass("cur").siblings().removeClass("cur");
        var index=$(this).parent().children("p").index(this);
        $(this).parent().next().children(".box").eq(index).show().siblings().hide();
    })
    /* 滚动条返回顶部 */
    $(".BackTop").click(function(){
        $(".PopDiv").animate({scrollTop:0},800);
        $("html,body").animate({scrollTop:0},800);
    })
    $(window).bind("scroll",function(){
        var bodytop=document.documentElement.scrollTop||$("body").scrollTop();
        var winwid=$(window).width();
        // $(".titbox a").html(winwid)
        if(bodytop>180){
            $(".BackTop").fadeIn();
            $(".housetit").css({'position':'fixed','top':'0','left':'0','width':winwid-60+'px','padding':'0 30px'})
        }else{
            $(".BackTop").fadeOut();
            $(".housetit").css({'position':'relative','top':'auto','left':'auto','width':'100%','padding':'0 30px 0 0'})
        }
    });
});
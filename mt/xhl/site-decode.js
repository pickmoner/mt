var tid = 309;
var ajaxdomainurl = "/xhl/2017/buyhousetest1217zxcv3452/webserver/parkingserver.aspx";
var ajaxdomainurl2 = "http://cache.juzhen.co/cacheserver.ashx";
var OrderType = 0;
captchaId1 = "9ae903e15c784c5999981d7f45e52afa";
captchaId2 = "9ae903e15c784c5999981d7f45e52afa";
captchaId3 = "9ae903e15c784c5999981d7f45e52afa";
var ischeckloginstate = 1;
var actjieduaninfo1 = "公测";
var actjieduaninfo2 = "认购";
var spidcard = "";
var kongcenginfo = "--";
var Housestate1 = "可售";
var Housestate2 = "认购中";
var Housestate3 = "已认购";
var sendpwdmsgtishi = "密码已发送！如5分钟后仍未收到请重新点击此按钮！首次登录密码为身份证后六位。";
var isshowprice = 1;
var ischecklogin = 0;
var ischeckinfo = 1;
var ischecklockhouse = 1;
var ischeckinfobymatrix = 1;
function showloading() {
    PopShow("#public1");
    $("#public1 h3").html('正在排队请求中...请稍候！');
    $("#public1 .popbox").append('<img src="load.gif.undefined"/*undefined=undefined://undefined.undefined.undefined/undefined/undefined/undefined/undefined/images/load.gif*//>');
    $("#public1 .close").hide();
    $(".popbtn").hide()
}
function closeloading(isclose) {
    if (isclose == 1) {
        PopHide('#public1')
    }
    $("#public1 .close").show();
    $("#public1 .popbox img").remove();
    $(".popbtn").show()
}
function version() {
    try {
        var browser = navigator.appName;
        var b_version = navigator.appVersion;
        var version = b_version.split(";");
        var trim_Version = version[1].replace(/[ ]/g, "");
        if (browser == "Microsoft Internet Explorer") {
            if (trim_Version == "MSIE6.0" || trim_Version == "MSIE7.0" || trim_Version == "MSIE8.0") {
                window.location = "/IEUpdate.html"
            }
        }
    } catch(e) {}
}
version();
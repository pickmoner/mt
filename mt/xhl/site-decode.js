var tid = 309;
var ajaxdomainurl = "/xhl/2017/buyhousetest1217zxcv3452/webserver/parkingserver.aspx";
var ajaxdomainurl2 = "http://cache.juzhen.co/cacheserver.ashx";
var OrderType = 0;
captchaId1 = "9ae903e15c784c5999981d7f45e52afa";
captchaId2 = "9ae903e15c784c5999981d7f45e52afa";
captchaId3 = "9ae903e15c784c5999981d7f45e52afa";
var ischeckloginstate = 1;
var actjieduaninfo1 = "����";
var actjieduaninfo2 = "�Ϲ�";
var spidcard = "";
var kongcenginfo = "--";
var Housestate1 = "����";
var Housestate2 = "�Ϲ���";
var Housestate3 = "���Ϲ�";
var sendpwdmsgtishi = "�����ѷ��ͣ���5���Ӻ���δ�յ������µ���˰�ť���״ε�¼����Ϊ���֤����λ��";
var isshowprice = 1;
var ischecklogin = 0;
var ischeckinfo = 1;
var ischecklockhouse = 1;
var ischeckinfobymatrix = 1;
function showloading() {
    PopShow("#public1");
    $("#public1 h3").html('�����Ŷ�������...���Ժ�');
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
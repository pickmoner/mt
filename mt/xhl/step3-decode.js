$(document).ready(function() {
    showloading();
    parklogininfo();
    getcheweicount()
});
var fenbutemplete = '<li style="width:540px;"><p>��Դ������<font class="totalnum"></font>��</p><p>���ۣ�<font class="shennum"></font>��</p><p>���ۣ�<font class="yishounum"></font>��</p><a href="house1.shtml">11��¥</a></li>';
function getcheweicount() {
    var parm = "type=getcheweicount";
    AjaxHelp.getdata({
        pdebug: false,
        async: true,
        pajaxurl: ajaxdomainurl,
        Parm: parm
    },
    function(statuback) {
        if (statuback.state == "-99") {
            setTimeout(getcheweicount, 2000);
            return
        }
        closeloading(1);
        if (statuback.length < 1) {
            return
        }
        var totalnumhtml = "";
        var yishouhtml = "";
        var shennumhtml = "";
        var totalnum = 0;
        var yishounum = 0;
        var shennumlnum = 0;
        var totalnum1 = 0;
        var yishounum1 = 0;
        var shennumlnum1 = 0;
        if (statuback.state == "-11") {
            alert(statuback.info);
            window.location = 'index.shtml';
            return
        }
        if (statuback.state == "-1") {
            alert("�Բ���" + actjieduan + "��δ��ʼ���Ժ�");
            window.location = 'index.shtml';
            return
        }
        if (statuback.state == "-2") {
            alert("�Բ���" + actjieduan + "�ѽ�������л���Ĺ�ע��");
            window.location = 'index.shtml';
            return
        }
        $(".houselist ul").html('');
        var html1 = "";
        var html2 = "";
        for (var i = 0; i < statuback.length; i++) {
            var loudong = "";
            totalnum = parseInt(unescape(statuback[i].totalnum));
            yishounum = parseInt(unescape(statuback[i].totalnum) - unescape(statuback[i].shennum));
            shennumlnum = parseInt(unescape(statuback[i].shennum));
            totalnum1 += totalnum;
            yishounum1 += yishounum;
            shennumlnum1 += shennumlnum;
            html1 += '<li ><p>��Դ������<font class="totalnum">' + totalnum + '</font>��</p><p>���ۣ�<font class="shennum">' + shennumlnum + '</font>��</p><p>���ۣ�<font class="yishounum">' + yishounum + '</font>��</p><a href="house' + statuback[i].area + statuback[i].url + '.shtml">' + statuback[i].areaname2 + '</a></li>'
        }
        $(".houselist ul").append(html1);
        $("#totalcount").html(totalnum1);
        $("#shengcount").html(shennumlnum1);
        $("#yishoucount").html(yishounum1)
    })
}
function parklogininfo() {
    var parm = "Type=getlogininfo";
    AjaxHelp.getdata({
        pdebug: false,
        async: true,
        pajaxurl: ajaxdomainurl,
        Parm: parm
    },
    function(json) {
        if (json.state == '1') {
            if (json.isfull == "1") {
                alert('���Ѵﵽѡ������,�����ٴν���');
                window.location = "index.shtml"
            } else {
                $('#useridcard').html(json.useridcard);
                $('#username').html(json.username);
                var userhousenums = json.userhousenum.split('��');
                var htmls = "";
                for (var i = 0; i < userhousenums.length; i++) {
                    htmls += '<option value="' + userhousenums[i] + '">' + userhousenums[i] + '</option>'
                }
                $('#userhousenum').html(htmls)
            }
            getloginstate()
        } else {
            clearInterval(timerloginstate);
            window.location = "index.shtml"
        }
    })
}
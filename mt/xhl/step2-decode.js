$(document).ready(function() {
    parklogininfo();
    $("#tbcode").focus()
});
function parklogininfo() {
    showloading();
    var parm = "Type=getlogininfo";
    AjaxHelp.getdata({
        pdebug: false,
        async: true,
        pajaxurl: ajaxdomainurl,
        Parm: parm
    },
    function(json) {
        closeloading(1);
        if (json.state == '1') {
            if (json.isfull == "1") {
                alert('���Ѵﵽѡ������,�����ٴν���');
                window.location = "index.shtml"
            } else {
                if (ischeckinfobymatrix == 1) {
                    getcode();
                    $("#tbcode").val('');
                    $("#imgcode").click(function() {
                        getcode();
                        $("#tbcode").val('')
                    })
                }
                $('#useridcard').html(json.useridcard);
                $('#username').html(json.username);
                $('#userphone').html(json.userphone);
                $('#zhiyeguwen').html(json.zhiyeguwen);
                var userhousenums = json.userhousenum.split('��');
                var htmls = "";
                for (var i = 0; i < userhousenums.length; i++) {
                    htmls += '<option value="' + userhousenums[i] + '">' + userhousenums[i] + '</option>'
                }
                $('#userhousenum').html(htmls)
            }
            getloginstate()
        } else {
            window.location = "index.shtml"
        }
    })
}
function getcode() {
    var parm = "v=" + Math.random() * 100000;
    AjaxHelp.getdata({
        pdebug: false,
        pajaxurl: "webserver/ValidCode.aspx",
        Parm: parm,
        responsedataType: "txt"
    },
    function(data) {
        $("#imgcode").html('<img id="imgcode" alt="" src="' + data + '" />')
    })
}
function ischeckmyinfo() {
    quereninfo($("#tbcode").val())
}
function quereninfo(validate) {
    PopHide('#public2');
    if (starstate == 0) {
        PopShow("#public1");
        $("#public1 h3").html("" + actjieduan + "��δ��ʼ�������ĵȴ���");
        return
    }
    if (starstate == -1) {
        PopShow("#public1");
        $("#public1 h3").html("�Բ���" + actjieduan + "�ѽ�����</br>��л���Ĺ�ע��");
        return
    }
    showloading();
    var parm = "type=housenum" + "&userhousenum=" + escape($("#userhousenum").val());
    AjaxHelp.getdata({
        pdebug: false,
        async: true,
        pajaxurl: ajaxdomainurl,
        Parm: parm
    },
    function(data) {
        closeloading(1);
        if (data.state == "1") {
            var parm2 = "Type=step3" + "&NECaptchaValidate=" + validate;
            AjaxHelp.getdata({
                pdebug: false,
                async: true,
                pajaxurl: ajaxdomainurl,
                Parm: parm2
            },
            function(json) {
                if (json.state == "1") {
                    window.location = json.info
                } else {
                    getcode();
                    $("#tbcode").val('');
                    alert(json.info)
                }
            })
        } else {
            PopShow("#public1");
            $("#public1 h3").html(data.info);
            return
        }
    })
}
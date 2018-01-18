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
                alert('您已达到选房上限,无需再次进入');
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
                var userhousenums = json.userhousenum.split('、');
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
        $("#public1 h3").html("" + actjieduan + "暂未开始！请耐心等待！");
        return
    }
    if (starstate == -1) {
        PopShow("#public1");
        $("#public1 h3").html("对不起，" + actjieduan + "已结束！</br>感谢您的关注！");
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
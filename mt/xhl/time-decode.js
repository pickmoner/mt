var starstate = 0;
var startimes = "";
var endtimes = "";
var nowtime = "";
var disTime;
var disTime2;
var localTime;
var timecount = 0;
var beforenum = 0;
var afternum = 0;
var timerloginstate = null;
var actjieduan = "";
var actjieduanvalue = 1;
var timer = null;
var siteinfo = "";
$(document).ready(function()
{
	getactjieduan();
	siteinfo = getstartandend();
	startimes = siteinfo.starttime.split(',');
	endtimes = siteinfo.endtime.split(',');
	nowtime = getnowtime().split(',');
	disTime = new Date(startimes[0], startimes[1] - 1, startimes[2], startimes[3], startimes[4], startimes[5]).getTime();
	disTime2 = new Date(endtimes[0], endtimes[1] - 1, endtimes[2], endtimes[3], endtimes[4], endtimes[5]).getTime();
	localTime = new Date(nowtime[0], nowtime[1] - 1, nowtime[2], nowtime[3], nowtime[4], nowtime[5]).getTime();
	cutDown();
	timer = setInterval(cutDown, 1000)
});
function cutDown()
{
	localTime = localTime + 1000;
	if (localTime < disTime)
	{
		timecount = disTime - localTime;
		$("#spantimemsg").html("��" + actjieduan + "��ʼ��");
		$(".tishitime").html("��" + actjieduan + "��ʼ��");
		$(".buying").hide();
		$(".hand").hide();
		$(".nobuying").show();
		$(".nobuying").html('�δ��ʼ');
		starstate = 0;
		$(".example8").unbind("click").click(function()
		{
			PopShow("#public1");
			if (islogin == 1)
			{
				$("#public1 h3").html("" + actjieduan + "��δ��ʼ�������ĵȴ���")
			} else
			{
				$("#public1 h3").html("����û�е�¼�����¼�����ԣ�<a href=\"javascript:PopShow('.loginpop');PopHide('#public1');\">[������¼]</a>")
			}
		});
		if (window.location.href.indexOf("/step") > -1 || window.location.href.indexOf("/house") > -1)
		{
			window.location = "index.shtml"
		}
		beforenum++;
		if (beforenum >= 60)
		{
			nowtime = getnowtime().split(',');
			localTime = new Date(nowtime[0], nowtime[1] - 1, nowtime[2], nowtime[3], nowtime[4], nowtime[5]).getTime();
			beforenum = 0
		}
	} else
	{
		timecount = disTime2 - localTime;
		$("#spantimemsg").html("��" + actjieduan + "������");
		$(".tishitime").html("��" + actjieduan + "������");
		starstate = 1;
		$(".example8").unbind("click").click(function()
		{
			if (islogin == 1)
			{
				getnextstep()
			} else
			{
				PopShow("#public1");
				$("#public1 h3").html("����û�е�¼�����¼�����ԣ�<a href=\"javascript:PopShow('.loginpop');PopHide('#public1');\">[������¼]</a>")
			}
		});
		$(".buying").show();
		$(".hand").show();
		$(".nobuying").hide();
		$(".buying").html('��ʼ����');
		afternum++;
		if (afternum >= 60)
		{
			nowtime = getnowtime().split(',');
			localTime = new Date(nowtime[0], nowtime[1] - 1, nowtime[2], nowtime[3], nowtime[4], nowtime[5]).getTime();
			afternum = 0
		}
	}
	if (timecount <= 0)
	{
		clearInterval(timer);
		starstate = -1;
		$(".buying").hide();
		$(".hand").hide();
		$(".nobuying").show();
		$(".nobuying").html('��ѽ���');
		$('#spantimemsg').text("����" + actjieduan + "�ѽ���");
		$(".tishitime").html("����" + actjieduan + "�ѽ���");
		$(".example8").unbind("click").click(function()
		{
			PopShow("#public1");
			$("#public1 h3").html("����" + actjieduan + "�ѽ�����лл���Ĳ��룡")
		});
		$('.day').html('00');
		$('.houer').html('00');
		$('.minutes').html('00');
		$('.seconds').html('00');
		if (window.location.href.indexOf("/step") > -1 || window.location.href.indexOf("/house") > -1)
		{
			window.location = "index.shtml"
		}
		return false
	}
	;
	var day = Math.floor(timecount / (24 * 60 * 60 * 1000));
	var hour = Math.floor(timecount / (60 * 60 * 1000) - day * 24);
	var minute = Math.floor(timecount / (60 * 1000) - day * 24 * 60 - hour * 60);
	var seconds = Math.floor(timecount / 1000 - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60);
	$('.day').html(toDouble(parseInt(day)));
	$('.houer').html(toDouble(parseInt(hour)));
	$('.minutes').html(toDouble(minute));
	$('.seconds').html(toDouble(seconds))
};
function getnextstep()
{
	var parm = "type=getstep1";
	AjaxHelp.getdata(
	{
		pdebug : false,
		pajaxurl : ajaxdomainurl,
		Parm : parm
	}, function(data)
	{
		if (data.state == 1)
		{
			window.location = data.info
		} else
		{
			PopShow("#public1");
			$("#public1 h3").html(data.info)
		}
	})
}
function getactjieduan()
{
	var parm = "type=getactjieduan";
	AjaxHelp.getdata(
	{
		pdebug : false,
		pajaxurl : ajaxdomainurl,
		Parm : parm
	}, function(data)
	{
		switch (data.info)
		{
			case "1":
				actjieduan = actjieduaninfo1;
				actjieduanvalue = 1;
				break;
			case "2":
				actjieduan = actjieduaninfo1;
				actjieduanvalue = 2;
				break;
			case "3":
				actjieduan = actjieduaninfo2;
				actjieduanvalue = 3;
				break
		}
		return actjieduan
	})
}
function getnowtime()
{
	var parm = "type=getnowtime";
	var lishi = "";
	AjaxHelp.getdata(
	{
		pdebug : false,
		pajaxurl : ajaxdomainurl,
		Parm : parm
	}, function(data)
	{
		lishi = data.nowtime
	});
	return lishi
}
function getstartandend()
{
	var parm = "type=getstartandend";
	var lishi = "";
	AjaxHelp.getdata(
	{
		pdebug : false,
		pajaxurl : ajaxdomainurl,
		Parm : parm
	}, function(data)
	{
		if (data.state == "-11")
		{
			alert("����ip׼��Χ��")
		}
		lishi = data
	});
	return lishi
}
function showlogin()
{
	$.colorbox(
	{
		inline : true,
		href : "#inline_example2"
	})
}
function getloginstate()
{
	clearInterval(timerloginstate);
	if (ischeckloginstate == 1)
	{
		var parm = "type=getloginstate&userprimary=" + getCookie("userprimary") + "&userid=" + getCookie("parkuserid") + "&tid=" + tid;
		AjaxHelp.getdata(
		{
			pdebug : false,
			pajaxurl : ajaxdomainurl2,
			Parm : parm,
			responsedataType : "jsonp"
		}, function(data)
		{
			if (data.state == '-1')
			{
				exit(1);
				alert('���˺��������ط���¼������������');
				window.location = "index.shtml"
			}
			timerloginstate = setInterval(getloginstate, 10000)
		})
	}
}
function exit(etype)
{
	var parm = "type=exit";
	AjaxHelp.getdata(
	{
		pdebug : false,
		pajaxurl : ajaxdomainurl,
		Parm : parm,
		responsedataType : "txt"
	}, function(data)
	{
		if (etype == 1)
		{
			alert('���˺��������ط���¼������������');
			window.location = "index.shtml";
			timerloginstate = setInterval(getloginstate, 10000)
		} else
		{
			parklogininfo()
		}
	})
}
function getCookie(name)
{
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null
}
function toDouble(obj)
{
	if (obj < 10)
	{
		return '0' + obj
	} else
	{
		return obj
	}
}
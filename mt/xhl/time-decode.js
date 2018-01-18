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
		$("#spantimemsg").html("距" + actjieduan + "开始：");
		$(".tishitime").html("距" + actjieduan + "开始：");
		$(".buying").hide();
		$(".hand").hide();
		$(".nobuying").show();
		$(".nobuying").html('活动未开始');
		starstate = 0;
		$(".example8").unbind("click").click(function()
		{
			PopShow("#public1");
			if (islogin == 1)
			{
				$("#public1 h3").html("" + actjieduan + "暂未开始！请耐心等待！")
			} else
			{
				$("#public1 h3").html("您还没有登录！请登录后再试！<a href=\"javascript:PopShow('.loginpop');PopHide('#public1');\">[立即登录]</a>")
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
		$("#spantimemsg").html("距" + actjieduan + "结束：");
		$(".tishitime").html("距" + actjieduan + "结束：");
		starstate = 1;
		$(".example8").unbind("click").click(function()
		{
			if (islogin == 1)
			{
				getnextstep()
			} else
			{
				PopShow("#public1");
				$("#public1 h3").html("您还没有登录！请登录后再试！<a href=\"javascript:PopShow('.loginpop');PopHide('#public1');\">[立即登录]</a>")
			}
		});
		$(".buying").show();
		$(".hand").show();
		$(".nobuying").hide();
		$(".buying").html('开始抢购');
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
		$(".nobuying").html('活动已结束');
		$('#spantimemsg').text("本次" + actjieduan + "已结束");
		$(".tishitime").html("本次" + actjieduan + "已结束");
		$(".example8").unbind("click").click(function()
		{
			PopShow("#public1");
			$("#public1 h3").html("本次" + actjieduan + "已结束！谢谢您的参与！")
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
			alert("不在ip准许范围！")
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
				alert('该账号在其他地方登录，您被迫下线');
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
			alert('该账号在其他地方登录，您被迫下线');
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
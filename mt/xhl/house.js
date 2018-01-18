var useridcard = "";
var username = "";
var userhousenum = "";
var userphone = "";
var mianji = "";
var mianji2 = "";
var price = "";
var maxunit = 4;
var minunit = 1;
var cwnum = "";
var lscwnum = "";
var area = "";
var cwgoodname = "";
var ckeypwd = "";

var timerinfo = null;
var timerlock = null;
var rengouimg = "";
// 验证码组件初始化
var ins;
var opts =
{
	captchaId : captchaId3,
	element : '#sendhouse_div',
	mode : 'embed',
	width : '320px',
	onReady : function(instance)
	{
		ins = instance;
	},
	onVerify : function(err, ret)
	{
		if (err == null)
		{
			if (ret['validate'])
			{ // true:验证通过 false:验证失败
				var validate = ret['validate'];
				getinfobyid(cwnum, ckeypwd, validate);// 用户完成拖动之后再启用提交按钮
			}
		} else
		{
			
			//initNECaptcha(opts, function onload(instance) { ins = instance; }, function onerror(err) { window.location.reload(); });
		}
		
	},
};
initNECaptcha(opts, function onload(instance)
{
	ins = instance;
}, function onerror(err)
{
	window.location.reload();
});
$("#public2 .close").click(function()
{
	lscwnum = "";
});
//获取登录信息
function parklogininfo()
{
	
	var parm = "Type=getlogininfo";
	AjaxHelp.getdata(
	{
		pdebug : false,
		pajaxurl : ajaxdomainurl,
		Parm : parm
	}, function(json)
	{
		if (json.state == '1')
		{
			
			if (json.isfull == "1")
			{
				alert('您已达到选房上限,无需再次进入');
				window.location = "index.shtml";
			} else
			{
				$('#splastuseridcard').html(json.useridcard);
				$('#splastusername').html(json.username);
				$('#splastuserphone').html(json.userphone);
				$('#splastzhiyeguwen').html(json.zhiyeguwen);
				if (starstate == 0)
				{
					PopShow("#public1");
					$("#public1 h3").html("" + actjieduan + "暂未开始！请耐心等待！");
					$("#public1 .close").attr("href", "javascript:PopHide('#public1');window.location ='index.shtml';");
					return;
				}
				if (starstate == -1)
				{
					PopShow("#public1");
					$("#public1 h3").html("对不起，" + actjieduan + "已结束！</br>感谢您的关注！");
					$("#public1 .close").attr("href", "javascript:PopHide('#public1');window.location ='index.shtml';");
					return;
				}
				
				useridcard = json.useridcard;
				username = json.username;
				userhousenum = json.userhousenum;
				getloginstate();
			}
			// $.colorbox({ inline: true, href: "#inline_example11" });
		} else
		{
			//未登录
			clearInterval(timerloginstate);
			window.location = "index.shtml";
			
		}
	});
	
}

function getcheweiinfo(carea, cmax, cmin, iszheng)
{
	
	area = carea;
	maxunit = cmax;
	minunit = cmin;
	fristgetallinfo(iszheng);
	
}

function fristgetallinfo(iszheng)
{
	var btn = '$num$<span class="greenBg" id="$num1$" >$statetext$</span>';
	
	// var housettml = '<td class="$N$">--</td><td width="42" align="center" bgcolor="#b2711f" class="$M$">--</td><td width="36" align="center" bgcolor="#a36415" class="$S$" >--</td><td  class="$X$" width="65" align="center" bgcolor="#b2711f">--</td> ';
	
	var housettml = '<td  style="background:#bc5d09;" class="$N$">--</td><td class="$M$">--</td><td  class="$X$">--</td><td  class="$S$">--</td><td  class="$W$">--</td><td  class="$L$">--</td>';
	
	var htmllist = "";
	
	var parm = "type=fristgetallinfo&area=" + escape(area);
	
	AjaxHelp.getdata(
	{
		pdebug : false,
		pajaxurl : ajaxdomainurl,
		Parm : parm
	}, function(statuback)
	{
		
		if (statuback.rows.length < 1)
		{
			return;
		}
		var dlen = statuback.rows.length;
		var maxceng = statuback.rows[0].num.length == 4 ? statuback.rows[0].num.substr(0, 2) : statuback.rows[0].num.substr(0, 1);
		var minceng = statuback.rows[dlen - 1].num.length == 4 ? statuback.rows[dlen - 1].num.substr(0, 2) : statuback.rows[dlen - 1].num.substr(0, 1);
		
		for (var m = parseInt(maxceng); m >= parseInt(minceng); m--)
		{
			htmllist = '<tr class="$' + area + 'Tr$">';
			
			if (iszheng == 1)
			{
				for (var n = minunit; n <= maxunit; n++)
				{
					htmllist += housettml;
					if (n < 10)
					{
						htmllist = htmllist.replace("$N$", 'N' + m + '0' + n);
						htmllist = htmllist.replace("$M$", 'M' + m + '0' + n);
						htmllist = htmllist.replace("$S$", 'S' + m + '0' + n);
						htmllist = htmllist.replace("$X$", 'X' + m + '0' + n);
						htmllist = htmllist.replace("$L$", 'L' + m + '0' + n);
						htmllist = htmllist.replace("$W$", 'W' + m + '0' + n);
					} else
					{
						htmllist = htmllist.replace("$N$", 'N' + m + n);
						htmllist = htmllist.replace("$M$", 'M' + m + n);
						htmllist = htmllist.replace("$S$", 'S' + m + n);
						htmllist = htmllist.replace("$X$", 'X' + m + n);
						htmllist = htmllist.replace("$L$", 'L' + m + n);
						htmllist = htmllist.replace("$W$", 'W' + m + n);
					}
				}
				
			} else
			{
				for (var n = maxunit; n >= minunit; n--)
				{
					htmllist += housettml;
					if (n < 10)
					{
						htmllist = htmllist.replace("$N$", 'N' + m + '0' + n);
						htmllist = htmllist.replace("$M$", 'M' + m + '0' + n);
						htmllist = htmllist.replace("$S$", 'S' + m + '0' + n);
						htmllist = htmllist.replace("$X$", 'X' + m + '0' + n);
						htmllist = htmllist.replace("$L$", 'L' + m + '0' + n);
						htmllist = htmllist.replace("$W$", 'W' + m + '0' + n);
					} else
					{
						htmllist = htmllist.replace("$N$", 'N' + m + n);
						htmllist = htmllist.replace("$M$", 'M' + m + n);
						htmllist = htmllist.replace("$S$", 'S' + m + n);
						htmllist = htmllist.replace("$X$", 'X' + m + n);
						htmllist = htmllist.replace("$L$", 'L' + m + '0' + n);
						htmllist = htmllist.replace("$W$", 'W' + m + '0' + n);
					}
				}
				
			}
			
			htmllist += "</tr>";
			htmllist = htmllist.replace("$" + area + "Tr$", area + 'Tr' + m);
			$("#tbhouelist" + area).append(htmllist);
		}
		
		for (var i = 0; i < statuback.rows.length; i++)
		{
			var anum = unescape(statuback.rows[i].num);
			var numhtml = btn;
			
			numhtml = numhtml.replace("$num$", statuback.rows[i].num);
			numhtml = numhtml.replace("$num1$", statuback.rows[i].num);
			
			if (unescape(statuback.rows[i].carstate) == "-1")
			{
				numhtml = numhtml.replace("$statetext$", Housestate3);
			} else if (unescape(statuback.rows[i].carstate) == "1")
			{
				numhtml = numhtml.replace("$statetext$", Housestate3);
			} else if (unescape(statuback.rows[i].carstate) == "0")
			{
				numhtml = numhtml.replace("$statetext$", Housestate1);
			} else if (unescape(statuback.rows[i].carstate) == "2")
			{
				numhtml = numhtml.replace("$statetext$", Housestate2);
			}
			
			$(".N" + anum).html(numhtml);
			$(".M" + anum).html(statuback.rows[i].mianji);
			if (actjieduanvalue == "1" || actjieduanvalue == "2")
			{
				//$(".S" + anum).html("--");
				//$(".X" + anum).html("--");
				if (isshowprice == 1)
				{
					$(".S" + anum).html(statuback.rows[i].price);
					$(".X" + anum).html(statuback.rows[i].info);
					$(".L" + anum).html(statuback.rows[i].length);
					$(".W" + anum).html(statuback.rows[i].width);
				} else
				{
					$(".S" + anum).html("--");
					$(".X" + anum).html("--");
					$(".L" + anum).html("--");
					$(".W" + anum).html("--");
				}
				
			} else
			{
				if (isshowprice == 1)
				{
					$(".S" + anum).html(statuback.rows[i].price);
					$(".X" + anum).html(statuback.rows[i].info);
					$(".L" + anum).html(parseFloat(statuback.rows[i].length).toFixed(0));
					$(".W" + anum).html(parseFloat(statuback.rows[i].width).toFixed(0));
				} else
				{
					$(".S" + anum).html("--");
					$(".X" + anum).html("--");
					$(".L" + anum).html("--");
					$(".W" + anum).html("--");
				}
			}
		}
		
		for (var m = parseInt(maxceng); m >= parseInt(minceng); m--)
		{
			for (var n = minunit; n <= maxunit; n++)
			{
				
				if (n < 10)
				{
					anum = m + '0' + n;
				} else
				{
					anum = m + n;
				}
				
				if ($(".N" + anum).html() == "--")
				{
					$(".N" + anum).html(kongcenginfo);
					$(".M" + anum).html(kongcenginfo);
					$(".S" + anum).html(kongcenginfo);
					$(".X" + anum).html(kongcenginfo);
					$(".L" + anum).html(kongcenginfo);
					$(".W" + anum).html(kongcenginfo);
				}
				
			}
		}
		
	});
}

function getallinfo()
{
	clearInterval(timerinfo);
	var parm = "type=getallinfo&area=" + escape(area);
	AjaxHelp.getdata(
	{
		pdebug : false,
		pajaxurl : ajaxdomainurl,
		Parm : parm
	}, function(statuback)
	{
		
		if (statuback.state == "-11")
		{
			PopShow("#public1");
			$("#public1 h3").html(statuback.info);
			$("#public1 .close").attr("href", "javascript:PopHide('#public1');window.location ='index.shtml';");
			$(".popbtn").attr("href", "javascript:PopHide('#public1');window.location ='index.shtml';");
			return;
		}
		
		if (statuback.state == "-12")
		{
			PopShow("#public1");
			$("#public1 h3").html(statuback.info);
			$("#public1 .close").attr("href", "javascript:PopHide('#public1');window.location ='index.shtml';");
			$(".popbtn").attr("href", "javascript:PopHide('#public1');window.location ='index.shtml';");
			return;
		}
		
		if (statuback.state == "-1")
		{
			PopShow("#public1");
			$("#public1 h3").html("对不起，" + actjieduan + "暂未开始请稍候！");
			$("#public1 .close").attr("href", "javascript:PopHide('#public1');window.location ='index.shtml';");
			$(".popbtn").attr("href", "javascript:PopHide('#public1');window.location ='index.shtml';");
			return;
		}
		if (statuback.state == "-2")
		{
			PopShow("#public1");
			$("#public1 h3").html("对不起，" + actjieduan + "已结束！</br>感谢您的关注！");
			$("#public1 .close").attr("href", "javascript:PopHide('#public1');window.location ='index.shtml';");
			$(".popbtn").attr("href", "javascript:PopHide('#public1');window.location ='index.shtml';");
			
			return;
		}
		
		if (statuback.rows.length < 1)
		{
			return;
		}
		for (var i = 0; i < statuback.rows.length; i++)
		{
			var anum = unescape(statuback.rows[i].num);
			
			var id = "" + anum + "";
			if (unescape(statuback.rows[i].carstate) == "-1")
			{
				
				$("#" + id).removeClass().addClass("redBg");
				$("#" + id).attr('title', "");
				$("#" + id).html(Housestate3);
				
			} else if (unescape(statuback.rows[i].carstate) == "1")
			{
				
				$("#" + id).removeClass().addClass("redBg");
				$("#" + id).attr('title', "");
				$("#" + id).html(Housestate3);
				if (anum == lscwnum)
				{
					PopHide("#public2");
					PopShow("#public1");
					$("#public1 h3").html('该房已售出！请换其它房源再试！');
					$("#public1 .close").attr("href", "javascript:PopHide('#public1');");
					$(".popbtn").show();
					lscwnum = "";
				}
				
			} else if (unescape(statuback.rows[i].carstate) == "0")
			{
				
				$("#" + id).removeClass().addClass("greenBg");
				$("#" + id).html(Housestate1);
				$("#" + id).attr('title', anum);
				
			} else if (unescape(statuback.rows[i].carstate) == "2")
			{
				
				$("#" + id).removeClass().addClass("blueBg");
				$("#" + id).html(Housestate2);
				$("#" + id).attr('title', anum);
				if (anum == lscwnum)
				{
					PopHide("#public2");
					PopShow("#public1");
					$("#public1 h3").html('该房正在预订中，已被锁定！请换其它房源再试！');
					$("#public1 .close").attr("href", "javascript:PopHide('#public1');");
					$(".popbtn").show();
					lscwnum = "";
				}
			}
			
			$("#" + id).attr('keypwd', unescape(statuback.rows[i].keypwd));
		}
		$("#tbhouelist" + area + " span").unbind("click");
		$("#tbhouelist" + area + " .greenBg").bind("click", function()
		{
			
			cwnum = $(this).attr('tip').replace('', '');
			cwnum = cwnum.replace('', '');
			lscwnum = cwnum;
			ckeypwd = $(this).attr('keypwd');
			getinfobyid2();
		});
		
		timerinfo = setInterval(getallinfo, 3000);
	});
	
}

function getinfobyid2()
{
	if (ischecklockhouse == 1)
	{
		ins.refresh();
		PopShow("#public2");
		
	} else
	{
		getinfobyid(cwnum, ckeypwd);
	}
	
}

function getinfobyid(num, keypwd, validate)
{
	if (ischecklockhouse == 1)
	{
		PopHide('#public2');
	}
	
	if (starstate == 0)
	{
		
		PopShow("#public1");
		$("#public1 h3").html("对不起,活动暂未开始请稍候！");
		$("#public1 .close").attr("href", "javascript:PopHide('#public1');window.location ='index.shtml';");
		return;
	}
	if (starstate == -1)
	{
		PopShow("#public1");
		$("#public1 h3").html("对不起，活动已结束！</br>感谢您的关注！");
		$("#public1 .close").attr("href", "javascript:PopHide('#public1');window.location ='index.shtml';");
		return;
	}
	
	showloading();
	var parm = "type=getinfobyidandkeypwd&area=" + escape(area) + "&num=" + escape(num) + "&keypwd=" + escape(keypwd) + "&NECaptchaValidate=" + validate;
	AjaxHelp.getdata(
	{
		pdebug : false,
		async : true,
		pajaxurl : ajaxdomainurl,
		Parm : parm
	}, function(statuback)
	{
		
		if (unescape(statuback.state) != 1)
		{
			PopShow("#public1");
			$("#public1 h3").html(statuback.info);
			$("#public1 .close").attr("href", "javascript:PopHide('#public1');");
			
			closeloading(0);
			
			return;
		}
		
		$(".second2").html('20');
		Count(unescape(statuback.info[0].strUnlock), unescape(statuback.info[0].strNow));
		
		var carstate = unescape(statuback.info[0].carstate);
		
		if (carstate == "0")
		{
			
			$("#useridcard").html(useridcard);
			$("#username").html(username);
			$("#prakingnum").html(area + "-" + unescape(statuback.info[0].prakingnum));
			if (actjieduan == "公测")
			{
				if (isshowprice == 1)
				{
					$("#spprice").html(unescape(statuback.info[0].price) + "元");
					$("#spinfo").html(unescape(statuback.info[0].info) + "元");
					$("#splength").html(unescape(statuback.info[0].length) + "元");
					$("#spwidth").html(unescape(statuback.info[0].width) + "元");
				} else
				{
					$("#spprice").html("待定");
					$("#spinfo").html("待定");
					$("#splength").html("待定");
					$("#spwidth").html("待定");
				}
				
			} else
			{
				if (isshowprice == 1)
				{
					$("#spprice").html(unescape(statuback.info[0].price) + "元");
					$("#spinfo").html(unescape(statuback.info[0].info) + "元");
					$("#splength").html(unescape(statuback.info[0].length) + "元");
					$("#spwidth").html(unescape(statuback.info[0].width) + "元");
				} else
				{
					$("#spprice").html("待定");
					$("#spinfo").html("待定");
					$("#splength").html("待定");
					$("#spwidth").html("待定");
				}
			}
			$("#spmianji").html(unescape(statuback.info[0].mianji) + '㎡');
			$("#spmianji2").html(unescape(statuback.info[0].mianji2) + '㎡');
			
			mianji = unescape(statuback.info[0].mianji);
			mianji2 = unescape(statuback.info[0].mianji2);
			price = unescape(statuback.info[0].price);
			
			PopShow(".qrrg");
			$(".qrrg .linkbtn .right").unbind("click").click(function()
			{
				autounlockbynum();
			});
			$(".qrrg .close").unbind("click").click(function()
			{
				autounlockbynum();
			});
			cwnum = num;
			ckeypwd = keypwd;
		} else if (carstate == "2")
		{
			PopShow("#public1");
			$("#public1 h3").html('该房正在预订中，已被锁定！请换其它房源再试！');
			$("#public1 .close").attr("href", "javascript:PopHide('#public1');");
			
			cwnum = num;
			ckeypwd = keypwd;
		}
		lscwnum = "";
		PopHide('#public1');
		$("#waitinfo").html("");
		$("#public1 .close").show();
		$("#public1 .popbox img").remove();
	});
	
}

//手动解除锁定状态
function autounlockbynum()
{
	
	var parm = "type=autounlockbynum&area=" + escape(area) + "&num=" + cwnum;
	
	AjaxHelp.getdata(
	{
		pdebug : false,
		pajaxurl : ajaxdomainurl,
		Parm : parm
	}, function(data)
	{
		
	});
	
}

//系统自动解除锁定状态
function autounlock()
{
	clearInterval(timerlock);
	
	var parm = "type=autounlock&area=" + escape(area);
	
	AjaxHelp.getdata(
	{
		pdebug : false,
		pajaxurl : ajaxdomainurl,
		Parm : parm
	}, function(data)
	{
		timerlock = setInterval(autounlock, 10000);
	});
	
}

function miaoshaogood()
{
	showloading();
	var parm = "type=sendbykeypwd&area=" + escape(area) + "&num=" + escape(cwnum) + "&keypwd=" + escape(ckeypwd);
	AjaxHelp.getdata(
	{
		pdebug : false,
		async : true,
		pajaxurl : ajaxdomainurl,
		Parm : parm
	}, function(statuback)
	{
		closeloading(0);
		if (statuback.state == "1")
		{
			
			if (actjieduanvalue == "3")
			{
				PopShow("#public1");
				$("#public1 h3").html('恭喜您，成功认购' + area + '-' + cwnum + '房源！<br/><br/><a href="index.shtml">【返回首页】</a>');
				$("#public1 .close").attr("href", "javascript:PopHide('#public1');parklogininfo();");
				$(".popbtn").attr("href", "javascript:PopHide('#public1');parklogininfo();");
			} else
			{
				PopShow("#public1");
				$("#public1 h3").html('恭喜您，公测中成功认购' + area + '-' + cwnum + '房源！<br/><br/><a href="index.shtml">【返回首页】</a>');
				$("#public1 .close").attr("href", "javascript:PopHide('#public1');parklogininfo();");
				$(".popbtn").attr("href", "javascript:PopHide('#public1');parklogininfo();");
			}
			
			clearInterval(thisInterval2);
		} else
		{
			
			PopShow("#public1");
			$("#public1 h3").html(statuback.info);
			
			$("#public1 .close").attr("href", "javascript:PopHide('#public1');");
		}
		
	});
}

//activeTime为活动到期时间，thisTime当前时间
var time2 = 0;
var thisInterval2;
function Count(activeTime, thisTime)
{
	
	var at2 = new Date(activeTime);
	var nowTime2 = new Date(thisTime);
	
	if (at2 > nowTime2)
	{
		clearInterval(thisInterval2);
		time2 = at2.getTime() - nowTime2.getTime();
		
		thisInterval2 = window.setInterval(function()
		{
			setTime2();
		}, 1000);
	}
}
function setTime2()
{
	
	if (time2 < 0)
	{
		autounlockbynum();
		clearInterval(thisInterval2);
		PopHide(".qrrg");
	} else
	{
		//获取剩余天数
		//var day=Math.floor(time/(24*60*60*1000));
		//var hour=Math.floor(time/(60*60*1000)-day*24);
		var sec2 = Math.floor(time2 / (1000));
		
		//获取剩余秒数，秒数的数字为个位数的时候，秒数前面补0
		sec2 = sec2 < 10 ? "0" + sec2 : sec2;
		$(".second2").html(sec2);
		
		time2 = time2 - 1000;
	}
}

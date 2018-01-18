var AjaxHelp = (function()
{
	var default_opt =
	{
		pajaxurl : "",
		pdebug : true,
		Parm : "",
		async : false,
		cache : false,
		requesttype : "Post",
		responsedataType : "json"
	};
	var datajson =
	{};
	function ajaxpost(opt, a, b)
	{
		$.ajax(
		{
			type : opt.requesttype,
			url : opt.pajaxurl,
			data : opt.Parm,
			dataType : opt.responsedataType,
			async : opt.async,
			cache : opt.cache,
			beforeSend : function()
			{
				if (typeof (b) == "function")
				{
					b()
				}
			},
			success : function(d)
			{
				if (opt.pdebug)
				{
					alert(JSON.stringify(d))
				}
				if (typeof (a) == "function")
				{
					if (typeof (d) == "string")
					{
						var contact = JSON.parse(d);
						a(contact)
					} else
					{
						a(d)
					}
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown)
			{
			}
		})
	}
	function ajaxposttxt(opt, a, b)
	{
		$.ajax(
		{
			type : opt.requesttype,
			url : opt.pajaxurl,
			data : opt.Parm,
			dataType : "text",
			async : opt.async,
			cache : opt.cache,
			beforeSend : function()
			{
				if (typeof (b) == "function")
				{
					b()
				}
			},
			success : function(d)
			{
				if (opt.pdebug)
				{
					alert(JSON.stringify(d))
				}
				if (typeof (a) == "function")
				{
					a(d)
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown)
			{
			}
		})
	}
	function ajaxjsonppost(opt, a, b)
	{
		$.ajax(
		{
			type : opt.requesttype,
			url : opt.pajaxurl,
			data : opt.Parm,
			dataType : "jsonp",
			jsonp : 'callback',
			async : opt.async,
			cache : opt.cache,
			beforeSend : function()
			{
				if (typeof (b) == "function")
				{
					b()
				}
			},
			success : function(d)
			{
				if (opt.pdebug)
				{
					alert(JSON.stringify(d))
				}
				if (typeof (a) == "function")
				{
					if (typeof (d) == "string")
					{
						var contact = JSON.parse(d);
						a(contact)
					} else
					{
						a(d)
					}
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown)
			{
			}
		})
	}
	function resquest(options, a, b)
	{
		var opt =
		{};
		opt.pajaxurl = (typeof (options.pajaxurl) == "undefined") ? default_opt.pajaxurl : options.pajaxurl;
		opt.pdebug = (typeof (options.pdebug) == "undefined") ? default_opt.pdebug : options.pdebug;
		opt.Parm = (typeof (options.Parm) == "undefined") ? default_opt.Parm : options.Parm;
		opt.requesttype = (typeof (options.requesttype) == "undefined") ? default_opt.requesttype : options.requesttype;
		opt.responsedataType = (typeof (options.requesttype) == "undefined") ? default_opt.responsedataType : options.responsedataType;
		opt.async = (typeof (options.async) == "undefined") ? default_opt.async : options.async;
		opt.cache = (typeof (options.cache) == "undefined") ? default_opt.cache : options.cache;
		if (options.responsedataType == "jsonp")
		{
			ajaxjsonppost(opt, a, b)
		} else if (options.responsedataType == "txt")
		{
			ajaxposttxt(opt, a, b)
		} else
		{
			ajaxpost(opt, a, b)
		}
	}
	return
	{
		getdata : function(options, a, b)
		{
			resquest(options, a, b)
		}
	}
})();
function IsWeixin()
{
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger")
	{
		return true
	} else
	{
		return false
	}
}
function GetRequest()
{
	var url = location.search;
	var theRequest = new Object();
	if (url.indexOf('?') != -1)
	{
		var str = url.substr(1);
		var params = str.split('&');
		for (var i = 0; i < params.length; i++)
		{
			theRequest[params[i].split('=')[0]] = unescape(params[i].split('=')[1])
		}
	}
	return theRequest
}
var Request = GetRequest();
var checkHelp = (function()
{
	var default_opt =
	{
		containerid : "",
		parRegular : "",
		megerror : "",
		spanerrcid : "",
		placeholder : "",
		spancid : "",
		errclass : "err",
		rightclass : "ok",
		checktype : "txt"
	};
	function checkTxt(opt)
	{
		if ($(opt.containerid).val() == opt.placeholder)
		{
			errshow(opt);
			return false
		}
		var parRegular = opt.parRegular;
		var patrn = eval(parRegular);
		var rtnValue = patrn.exec(trim($(opt.containerid).val()));
		if (rtnValue)
		{
			okshow(opt);
			return true
		} else
		{
			errshow(opt);
			return false
		}
	}
	function checklength(opt)
	{
		if ($(opt.containerid).val() == opt.placeholder || $(opt.containerid).val() == '')
		{
			errshow(opt);
			return false
		}
		var len = trim($(opt.containerid).val()).length;
		if (len <= opt.parRegular)
		{
			okshow(opt);
			return true
		} else
		{
			errshow(opt);
			return false
		}
	}
	function errshow(opt)
	{
		if (opt.spanerrcid != "")
		{
			$(opt.spanerrcid).html(opt.megerror);
			$(opt.spanerrcid).css("color", "red");
			if (opt.spancid != "")
			{
				$(opt.spancid).removeClass(opt.rightclass).addClass(opt.errclass)
			}
		} else
		{
			if (opt.spancid != "")
			{
				$(opt.spancid).removeClass(opt.rightclass).addClass(opt.errclass)
			}
			alert(opt.megerror)
		}
	}
	function okshow(opt)
	{
		if (opt.spanerrcid != "")
		{
			$(opt.spanerrcid).html("");
			$(opt.spanerrcid).css("color", "Green");
			if (opt.spancid != "")
			{
				$(opt.spancid).removeClass(opt.errclass).addClass(opt.rightclass)
			}
		} else
		{
			if (opt.spancid != "")
			{
				$(opt.spancid).removeClass(opt.errclass).addClass(opt.rightclass)
			}
		}
	}
	function checkIdcard(opt)
	{
		if ($(opt.containerid).val() == opt.placeholder)
		{
			errshow(opt);
			return false
		}
		var Errors = new Array("验证通过!", "身份证号码位数不对!", "身份证号码出生日期超出范围或含有非法字符!", "身份证号码校验错误!", "身份证地区非法!");
		var area =
		{
			11 : "北京",
			12 : "天津",
			13 : "河北",
			14 : "山西",
			15 : "内蒙古",
			21 : "辽宁",
			22 : "吉林",
			23 : "黑龙江",
			31 : "上海",
			32 : "江苏",
			33 : "浙江",
			34 : "安徽",
			35 : "福建",
			36 : "江西",
			37 : "山东",
			41 : "河南",
			42 : "湖北",
			43 : "湖南",
			44 : "广东",
			45 : "广西",
			46 : "海南",
			50 : "重庆",
			51 : "四川",
			52 : "贵州",
			53 : "云南",
			54 : "西藏",
			61 : "陕西",
			62 : "甘肃",
			63 : "青海",
			64 : "宁夏",
			65 : "新疆",
			71 : "台湾",
			81 : "香港",
			82 : "澳门",
			91 : "国外"
		};
		var idcard = $(opt.containerid).val();
		var Y, JYM;
		var S, M;
		var idcard_array = new Array();
		idcard_array = idcard.split("");
		if (area[parseInt(idcard.substr(0, 2))] == null)
		{
			opt.megerror = Errors[4];
			errshow(opt);
			return false
		}
		switch (idcard.length)
		{
			case 15:
				if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0))
				{
					ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;
				} else
				{
					ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;
				}
				if (ereg.test(idcard))
				{
					opt.megerror = "";
					okshow(opt);
					return true
				} else
				{
					opt.megerror = Errors[2];
					errshow(opt);
					return false
				}
				break;
			case 18:
				if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0))
				{
					ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
				} else
				{
					ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
				}
				if (ereg.test(idcard))
				{
					S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3;
					Y = S % 11;
					M = "F";
					JYM = "10x98765432";
					M = JYM.substr(Y, 1);
					if (M == idcard_array[17].toLocaleLowerCase())
					{
						opt.megerror = "";
						okshow(opt);
						return true;
					} else
					{
						opt.megerror = Errors[3];
						errshow(opt);
						return false
					}
				} else
				{
					opt.megerror = Errors[2];
					errshow(opt);
					return false
				}
				break;
			default:
				opt.megerror = Errors[1];
				errshow(opt);
				return false;
				break
		}
	}
	function mycheck(options)
	{
		var opt =
		{};
		opt.containerid = (typeof (options.containerid) == "undefined") ? default_opt.containerid : options.containerid;
		opt.parRegular = (typeof (options.parRegular) == "undefined") ? default_opt.parRegular : options.parRegular;
		opt.megerror = (typeof (options.megerror) == "undefined") ? default_opt.megerror : options.megerror;
		opt.placeholder = (typeof (options.placeholder) == "undefined") ? default_opt.placeholder : options.placeholder;
		opt.checktype = (typeof (options.checktype) == "undefined") ? default_opt.checktype : options.checktype;
		opt.spanerrcid = (typeof (options.spanerrcid) == "undefined") ? default_opt.spanerrcid : options.spanerrcid;
		opt.spancid = (typeof (options.spancid) == "undefined") ? default_opt.spancid : options.spancid;
		opt.errclass = (typeof (options.errclass) == "undefined") ? default_opt.errclass : options.errclass;
		opt.rightclass = (typeof (options.rightclass) == "undefined") ? default_opt.rightclass : options.rightclass;
		switch (opt.checktype)
		{
			case "idcard":
				return checkIdcard(opt);
				break;
			case "txt":
				return checkTxt(opt);
				break;
			case "length":
				return checklength(opt);
				break
		}
	}
	function trim(str)
	{
		return rtrim(ltrim(str))
	}
	function ltrim(s)
	{
		if (s == null)
			return "";
		var whitespace = new String(" \t\n\r");
		var str = new String(s);
		if (whitespace.indexOf(str.charAt(0)) != -1)
		{
			var j = 0, i = str.length;
			while (j < i && whitespace.indexOf(str.charAt(j)) != -1)
			{
				j++
			}
			str = str.substring(j, i)
		}
		return str
	}
	function rtrim(s)
	{
		if (s == null)
			return "";
		var whitespace = new String(" \t\n\r");
		var str = new String(s);
		if (whitespace.indexOf(str.charAt(str.length - 1)) != -1)
		{
			var i = str.length - 1;
			while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1)
			{
				i--
			}
			str = str.substring(0, i + 1)
		}
		return str
	}
	return
	{
		check : function(options)
		{
			return mycheck(options)
		}
	}
})();
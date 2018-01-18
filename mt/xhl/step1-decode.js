$(document).ready(function()
{
	step1()
});
function step1()
{
	showloading();
	var parm = "Type=getlogininfo";
	AjaxHelp.getdata(
	{
		pdebug : false,
		async : true,
		pajaxurl : ajaxdomainurl,
		Parm : parm
	}, function(json)
	{
		closeloading(1);
		if (json.state == '1')
		{
			if (json.isfull == "1")
			{
				alert('您已达到选房上限,无需再次进入');
				window.location = "index.shtml"
			} else
			{
				$(".nextbtn").click(function()
				{
					var parm2 = "Type=step1";
					AjaxHelp.getdata(
					{
						pdebug : false,
						async : true,
						pajaxurl : ajaxdomainurl,
						Parm : parm2
					}, function(myjson)
					{
						if (myjson.state == 1)
						{
							window.location = myjson.info
						} else
						{
							alert(myjson.info);
							window.location = "index.shtml"
						}
					})
				})
			}
			getloginstate()
		} else
		{
			window.location = "index.shtml"
		}
	})
}
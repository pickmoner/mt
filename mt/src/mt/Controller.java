package mt;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONObject;

@WebServlet(name="Controller", value="/Controller")
public class Controller extends HttpServlet
{
    private static final long serialVersionUID = -1538546480755566399L;
    public static Logger LOGGER = LogManager.getLogger();
    
	public void doGet(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException
	{
		doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException
	{
		
		String type = request.getParameter("type");
		
		response.setContentType("application/json; charset=utf-8");
		
		if(Constants.PROCESS_LOGIN.equals(type))
		{
			PrintWriter out = response.getWriter();
//			out.write("{\"res\":\"login success\"}");
//			out.flush();
//			out.close();
			
			JSONObject json = new JSONObject();
			json.put("res", "json login success");
			out.write(json.toString());
			
			User user = new User();
			user.setId("42060619851014801X");
			user.setName("");
			user.setPassword("14801X");
			user.setPhone("15827305128");
			
			Process process = new Process();
			try
			{
//				process.loginFirst(user);
//				process.getLoginInfo(user);
			}catch (Exception e) 
			{
			}

			LOGGER.info("Login Success");
			
		}else if(Constants.PROCESS_RESERVE.equals(type))
		{
			PrintWriter out = response.getWriter();
			out.write("{\"res\":\"reserve success\"}");
			out.flush();
			out.close();
			
			LOGGER.info("Reserve Success");

		}
		 
	}
	
}

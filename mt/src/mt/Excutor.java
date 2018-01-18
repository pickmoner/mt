package mt;

import java.util.ArrayList;

import org.apache.http.Header;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.message.BasicHeader;
import org.apache.http.protocol.HttpContext;
import org.apache.http.util.EntityUtils;

public class Excutor
{
	private HttpClient client;
	private HttpContext context;
	private ArrayList<Header> headers;
	
	public Excutor(HttpClient client, HttpContext context, ArrayList<Header> headers)
	{
		this.client=client;
		this.context=context;
		this.headers=headers;
	}
	
	public Excutor(HttpClient client, HttpContext context)
	{
		this.client=client;
		this.context=context;
		headers = new ArrayList<Header>();
		
		//userprimary
		//parkuserid
		//userhousenum
		
		//User-Agent
		//Referer
		
		Header h1 = new BasicHeader("", "");
		Header h2 = new BasicHeader("", "");
		Header h3 = new BasicHeader("", "");
		Header h4 = new BasicHeader("", "");
		Header h5 = new BasicHeader("", "");
		Header h6 = new BasicHeader("", "");
		
		headers.add(h1);
		headers.add(h2);
		headers.add(h3);
		headers.add(h4);
		headers.add(h5);
		headers.add(h6);

	}
	
	public String doGet(HttpGet get)throws Exception
	{
		HttpResponse response = client.execute(get, context);
		return EntityUtils.toString(response.getEntity());
	}
	
	public String doPost(HttpPost post)throws Exception
	{
		HttpResponse response = client.execute(post, context);
		return EntityUtils.toString(response.getEntity());
	}
	
	public void addHeader(HttpRequest request, Header header)throws Exception
	{
		for(Header h:this.headers)
		{
			if(!request.containsHeader(h.getName()))
			{
				request.addHeader(h);
			}
		}
		
		if(!request.containsHeader(header.getName()))
		{
			request.addHeader(header);
		}
	}
	
	public void addHeader(HttpRequest request, ArrayList<Header> headers)throws Exception
	{
		for(Header h:this.headers)
		{
			if(request.containsHeader(h.getName()))
			{
				request.addHeader(h);
			}
		}
		for(Header h:headers)
		{
			if(request.containsHeader(h.getName()))
			{
				request.addHeader(h);
			}
		}
	}
	
	public HttpPost createPost(String url, Header header)throws Exception
	{
		HttpPost post = new HttpPost(url);
		addHeader(post, headers);
		addHeader(post, header);
		return post;
	}
	
	public HttpPost createPost(String url, ArrayList<Header> headers) throws Exception
	{
		HttpPost post = new HttpPost(url);
		addHeader(post, this.headers);
		addHeader(post, headers);
		return post;
	}
	
	public HttpPost createPost(String url)throws Exception
	{
		HttpPost post = new HttpPost(url);
		addHeader(post, headers);
		return post;
	}

	public HttpClient getClient()
    {
    	return client;
    }

	public void setClient(HttpClient client)
    {
    	this.client = client;
    }

	public HttpContext getContext()
    {
    	return context;
    }

	public void setContext(HttpContext context)
    {
    	this.context = context;
    }

	public ArrayList<Header> getHeaders()
    {
    	return headers;
    }

	public void setHeaders(ArrayList<Header> headers)
    {
    	this.headers = headers;
    }
	
}

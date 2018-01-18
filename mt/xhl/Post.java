package httpclient;

import java.util.ArrayList;
import java.util.List;

import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.CookieStore;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultConnectionKeepAliveStrategy;
import org.apache.http.impl.client.DefaultRedirectStrategy;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.cookie.BasicClientCookie;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

public class Post
{
	
	public static void init(HttpClient client)throws Exception
	{
	}
	
	public static void get(HttpClient client, String url, HttpClientContext context)throws Exception
	{
		HttpGet get = new HttpGet(url);

		get.addHeader("User-Agent", "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:57.0) Gecko/20100101 Firefox/57.0");
		get.addHeader("Pragma", "no-cache");
		get.addHeader("Cache-Control", "no-cache");
		get.addHeader("Accept-Encoding", "gzip, deflate");

		printHeaders(get.getAllHeaders(), "Hearders before Info 1");

		HttpResponse response = client.execute(get, context);
		
		HttpEntity entity = response.getEntity();
		
		String res = EntityUtils.toString(entity, "UTF-8");
		
		System.out.println(res);
	}
	
	public static void post(HttpClient client, String url, HttpClientContext context)throws Exception
	{
		
		HttpPost post = new HttpPost(url);

//		printHeaders(post.getAllHeaders(), "Before login");
		
		List<NameValuePair> para = new ArrayList<NameValuePair>();
		NameValuePair username = new BasicNameValuePair("username", "sk9527");
		NameValuePair password = new BasicNameValuePair("password", "sk9527");
		para.add(username);
		para.add(password);
		
		post.setEntity(new UrlEncodedFormEntity(para));
		
//		post.addHeader("Referer", "http://tiku.huatu.com/index.php?mod=administration&act=index");
//		post.addHeader("User-Agent", "Mozilla/5.0 (Windows NT 6.1; W…) Gecko/20100101 Firefox/57.0");
//		post.addHeader("X-Requested-With", "XMLHttpRequest");
//		post.addHeader("Referer", "http://tiku.huatu.com/index.php?mod=administration&act=index");
		
		HttpResponse response = client.execute(post, context);
		
		printCookieStore(context.getCookieStore(), "After login");
		
		HttpEntity entity = response.getEntity();
		
		String res = EntityUtils.toString(entity);
		
		System.out.println(res);

		String u = "http://tiku.huatu.com/index.php?mod=Administration&act=bbbb";
		HttpPost p = new HttpPost(u);
		
		p.addHeader("uid", "3290869");
		
		HttpResponse r = client.execute(p, context);
		
		printCookieStore(context.getCookieStore(), "After bbb");
		
		System.out.println(EntityUtils.toString(r.getEntity()));
		

	}
	
	public static void printCookieStore(CookieStore cs, String method)throws Exception
	{
		System.out.println("###########################");
		System.out.println("Start Print CookieStore In "+method);
		
		List<Cookie> cookies = cs.getCookies();
		
		for(Cookie ck:cookies)
		{
			System.out.println(ck);
		}
		
		System.out.println("End Print CookieStore In "+method);
		System.out.println("###########################");
	}
	
	public static void printHeaders(Header[] hs, String method)throws Exception
	{
		System.out.println("###########################");
		System.out.println("Start Print Header "+method);
		for(Header h:hs)
		{
			System.out.println(h);
		}
		System.out.println("End Print Header "+method);
		System.out.println("###########################");
	}
	
	public static void main(String[] args)throws Exception
	{
		CookieStore cs = new BasicCookieStore();
		
		RequestConfig rc = RequestConfig.custom().setConnectTimeout(6000).build();
		
		CloseableHttpClient client = HttpClients.custom().setKeepAliveStrategy(new DefaultConnectionKeepAliveStrategy())
									.setRedirectStrategy(new DefaultRedirectStrategy()).setDefaultCookieStore(cs)
									.setDefaultRequestConfig(rc).build();

		
		HttpClientContext context = HttpClientContext.create();
		context.setCookieStore(cs);
	
//		Cookie ck = new BasicClientCookie("uid", "3290869");
//		cs.addCookie(ck);
		
		String url = "http://tiku.huatu.com/index.php?mod=User&act=login_412";
		
		post(client, url, context);

		String u1 = "http://tiku.huatu.com/index.php?mod=Administration&act=undone_exams";
		String u2 = "http://tiku.huatu.com/index.php?mod=message&act=message_count";
		
		get(client, u1, context);
		
		printCookieStore(context.getCookieStore(), "After Info 1");

		get(client, u2, context);
		
		printCookieStore(context.getCookieStore(), "After Info 2");
		client.close();
		
	}
}

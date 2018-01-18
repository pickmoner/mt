package mt;

import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;

public class Parameter
{
	List<BasicNameValuePair> para = new ArrayList<BasicNameValuePair>();
	
	public void add(String name, String value)
	{
		para.add(new BasicNameValuePair(name, value));
	}
	
	public HttpEntity toHttpEntity()throws Exception
	{
		return new UrlEncodedFormEntity(para);
	}

}


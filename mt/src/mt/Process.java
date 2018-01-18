package mt;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;

import org.apache.http.client.methods.HttpPost;
import org.json.JSONArray;
import org.json.JSONObject;


public class Process
{
	public  String url;
	public  Excutor excutor;
	
	private ArrayList<Room> available;
	private ArrayList<Room> locked;
	private ArrayList<Room> reserved;
	private HashSet<String> buildings;
	private HashMap<String, Room> index;
	
	private SimpleDateFormat format;
	
	public Process()
	{
		url = "";
		excutor = null;
		
		available = new ArrayList<Room>();
		locked = new ArrayList<Room>();
		reserved = new ArrayList<Room>();
		index = new HashMap<String, Room>();
		buildings = new HashSet<String>();
		
		format = new SimpleDateFormat();
	}
	
	public void loginFirst(User user)throws Exception
	{
		Parameter para  = new Parameter();
		para.add("type", "loginfirst");
		para.add("idcard", user.getId());
		para.add("phone", user.getPhone());
		para.add("keypwd", user.getPassword());
		
		HttpPost post = excutor.createPost(url);
		excutor.doPost(post);
	}
	
	public void getLoginInfo(User user)throws Exception
	{
		Parameter para = new Parameter();
		para.add("type", "getlogininfo");
		
		HttpPost post = excutor.createPost(url);
		post.setEntity(para.toHttpEntity());
		
		String res =   excutor.doPost(post);
		
		JSONObject json = new JSONObject(res);
		
		user.setConsultant(json.getString("zhiyeguwen"));
		user.setHousenum(json.getString("userhousenum"));
		user.setReserved(json.getString("num"));
		user.setIntoTime(json.getString("intotime"));
		
	}
	
	public void getPhase(Global global)throws Exception
	{
		Parameter para = new Parameter();
		para.add("type", "getactjieduan");
		
		HttpPost post = excutor.createPost(url);
		post.setEntity(para.toHttpEntity());
		
		String res =   excutor.doPost(post);
		
		JSONObject json = new JSONObject(res);
		
		global.setPhase(json.getString("info"));
	}
	
	public void getStartAndEnd(Global global)throws Exception
	{
		Parameter para = new Parameter();
		para.add("type", "getstartandend");
		
		HttpPost post = excutor.createPost(url);
		post.setEntity(para.toHttpEntity());
		
		String res =   excutor.doPost(post);
		
		JSONObject json = new JSONObject(res);
		
		global.setStartTime(getTime(json.getString("starttime"), "yyyy,MM,dd,HH,mm,ss"));
		global.setEndTime(getTime(json.getString("endtime"), "yyyy,MM,dd,HH,mm,ss"));
	}
	
	public void getNowTime(Global global)throws Exception
	{
		Parameter para = new Parameter();
		para.add("type", "getnowtime");
		
		HttpPost post = excutor.createPost(url);
		post.setEntity(para.toHttpEntity());
		
		String res =   excutor.doPost(post);

		JSONObject json = new JSONObject(res);
		global.setNowTime(getTime(json.getString("nowtime"), "yyyy,MM,dd,HH,mm,ss"));
	}
	
	public void setHousenum(String housenum)throws Exception
	{
		Parameter para = new Parameter();
		para.add("type", "housenum");
		para.add("housenum", housenum);
		
		HttpPost post = excutor.createPost(url);
		post.setEntity(para.toHttpEntity());
		
		excutor.doPost(post);
	}
	
	public void getBuildingRooms(String building)throws Exception
	{
		Parameter para = new Parameter();
		para.add("type", "getallinfo");
		para.add("area", building);
		
		HttpPost post = excutor.createPost(url);
		post.setEntity(para.toHttpEntity());
		
		String res =   excutor.doPost(post);
		
		JSONObject json = new JSONObject(res);
		
		JSONArray rows = json.getJSONArray("rows");
		
		for(int i=0;i<rows.length();i++)
		{
			JSONObject row = rows.getJSONObject(i);
			Room room = new Room();
			
			room.setBuilding(row.getString("area"));
			room.setNum(row.getString("num"));
			room.setState(row.getString("carstate"));
			room.setRoomId(row.getString("keypwd"));
			
			index.put(room.getBuilding()+"_"+room.getNum(), room);
			
			if(Constants.AVAILABLE.equals(room.getState()))
			{
				available.add(room);
			}else if(Constants.LOCKED.equals(room.getState()))
			{
				locked.add(room);
			}else if(Constants.RESERVED.equals(room.getState()))
			{
				reserved.add(room);
			}
		}
	}
	
	//BuildingRooms Building_Room
	public Room getAvailableRoom(ArrayList<String> buildingRooms)throws Exception
	{
		Room room = null;
		
		for(String br:buildingRooms)
		{
			if(index.containsKey(br))
			{
				room = index.get(br);
				break;
			}else 
			{
				String building =  br.substring(br.indexOf('_'));
				if(!buildings.contains(building))
				{
					getBuildingRooms(building);
					if(index.containsKey(br))
					{
						room = index.get(br);
						break;
					}
				}
			}
		}
		
		if(room==null)
		{
			room=available.get(0)!=null?available.get(0):locked.get(0);
		}
		
		return room;
	}
	
	public void getReserveInfo()throws Exception
	{
		Parameter para = new Parameter();
		para.add("type", "getcheweicount");
		
		HttpPost post = excutor.createPost(url);
		post.setEntity(para.toHttpEntity());
		
		String res =   excutor.doPost(post);
		
	}
	
	public void getRoomInfo(Room room, String captcha)throws Exception
	{
		Parameter para = new Parameter();
		para.add("type", "getinfobyidandkeypwd");
		para.add("area", room.getBuilding());
		para.add("num", room.getNum());
		para.add("keypwd", room.getRoomId());
		para.add("NECaptchaValidate", captcha);
		
		HttpPost post = excutor.createPost(url);
		post.setEntity(para.toHttpEntity());
		
		String res =   excutor.doPost(post);
		
		JSONObject json = new JSONObject(res);
		
		room.setArea(json.getString("mianji"));
		room.setLength(json.getString("length"));
		room.setWidth(json.getString("width"));
		room.setPrice(json.getString("info"));
		room.setTotal(json.getString("price"));
		room.setLockTime(getTime(json.getString("strNow"), "yyyy/MM/dd HH:mm:ss"));
		room.setUnlockTime(getTime(json.getString("strUnlock"), "yyyy/MM/dd HH:mm:ss"));
	}
	
	public void autoUnlock()throws Exception
	{
		Parameter para = new Parameter();
		para.add("type", "autounlock");
		
		HttpPost post = excutor.createPost(url);
		post.setEntity(para.toHttpEntity());
		
		excutor.doPost(post);
	}
	
	public boolean reserve(Room room)throws Exception
	{
		Parameter para = new Parameter();
		para.add("type", "sendbykeypwd");
		para.add("area", room.getBuilding());
		para.add("num", room.getNum());
		para.add("keypwd", room.getRoomId());
		
		HttpPost post = excutor.createPost(url);
		post.setEntity(para.toHttpEntity());
		
		String res =   excutor.doPost(post);
		
		JSONObject json = new JSONObject(res);
		
		return Constants.RESERVED_SUCCESS.equals(json.getString("state"));
	}
	
	public long getTime(String time, String pattern)throws Exception
	{
		format.applyPattern(pattern);
		return format.parse(time).getTime();
	}
	
}

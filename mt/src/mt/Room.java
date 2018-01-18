package mt;

public class Room
{
	private String building;
	private String num;
	private String roomId;
	
	private String state;
	private String area;
	private String length;
	private String width;
	
	private String price;
	private String total;
	
	private long lockTime;
	private long unlockTime;
	
	public String getBuilding()
	{
		return building;
	}
	
	public void setBuilding(String building)
	{
		this.building = building;
	}
	
	public String getNum()
	{
		return num;
	}
	
	public void setNum(String num)
	{
		this.num = num;
	}
	
	public String getRoomId()
	{
		return roomId;
	}
	
	public void setRoomId(String roomId)
	{
		this.roomId = roomId;
	}
	
	public String getState()
	{
		return state;
	}
	
	public void setState(String state)
	{
		this.state = state;
	}
	
	public String getArea()
	{
		return area;
	}
	
	public void setArea(String area)
	{
		this.area = area;
	}
	
	public String getLength()
	{
		return length;
	}
	
	public void setLength(String length)
	{
		this.length = length;
	}
	
	public String getWidth()
	{
		return width;
	}
	
	public void setWidth(String width)
	{
		this.width = width;
	}
	
	public String getPrice()
	{
		return price;
	}
	
	public void setPrice(String price)
	{
		this.price = price;
	}
	
	public String getTotal()
	{
		return total;
	}
	
	public void setTotal(String total)
	{
		this.total = total;
	}
	
	public long getLockTime()
	{
		return lockTime;
	}
	
	public void setLockTime(long lockTime)
	{
		this.lockTime = lockTime;
	}
	
	public long getUnlockTime()
	{
		return unlockTime;
	}
	
	public void setUnlockTime(long unlockTime)
	{
		this.unlockTime = unlockTime;
	}
	
}

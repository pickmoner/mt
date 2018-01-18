package mt;

public class User
{
	private String id;
	private String name;
	private String phone;
	private String password;
	private String consultant;
	private String reserved;
	private String housenum;
	private String intoTime;
	
	public String getId()
	{
		return id;
	}
	
	public void setId(String id)
	{
		this.id = id;
	}
	
	public String getName()
	{
		return name;
	}
	
	public void setName(String name)
	{
		this.name = name;
	}
	
	public String getPhone()
	{
		return phone;
	}
	
	public void setPhone(String phone)
	{
		this.phone = phone;
	}
	
	public String getPassword()
	{
		return password;
	}
	
	public void setPassword(String password)
	{
		this.password = password;
	}
	
	public String getConsultant()
	{
		return consultant;
	}
	
	public void setConsultant(String consultant)
	{
		this.consultant = consultant;
	}
	
	public String getReserved()
	{
		return reserved;
	}
	
	public void setReserved(String reserved)
	{
		this.reserved = reserved;
	}
	
	public boolean isReserved()
	{
		return reserved!=null&&reserved.length()>0;
	}
	
	public String getHousenum()
	{
		return housenum;
	}
	
	public void setHousenum(String housenum)
	{
		this.housenum = housenum;
	}
	
	public String getIntoTime()
    {
	    return intoTime;
    }
	
	public void setIntoTime(String intoTime)
    {
	    this.intoTime = intoTime;
    }
	
}

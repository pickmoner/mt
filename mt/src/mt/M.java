package mt;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

public class M
{
	public static void main(String[] args)throws Exception
	{
		Logger log = LogManager.getLogger();
		
		Process process = new Process();
		
		String  res = "{\"total\":12,\"rows\":[{\"area\":\"D4-1\",\"num\":\"601\",\"carstate\":\"1\",\"keypwd\":\"D6007AA6-166C-4B1C-832A-815F6DA2C46C\"},{\"area\":\"D4-1\",\"num\":\"602\",\"carstate\":\"1\",\"keypwd\":\"74E34232-C00D-4F5D-8A50-740164B26C6A\"},{\"area\":\"D4-1\",\"num\":\"501\",\"carstate\":\"1\",\"keypwd\":\"1529485A-5AFE-4BA4-BD64-D29F691E2D52\"},{\"area\":\"D4-1\",\"num\":\"502\",\"carstate\":\"1\",\"keypwd\":\"302B347A-7ACC-421F-814E-9CCE7E08412B\"},{\"area\":\"D4-1\",\"num\":\"401\",\"carstate\":\"1\",\"keypwd\":\"8B09448F-4853-429D-B255-2452A66F172B\"},{\"area\":\"D4-1\",\"num\":\"402\",\"carstate\":\"1\",\"keypwd\":\"63F31B8B-613A-4C9B-AE87-B42583C3159D\"},{\"area\":\"D4-1\",\"num\":\"301\",\"carstate\":\"1\",\"keypwd\":\"9582B4BF-EFA4-459E-B61D-20C1CFCC3EA4\"},{\"area\":\"D4-1\",\"num\":\"302\",\"carstate\":\"1\",\"keypwd\":\"ED0A690A-D79E-4BDF-A647-32D400317F6E\"},{\"area\":\"D4-1\",\"num\":\"201\",\"carstate\":\"1\",\"keypwd\":\"D333B612-CFE6-44E1-A166-F692F7131FD4\"},{\"area\":\"D4-1\",\"num\":\"202\",\"carstate\":\"0\",\"keypwd\":\"FDBF9B05-2CC1-40EB-9518-FBEB05D09887\"},{\"area\":\"D4-1\",\"num\":\"101\",\"carstate\":\"1\",\"keypwd\":\"7B172F94-96BE-4E44-B111-5A6B03BAECA6\"},{\"area\":\"D4-1\",\"num\":\"102\",\"carstate\":\"0\",\"keypwd\":\"22471AA1-AB58-475F-864A-5083508F840E\"}]}";
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
			
//			index.put(room.getBuilding()+"_"+room.getNum(), room);
			
			if(Constants.AVAILABLE.equals(room.getState()))
			{
//				available.add(room);
				log.info("AVALIABLE:"+room.getBuilding()+"	"+room.getNum());
			}else if(Constants.LOCKED.equals(room.getState()))
			{
//				locked.add(room);
				log.info("LOCKED:"+room.getBuilding()+"	"+room.getNum());
			}else if(Constants.RESERVED.equals(room.getState()))
			{
//				reserved.add(room);
				log.info("RESERVED:"+room.getBuilding()+"	"+room.getNum());
			}
		}
		
	}
}

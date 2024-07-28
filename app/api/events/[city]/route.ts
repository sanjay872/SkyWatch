import { getEventsByCity } from "@/app/services/getEvents";


export const POST=async (req:any,{params}: {params: any})=>{
    const { city } = params;
    try{
      const json = await getEventsByCity(city);
      return new Response(json, { status: 200 });
    }
    catch(e){
      return new Response("Failed to get data", { status: 500 });
    }
}
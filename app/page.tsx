"use client";
import "./styles/Home.css";
import Image from 'next/image';
import { FormEvent, useState } from "react";
import { getWeather,getWeatherByCity } from "./services/getWeather";
import Popup from 'reactjs-popup';
import EventCard from "./components/EventCard";

export default function Home() {
  const [report, setReport] = useState<WeatherReport>({
    tempMax: 0,
    tempMin: 0,
    description: "",
    location: "",
    icon: ""
  });
  const [event, setEvent] = useState<EventInfo[]>([]);
  const [location, setLocation] = useState<string>("");
 
  function getMyCityReport(){
      // main code
      navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
       getWeather(latitude, longitude).then((data) => {
        const report: WeatherReport = {
          tempMax: data.days[0].tempmax,
          tempMin: data.days[0].tempmin,
          description: data.days[0].conditions,
          location: data.timezone,
          icon: data.days[0].icon
        };
        setReport(report);
      })
      });
      //console.log("button clicked");
  }
  function getCityReport(e:FormEvent){
    e.preventDefault();
    if(location!==""&&location!==null){
      getWeatherByCity(location).then((data) => {
        const report: WeatherReport = {
          tempMax: data.days[0].tempmax,
          tempMin: data.days[0].tempmin,
          description: data.days[0].conditions,
          location: data.timezone,
          icon: data.days[0].icon
        };
        setReport(report);
      })
    }
  }
  async function getEvents(){
    // get events
    const curLocation=report.location.split("/")[1];
    // if(curLocation){
    //   getEventsByCity(curLocation).then((data:EventInfo[]) => {
    //     console.log(data);
    //     setEvent(data);
    //   })
    // }
    const res = await fetch(`/api/events/${curLocation}`,{
      method:"POST",
      // headers:{
      //   'Content-Type':'application/json'
      // },
      body:JSON.stringify({
        city:curLocation})
    })
    const data = await res.json();
    console.log(data);
    setEvent(data);
  }
  return (
    <div className="bg_img flex flex-col items-center justify-center gap-5">
      <div className=" flex flex-col justify-center items-center gap-4 bg_transparent">
      <h1 className="font-bold text-2xl text-white">Weather App</h1>  
      <div className="flex gap-4 items-center justify-center">
        <div className="flex flex-col gap-2 items-center justify-center border-r-2 border-b-yellow-950 mr-1 pr-2">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={getMyCityReport}>
            Get My City Report
          </button>
          <div>Or</div>
          <form className="flex flex-col items-center justify-center gap-4" onSubmit={e=>getCityReport(e)}>
            <input required type="text" value={location} onChange={(e)=>setLocation(e.target.value)} placeholder="Enter City Name" className="border-2 border-black rounded-lg p-2 text-center text-black" />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Get City Report
              </button>
          </form>
        </div>
        { report && report.location &&
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
             <h2 id="location">{report.location}</h2>
             <Popup onOpen={getEvents} trigger={<button className="bg-slate-600 text-white font-bold test-xl p-2 rounded-lg">Click to know about upcoming events?</button>} position="right center" modal nested>
              <div className="modal">
              <div className="header">Events</div>
              <div className="content">
                <div className="flex flex-col gap-4 items-center justify-center">
                  {event && event.length>0 && event.map((item:EventInfo,index)=>
                    <EventCard key={index} title={item.title} description={item.description} start_date={item.date.start_date}  />
                  )}
                </div>
              </div>
            </div>
            </Popup>
             {report.icon && <Image src={"/icons/"+report.icon+".svg"} alt="weather icon" width={200} height={200} className="p-2" />}
            </div>
            <div className="flex flex-col gap-4 items-center justify-center text-lg text-white">
                <div className="flex gap-10">
                  <div id="temperature" className="flex justify-between gap-5 items-center">
                    <div id="tempMax">Max: {report.tempMax}<span>&deg;C</span></div> 
                    <div id="tempMin">Min: {report.tempMax}<span>&deg;C</span></div>
                  </div>
                </div>
                <p id="description">{report.description}</p>
            </div>
          </div>
        }
    </div>
    </div>
    </div>
   
  );
}

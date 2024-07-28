"use client";
import "./styles/Home.css";
import Image from 'next/image';
import { useState } from "react";
import { getWeather,getWeatherByCity } from "./services/getWeather";

export default function Home() {
  const [report, setReport] = useState<WeatherReport>({
    tempMax: 0,
    tempMin: 0,
    description: "",
    location: "",
    icon: ""
  });
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
  function getCityReport(){
    if(location){
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
          <form className="flex flex-col items-center justify-center gap-4">
            <input required type="text" value={location} onChange={(e)=>setLocation(e.target.value)} placeholder="Enter City Name" className="border-2 border-black rounded-lg p-2 text-center text-black" />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={getCityReport}>
              Get City Report
              </button>
          </form>
        </div>
        { report &&
          <div className="flex flex-col items-start justify-center">
            <div className="flex flex-col items-center justify-center">
             <h2 id="location">{report.location}</h2>
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

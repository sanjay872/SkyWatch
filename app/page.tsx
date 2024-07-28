"use client";

import getWeather from "./services/getWeather";

export default function Home() {
  function handleOnClick(){
      // main code
      // navigator.geolocation.getCurrentPosition((position) => {
      // const { latitude, longitude } = position.coords;
      // getWeather(latitude, longitude).then((data) => {
      //   console.log(data);
      // })
      // });
      console.log("button clicked");
  }
  return (
   <div className="flex items-center justify-center">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleOnClick}>
        Get Weather Report
      </button>
   </div>
  );
}

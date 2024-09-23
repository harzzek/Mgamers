import Image from "next/image";
import Navbar from "./components/navbar";
import { fetchWeatherData } from '../app/services/weatherService';
import Weather from "./components/Weather";
import { useEffect, useState } from 'react';
import WeatherData from "./components/WeatherData";

const Home: React.FC = () => {

  return (
    <div>
      <Navbar />
      <div className="w-full aspect-auto">
        <div className="">
          <div>
            This is a start
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </div>
          <div>
            <h1>Header</h1>
            <p>Paragraph</p>

            <WeatherData />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

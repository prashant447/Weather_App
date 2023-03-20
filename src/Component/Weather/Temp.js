
import React, {useState, useEffect} from 'react'
import './style.css'
import WeatherCard from './WeatherCard';

const Temp = () => {
             
        const [searchvalue, setSearchValue] = useState("Dehradun");
        const [tempInfo, setTempInfo] = useState("");
       
        const getWeatherInfo = async() =>{
                  try {
                    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchvalue}&units=metric&APPID=9b09bc2ef74086921c0a68f1bbcee26a`; 
                    const res = await fetch(url);
                    const data = await res.json();
                    

                    const {temp, pressure, humidity} = data.main
                    const {main:weathermood} = data.weather[0];
                    const {name} = data;
                    const {speed} = data.wind;
                    const{country, sunset} = data.sys;

                    const myWeatherInfo = {temp, pressure, humidity, name, speed, country, sunset, weathermood}
                    setTempInfo(myWeatherInfo);
                    
                  } catch (error) {
                     console.log(error);
                  }
        }

         useEffect(() => {
            getWeatherInfo();
         }, []);
         


        return(
    <>
      <div className='wrap'>
        <div className='search'>
           <input type="search" placeholder='search' id='search' className='searchTerm'  value={searchvalue} onChange = { (e) =>{setSearchValue(e.target.value)}}/>

           <button className='searchButton' type='button' onClick={getWeatherInfo}>Search</button>
        </div>
      </div>

      {/* our temp card */}
      <WeatherCard tempInfo = {tempInfo}/>
      
    </>
  )
}

export default Temp

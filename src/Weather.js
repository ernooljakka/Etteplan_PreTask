import { useState, useEffect } from "react";

const Weather = ({city, latitude, longitude}) => {

    const [weatherData, setWeatherData] = useState(null);
    const [weatherData3h, setWeatherData3h] = useState(null);
    /* Your API KEY here */
    const API_KEY = ""; 
    const today = new Date(); /* {today.getHours() + ":" + today.getMinutes()} */

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    const getDaySuffix = (day) => {
        if (day >= 11 && day <= 13) {
          return "th";
        }
        switch (day % 10) {
          case 1:
            return "st";
          case 2:
            return "nd";
          case 3:
            return "rd";
          default:
            return "th";
        }
      }


    /* Fetching the data for current weather*/
    useEffect(() => {
        fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + API_KEY + '&units=metric')
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
            setWeatherData(data);
        })
        .catch(err => {
            console.log(err);
            throw(err);
        })
        

    }, [city, latitude, longitude]);

    /* Fetching the forecast data*/
    useEffect(() => {
        fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' + API_KEY + '&units=metric')
        .then(res => {
            return res.json();
        })
        .then(data => {
            setWeatherData3h(data);
        })
        .catch(err => {
            console.log(err);
            throw(err);
        })
    }, [city, latitude, longitude]);



    /* UseEffect to console the data we are getting from the API */
    useEffect(() => {
        console.log(weatherData);
        console.log(weatherData3h)
    }, [weatherData, weatherData3h]);


    return (
        <div className="weather-content">
          <div className="weather-rn">
                <article className="left"> 
                    <p className="city"> {city}</p> 
                    { weatherData && <p className="faded"> {weatherData.weather[0].description} </p> }
                </article>
                { weatherData &&<div className="right" id="temp"> <p className="marginright"><img  src={'https://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '@2x.png'} alt="icon displaying how the weather is" /></p> 
                <p className="temperatureCur"> {Math.round(weatherData.main.temp)} °C</p> </div> }
                <article className="left"> 
                    <p> {monthNames[today.getMonth()] + ' ' + today.getDate() + getDaySuffix(today.getDate())} </p>
                    <p> {today.getHours() + ":" + today.getMinutes()} </p>
                </article>
                <article className="right"> 
                    { weatherData && <p className="faded"> {'Wind: ' + weatherData.wind.speed + ' m/s'}</p> }
                    { weatherData && <p className="faded"> {'Humidity: ' + weatherData.main.humidity + '%'} </p> }
                    { weatherData3h && <div> 
                        {weatherData3h.list[0].hasOwnProperty("rain") && <p className="faded"> {'Precipiation (3h): ' + parseInt(weatherData3h.list[0].rain["3h"], 10) + 'mm' }  </p>}
                        {weatherData3h.list[0].hasOwnProperty("snow") && <p className="faded"> {'Precipiation (3h): ' + parseInt(weatherData3h.list[0].snow["3h"], 10) + 'mm' }  </p>}
                        {!weatherData3h.list[0].hasOwnProperty("rain") && !weatherData3h.list[0].hasOwnProperty("snow") && <p className="faded"> Precipiation (3h): 0mm </p>}
                    </div> }
                </article>
            </div>  
            { weatherData3h && <div className="weather-3hour">
                {weatherData3h.list.slice(1, 6).map((element, index) => {
                    /* getting the correct time for each 3 hour parts */
                    let time = element.dt_txt.split(' ');
                    let time2 = time[1].split(":")
                    let timeToDisplay = time2[0] + ":" + time2[1]
                    return (
                    <div className="hour3" key={index}> 
                        <p className="faded"> {timeToDisplay} </p>
                        <img  src={'https://openweathermap.org/img/wn/' + element.weather[0].icon + '@2x.png'} alt="icon displaying how the weather is"/>
                        <p className="temp2">{Math.round(weatherData3h.list[0].main.temp)} °C </p>
                        <div className="hour3-secondpart">
                            <p className="smallInfo"> {weatherData3h.list[0].wind.speed + ' m/s'} </p>
                            <p className="smallInfo"> {weatherData3h.list[0].main.humidity + '%'} </p>
                            {weatherData3h.list[0].hasOwnProperty("rain") && <p className="smallInfo"> {Math.round(weatherData3h.list[0].rain["3h"]) + 'mm' }  </p>}
                            {weatherData3h.list[0].hasOwnProperty("snow") && <p className="smallInfo"> {Math.round(weatherData3h.list[0].snow["3h"]) + 'mm' }  </p>}
                            {!weatherData3h.list[0].hasOwnProperty("rain") && !weatherData3h.list[0].hasOwnProperty("snow") && <p className="smallInfo"> Precipiation (3h): 0mm </p>}
                        </div>   
                    </div>
                    )
                })} 
            </div> }
        </div> 
    );

}


export default Weather;
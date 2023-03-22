import { useState } from "react";
import Weather from './Weather.js';

/* constants for cities we are using with added option of displaying every city */
const cities = [
    { name: 'Kaikki kaupungit'},
    { name: 'Tampere', lat: 61.4991, lon: 23.7871 },
    { name: 'Jyväskylä', lat: 62.2415, lon: 25.7209 },
    { name: 'Kuopio', lat: 62.8924, lon: 27.677 },
    { name: 'Espoo', lat: 60.25, lon: 24.6667 },
  ];

const cities2 = [
    { name: 'Tampere', lat: 61.4991, lon: 23.7871 },
    { name: 'Jyväskylä', lat: 62.2415, lon: 25.7209 },
    { name: 'Kuopio', lat: 62.8924, lon: 27.677 },
    { name: 'Espoo', lat: 60.25, lon: 24.6667 },
  ];

const Content = () => {
    /* useStates to handle changes in the drop-down menu 
       Also the case if user decides to show all the cities.
    */ 
    const [selectedCity, setSelectedCity] = useState(cities[0]);
    const [showAllCities, setShowAllCities] = useState(true);
    const [show, setShow] = useState(false);

    /* event handling when drop-down menu value changes */
    const handleCityChange = (event) => {
        const city = cities.find(c => c.name === event.target.value);
        console.log(city);
        if (city.name === "Kaikki kaupungit") {
            setShowAllCities(true);
            setSelectedCity(city);
        } else {
            setShowAllCities(false);
            setSelectedCity(city);
        }
        setShow(true);
      };

    /* returns the drop-down menu and also the weather data. Fetching of the weather data happens in 
    Weather.js file.
    */ 
    return (
        <div className="x">
            <select id="city-select">
                {cities.map(city => (
                    <option key={city.name} value={city.name} onClick={handleCityChange}>
                    {city.name}
                </option>
                ))}
            </select>
            { show && <div className="weather-info">
                {showAllCities && 
                <div>
                    {cities2.map(city => (
                        <Weather key={city.name} city={city.name} latitude={city.lat} longitude={city.lon} />  
                    ))}
                    
                </div>}
                {!showAllCities && 
                <div> 
                    <Weather city={selectedCity.name} latitude={selectedCity.lat} longitude={selectedCity.lon} />
                </div>}
            </div> }

        </div>
    );
}



export default Content;
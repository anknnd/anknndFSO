import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ countryInfo }) => {
    const languageRows = countryInfo.languages.map(e => <li key={e.name}>{e.name}</li>)
    const [weatherData, setWeatherData] = useState({})
    //console.log('renderCountry')

    const weatherHook = () => {
        //console.log(countryInfo)
        axios
            .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHERSTACK_API_KEY}&query=${countryInfo.name}`)
            .then(response => {
                const weatherResponse = response.data;
                //console.log(weatherResponse)
                if(weatherResponse.hasOwnProperty('current'))
                    setWeatherData(weatherResponse.current)
            })
    }

    useEffect(weatherHook, [])

    if(weatherData.hasOwnProperty('weather_code')){
        return (
            <div>
                <h1>{countryInfo.name}</h1>
                <p>capital {countryInfo.capital}</p>
                <p>population {countryInfo.population}</p>
                <h3>languages</h3>
                <ul>{languageRows}</ul>
                <img src={countryInfo.flag} alt={countryInfo.name} width="150" />
                <h3>Weather in {countryInfo.capital}</h3>
                <p><strong>temperature:</strong> {weatherData.temperature} Celsius</p>
                <img src={weatherData.weather_icons.length > 0 ? weatherData.weather_icons[0] : ''} alt={weatherData.weather_descriptions.length > 0 ? weatherData.weather_descriptions[0] : ''} />
                <p><strong>wind:</strong> {weatherData.wind_speed} kph direction {weatherData.wind_dir}</p>
            </div>
        )
    }

    return (
        <div>
            <h1>{countryInfo.name}</h1>
            <p>capital {countryInfo.capital}</p>
            <p>population {countryInfo.population}</p>
            <h3>languages</h3>
            <ul>{languageRows}</ul>
            <img src={countryInfo.flag} alt={countryInfo.name} />
        </div>
    )    
}

export default Country
import { Button, Input } from 'antd'
import { RiMistLine } from 'react-icons/ri';
import { WiDayFog, WiDaySunny, WiHumidity, WiRain, WiSmoke, WiSunset } from 'react-icons/wi';
import { TiWeatherCloudy, TiWeatherDownpour, TiWeatherWindy } from 'react-icons/ti';

import React, { useEffect, useState } from 'react'

function Weather() {

    const [searchValue, setSearchValue] = useState('JAIPUR')
    const [width, setWidth] = useState(window.screen.width)
    const [height, setHeight] = useState(window.screen.height)
    const [tempInfo, setTempInfo] = useState({})
    const [weatherMood, setWeatherMood] = useState(<WiSunset />)
    const { temp, humidity, pressure, speed, main, sunset, country, city } = tempInfo

    let date = new Date(sunset * 1000)
    let timeStr = `${date.getHours()}:${date.getMinutes()}`
    let todayDateTime = new Date()
    let dates = todayDateTime.getDate() + ' / ' + (todayDateTime.getMonth() + 1) + ' / ' + todayDateTime.getFullYear();

    let timeToday = todayDateTime.getHours() + ':' + todayDateTime.getMinutes() + ':' + todayDateTime.getSeconds();
    const temperature = (temp - 273.15).toFixed()

    const getWeather = async () => {

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=7034f074ab73b1a53cdf428b90640521`
        let res = await fetch(url)
        let data = await res.json()
        const { temp, humidity, pressure } = data.main
        const { speed } = data.wind
        const { main } = data.weather[0]
        const { sunset, country } = data.sys
        const city = data.name

        const weatherInfo = { temp, humidity, pressure, speed, main, sunset, country, city }
        setTempInfo(weatherInfo)
    }

    const screenWidth = () => {
        setWidth(() => window.innerWidth)
    }

    const screenHeight = () => {
        setHeight(() => window.innerHeight)
    }

    useEffect(() => {
        console.log('use');
        window.addEventListener('resize', screenHeight)
        window.addEventListener('resize', screenWidth)
        return () => {
            window.removeEventListener('resize', screenHeight)
            window.removeEventListener('resize', screenWidth)
        }
    }, [width,height])

    useEffect(() => {
        getWeather()
        if (main) {
            switch (main) {
                case 'Clouds':
                    setWeatherMood(<TiWeatherCloudy />);
                    break;
                case 'Haze':
                    setWeatherMood(<WiDayFog />);
                    break;
                case 'Rain':
                    setWeatherMood(<WiRain />);
                    break;
                case 'Clear':
                    setWeatherMood(<WiDaySunny />);
                    break;
                case 'Smoke':
                    setWeatherMood(<WiSmoke />);
                    break;
                case 'Sunny':
                    setWeatherMood(<WiDaySunny />);
                    break;
                case 'Mist':
                    setWeatherMood(<RiMistLine />);
                    break;
                default:
                    setWeatherMood(<WiDaySunny />);
                    break;
            }
        }
    }, [main])

    return (
        <>
            <div className='weather-wrap'>
                <h2 className='screen-width' >Screen Width: {width}</h2>
                <h2 className='screen-width' >Screen height: {height}</h2>

                <div>
                    <Input autoFocus className='input-search' type='search' value={searchValue} onChange={(e) => setSearchValue(e.target.value.toUpperCase().trim())} /><Button onClick={() => getWeather()} >Search</Button>
                </div>
                <div className='weather-details'>
                    <div className='weather-mood' >
                        {weatherMood}
                    </div>
                    <div className='temp-date-time'>

                        <div className='temp-mood'><p className='temperature'>{temperature ? temperature.replace('.00', '') : temperature}&#8451;</p></div>
                        <div className='mood'>{main}<p className='city-place' >{city + ", " + country}</p></div>
                        <div className='date-time'><span>{dates} </span>
                            <span> {timeToday}</span></div>
                    </div>
                    <div className='other-weather-details'>
                        <div className='detils-icon'>
                            <p className='weather-icon'>
                                <span><WiSunset /> </span>
                            </p><p className='weather-icon-details'>
                                <span>{timeStr} </span>
                                <span>sunset</span>
                            </p>
                        </div>
                        <div className='detils-icon'>
                            <p className='weather-icon'>

                                <span><WiHumidity /></span>
                            </p><p className='weather-icon-details'>
                                <span>{humidity} </span>
                                <span>humidity</span>
                            </p>
                        </div>
                        <div className='detils-icon'>
                            <p className='weather-icon'>
                                <span><TiWeatherDownpour /> </span>
                            </p><p className='weather-icon-details'>
                                <span>{pressure} </span>
                                <span>pressure</span>
                            </p>
                        </div>
                        <div className='detils-icon'>
                            <p className='weather-icon'>
                                <span><TiWeatherWindy /></span>
                            </p><p className='weather-icon-details'>
                                <span>{speed} </span>
                                <span>speed</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Weather
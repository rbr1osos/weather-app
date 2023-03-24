import './styles.css'
import {timeDifference} from './functions.js'
/* Need to do 
    - Need to round feels like weather temp(F)
    - create function that shows if its 'clear sky' 'windy' 'rain'
*/

const title_h2 = document.querySelector('.title')
const temp_h1 = document.querySelector('.temp')
const weather_h3 = document.querySelector('.weather-type')
const feel_h3 = document.querySelector('.feel-like')

async function getWeather(){
    const weatherResponse = await fetch('https://api.weatherapi.com/v1/current.json?key=8c3a53840fda484d95933559232303&q=oakland', {mode: 'cors'});
    const weatherData = await weatherResponse.json();
    const forecastResponse = await fetch('https://api.weatherapi.com/v1/forecast.json?key=8c3a53840fda484d95933559232303&q=oakland', {mode: 'cors'});
    const forecastData = await forecastResponse.json();
    displayWeather(weatherData,forecastData)
}
getWeather();

function displayWeather(data,forecast){
    //CONTAINS INFO ABOUT EACH HOUR FOR TODAY from 0-24h
    const forecastArray=forecast.forecast.forecastday[0].hour

    //meta data
    for(let i=0;i<forecastArray.length;i++){
        showHourData(forecastArray[i])
    }
    function showHourData(data){
        const container = document.querySelector('.hourly-content-container')
        const content= document.createElement('div')
        content.classList.add('hour-container')

        const hour = document.createElement('p')
        hour.classList.add('hour-time')
        hour.innerHTML= timeDifference(data.time)

        const temp = document.createElement('p')
        temp.classList.add('hour-temp')
        temp.innerHTML= data.temp_f+'°'
        
        content.appendChild(hour)
        content.appendChild(temp)
        container.appendChild(content)
    }


    //display
    title_h2.innerHTML= data.location.name
    temp_h1.innerHTML = data.current.temp_f //round it out
    weather_h3.innerHTML = 'clear sky'




}

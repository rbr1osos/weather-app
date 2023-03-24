import './styles.css'
import {showHourData} from './functions.js'
/* Need to do 
    - Need to round feels like weather temp(F)
    - create function that shows if its 'clear sky' 'windy' 'rain'
*/
const title_h2 = document.querySelector('.title')
const temp_h1 = document.querySelector('.temp')
const weather_h3 = document.querySelector('.weather-type')
const feel_h3 = document.querySelector('.feel-like')
const search_button = document.querySelector('.search-button')
const search_input = document.getElementById('search')
const UV_input=document.querySelector('.UV')
const wind_input=document.querySelector('.wind')
const humidity_input=document.querySelector('.humidity')
const chance_input=document.querySelector('.chance')
const sunrise_input=document.querySelector('.sunrise')
const sunset_input=document.querySelector('.sunset')
const pressure_input=document.querySelector('.pressure')
const visibility_input=document.querySelector('.visibility')

getWeather('San Francisco')

search_button.addEventListener('click',()=>{
    getWeather(search_input.value)
})

search_input.addEventListener('input',()=>{
    getWeather(search_input.value)
})

async function getWeather(input){
    const weatherResponse = await fetch('https://api.weatherapi.com/v1/current.json?key=8c3a53840fda484d95933559232303&q='+input, {mode: 'cors'});
    const weatherData = await weatherResponse.json();
    const forecastResponse = await fetch('https://api.weatherapi.com/v1/forecast.json?key=8c3a53840fda484d95933559232303&q='+input, {mode: 'cors'});
    const forecastData = await forecastResponse.json();
    displayWeather(weatherData,forecastData)
}

function displayWeather(data,forecast){
    //CONTAINS INFO ABOUT EACH HOUR FOR TODAY from 0-24h
    console.log(forecast.forecast.forecastday[0])
    const forecastArray=forecast.forecast.forecastday[0].hour

    //meta data
    for(let i=0;i<forecastArray.length;i++){
        showHourData(forecastArray[i])
    }

    //display
    title_h2.innerHTML= data.location.name
    temp_h1.innerHTML = data.current.temp_f //round it out
    weather_h3.innerHTML = 'clear sky'
    UV_input.innerHTML= forecast.forecast.forecastday[0].day.uv
    //--need UV desc
    wind_input.innerHTML = forecast.forecast.forecastday[0].day.maxwind_mph
    //--need wind desc
    humidity_input.innerHTML = forecast.forecast.forecastday[0].day.avghumidity
    chance_input.innerHTML =  forecast.forecast.forecastday[0].day.daily_chance_of_rain +'%'
    sunrise_input.innerHTML = forecast.forecast.forecastday[0].astro.sunrise
    sunset_input.innerHTML = forecast.forecast.forecastday[0].astro.sunset
    //pressure need to add current pressure and DESC
    visibility_input.innerHTML =  forecast.forecast.forecastday[0].day.avgvis_km+'km' //km
    //add desc

}
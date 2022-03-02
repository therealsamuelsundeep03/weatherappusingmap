// // opening a popup
// window.addEventListener("load",()=>{
//   setTimeout(()=>{
//     let popup = document.getElementsByClassName("popup")[0];
//     popup.style.display = "block";
//     popup.style.transistion = "all 2s ease-in-out";
//   },5000)
// })
// // closing a popup
// let close = document.getElementsByClassName("close")[0];
// close.addEventListener("click",()=>{
//   let popup = document.getElementsByClassName("popup")[0];
//   popup.style.display = "none";
// })
// city name.
function getcityname(){
  let city = document.getElementById('city');
  getdataofacity(city.value);
  document.querySelector('form').reset();
}
//asigning variables.   
let city_name= document.getElementById('city_name');
let description= document.getElementById("desc");
let temp= document.getElementById('temp');
let pressure= document.getElementById('pressure');
let humid= document.getElementById('humidity');
let icon= document.getElementById('icon');
let day1= document.getElementById('day1');
let icon1= document.getElementById('icon1');
let temp1= document.getElementById('temp1');
let day2= document.getElementById('day2');
let icon2= document.getElementById('icon2');
let temp2= document.getElementById('temp2');
let day3= document.getElementById('day3');
let icon3= document.getElementById('icon3');
let temp3= document.getElementById('temp3');
let now=document.getElementById("now");
let icon_now=document.getElementById("icon-now");
let temp_now=document.getElementById("temp-now");
let onehr=document.getElementById("1hr");
let icon_1hr=document.getElementById("icon-1hr");
let temp_1hr=document.getElementById("temp-1hr");
let twohr=document.getElementById("2hr");
let icon_2hr=document.getElementById("icon-2hr");
let temp_2hr=document.getElementById("temp-2hr");
let thirdhr=document.getElementById("3hr");
let icon_3hr=document.getElementById("icon-3hr");
let temp_3hr=document.getElementById("temp-3hr");
let fourthhr=document.getElementById("4hr");
let icon_4hr=document.getElementById("icon-4hr");
let temp_4hr=document.getElementById("temp-4hr");
var tom= dayjs().add(1, 'day').format('dddd');
var secday= dayjs().add(2, 'day').format('dddd');
var thirdday= dayjs().add(3, 'day').format('dddd');

//data of the city(getting city's lat and long) to pass the values to getweatherdata func to get weather.
async function getdataofacity(city){
  let resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=91a9a773ca34f1cca34cd70c4963969d`);
  let data = await resp.json();
  let lat= data.coord.lat;
  let long= data.coord.lon;
  console.log(lat,long)
  mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtdWVsc3VuZGVlcCIsImEiOiJja3R1MW9lMTgwNmthMm9teGx1bzNmbTk2In0.4dW0XuRnfn0MV1uK1_eYkA';

  //to mark the searched location
  var map = new mapboxgl.Map({
  container: 'map',
  center: [long,lat], 
  zoom:7,
  style:'mapbox://styles/samuelsundeep/cktvkjaj52d1a18o4kclfdc23'
  }); 
  let marker = new mapboxgl.Marker({draggable:true})
  .setLngLat([long,lat])
  .addTo(map);
  
  function onDragEnd() {
    const lngLat = marker.getLngLat();
    console.log(lngLat.lat,lngLat.lng);
    getplacefromcoord(lngLat.lng,lngLat.lat);
  }
  marker.on('dragend', onDragEnd);
  getweatherdata(lat,long,city);
}

//default location of the marker
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtdWVsc3VuZGVlcCIsImEiOiJja3R1MW9lMTgwNmthMm9teGx1bzNmbTk2In0.4dW0XuRnfn0MV1uK1_eYkA';
var map = new mapboxgl.Map({
container: 'map',   
center: [80.2707,13.0827], 
zoom:7,
style: 'mapbox://styles/samuelsundeep/cktvkjaj52d1a18o4kclfdc23'
});
const marker = new mapboxgl.Marker({draggable:true})
.setLngLat([80.2707,13.0827])
.addTo(map)   

//to add dragging of the marker and to get the weather of the marked location.
function onDragEnd() {
  const lngLat = marker.getLngLat();
  console.log(lngLat.lat,lngLat.lng);
  getplacefromcoord(lngLat.lng,lngLat.lat);
}
marker.on('dragend', onDragEnd);

//the side bar which displays the details of the weather.
function toggleSidebar(id) {
  const elem = document.getElementById(id);
  const collapsed = elem.classList.toggle('collapsed');
  const padding = {};
  // to reposition the map to the  direction of the side bar
  padding[id] = collapsed ? 0 : 300; 
  map.easeTo({
  padding: padding,
  duration: 1000
  });
  }  
  map.on('load', () => {
  toggleSidebar('left');
  });
// default city
  function defaultcity(){
    getdataofacity("chennai");
    // getplacefromcoord(80.2785,13.0878)
  }
  defaultcity();
//weather data.
getweatherdata=async(lat,long,city)=>{
  try{
  let resp= await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=91a9a773ca34f1cca34cd70c4963969d`);
  let data= await resp.json();
  // current description of weather
  city_name.innerHTML=city.toUpperCase();
  description.innerHTML=data.current.weather[0].main;
  temp.innerHTML= Math.round(data.current.temp-(273.15))+"&#8451";
  icon.src= `http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`;                           
  pressure.innerHTML= "Pressure:" + data.current.pressure;
  humid.innerHTML= "Humidity:" + data.current.humidity;
  // next 5hr weather
  now.innerHTML=new Date().getHours();
  icon_now.src=`http://openweathermap.org/img/wn/${data.hourly[0].weather[0].icon}.png`
  now.innerHTML=new Date().getHours();
  icon_now.src=`http://openweathermap.org/img/wn/${data.hourly[0].weather[0].icon}.png`;
  temp_now.innerHTML=Math.round(data.hourly[now.innerHTML].temp-(273.15))+"&#8451";
  onehr.innerHTML=new Date().getHours()+1;
  icon_1hr.src=`http://openweathermap.org/img/wn/${data.hourly[0].weather[0].icon}.png`;
  temp_1hr.innerHTML=Math.round(data.hourly[onehr.innerHTML].temp-(273.15))+"&#8451";
  twohr.innerHTML=new Date().getHours()+2;
  icon_2hr.src=`http://openweathermap.org/img/wn/${data.hourly[0].weather[0].icon}.png`;
  temp_2hr.innerHTML=Math.round(data.hourly[twohr.innerHTML].temp-(273.15))+"&#8451";
  thirdhr.innerHTML=new Date().getHours()+3;
  icon_3hr.src=`http://openweathermap.org/img/wn/${data.hourly[0].weather[0].icon}.png`;
  temp_3hr.innerHTML=Math.round(data.hourly[thirdhr.innerHTML].temp-(273.15))+"&#8451";
  fourthhr.innerHTML=new Date().getHours()+4;
  icon_4hr.src=`http://openweathermap.org/img/wn/${data.hourly[0].weather[0].icon}.png`;
  temp_4hr.innerHTML=Math.round(data.hourly[fourthhr.innerHTML].temp-(273.15))+"&#8451"
  //forecating 3days weather.
  day1.innerHTML= tom;
  icon1.src= `http://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}.png`
  temp1.innerHTML= Math.round(data.daily[0].temp.day-(273.15))+"&#8451";
  day2.innerHTML= secday;
  icon2.src= `http://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}.png`
  temp2.innerHTML= Math.round(data.daily[1].temp.day-(273.15))+"&#8451";
  day3.innerHTML= thirdday;
  icon3.src= `http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}.png`
  temp3.innerHTML= Math.round(data.daily[2].temp.day-(273.15))+"&#8451";
  console.log("sam")
  
}
catch(errors){
  // console.log(errors);
  let error= document.createElement("p");
  error.innerHTML=(`${"1. check your internet connectivity."}
                    ${"2. your searched location of the weather may not be in my radar"}`);
}   
}

//reverse geocoding(to get the weather data from the position of the marker)
async function getplacefromcoord(long,lat){
  let resp= await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?types=place&limit=1&access_token=pk.eyJ1Ijoic2FtdWVsc3VuZGVlcCIsImEiOiJja3R1MW9lMTgwNmthMm9teGx1bzNmbTk2In0.4dW0XuRnfn0MV1uK1_eYkA`);
  let data=await resp.json();
  let city=data.features[0].text;
  console.log(data,long,lat,city)
  //getting the weather of the marked location.
  getweatherdata(lat,long,city);
}
// Assignment 1 - Create an API-key on openweathermaps.com using a browser, and store this in a variable.
// Correct answer:
let apiKey = "c7d6b1959579335813b946da059d652b";

//Assignment 2 - Figure out how the OpenWeatherMaps API-works, then build a function which takes two arguements: city and apiKey.
//The function will then return the full URL.
//Verify that the URL is working through your browser. The outcome will be an object formatted in JSON.
//Correct answer:
let urlBuilder = function (city, apiKey) {
    const urlBase = "http://api.openweathermap.org/data/2.5/weather?q=";
    return urlBase + city + "&APPID=" + apiKey;
};
// verify it's working by calling the function and logging the output to the console.
// correct answer
var urlAmsterdam = urlBuilder("Amsterdam", apiKey);
console.log(urlAmsterdam);

// Assignment 3 - Finish the function below to create an async await function. The purpose of this function is to make sure the API call waits till the Javascript page has loaded as well.
//[invullen] [invullen] apiCall(url) {
//const response = [invullen] [invullen](url);
//const json = [innvullen]([invullen].json())
//return json;
//}

//Correct answer:
async function apiCall(url) {
  const response = await fetch(url);
  const json = await(response.json());
  return json;
}

// Assignment 4 - open de URL to see what the exacte output is and create a function to retrieve the temp_min and temp_max from the API.
// Tip 1: Use the function from assignment 2
// Tip 2: Use the console to figure it out, or enter the full URL in your browser to see the structure of the API-reply.
// Correct answer:
async function apiCall(url) {
  const response = await fetch(url);
  const json = await(response.json());
  let temp_min = json.main.temp_min;
  let temp_max = json.main.temp_max;
  return temp_min, temp_max;
  console.log("temp_min 2= ", temp_min, "temp_max 2= ", temp_max);
  //return temp_min, temp_max;
}



var x = temp_min_function(urlAmsterdam).then(function(value){
    console.log("value = ", value);
    console.log("temp_min 1 = ", temp_min);
});

/*
//Assignment 5 - the temparatures you just retrieved are strings. Find out how you can convert them into floats.
// Correct answer:
let tempMinFloat = parseFloat(temp_min);
let tempMaxFloat = parseFloat(temp_max);

//Assignment 6 - As you might have noticed it's pretty hot in Amsterdam. Maybe the API is providing us the temparture in the wrong metric system?
//Find out how you can convert the temperatures from Kelvin to Celsius using an arrow function.
//Correct answer:
//let KelvinToCelsius = (tempMinFloat,tempMaxFloat) => {
//    let tempMinC= tempMinFloat  - 273.15;
//    let tempMaxC = tempMaxFloat - 273.15;
//    return tempMinC, tempMaxC;
//}

//Assignment 7 - Store the average temperature in Celcius in a variable and log it to the console
//Correct answer:
//let tempAverage = (tempMinC + tempMaxC)/2;
//console.log(tempAverage);


/*eventueel nog extra:
- Trek de coördinaten uit de API
- Gebruik Google Maps API om een kaartje te plotten
- Zet een marker op de juiste stad */


/*

//coördinate uit API trekken
async function apiCall(url) {
    const response = await fetch(url);
    const json = await(response.json());
    let lat = json.coord.lat;
    let lng = json.coord.lon;
    return lat, lng;
    console.log("lat = ", lat, "lng =", lng);

}


var map;

//open a Google Maps//
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            //display Amsterdam//
            lat: 52.370216, lng: 4.895168
        },
        //zoom in on Amsterdam//
        zoom: 12

    });
}

*/

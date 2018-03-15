//opdracht 1: maak een functie om de volledige URL op te bouwen
// goede antwoord:
let urlBuilder = function (city, apiKey) {
	let urlBase = "http://api.openweathermap.org/data/2.5/weather?q=";
    return urlBase + city + "&APPID=" + apiKey;
}

//opdracht 2: maak de async await fuctie af op de API aan te roepen (invulopdracht)
//[invullen] [invullen] apiCall(url) {
  //const response = [invullen] fetch(url);
  //const json = [innvullen](response.json())

    //return json;
//}

//goede antwoord:
async function apiCall(url) {
  const response = await fetch(url);
  const json = await(response.json());

    return json;
}

//opdracht 3: open de URL om te kijken wat de exacte output is en maak een functie om de temp_min en temp_max uit de API te trekken
async function apiCall(url) {
  const response = await fetch(url);
  const json = await(response.json());

    return json.main.temp_min;
	return json.main.temp_max;
}

//opdracht 4: zet de uitkomst van opdracht 3 om naar een float
// goede antwoord:
let tempMinFloat = float(temp_min);
let tempMaxFloat = float(temp_max);

//opdracht 5: zet de kelvin temp om in celsius temp
//goede antwoord:
let tempMinK = tempMinFloat;
let tempMaxK = tempMaxFloat;

function KelvinToCelsius(temp){
	let tempMinC= tempMinK  - 273.15;
	let tempMaxC = tempMaxK - 273.15;
	return tempMinC, tempMaxC;
}

//opdracht 6: bereken met temp_min en temp_max de gemiddelde temperatuur
let averageTemp = (tempMinC+ tempMaxC)/2;
console.log(averageTemp);

/*eventueel nog extra:
- Trek de coördinaten uit de API
- Gebruik Google Maps API om een kaartje te plotten
- Zet een marker op de juiste stad */

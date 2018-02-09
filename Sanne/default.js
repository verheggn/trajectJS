var apiKey = "c7d6b1959579335813b946da059d652b";

var urlBuilder = function (city, apiKey) {
    var urlBase = "http://api.openweathermap.org/data/2.5/weather?q=";
    return urlBase + city + "&APPID=" + apiKey;
};

var urlAmsterdam = urlBuilder("Amsterdam", apiKey); 	//sample
var urlLondon = urlBuilder("London", apiKey); 			//sample

// ***** CALLBACKS *****

// Een call naar een externe URL wil je graag asynchroon uitvoeren,
// omdat je anders geen javascript op je pagina kunt uitvoeren (en je pagina dus unresponsive is), todat je een resultaat terug krijgt.

// De traditionele manier om met asynchrone functionaliteit te werken, is door callbacks te gebruiken.
// Je geeft dan aan een asynchrone code de volgende functie mee, die hij aan moet gaan roepen, bijvoorbeeld:

const myCallback = (result) => {
  console.log("opgehaald met $.getJson en callback", result.main.temp) // 277.81
  return result;
}

$.getJSON(urlAmsterdam, myCallback)

// Het is belangrijk om je te realiseren dat je alleen iets zinnigs met het resultaat kunt doen, als alle code die er iets mee doet ook asynchroon is.
// Voor een uitgebreidere uitleg: https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call
console.log("Geef mij direct resultaat!", $.getJSON(urlAmsterdam).responseText); //dit zal altijd undefined zijn, omdat op het moment dat je console.log() aanroept, er nog geen respons is.

// En als je met het resultaat iets nieuws asynchroons wil doen, kan dat al snel chaos worden, wanneer verschillende callbacks elkaar gaan aanroepen ('callback-hell').
// Filmpje met meer uitleg: https://www.youtube.com/watch?v=hf1T_AONQJU (eerste 10 minuten)

// ***** PROMISES *****

// Een manier om daar uit te ontsnappen, is met promises. Deze kun je achter elkaar 'chainen', zodat de volgende code pas uitgevoerd wordt als de eerste klaar is.
// Je zou je $.getJSON kunnen verpakken in een promise:

const p = new Promise( (resolve, reject) => $.getJSON(urlAmsterdam, resolve)); //resolve wordt hier als callback functie gebruikt; en wordt dus aangeroepen zodra het resultaat van de functie bekend is.

p.then( json => { //then wordt uitgevoerd zodra de promise geresolved (of rejected) wordt, en krijgt als parameter een functie mee die hij aanroept met het resultaat van de resolved promise.
  console.log("opgehaald met $.getJson en Promise", json.main.temp) //277.81
});

// Het is op dit punt misschien netter om ipv $.getJSON een functie te gebruiken, die al van nature een promise retourneert, bijvoorbeeld fetch(); <= let op! best nieuw, niet in oudere browsers bekend
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
fetch(urlAmsterdam)
  .then( response => response.json() ) //haal de json uit de response
  .then( json => console.log("opgehaald met fetch:", json.main.temp) ) //277.81
  .then( () => {
    console.log("ik was al klaar, maar then() geeft weer een promise terug, dus ik kan net zo goed nog even doorgaan!")
    return 3;
  })
  .then( lastResult => {
    console.log(lastResult) // Hé, dat is de 3 die ik net geretourneerd heb!
  })
  .then( () => {
    throw new Error("Eens kijken wat er gebeurt als er iets fout gaat (Wat zomaar kan gebeuren als je met vreemde servers aan het praten bent!)")
  })
  .then( () => {
    console.log("Een error zorgt voor een rejected promise, en het eerste argument van then reageert alleen op resolved promises dus deze tekst krijg je nooit in je console te zien")
  }, (err) => {
    console.log("Je kunt ook een tweede functie aan then meegeven, die rejected promises afvangt, kijk maar:");
    console.log(err)
  })
  .then( () => {
    console.log("En ook die tweede functie retourneert weer een promise");
    throw new Error("Nog een tweede foutje ter demonstratie");
  })
  .then( () => {
    console.log("Dit wordt weer volledig genegeerd");
  })
  .then( () => {
    console.log("Hier kijkt ook geen hond naar");
  })
  .catch( err => {
    console.log("Je kunt in plaats van then met een tweede argument, ook catch gebruiken om rejected promises af te vangen, dat leest net wat lekkerder!")
    console.log(err)
  })
  .then( () => {
    console.log("En ook catch retourneert weer een promise, dus je kunt vrolijk doorgaan met chainen!")
  });

// In plaats van console.log() had ik hierboven ook interessante asynchrone dingen kunnen doen, de code had er hetzelfde uitgezien:
// een chain van then's en catch'es waarbij elke functie pas uitgevoerd wordt als de vorige klaar is.
// Je moet er alleen nog steeds voor waken dat je het niet gaat mixen met synchrone code:
const huidigeTemperatuur = fetch(urlAmsterdam)
  .then( response => response.json() ) //haal de json uit de response
  .then( json => json.main.temp )

console.log("Geef mij direct mijn promise!", huidigeTemperatuur) // Dit geeft een pending promise, want nog niet geresolved op het moment dat ik console.log() aanroep

// ***** ASYNC/AWAIT *****

// Om toch javascript te kunnen schrijven die lijkt op synchrone code, is async/await bedacht.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

async function testAsync() {
  return 42;
}

console.log("testAsync():", testAsync() ) //Promise {<resolved>: 42}; een async function retourneert een Promise, die geresolved wordt met zijn return value zodra die bekend is (in dit geval direct)

function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

async function testAsyncWithAwait() {
  const duurtLang = await resolveAfter2Seconds("Dit wordt helemaal nergens gebruikt, maar door await wordt alles wat hierna staat pas uitgevoerd als deze promise geresolved is");
  return 42;
}

console.log("testAsyncWithAwait():", testAsyncWithAwait() ) //Promise {<pending>}, pas over 2 seconden wort deze promise geresolved
testAsyncWithAwait().then( result => console.log("na 2 seconden: ", result)); //42

// Met Async/Await zou de fetch er als volgt uit kunnen zien:
async function apiCall(url) {
  const response = await fetch(url); // Dit wordt asynchroon uitgevoerd. Await retourneert de waarde van de promise, zodra deze geresolved wordt.
  const json = await(response.json()) // Ik heb een extra await nodig, omdat ook json() een promise retourneert.

  return json.main.temp; //Dit ziet er synchroon uit, maar wordt door de eerdere await toch pas uitgevoerd als de asynchrone code klaar is
}

// Bedenk wel dat de functie ApiCall een promise retourneert, dus dit gaat niet goed:
console.log("Toch nog te gehaast", apiCall(urlAmsterdam)); //Promise {<pending>}

// maar dus wel:
apiCall(urlAmsterdam)
  .then( (temp) => console.log("Finally met Async/await en then", temp)); // 277.81

// of helemaal met async/await (await mag je alleen binnen een async function gebruiken, dus ik heb een extra functie nodig)
async function letsWrapThisUp() {
  const temp = await apiCall(urlAmsterdam);
  console.log("Finally met Async/await only", temp); // 277.81
}
letsWrapThisUp();

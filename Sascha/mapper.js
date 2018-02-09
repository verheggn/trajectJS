// Dit is de mapper constructor. De structuur is al af, dat betekent dat de namen van de fucties vast staan
// en de parameters van de functies. De functies zelf moeten nog geschreven worden. Zorg ervoor dat alle unit testen slangen.

var ApiToUserMapper = {
  // Een getal moet omgezet worden naar een string met de taalafhangkelijke decimalSeparator
  // Dus 1.12 -> "1,12"
  float: function (value, decimalSeparator) {
    value = value.toString();
    value = value.replace(/\./i, decimalSeparator);
    return value;
  },

  // Een geld bedag moet altijd een euro teken voor het bedrag tonen
  // Het juiste decimaal teken gebruiken
  // Altijd op twee decimalen afronden
  // 2 -> "€2,00"
  euro: function (value, decimalSeparator) {
    if(value % 1 === 0 ) {
    return "€" + value + decimalSeparator + "00";
    }
    else{
      value = value.toFixed(2);
      value = value.toString();
      value = value.replace(/[.]/i, decimalSeparator);
      return "€" + value;
    }
  },

  // een boolean komt als true / false van de server
  // maar moet omgezet woorden naar de correcte label voor de gebruiker
  // bijvoorbeeld "ja" of "nee"
  boolean: function (value, trueString, falseString) {
    if(value) {
      return trueString;
    }
    else{
      return falseString;
    }
  },

  // data komt als ISO 8601 UTC date time string van de server ("2014-04-05T00:00:00+00:00")
  // Maar moet als dd-mm-yyyy aan de gebruiker getoond worden
  date: function (value) {
    value = new Date(value);
    let day = value.getDate();
    let month = value.getMonth() + 1;
    let year = value.getFullYear();
    if(day < 10) {
      day.toString();
      day = "0" + day;
    }
    if(month < 10) {
      month.toString();
      month = "0" + month;
    }
    return day + "-" + month + "-" + year;
  },

  // Data komt als ISO 8601 UTC date time string van de server ("2014-04-05T00:00:00+00:00")
  // Maar de gebruiker wilt, als het moment vandaag is, alleen de tijd (hh:mm) zien,
  // als het moment NIET vandaag is moet de datum getoond worden. (dd-mm-yyyy)
  timeIfTodayElseDate: function (dateTime) {
  //alle lets die gebruikt worden om de tijd te weergeven. DateTime wordt gebruikt voor de ingevoerde tijd en dateNow voor de huidige tijd
   let dateNow = new Date();
   dateTime = new Date(dateTime);
   let minutes = dateTime.getMinutes();
   let hours = dateTime.getHours();
   let day = dateTime.getDate();
   let month = dateTime.getMonth() + 1;
   let year = dateTime.getFullYear();
    if(day < 10) {
      day.toString();
      day = "0" + day;
    }
    if(month < 10) {
      month.toString();
      month = "0" + month;
    }
    if(hours < 10) {
      hours.toString();
      hours = "0" + hours;
    }
        if(minutes < 10) {
      minutes.toString();
      minutes = "0" + minutes;
    }
   if(dateTime.getDate() === dateNow.getDate()) {
     return hours + ":" + minutes
   }
   else{
    return day + "-" + month + "-" + year;
   }
  },

  // De api geeft bij verschillende objecten een foreign key terug met een user id (bijvoorbeeld bij wie een bericht geplaats heeft)
  // Maar de gebruiker wilt een volledige naam zien
  // In deze functie wordt als eerste paramenter de user id geplaats
  // Als tweede paramter een array met user objecten.
  //    Een user object heeft altij een "voormaam" en een "achternaam" en soms een "tussenvoegsels"
  // return value is de volledige naam

  // Voorbeeld:

  // listOfUsers = [
  //   {id: 0, voornaam: "Barbara", achternaam: "Honhoff"},
  //   {id: 1, voornaam: "Michael", achternaam: "Sommer"},
  //   {id: 2, voornaam: "Oscar", achternaam: "Groot", tussenvoegsels: "de" }
  // ]

  // nameOfUser(2, listOfUsers);
  //   -> "Oscar de Groot"

    // nameOfUser(0, listOfUsers);
  //   -> "Barbara Honhoff"

  nameOfUser: function (id, listOfUsers) {
    //validity check of de id binnen de range van de listOfUsers.length valt, zo niet returned hij undefined
    if(id >= listOfUsers.length){
      return undefined;
    }

    let voornaam = listOfUsers[id].voornaam;
    let achternaam = listOfUsers[id].achternaam;
    let tussenvoegsels = listOfUsers[id].tussenvoegsels;

    if(tussenvoegsels === undefined) {
      tussenvoegsels = "";
    }
    else{
      tussenvoegsels = " " + tussenvoegsels;
    }
    return voornaam +  tussenvoegsels + " " + achternaam;
  }
}

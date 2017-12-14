// Boek constructor en prototype
function Boek(titel, auteur, aantalAuteurs, paginas, likes) {
    this.titel = titel;
    // **************************************************
    // Geef hier de variabelen titel, auteur, aantalAuteurs, paginas en likes de juiste waarden
    // **************************************************
    this.auteur = auteur;
    this.aantalAuteurs = aantalAuteurs;
    this.paginas = paginas;
    this.likes = likes;
}

// **************************************************
// Maak boek prototype functies:

// dislike: haalt 1 van het totale aantal likes af. Aantal likes mag niet minder dan 0 zijn
var dislike = function() {
	if (likes <= 0) {
  	likes -= 1;
    else console.log ("0 likes");
  };
}
// like: telt 1 op bij het totale aantal likes
var like = function() {
	likes += 1;
  console.log (likes + " likes");
  };
}
// toString: geeft een string representatie van een boek. Bijvoorbeeld: "JavaScript for Cats van Max Ogden bevat 201 pagina's en heeft 34 likes"
var toString = function() {
	var representatie = titel + 'van' + auteur + 'bevat' + paginas + 'paginas en heeft ' + likes + 'likes';
  return representatie;
  }


// **************************************************

var boekenLijst = [];
boekenLijst.push(new Boek('JavaScript: The Good Parts', 'Douglas Crockford', 1, 234, 10));
boekenLijst.push(new Boek('JavaScript for Cats', 'Max Ogden', 1, 201, 10));
boekenLijst.push(new Boek('Eloquent JavaScript', 'Marijn Haverbeke', 1, 262, 10));
boekenLijst.push(new Boek('The Magic Mountain', 'Thomas Mann', 1, 235, 32));
boekenLijst.push(new Boek('Things Fall Apart', 'Chinua Achebe', 1, 938, 40));
boekenLijst.push(new Boek('Het bureau', 'J.J. Voskuil', 1, 48390, 10));

// Nu wordt, m.b.v. deze boekenlijst een <select> gevuld.
var kiesBoek = document.getElementById('kiesBoek');
for (var i=0; i<boekenLijst.length; i++) {
    kiesBoek[kiesBoek.length] = new Option(boekenLijst[i].titel, i);
}

// Hier voegen we twee javascript event listeners toe aan de elementen met IDs 'dislike' en 'like'.
// Dit hoef je op dit punt in het traject nog niet zelf te kunnen.
document.getElementById('dislike').addEventListener('click', dislikeBoek);
document.getElementById('like').addEventListener('click', likeBoek);

function dislikeBoek(oEvent) {
    oEvent.preventDefault();

    // kiesBoek is een globale variabele die we kunnen gebruiken om het geselecteerde boek te bepalen
    var gekozenBoek = kiesBoek.options[kiesBoek.selectedIndex].value;
    // dislike functie aanroepen
    gekozenBoek.dislike();
    //boekenLijst[gekozenBoek].dislike();
    alert(boekenLijst[gekozenBoek].toString());
}

function likeBoek(oEvent) {
    oEvent.preventDefault();
    var gekozenBoek = kiesBoek.options[kiesBoek.selectedIndex].value;
    // like functie aanroepen
    gekozenBoek.like()
    //boekenLijst[gekozenBoek].like();
    alert(boekenLijst[gekozenBoek].toString());

}

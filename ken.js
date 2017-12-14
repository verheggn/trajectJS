/*
+ eerste!
+ werkt (grotendeels)
+ error afhandeling
+ geconverteerde string

- rekeningnummer kan alleen 7 of 9 tekens bevatten
- ABNA 123456789 werkt niet.
- geen controle op returntype bepaalControleGetal
- ===
- indentation
 */

// voegt een submit event handler toe aan het form
window.onload = function() {
document.getElementById('ibanForm').addEventListener('submit', genereerIBAN);
};

// Hiermee kan je string de bank code ophalen
var bankIdentificatie = [
        ['ABNAMRO', 'ABNA'],
        ['INGBANK', 'INGB'],
        ['RABOBANK', 'RABO'],
        ['LANSCHOT', 'FVLB'],
        ['SNSBANK', 'SNSB'],
        ['DEMIR', 'DHBN']
];

function genereerIBAN(oEvent) {
    oEvent.preventDefault();

    // Een IBAN bestaat uit een aantal onderdelen:
    // (1) een Landcode, bestaande uit twee letters. We doen in deze opdracht alleen Nederlandse rekeningen,
    //    dus je kunt 'NL' gebruiken.
    // (2) een controlegetal bestaande uit twee cijfers.
    // (3) de rekeningidentificatie
    //    Dit onderdeel bestaat uit het relevante deel uit de globale variabele 'bankIdentificatie' en het rekeningnummer.
    //    Het rekeningnummer moet 10 tekens lang zijn. Is het korter, zet er dan nullen voor.
    var landCode = 'NL';
    var rekeningNummer = document.getElementById('rekeningnummer').value;
    var bankSelect = document.getElementById('bankSelect');
    var gekozenBank = bankSelect.options[bankSelect.selectedIndex].value;

    var bankCode           = bepaalBankCode(gekozenBank);
    rekeningNummer         = bepaalHeleRekeningNummer(rekeningNummer);

    var controleGetal      = bepaalControleGetal(bankCode, landCode, rekeningNummer);

    document.getElementById("iban").innerHTML = 'Je IBAN is: ' + landCode + controleGetal + bankCode + rekeningNummer;
}

// de bankCode kun je halen uit de globale 'bankIdentificatie' array.
// We zouden de bankCode natuurlijk ook gewoon in de <option>s van de <select> kunnen plaatsen..
// maar dan hoef je niet te oefenen met arrays :)
function bepaalBankCode(bank) {
    var bankCode = '';

    // haal hier de bankCode op uit 'bankIdentificatie'
    for(var i = 0; i < bankIdentificatie.length; i++){
            if(bank == bankIdentificatie[i][0]){
                bankCode = bankIdentificatie[i][1];
        };
    }

    return bankCode;

}

// Maak van het 7- of 9-cijferige nummer een 10-cijferig rekeningnummer
function bepaalHeleRekeningNummer(rekeningNummer) {

    // zorg er hier voor dat het rekeningnummer altijd 10 cijfers lang is, eventueel met nullen ervoor
    if(rekeningNummer.length == 7){
       rekeningNummer = "000" + rekeningNummer;
       }
    else if(rekeningNummer.length == 9){
        rekeningNummer = "0" + rekeningNummer;
            }
    else{
        window.alert("Ongeldig rekeningnummer.");
        rekeningNummer = "#ERROR";
    }

    return rekeningNummer;
}

// bereken nu het controlegetal
//    Neem de rekeningidentificatie, plaats de landcode daarachter
//    Vervang alle letters door twee cijfers gebaseerd op de volgorde in het alfabet (A=10, B=11, C=12, ..., Z=35)
//    Voeg twee nullen toe aan het einde
//    Deel dit door 97 en neem de rest (mod97)
//    Het controlegetal is nu 98 - <deze rest>
//    Is het controlegetal kleiner dan 10? Zet er dan een 0 voor. (2 wordt dus 02)
//    Zie http://nl.wikipedia.org/wiki/International_Bank_Account_Number#Controlegetal
function bepaalControleGetal(bankCode, landCode, rekeningNummer) {
    var controleGetal = 0;
    var nummerAlsString = bankCode + rekeningNummer + landCode;
    // In de geconverteerdeString zijn letters vervangen door hun getalwaarde
    // Hierbij moet A de waarde 10 krijgen, B wordt 11, C = 12, etc)
    var geconverteerdeString = '';

    // Een simpele manier om dit te doen is b.v. door elk karakter in nummerAlsString te bekijken en
    // te controleren of dit een getal is of niet (met isNaN: isNaN(3) = false, isNaN('d') = true).
    // Vervolgens kun je getallen direct toevoegen aan de geconverteerde string, letters moet je eerst omzetten
    // voordat je ze toe kunt voegen.
    // Hint: 'ABCDEFG'.charCodeAt(2) - 'A'.charCodeAt(0) geeft als resultaat 2, want 'C' - 'A' = 67 - 65 = 2;
    // A moet 10 worden, B = 11, C = 12, etc.
    for(var i = 0; i < bankCode.length; i++){
        geconverteerdeString += (bankCode.charCodeAt(i) - 55);
    }

    geconverteerdeString += rekeningNummer;

    for(var i = 0; i < landCode.length; i++){
        geconverteerdeString += (landCode.charCodeAt(i) - 55)
    }

    // Voeg nu twee nullen toe aan het einde en gebruik mod97 i.p.v. %97
     geconverteerdeString += "00";
     controleGetal = 98 - mod97(geconverteerdeString);

    // bepaal het controlegetal en return dit (98 - het resultaat van de mod97, altidj twee cijfers)
    return controleGetal;
}

// mod97 zorgt ervoor dat we ook grote getallen kunnen delen
// Zie ook http://stackoverflow.com/questions/307179/what-is-javascripts-max-int-whats-the-highest-integer-value-a-number-can-go-t
function mod97(iban) {
    var remainder = iban;
    var block;

    while (remainder.length > 2) {
        block = remainder.slice(0, 9);
        remainder = parseInt(block, 10) % 97 + remainder.slice(block.length);
    }

    return parseInt(remainder, 10) % 97;
}

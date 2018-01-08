//sets the bootstrap element for the success message
    function successMessage(string){
        document.getElementById("copyBox").className = "alert alert-success";
        document.getElementById("copyBox").innerHTML = string;
    }
	

//This is the function for the entire iban calculator program
function ibanCalculator() {
    //global variable declarations
    var landCode = 'NL';
    var bankRekening = document.getElementById("bankRekening").value;
    var bankCode = document.getElementById("bankName").value;
    var controleGetal;
    var ibanMathString;
	
    /*Function Expressions*/
    //this function resets the warning box
    var resetWarningBox = function(){
        document.getElementById("warningBox").className = "";
        document.getElementById("warningBox").innerHTML = "";
        document.getElementById("copyBox").className = "";
        document.getElementById("copyBox").innerHTML= "";
    }
         //Initial checks
	 var bankRekeningValidation = function(){
        //if bankcode has no value ask user to choose a bank
		if(bankCode == ""){
           return warningMessage("Selecteer een bank a.u.b.!")
        }
        if(bankRekening.length < 3){
            return warningMessage("Een geldig rekeningnummer bestaat uit minimaal 3 cijfers!");
        }
        if(/\D/g.test(bankRekening) === true){
            return alert("Vul a.u.b. alleen cijfers in");
        }
	 }
    //This function takes in a string and converts them in numbers according to the pattern A=10, B=11 etc.
    var lettersToNumbers = function(string){
        var arrToNumbers;
        var numbers = [];
        arrToNumbers = string.split('');
        for(var i = 0; i < arrToNumbers.length; i++){
            numbers.push(arrToNumbers[i].charCodeAt(0)-55);  
        }
        numbers = numbers.join('');
        return numbers;
       
    }
    
    //This function grabs the account number and checks whether it's length is equal to 10, it will add zeroes in front if it does not have enough
    var bankRekeningLengthChecker = function(acc){
               
        //checks whether the length of the string is equal to 10, if it is it returns the number
        if(acc.length == 10){
            return acc;
        }
        //if it's smaller than 10 it adds zeroes at the beginning so that the total input is converted to 10 numbers
        else if(acc.length < 10){
            //it calculates the difference between 10 and the length of the input and unshifts 0's in at the beginning based on that difference
            var temp = 10-acc.length;
            acc = acc.split("");
				
            for(var i = 0; i < temp;i++){
                acc.unshift('0');
            }
            acc = acc.join("");
            return acc;
            }
        else if(acc.length > 10){
            return warningMessage("Ongeldige invoer! Vul a.u.b. een bankrekening onder de 10 cijfers in!");
        }    
    }
   
    //--------------Getters------------------------------------------------------------------------------------
    //this function grabs the landcode and injects it into the numbers function
    var getLandCode = function(){
        return lettersToNumbers(landCode);
    }
    //this function grabs the bankCode which was selected by the user and magically turns it into numbers
    var getBankCode = function(){
        return lettersToNumbers(bankCode);
    }
    //TODO bankrekeningchecker herschrijven zodat hij eerst dingen check maar wel altijd een value teruggeeft
    //this function grabs 
    var getRektnummer = function(){
        return bankRekeningLengthChecker(bankRekening);    
    }
    
    //gets the whole iban input no, so that the conrol no can be calculated
    var getWholeIban = function(lcode, bcode, brek){
        var list = "";
        
        list += bcode;
        list += brek;
        list += lcode;
		list += '00';
        return list;
    }
    
    
        //deze functie past mod97 toe op bankcode + bankrekening + landcode + 00 en trekt het af van 98 voor het controlegetal
    function mod97(iban) {
    var remainder = iban;
    var checkNo;
    var block;

        while (remainder.length > 2) {
            block = remainder.slice(0, 9);
            remainder = parseInt(block, 10) % 97 + remainder.slice(block.length);
        }
        
        return checkNo = (parseInt(remainder, 10) % 97);
	}
	function generateControleGetal(iban){
        iban = 98- iban; 
		if(iban < 10){
            iban = iban.toString();
            iban = iban.split("");
            iban.unshift(0);
            iban = iban.join("");
        }
        return iban;
    }
    //compiles all calculations and generates the resulting IBAN
    function executeCalculation(){    
        var trueIban;
        bankRekeningLengthChecker(getRektnummer());
        ibanMathString = getWholeIban(getLandCode(), getBankCode(), getRektnummer());
        controleGetal = generateControleGetal(mod97(ibanMathString));
        trueIban = landCode + controleGetal + bankCode + getRektnummer();
        return trueIban.toString();  
    }
    //Validates the IBAN
    function validateIban(){
        var check = lettersToNumbers(bankCode) + getRektnummer() + lettersToNumbers(landCode) + controleGetal;
        check = mod97(check);
        
        if(parseInt(check, 10) % 97 !== 1){
            warningMessage("Dit is geen geldig IBAN nummer!");
        }
        
    }
    
    //sets the bootstrap element for the warning
    function warningMessage(string){
        document.getElementById("warningBox").className = "alert alert-danger";
        document.getElementById("warningBox").innerHTML = string;
    }
    

	bankRekeningValidation();
    validateIban();
    resetWarningBox();
    document.getElementById("resultWrap").innerHTML = "Je IBAN is:";  
    document.getElementById("result").style.visibility = "visible";
    document.getElementById("result").value = executeCalculation();  
    document.getElementById("hiddenButton").style.visibility = "visible";
    
}




//executes function on button click
document.getElementById("calculate").onclick = function() {
ibanCalculator();                          
};
//copies result to clipboard
document.getElementById("copyButton").onclick = function() {
  var copyText = document.getElementById("result");
  copyText.select();
  document.execCommand("Copy");
  successMessage("IBAN gekopiëerd naar klembord: " + copyText.value);
}


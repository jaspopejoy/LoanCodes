
//get the values from the interface
//start or controller function
function getValues(){
    //get user values from document
    let loanAmt = document.getElementById("loanAmt").value;
    let termMonths = document.getElementById("term").value;
    let interestRate = document.getElementById("interestRate").value;
    
    //parse for numbers
    loanAmt = parseInt(loanAmt);
    termMonths = parseInt(termMonths);
    interestRate = parseInt(interestRate);

    //check to make sure they are integers
    if (number.isInteger(loanAmt) && number.isInteger(termMonths) && number.isInteger(interestRate)) {
        
        //call calculateMortgage
        let loanArray = calculateMortgage(loanAmt, termMonths, interestRate);

         //call displayData and write values to the screen
         displayData(loanArray);

    } else {
        alert("You must enter an Integer!")
    }

}

//logic function(s)
//calculate the loan amt, loan term, and interest rate
function calculateMortgage(loanAmt, termMonths, interestRate) {

}

//display or view functions
//display the loan amt, loan term, and interest rate
//loop over array and create a tablerow for each item
function displayData() {

    //get the table body element from the page
    let tableBody = document.getElementById("results");

    

}
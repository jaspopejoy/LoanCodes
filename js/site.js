
//get the values from the interface
//start or controller function
function getValues() {
    //get user values from document
    let loanAmt = document.getElementById("loanAmt").value;
    let termMonths = document.getElementById("termMonths").value;
    let interestRate = document.getElementById("interestRate").value;

    //parse for numbers
    loanAmt = parseInt(loanAmt);
    termMonths = parseInt(termMonths);
    interestRate = parseInt(interestRate);

    //check to make sure they are integers
    if (Number.isInteger(loanAmt) && Number.isInteger(termMonths) && Number.isInteger(interestRate)) {

        //call calculateMortgage
        let loanObj = calculateMortgage(loanAmt, termMonths, interestRate);

        //call displayData and write values to the screen
        displayloanData(loanObj);

        //call displayTable
        displayTable(loanObj);

    } else {
        alert("You must enter an Integer!")
    }

}

//logic function(s)
//calculate the loan amt, loan term, and interest rate
function calculateMortgage(loanAmt, termMonths, interestRate) {

    let loanObj = {};

    //calculate monthly payment
    let monthlyPymt = ( (loanAmt) * (interestRate / 1200) ) / (1 - (1 + interestRate / 1200) ** (-termMonths));

    //calculate total cost
    let totalCost = (monthlyPymt * termMonths);

    //calculate total Interest
    let totalInterest = (totalCost - loanAmt);

    //create loan object to hold loan
    loanObj.loanAmt = loanAmt;
    loanObj.termMonths = termMonths;
    loanObj.interestRate = interestRate;
    loanObj.monthlyPymt = monthlyPymt;
    loanObj.totalCost = totalCost;
    loanObj.totalInterest = totalInterest;

    return loanObj;
}

//display total principal, monthly payment, total interest, & total cost
function displayloanData(loanObj) {

    //display total principal to the screen
    document.getElementById("totalPrincipal").innerHTML = loanObj.loanAmt.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

    //display monthly payment    
    document.getElementById("monthlyPayment").innerHTML = loanObj.monthlyPymt.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

    //display total cost
    document.getElementById("totalCost").innerHTML = loanObj.totalCost.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

    //display total interest
    document.getElementById("totalInterest").innerHTML = loanObj.totalInterest.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

}

//display amortization table
function displayTable(loanObj) {

    //assign variables
    let monthlyInterest=0;

    //get the table body element from the page
    let tableBody = document.getElementById("results");

    //get the template row
    let templateRow = document.getElementById("dataTemplate");

    //clear the table first
    tableBody.innerHTML = "";

    // loop through the values and add to creaed table
    for (let i = 1; i <= loanObj.termMonths; i++) {

        let tableRow = document.importNode(templateRow.content,true);

        let interestPymt = loanObj.loanAmt * (loanObj.interestRate/1200);
        monthlyInterest += interestPymt;
        let monthlyPrincipal = loanObj.monthlyPymt - interestPymt;
        let balance = loanObj.loanAmt - monthlyPrincipal;
        
        //grab the tds to put into array
        let rowCols = tableRow.querySelectorAll("td");

        rowCols[0].classList.add(i);
        rowCols[0].textContent = i;
      
        rowCols[1].classList.add(loanObj.monthlyPymt);
        rowCols[1].textContent = loanObj.monthlyPymt.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });

        rowCols[2].classList.add(monthlyPrincipal);
        rowCols[2].textContent = monthlyPrincipal.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });

        rowCols[3].classList.add(interestPymt);
        rowCols[3].textContent = interestPymt.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });

        rowCols[4].classList.add(monthlyInterest);
        rowCols[4].textContent = monthlyInterest.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });

        rowCols[5].classList.add(balance);
        rowCols[5].textContent = balance.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });
        
        tableBody.appendChild(tableRow);

    }
}
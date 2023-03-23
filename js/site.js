
//get the values from the interface
//start or controller function
function getValues() {
    //get user values from the document
    let loanAmount = document.getElementById("loanAmt").value;
    let numberOfPayments = document.getElementById("numPayments").value;
    let interestRate = document.getElementById("interestRate").value;

    //parse numbers
    loanAmount = parseInt(loanAmount);
    numberOfPayments = parseInt(numberOfPayments);
    interestRate = parseInt(interestRate);

    //check to make sure they are integers
    if (Number.isInteger(loanAmount) && Number.isInteger(numberOfPayments) && Number.isInteger(interestRate)) {

        //call calculateValues
        let loanArray = calculateValues(loanAmount, numberOfPayments, interestRate);

        //call displayResults
        displayResults(loanArray);

    } else {
        alert("You must enter valid numbers");
    }
}

//logic function(s)
//calculate the loan amt, loan term, and interest rate
function calculateValues(loanAmount, numberOfPayments, interestRate) {

    //assign variables and set array
    let returnArray = [];
    let remainingBalance = loanAmount;
    let totalInterestPaid = 0;

    //loop through the values and push to returnArray
    for (let i = 1; i <= numberOfPayments; i++) {
        returnArray.push(i);

        //calculate monthly payments
        let monthlyPayment = (loanAmount * ((interestRate / 1200) / (1 - Math.pow(1 + (interestRate / 1200), (numberOfPayments * -1)))));
        returnArray.push(monthlyPayment);

        //calculate interest paid and principal paid and push into array
        let interestPaid = remainingBalance * (interestRate / 1200);
        let principalPaid = monthlyPayment - interestPaid
        returnArray.push(principalPaid);
        returnArray.push(interestPaid);

        //calculate total interest paid and push to array
        totalInterestPaid += interestPaid;
        returnArray.push(totalInterestPaid);

        //calculate balance and push to array
        remainingBalance -= principalPaid;
        returnArray.push(remainingBalance);
    }

    //print monthly payment to the display
    document.getElementById("monthlyPayment").classList.add("output-payment");
    document.getElementById("monthlyPayment").innerHTML = `${returnArray[1].toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })}`;

    //print total principal to the display
    document.getElementById("totalPrincipal").innerHTML = `${loanAmount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })}`;

    //print total interest to the display
    document.getElementById("totalInterest").innerHTML = `${totalInterestPaid.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })}`;
    
    //calculate total cost
    let totalCost = totalInterestPaid + loanAmount;

    //print total cost to the screen
    document.getElementById("totalCost").innerHTML = `${totalCost.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })}`;

    return returnArray;
}

//display amortization table
function displayResults(loanArray) {

    //get the tale body element from the page
    let tableBody = document.getElementById("results");

    //get the template row
    let templateRow = document.getElementById("dataTemplate");

    //clear the table first
    tableBody.innerHTML = "";

    // loop through and add values to the created table
    for (let index = 0; index < loanArray.length; index += 6) {

        let tableRow = document.importNode(templateRow.content, true);

        //grabs the tds to put into array
        let rowCols = tableRow.querySelectorAll("td");

        rowCols[0].textContent = loanArray[index];
        rowCols[1].textContent = loanArray[index + 1].toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });

        rowCols[2].textContent = loanArray[index + 2].toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });

        rowCols[3].textContent = loanArray[index + 3].toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });

        rowCols[4].textContent = loanArray[index + 4].toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });

        rowCols[5].textContent = loanArray[index + 5].toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });

        tableBody.appendChild(tableRow);
    }
}

//Build the amoritization schedule
function buildSchedule() {
  let amount = document.getElementById("lamount").value;
  let rate = document.getElementById("lrate").value;
  let term = document.getElementById("lterm").value;

  //get the table we are going to add to.
  let tableBody = document.getElementById("scheduleBody");
  let template = document.getElementById("scheduleTemplate");

  //clear the table for previous calculations
  tableBody.innerHTML = "";

  //setup some variables to hold the value in the schedule
  let payment = calcPayment(amount, rate, term);
  let balance = amount;
  let totalInterest = 0;
  let monthlyPrincipal = 0;
  let monthlyInterest = 0;
  let monthlyTotalInterest = 0;

  //create a loop for each month of the loan term
  for (month = 1; month <= term; month++) {
    monthlyInterest = calcInterest(balance, rate);
    totalInterest += monthlyInterest;
    monthlyPrincipal = payment - monthlyInterest;
    balance = balance - monthlyPrincipal;

    //get a clone row template
    clone = template.content.cloneNode(true);
    //grab only the columns in the template
    columns = clone.querySelectorAll("td");

    //build the row
    //we know that there are six columns in our template
    columns[0].textContent = month;
    columns[1].textContent = payment.toFixed(2);
    columns[2].textContent = monthlyPrincipal.toFixed(2);
    columns[3].textContent = monthlyInterest.toFixed(2);
    columns[4].textContent = totalInterest.toFixed(2);
    columns[5].textContent = balance.toFixed(2);

    //append to the table
    tableBody.appendChild(clone);
  }

  //Build out the summary area
  labelPrincipal = document.getElementById("totalPrincipal");
  labelPrincipal.innerHTML = Number(amount).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  labelInterest = document.getElementById("totalInterest");
  labelInterest.innerHTML = totalInterest.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  paymentdiv = document.getElementById("payment");
  paymentdiv.innerHTML = payment.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  totalCostDiv = document.getElementById("totalCost");
  let totalCost = Number(amount) + totalInterest;
  totalCostDiv.innerHTML = Number(totalCost).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
}

//Calculate the payment for the loan
function calcPayment(amount, rate, term) {
  return (amount * (rate / 1200)) / (1 - Math.pow(1 + rate / 1200, -term));
}

//calculate the interst for the current balance of the loan
function calcInterest(balance, rate) {
  return balance * (rate / 1200);
}
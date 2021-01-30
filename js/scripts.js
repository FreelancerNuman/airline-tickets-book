// Handling Tickets Counting
function handleTicketsCount(isIncrease, ticketCountId) {
  const ticketCount = document.getElementById(ticketCountId).value;
  let ticketCountNumber = parseInt(ticketCount);

  if (!isNaN(ticketCountNumber) && ticketCountNumber >= 0) {
    if (isIncrease == true) {
      ticketCountNumber = parseInt(ticketCount) + 1;
    }
    if (isIncrease == false && ticketCount > 0) {
      ticketCountNumber = parseInt(ticketCount) - 1;
    }
    document.getElementById(ticketCountId).value = ticketCountNumber;

    totalTicketsCost();
  } else {
    alert("Ticket Number Can't be Empty or Negative");
    document.getElementById(ticketCountId).value = 1;
  }
}

// Handling Total cost
function totalTicketsCost() {
  firstClassCount = getInputValues("first-class-count");

  economyClassCount = getInputValues("economy-class-count");

  calculateTotals("total-cost", "tax", "grand-total-cost");
}

// Handling Confirm section
document.getElementById("book-now").addEventListener("click", function () {
  const flyingFrom = document.getElementById("flying-from").value;
  const flyingTo = document.getElementById("flying-to").value;
  const departureDate = document.getElementById("departure").value;
  const returnDate = document.getElementById("return").value;
  firstClassCount = getInputValues("first-class-count");
  economyClassCount = getInputValues("economy-class-count");
  if (
    !flyingFrom == "" &&
    !flyingTo == "" &&
    !departureDate == "" &&
    !returnDate == "" &&
    !isNaN(firstClassCount) &&
    firstClassCount >= 0 &&
    !isNaN(economyClassCount) &&
    economyClassCount >= 0
  ) {
    document.getElementById("table-flying-from").innerText = flyingFrom;
    document.getElementById("table-flying-to").innerText = flyingTo;
    document.getElementById("table-departure").innerText = departureDate;
    document.getElementById("table-return").innerText = returnDate;

    calculateTotals("table-total", "table-tax", "table-grand-total");

    // showing confirm section
    setValues("main", "none");
    setValues("confirm-section", "flex");
  } else {
    alert(
      "Fill up all fields please and make sure your all input values are positive."
    );
    document.getElementById("first-class-count").value = 1;
    document.getElementById("economy-class-count").value = 1;
    document.getElementById("total-cost").innerText = 250;
    document.getElementById("tax").innerText = 25;
    document.getElementById("grand-total-cost").innerText = 275;
  }
});

// Handling to get the input Values
function getInputValues(ticketCountId) {
  const ticketsInput = document.getElementById(ticketCountId);
  const ticketsCount = parseInt(ticketsInput.value);

  if (!isNaN(ticketsCount)) {
    return ticketsCount;
  }
}

// Handling to set the  Values
function setValues(id, values) {
  const targetTag = document.getElementById(id);
  targetTag.style.display = values;
}

// calculating Totals
function calculateTotals(totalsId, totalTaxId, grandTotalId) {
  const total = firstClassCount * 150 + economyClassCount * 100;

  if (!isNaN(total)) {
    document.getElementById(totalsId).innerText = total;

    const tax = total * 0.1;
    const taxAmount = Math.round(tax);
    document.getElementById(totalTaxId).innerText = taxAmount;

    const grandTotal = total + taxAmount;
    document.getElementById(grandTotalId).innerText = grandTotal;
  } else {
    const firstClassInput = document.getElementById("first-class-count").value;
    const firstClassCount = parseInt(firstClassInput);
    const economyClassInput = document.getElementById("economy-class-count")
      .value;
    const economyClassCount = parseInt(economyClassInput);
    if (firstClassInput == "") {
      handlingIsNaN("first-class-count", 0, economyClassCount);
    }
    if (economyClassInput == "") {
      handlingIsNaN("economy-class-count", firstClassCount, 0);
    }
  }
}

// handling IsNaN
function handlingIsNaN(id, firstClassCount, economyClassCount) {
  document.getElementById(id).value = 0;
  const total = firstClassCount * 150 + economyClassCount * 100;
  document.getElementById("total-cost").innerText = total;
  const tax = total * 0.1;
  const taxAmount = Math.round(tax);
  document.getElementById("tax").innerText = taxAmount;

  const grandTotal = total + taxAmount;
  document.getElementById("grand-total-cost").innerText = grandTotal;
}

const billInput = document.getElementById('billAmount');
const tipButtons = document.querySelectorAll('.tip-button');
const customTipInput = document.getElementById('customTipInput');
const numberOfPeopleInput = document.getElementById('numberOfPeople');
const tipPerPersonOutput = document.getElementById('tipPerPerson');
const billPerPersonOutput = document.getElementById('billPerPerson');
const resetButton = document.getElementById('resetButton');

billInput.addEventListener('input', calculateAmounts);
customTipInput.addEventListener('input', calculateAmounts);
numberOfPeopleInput.addEventListener('input', calculateAmounts);
resetButton.addEventListener('click', resetCalculator);

// calculates the amount of money a person has to pay
function calculateAmounts() {
  const billAmount = parseFloat(billInput.value);
  const customTipPercent = parseFloat(customTipInput.value);
  const numberOfPeople = parseInt(numberOfPeopleInput.value);

  // Check if all fields are completed or a tip button is selected
  if (isNaN(billAmount) || (isNaN(customTipPercent) && !isTipButtonSelected()) || isNaN(numberOfPeople)) {
    return;
  }

  // Calculates the tip for the bill
  let tipAmount;
  if (customTipPercent) {
    tipAmount = (billAmount * customTipPercent) / 100 ;
  } else {
    const selectedTipButton = document.querySelector('.tip-button.active');
    if (selectedTipButton) {
      const tipPercent = parseFloat(selectedTipButton.textContent);
      tipAmount = (billAmount * tipPercent) / 100 ;
    } else {
      tipAmount = 0;
    }
  }

  // Calculates total bill amount per person
  const totalAmountPerPerson = (billAmount + tipAmount) / numberOfPeople;

  tipPerPersonOutput.textContent = formatCurrency(tipAmount / numberOfPeople);
  billPerPersonOutput.textContent = formatCurrency(totalAmountPerPerson);
}

// Helper function that checks if a tip button is selected
function isTipButtonSelected() {
    const selectedTipButton = document.querySelector('.tip-button.active');
    return selectedTipButton !== null;
}

// Resets calculator
function resetCalculator() {
  billInput.value = '';
  customTipInput.value = '';
  numberOfPeopleInput.value = '';
  tipPerPersonOutput.textContent = '$0.00';
  billPerPersonOutput.textContent = '$0.00';
  removeActiveClassFromTipButtons();
}

// Formats the currency to display properly
function formatCurrency(amount) {
  return '$' + amount.toFixed(2);
}

// Helper function that removes active class from tip buttons
function removeActiveClassFromTipButtons() {
  tipButtons.forEach(button => {
    button.classList.remove('active');
  });
}

// Adds event listeners to tip buttons
tipButtons.forEach(button => {
  button.addEventListener('click', function() {
    customTipInput.value = '';
    removeActiveClassFromTipButtons();
    this.classList.add('active');
    calculateAmounts();
  });
});

customTipInput.addEventListener('input', function() {
  removeActiveClassFromTipButtons();
  calculateAmounts();
});
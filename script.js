
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
let currentInput = '0';
let resetNext = false; // tells if the next button press should replace the current input (used after = or other actions)

// Select operator and equals buttons
const operatorButtons = document.querySelectorAll('button[data-action="operator"]');
const equalsButton = document.querySelector('button[data-action="equals"]');

// Initially disable operators and equals
operatorButtons.forEach(btn => btn.disabled = true);
equalsButton.disabled = true;

// Update display and toggle button states
function updateDisplay() {
  display.textContent = currentInput;  //this is line whch is used to visible the text like 0 at display
  toggleButton();

}

// Enable/disable operators and equals based on last input
function toggleButton() {
  const lastChar = currentInput.trim().slice(-1);
  const isNumber = /\d|\./.test(lastChar); // check if last char is digit or dot

  // Enable operators if last character is a number
  operatorButtons.forEach(btn => {
    btn.disabled = !isNumber;
  });

  // Enable equals if last character is a number
  equalsButton.disabled = !isNumber;
}



buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent; // the text shown on the button (e.g., "1", "2", ".").
    const action = button.dataset.action; // the value of the data-action attribute (if it exists, e.g., "operator", "equals", "clear", "sign", "percent").

    if (!action) {
      // Number or dot
      if (resetNext) {
        currentInput = value === '.' ? '0.' : value;
        resetNext = false;
      } else {
        currentInput = currentInput === '0' && value !== '.'
          ? value
          : currentInput + value;
      }
      updateDisplay();
    }


    if (action === 'clear') {
      currentInput = '0';
      updateDisplay();
    }

    if (action === 'sign') {
      currentInput = currentInput.startsWith('-')
        ? currentInput.slice(1) //slice= remove negative sign ex = (-123 = 123)
        : '-' + currentInput;
      updateDisplay();
    }

    if (action === 'percent') {
      currentInput = (eval(currentInput) / 100);
      updateDisplay();
    }


    // if (action === 'operator') {
    //   if (!button.disabled && /[\+\-\*\/]\s*$/.test(currentInput)) {
    //     currentInput += ` ${value} `;
    //   }
    //   resetNext = false;
    //   updateDisplay();
    // }
    if (action === 'operator') {
      const lastChar = currentInput.trim().slice(-1);
      //currentInput = "12" → lastChar = "2"
      const canAddOperator = /\d/.test(lastChar); ///\d/ is a regex that matches any digit (0–9).

      if (!button.disabled && canAddOperator) {
        currentInput += ` ${value} `;
      }
      resetNext = false;
      updateDisplay();
    }



    if (action === 'equals') {
      try {
        let expression = currentInput.trim();
        if (/[\+\-\*\/]$/.test(expression)) {
          expression = expression.slice(0, -1);
        }
        currentInput = String(eval(expression));
      } catch {
        currentInput = 'Error';
      }
      updateDisplay();
      resetNext = true;
    }

    if (action === 'back') {
      currentInput = (currentInput.slice(0, -1) || '0');
      updateDisplay();
    }

  });
});

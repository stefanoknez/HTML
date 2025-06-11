const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');

let current = '';
let resetNext = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (resetNext) {
      current = '';
      resetNext = false;
    }

    const value = button.textContent;

    if (value === 'C') {
      current = '';
      display.textContent = '0';
    } else {
      current += value;
      display.textContent = current;
    }
  });
});

equals.addEventListener('click', () => {
  try {
    const result = eval(current);
    display.textContent = result;
    current = result.toString();
    resetNext = true;
  } catch (e) {
    display.textContent = 'Error';
    current = '';
  }
});
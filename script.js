const display = document.getElementById('display');
const buttons = Array.from(document.getElementsByClassName('btn'));
const clickSound = document.getElementById('clickSound');
const themeSwitch = document.getElementById('theme-switch');
const themeText = document.getElementById('theme-text');
const body = document.body;

// Set initial text based on the current theme
themeText.textContent = body.classList.contains('light-mode') ? 'Dark Mode' : 'Light Mode';

buttons.map(button => {
    button.addEventListener('click', (e) => {
        playClickSound();
        const value = e.target.getAttribute('data-value');
        handleInput(value);
    });
});

themeSwitch.addEventListener('change', () => {
    body.classList.toggle('light-mode');
    themeText.textContent = body.classList.contains('light-mode') ? 'Dark Mode' : 'Light Mode';
});

function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}

function handleInput(value) {
    switch (value) {
        case 'C':
            display.textContent = '0';
            break;
        case '+/-':
            display.textContent = display.textContent.charAt(0) === '-'
                ? display.textContent.slice(1)
                : '-' + display.textContent;
            break;
        case '%':
            display.textContent = (parseFloat(display.textContent) / 100).toString();
            break;
        case '=':
            try {
                display.textContent = eval(display.textContent.replace('÷', '/').replace('×', '*')).toString();
            } catch {
                display.textContent = 'Error';
            }
            break;
        default:
            display.textContent === '0' || display.textContent === 'Error'
                ? display.textContent = value
                : display.textContent += value;
    }
}

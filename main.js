document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const resultDisplay = document.getElementById('result-display');

    generateBtn.addEventListener('click', () => {
        // Clear previous results
        resultDisplay.innerHTML = '';
        generateBtn.disabled = true;
        generateBtn.innerText = 'CALCULATING...';

        // Generate 5 sets with a slight delay for "tech" feel
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const numbers = generateLottoNumbers();
                displayRow(numbers, i);
                
                if (i === 4) {
                    generateBtn.disabled = false;
                    generateBtn.innerText = 'INITIATE SEQUENCE';
                }
            }, i * 200);
        }
    });

    function generateLottoNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            const num = Math.floor(Math.random() * 45) + 1;
            numbers.add(num);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }

    function displayRow(numbers, index) {
        const row = document.createElement('div');
        row.className = 'lotto-row';
        row.style.animationDelay = `${index * 0.1}s`;

        numbers.forEach(num => {
            const ball = document.createElement('div');
            ball.className = 'lotto-number';
            ball.innerText = num.toString().padStart(2, '0');
            row.appendChild(ball);
        });

        resultDisplay.appendChild(row);
    }
});

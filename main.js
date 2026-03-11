document.addEventListener('DOMContentLoaded', () => {
    const triggerBtn = document.getElementById('trigger-btn');
    const resultGrid = document.getElementById('result-grid');
    const outputStream = document.getElementById('output-stream');
    const progressBar = document.getElementById('progress-bar');
    const clock = document.getElementById('clock');

    // System Clock
    setInterval(() => {
        const now = new Date();
        clock.innerText = now.toTimeString().split(' ')[0];
    }, 1000);

    function logSystem(msg) {
        const div = document.createElement('div');
        div.className = 'system-msg';
        div.innerText = `> ${msg}`;
        outputStream.prepend(div);
        if (outputStream.children.length > 5) outputStream.lastElementChild.remove();
    }

    async function startPrediction() {
        triggerBtn.disabled = true;
        resultGrid.innerHTML = '';
        logSystem('ACCESSING NEURAL NETWORK...');
        
        // Progress animation
        let progress = 0;
        const interval = setInterval(() => {
            progress += 2;
            progressBar.style.width = `${progress}%`;
            if (progress >= 100) clearInterval(interval);
        }, 30);

        for (let i = 0; i < 5; i++) {
            await new Promise(r => setTimeout(r, 600)); // SF Delay
            const numbers = generateLottoNumbers();
            logSystem(`BATCH_${i + 1} CALCULATED: ${numbers.join(', ')}`);
            renderRow(numbers, i);
        }

        setTimeout(() => {
            logSystem('PREDICTION COMPLETE.');
            triggerBtn.disabled = false;
            progressBar.style.width = '0%';
        }, 500);
    }

    function generateLottoNumbers() {
        const nums = new Set();
        while (nums.size < 6) {
            const n = Math.floor(Math.random() * 45) + 1;
            nums.add(n);
        }
        return Array.from(nums).sort((a, b) => a - b);
    }

    function renderRow(numbers, index) {
        const row = document.createElement('div');
        row.className = 'lotto-row';
        row.style.animationDelay = `${index * 0.1}s`;

        numbers.forEach(n => {
            const slot = document.createElement('div');
            slot.className = 'lotto-num';
            slot.innerText = n.toString().padStart(2, '0');
            row.appendChild(slot);
        });

        resultGrid.appendChild(row);
    }

    triggerBtn.addEventListener('click', startPrediction);
});

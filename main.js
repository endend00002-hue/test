document.addEventListener('DOMContentLoaded', () => {
    const triggerBtn = document.getElementById('trigger-btn');
    const modeToggle = document.getElementById('mode-toggle');
    const resultGrid = document.getElementById('result-grid');
    const outputStream = document.getElementById('output-stream');
    const progressBar = document.getElementById('progress-bar');
    const clock = document.getElementById('clock');
    const body = document.body;

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

    // Theme Toggle
    modeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        logSystem(isLight ? 'LIGHT_MODE_ENABLED' : 'DARK_MODE_ENABLED');
        modeToggle.innerText = isLight ? 'DARK_MODE' : 'LIGHT_MODE';
    });

    async function startPrediction() {
        triggerBtn.disabled = true;
        resultGrid.innerHTML = '';
        logSystem('ACCESSING NEURAL NETWORK...');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            progressBar.style.width = `${progress}%`;
            if (progress >= 100) clearInterval(interval);
        }, 50);

        for (let i = 0; i < 5; i++) {
            await new Promise(r => setTimeout(r, 400));
            const numbers = generateLottoNumbers();
            logSystem(`BATCH_${i + 1}_COMPLETE: ${numbers.join(' ')}`);
            renderRow(numbers, i);
        }

        setTimeout(() => {
            logSystem('PREDICTION_FINISHED.');
            triggerBtn.disabled = false;
            progressBar.style.width = '0%';
        }, 300);
    }

    function generateLottoNumbers() {
        const nums = new Set();
        while (nums.size < 6) nums.add(Math.floor(Math.random() * 45) + 1);
        return Array.from(nums).sort((a, b) => a - b);
    }

    function renderRow(numbers, index) {
        const row = document.createElement('div');
        row.className = 'lotto-row';
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

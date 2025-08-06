const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapList = document.getElementById('lapList');

let startTime = 0; // Initialize startTime to 0
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCounter = 0;

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = ms % 1000;

    return {
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
        milliseconds: String(milliseconds).padStart(3, '0')
    };
}

function updateDisplay() {
    const currentTime = Date.now();
    // Only update elapsedTime if the stopwatch is running, otherwise use the stored elapsedTime
    if (isRunning) {
        elapsedTime = currentTime - startTime;
    }
    const formatted = formatTime(elapsedTime);

    hoursDisplay.textContent = formatted.hours;
    minutesDisplay.textContent = formatted.minutes;
    secondsDisplay.textContent = formatted.seconds;
    millisecondsDisplay.textContent = formatted.milliseconds;
}

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10);
        
        startStopBtn.textContent = 'Pause';
        startStopBtn.classList.remove('start');
        startStopBtn.classList.add('pause');
        lapBtn.disabled = false;
    } else {
        pauseStopwatch();
    }
}

function pauseStopwatch() {
    isRunning = false;
    clearInterval(timerInterval);
    startStopBtn.textContent = 'Start';
    startStopBtn.classList.remove('pause');
    startStopBtn.classList.add('start');
    lapBtn.disabled = true;
}

function resetStopwatch() {
    pauseStopwatch();
    elapsedTime = 0;
    lapCounter = 0;
    updateDisplay();
    lapList.innerHTML = '';
    lapBtn.disabled = true;
}

function recordLap() {
    if (isRunning) {
        lapCounter++;
        const formatted = formatTime(elapsedTime);
        const lapTimeItem = document.createElement('li');
        lapTimeItem.innerHTML = `<span>Lap ${lapCounter}:</span> ${formatted.hours}:${formatted.minutes}:${formatted.seconds}.${formatted.milliseconds}`;
        lapList.prepend(lapTimeItem);
    }
}

startStopBtn.addEventListener('click', startStopwatch);
lapBtn.addEventListener('click', recordLap);
resetBtn.addEventListener('click', resetStopwatch);


updateDisplay();

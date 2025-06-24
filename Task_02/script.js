let [minutes, seconds, milliseconds] = [0, 0, 0];
let timer = null;
let isRunning = false;

function updateDisplay() {
  document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
  document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
  document.getElementById('milliseconds').innerText = milliseconds < 10 ? '0' + milliseconds : milliseconds;
}

function startStop() {
  if (!isRunning) {
    timer = setInterval(runStopwatch, 10);
    isRunning = true;
    document.getElementById('startStopBtn').innerText = 'Pause';
  } else {
    clearInterval(timer);
    isRunning = false;
    document.getElementById('startStopBtn').innerText = 'Start';
  }
}

function runStopwatch() {
  milliseconds++;
  if (milliseconds === 100) {
    milliseconds = 0;
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
  }
  updateDisplay();
}

function reset() {
  clearInterval(timer);
  [minutes, seconds, milliseconds] = [0, 0, 0];
  isRunning = false;
  updateDisplay();
  document.getElementById('startStopBtn').innerText = 'Start';
  document.getElementById('laps').innerHTML = ''; // Clear lap list
}

function lap() {
  if (!isRunning) return;

  const lapTime = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}:${milliseconds < 10 ? '0' + milliseconds : milliseconds}`;
  const li = document.createElement('li');
  li.innerText = lapTime;
  document.getElementById('laps').appendChild(li);
}

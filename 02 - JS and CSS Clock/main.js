const secHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
const alarmBtn = document.querySelector('.alarm-set');
const input = document.querySelector('.alarm-time');

// On document loaded get alarm time from local storage and display in alarm input
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('alarmTime') !== null) {
    input.value = localStorage.getItem('alarmTime');
    setAlarm();
  }
});

// Set date and set up rotation for hands
function setDate() {
  const date = new Date();

  const sec = date.getSeconds();
  const secDegrees = (sec / 60) * 360 + 90; //  add 90 ( offset rotate(90deg))
  secHand.style.transform = `rotate(${secDegrees}deg)`;

  const min = date.getMinutes();
  const minDegrees = (min / 60) * 360 + 90;
  minHand.style.transform = `rotate(${minDegrees}deg)`;

  const hour = date.getHours();
  const hourDegrees = (hour / 12) * 360 + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

// Get date and rotate hands every second
setInterval(setDate, 1000);

// Set alarm time in local storage; clear local storage;
function setAlarm() {
  let alarmTime = input.value;
  if (alarmBtn.textContent === 'Set alarm' && alarmTime) {
    localStorage.setItem('alarmTime', alarmTime);
    alarmBtn.textContent = 'Cancel';
  } else if (alarmBtn.textContent === 'Cancel') {
    input.value = '00:00';
    localStorage.clear();
    alarmBtn.textContent = 'Set alarm';
  }
}

// Run alarm
function runAlarm() {
  const currentHour = new Date().getHours();
  const currentMin = new Date().getMinutes();
  //Set up date format - add 0 if h or min <10
  const currentTime = `${(currentHour < 10 ? '0' : '') + currentHour}:${(currentMin < 10
    ? '0'
    : '') + currentMin}`;
  const audio = new Audio('alarm.mp3');

  // Set audio to play if alarmTime in local storage = currentTime
  if (localStorage.getItem('alarmTime') === currentTime) {
    audio.play();
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 21000);
    alarmBtn.textContent = 'Cancel';

    // cancel alarm sound
    alarmBtn.addEventListener('mouseup', () => {
      if (alarmBtn.textContent === 'Cancel') {
        localStorage.removeItem('alarmTime');
        audio.pause();
        audio.currentTime = 0;
      }
    });
  }
}
// Check if
setInterval(runAlarm, 1000);
// event listner for alarm button
alarmBtn.addEventListener('click', setAlarm);

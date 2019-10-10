// Remove button animation
function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

// Play sound on keydown
function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);

  if (!audio) return; // if doesn't match the audio stop function
  audio.currentTime = 0; // rewind to the start
  audio.play();
  key.classList.add('playing');
}

// Play sound on click
function playSoundClick(e) {
  const keyName = e.currentTarget.lastElementChild.innerHTML;
  const audioClick = document.querySelector(`audio[src="sounds/${keyName}.wav"]`);

  e.currentTarget.style.cursor = 'pointer';
  if (!audioClick) return;
  audioClick.currentTime = 0;
  audioClick.play();
  e.currentTarget.classList.add('playing');
}

const keys = document.querySelectorAll('.key');

// Event listeners
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);
keys.forEach(key => key.addEventListener('click', playSoundClick));

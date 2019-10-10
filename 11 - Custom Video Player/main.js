const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipBtns = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.fullscreen');

// Functions
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    // Other way 
    // const method = video.paused ? 'play' : 'pause';
    // video[method]();
}

function updateBtn() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function rangeUpdate() {
    //console.log(this.value, this.name);
    video[this.name] = this.value;
}

function updateProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}


function toggleFullScreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen()
    } else {
        player.requestFullscreen()
    }
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateBtn);
video.addEventListener('pause', updateBtn);
video.addEventListener('timeupdate', updateProgress);
toggle.addEventListener('click', togglePlay);
skipBtns.forEach(btn => btn.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', rangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', rangeUpdate));

let mousedown = false; // flag var for mousedown detection
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fullScreen.addEventListener('click', toggleFullScreen);
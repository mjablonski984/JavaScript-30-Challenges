const speed = document.querySelector('.speed');
const bar = speed.querySelector('.speed-bar');
const video = document.querySelector('.flex');

function handleMove(e) {
    // Get the position Y of a cursor inside the speed bar
    const y = e.pageY - this.offsetTop;
    // Get the percent (current position Y in the elem. / height of the elem.) 
    const percent = y / this.offsetHeight;
    // Get the full percentage  
    const height = Math.round(percent * 100) + '%';
    // Min and max values for playbackRate
    const min = 0.4;
    const max = 4;
    // Formula for playback rate (incl. min and max values)
    const playbackRate = percent * (max - min) + min;

    bar.style.height = height;
    bar.textContent = playbackRate.toFixed(2) + '×';
    // Set the playback rate of the video 
    video.playbackRate = playbackRate;
}



speed.addEventListener('mousemove', handleMove);
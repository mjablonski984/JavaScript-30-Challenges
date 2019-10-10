const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

function startingPos(e) {
    isDown = true;
    slider.classList.add('active');
    // Get the initial position of a click
    startX = e.pageX - slider.offsetLeft;
    // Append the value (initial = 0); used to get the last position of a mouse for mouseMove
    scrollLeft = slider.scrollLeft;
}

function mouseUp() {
    isDown = false;
    slider.classList.remove('active');
}

function mouseLeave() {
    isDown = false;
    slider.classList.remove('active');
}

function mouseMove(e) {
    if (!isDown) return;

    e.preventDefault();
    // Re-calculate the position of a click to get the current position
    const x = e.pageX - slider.offsetLeft;
    // Calculate the difference between the starting and the current positions 
    const walk = x - startX;
    // Scroll the element by the value mouse was moved (walk).
    slider.scrollLeft = scrollLeft - walk;
}


slider.addEventListener("mousedown", startingPos);
slider.addEventListener("mouseup", mouseUp)
slider.addEventListener("mouseleave", mouseLeave);
slider.addEventListener("mousemove", mouseMove)
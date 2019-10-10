const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100;
//ctx.globalCompositeOperation = 'multiply';
//ctx.globalCompositeOperation = 'lighter';
//ctx.globalCompositeOperation = 'xor';
//ctx.globalCompositeOperation = 'screen';
//ctx.globalCompositeOperation = 'lighten';
//ctx.globalCompositeOperation = 'darken';
//ctx.globalCompositeOperation = 'overlay';
//ctx.globalCompositeOperation = 'color-burn';
//ctx.globalCompositeOperation = 'color-dodge';
// ctx.globalCompositeOperation = 'difference';
// ctx.globalCompositeOperation = 'hue';
//ctx.globalCompositeOperation = 'luminosity';


let isDrawing = false;
// starting / ending point coords.
let lastX = 0;
let lastY = 0;
// vars for changing color and line width
let hue = 0;
let direction = true;


function draw(e) {
    if (!isDrawing) return; // stop the fn from running when they are not moused down
    console.log(e);
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    // start from
    ctx.moveTo(lastX, lastY);
    // go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    // update starting points for x and y
    [lastX, lastY] = [e.offsetX, e.offsetY];
    // increment hue 
    hue++;
    if (hue >= 360) {
        hue = 0;
    }

    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        // change the direction 
        direction = !direction;
    }

    if (direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }
}

// set up starting x and y on mousedown (before mousemove)
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
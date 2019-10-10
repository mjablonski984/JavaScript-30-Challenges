const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
            video.srcObject = localMediaStream;
            video.play();
            console.log(localMediaStream);
        })
        .catch(err => {
            console.error(err);
        });
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    // make the canvas match the width and height of a video
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        // drwa the image from webcam on the canvas (video, top ,left,width and height)
        ctx.drawImage(video, 0, 0, width, height);
        // take the pixels out
        let pixels = ctx.getImageData(0, 0, width, height);
        // add filters
        //  pixels = redEffect(pixels);

        //pixels = rgbSplit(pixels);
        ctx.globalAlpha = 0.2;

        pixels = greenScreen(pixels);
        // put them back
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

function takePhoto() {
    // played the snap sound
    snap.currentTime = 0;
    snap.play();

    // take the data out of the canvas
    const data = canvas.toDataURL('image/jpeg');
    // create element a and set attr download
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
    strip.insertBefore(link, strip.firstChild);

}

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        // one px is respresented by 4 values(rgba) (px one -> index 0-3 ) thus we increnment by 4
        pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
    }
    return pixels;
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0]; // RED
        pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
        pixels.data[i - 550] = pixels.data[i + 2]; // Blue
    }
    return pixels;
}

function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });

    for (i = 0; i < pixels.data.length; i = i + 4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];

        if (red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) {
            // take it out!
            pixels.data[i + 3] = 0;
        }
    }

    return pixels;
}

getVideo();

video.addEventListener("canplay", paintToCanvas);
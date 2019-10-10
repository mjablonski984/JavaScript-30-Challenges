const links = document.querySelectorAll('a');
// Create span element with class 'highlight' and add it to the document
const highlight = document.createElement('span');
highlight.classList.add('highlight');
document.body.appendChild(highlight);

function highlightLink() {
    // Get the dimensions and position of element 
    const linkCoords = this.getBoundingClientRect();

    // Create object with properties: width, height, top and left positions 
    // Offsets are needed for correct display of highlihgt position when page is scrolled
    const coords = {
        width: linkCoords.width,
        height: linkCoords.height,
        top: linkCoords.top + window.scrollY,
        left: linkCoords.left + window.scrollX
    };
    console.log(coords);

    // Change the size and psition of the highlight 
    highlight.style.width = `${coords.width}px`;
    highlight.style.height = `${coords.height}px`;
    highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;

}

links.forEach(a => a.addEventListener('mouseenter', highlightLink));
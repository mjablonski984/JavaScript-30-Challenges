const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];
// Replace: the,a,an witha an empty space for correct sorting
function strip(bandName) {
    return bandName.replace(/^(a |the |an )/i, '').trim();
}

// Sort the array with the use of strip function
const sortedBands = bands.sort((a, b) => strip(a) > strip(b) ? 1 : -1);

document.querySelector('#bands').innerHTML =
    sortedBands
        .map(band => `<li>${band}</li>`)
        .join('');

console.log(sortedBands);
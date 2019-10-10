const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
msg.text = document.querySelector('[name="text"]').value;

// Populate the select element with options containing english voices
function populateVoices() {
    voices = this.getVoices();
    voicesDropdown.innerHTML = voices
        .filter(voice => voice.lang.includes('en'))
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join('');
}

function toggle(startOver = true) {
    // Cancel the voice
    speechSynthesis.cancel();
    if (startOver) {
        // Speak (if startOver isn't false)
        speechSynthesis.speak(msg);
    }
}

function setVoice() {
    // loop over the list of voices and pick up the one if its name equals to name in the option
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
}

function setOption() {
    console.log(this.name, this.value);
    msg[this.name] = this.value; //msg.text msg.rate, .sg.pitch
    toggle();
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));
// also can use:('click', toggle.bind(null,false));
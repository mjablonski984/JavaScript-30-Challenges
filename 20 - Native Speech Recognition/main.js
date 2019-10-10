window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', e => {
    // get the speech transcript from SpeechRecognitionEvent
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
    console.log(transcript)

    // Display transcript 
    p.textContent = transcript;
    // when done talking add new paragraph without overwriting the previous one 
    if (e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
    }

    if (transcript.includes('ok')) {
        console.log('OK!!!!!!!!!!')
    }
});

// When finished speaking run the recognition function when next speech is detected
recognition.addEventListener('end', recognition.start);
// Init. the speech recognition
recognition.start();
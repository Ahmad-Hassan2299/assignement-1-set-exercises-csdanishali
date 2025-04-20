document.addEventListener('DOMContentLoaded', () => {
    const samples = document.querySelectorAll('.sample');
    const speechText = document.getElementById('speech-text');
    const sayItButton = document.getElementById('say-it');
    let currentAudio = null;

    // Handle sample audio playback
    samples.forEach(sample => {
        sample.addEventListener('click', () => {
            // Stop any currently playing audio or speech
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }
            window.speechSynthesis.cancel(); // Stop any ongoing speech

            // Play the sample audio
            const audioPath = `Exercises/Audio Sampler/${sample.dataset.audio}`;
            currentAudio = new Audio(audioPath);
            currentAudio.play().catch(error => {
                console.error('Error playing audio:', error);
            });
        });
    });

    // Handle text-to-speech
    sayItButton.addEventListener('click', () => {
        // Stop any currently playing audio or speech
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        window.speechSynthesis.cancel();

        // Get text from input
        const text = speechText.value.trim();
        if (text) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-GB'; // British English to mimic Alan Partridge
            utterance.pitch = 1.2; // Slightly higher pitch for comedic effect
            utterance.rate = 1; // Normal speed
            utterance.volume = 1;

            // Try to select a British male voice
            const voices = window.speechSynthesis.getVoices();
            const britishVoice = voices.find(voice => voice.lang === 'en-GB' && voice.name.toLowerCase().includes('male')) || voices.find(voice => voice.lang === 'en-GB');
            if (britishVoice) {
                utterance.voice = britishVoice;
            }

            window.speechSynthesis.speak(utterance);
        }
    });

    // Load voices (needed for some browsers like Chrome)
    window.speechSynthesis.onvoiceschanged = () => {
        const voices = window.speechSynthesis.getVoices();
        const britishVoice = voices.find(voice => voice.lang === 'en-GB' && voice.name.toLowerCase().includes('male')) || voices.find(voice => voice.lang === 'en-GB');
        if (britishVoice) {
            utterance.voice = britishVoice;
        }
    };
});
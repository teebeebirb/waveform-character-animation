// These access the interactive elements in "index.html"
const startStopBtn = document.getElementById('clickableText');
const waveform = document.getElementById('animatedText');

/* This array stores all possible characters that the script
will use to animate the string */
const waveformCharacters = [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/* When the page loads, the script takes the characters in the waveform and 
turns them into individual spans to set them up to be looped through for the animation. 
To avoid a wonky visual glitch when the page loads for the first time, this also sets up an opacity fade in
*/
window.addEventListener('load', function() {
    const mainLoaded = document.getElementById('mainFaded');
    mainLoaded.classList.add('loaded');
    
    const text = waveform.textContent; 
    const spanArray = [];

    for (let i = 0; i < text.length; i++) {
        const char = text[i] === ' ' ? '&nbsp;' : text[i];
        spanArray.push('<span class="char">' + char + '</span>');
}

    waveform.innerHTML = spanArray.join('');

    // Gather all the created spans
    const charSpans = document.querySelectorAll('.char');

     /* This function gets a random chracter with weighted probability conditions. 
     There's a 3% chance a character will turn into a space, a 18% chance the 
     character will turn into a really tall or really short character and an 79% 
     chance the character will turn into an alphanumerical character somewhere 
     in the middle. */
    function getRandomCharacter() {
    const randomValue = Math.random(); 
    
    if (randomValue < 0.03) {
        return waveformCharacters[0]; 
        
    } else if (randomValue < 0.18) {
        
        const specialRanges = [
            ...waveformCharacters.slice(1, 20),
            ...waveformCharacters.slice(37, 53),
            ...waveformCharacters.slice(53, 57),
            ...waveformCharacters.slice(60, 63)
        ];
        
        const randomIndex = Math.floor(Math.random() * specialRanges.length);
        return specialRanges[randomIndex];
        
    } else {
        
        const regularRanges = [
            ...waveformCharacters.slice(21, 37),
            ...waveformCharacters.slice(58, 60)
        ];
        
        const randomIndex = Math.floor(Math.random() * regularRanges.length);
        return regularRanges[randomIndex];
    }
}

     /* This function loops through the created spans and 
     changes each character randomly to drive the waveform animation. */
    function animateWaveform() {
        charSpans.forEach(function(span) {
            const newChar = getRandomCharacter();
            span.innerHTML = newChar === ' ' ? '&nbsp;' : newChar;
        });
    }
    
    // Below is where the animation toggle is set up
    let animationInterval;
    let isAnimating = false;

    function toggleAnimation() {
        if (isAnimating) {
            // Stop animation
            clearInterval(animationInterval);
            isAnimating = false;
        } else {
            // Start animation
            animationInterval = setInterval(animateWaveform, 150); // Updates every 120ms
            isAnimating = true;
        }
    }

    // This is the click event listener for the toggle function above
    startStopBtn.addEventListener('click', toggleAnimation);
    
    // Start the animation immediately
    toggleAnimation();
});

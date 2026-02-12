function nextScreen() {
    document.getElementById('screen-1').classList.add('hidden');
    document.getElementById('screen-1').style.display = 'none';

    const screen2 = document.getElementById('screen-2');
    screen2.classList.remove('hidden');
    screen2.style.display = 'flex'; // Flex for centering

    // Start the heart formation animation
    formHeart();

    createHearts();
}

function formHeart() {
    const container = document.getElementById('heart-formation');
    // Clear previous hearts if any (except the text)
    const existingHearts = container.querySelectorAll('.particle-heart');
    existingHearts.forEach(h => h.remove());

    const numParticles = 400; // Increased significantly for "más corazones"

    // Dynamic scale based on screen size
    const minDimension = Math.min(window.innerWidth, window.innerHeight);
    let scale = 16;

    if (minDimension < 500) {
        scale = 8; // Smaller scale for mobile
    } else if (minDimension < 800) {
        scale = 12; // Medium scale for tablets
    }


    // Colorful palette based on the reference image (pinks, reds, oranges, purples)
    const colors = [
        '#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', // Pinks/Reds
        '#ff99c8', '#e0aaff', '#c77dff', '#9d4edd', // Purples
        '#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff' // Vibrant mix
    ];

    // Heart curve formula:
    // x = 16 * sin(t)^3
    // y = 13 * cos(t) - 5 * cos(2*t) - 2 * cos(3*t) - cos(4*t)

    for (let i = 0; i < numParticles; i++) {
        // Add some randomness to t to scatter them slightly off the perfect line for a "confetti" look
        const t = (Math.PI * 2 * i) / numParticles;

        // Add random scatter factor for "thickness" of the line
        const scatter = (Math.random() - 0.5) * 1.5;

        const xRaw = 16 * Math.pow(Math.sin(t), 3);
        const yRaw = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

        const x = (xRaw + scatter) * scale;
        const y = (yRaw + scatter) * scale;

        const heart = document.createElement('div');
        heart.classList.add('particle-heart');

        // Use text color for coloring, '❤' works better than emoji for css color
        heart.innerHTML = '❤';

        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        heart.style.color = randomColor;

        // Varied sizes
        const size = Math.random() * 20 + 10;
        heart.style.fontSize = `${size}px`;

        // Random rotation
        heart.style.transform = `rotate(${Math.random() * 360}deg)`;

        // Initial random position (scattered off screen or wide)
        const startX = (Math.random() - 0.5) * window.innerWidth * 1.5;
        const startY = (Math.random() - 0.5) * window.innerHeight * 1.5;

        // Reset transform to start position
        heart.style.transform = `translate(${startX}px, ${startY}px) rotate(${Math.random() * 360}deg)`;

        container.appendChild(heart);

        // Animate to final position
        setTimeout(() => {
            heart.style.opacity = '1';
            // We need to set final position. 
            // In CSS we set left: 50%, top: 50%. 
            // Translate is relative to that center.
            const rotation = Math.random() * 360;
            heart.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
        }, 50 + Math.random() * 100);
    }

    // Show text after hearts form
    setTimeout(() => {
        document.querySelector('.question-text').classList.remove('hidden-text');
    }, 1500);

    // Show buttons after text (2s total delay)
    setTimeout(() => {
        document.querySelector('.buttons').classList.remove('transparent');
    }, 2500);
}

function moveButton() {
    const btnNo = document.getElementById('btn-no');
    const btnYes = document.getElementById('btn-yes');

    // Make "Yes" button bigger
    let currentSize = parseFloat(window.getComputedStyle(btnYes).fontSize);
    btnYes.style.fontSize = (currentSize * 1.5) + 'px';

    // Make "Yes" button padding bigger
    let currentPadTop = parseFloat(window.getComputedStyle(btnYes).paddingTop);
    let currentPadRight = parseFloat(window.getComputedStyle(btnYes).paddingRight);
    btnYes.style.padding = `${currentPadTop * 1.2}px ${currentPadRight * 1.2}px`;


    // Make "No" button move around the entire screen

    const maxX = window.innerWidth - btnNo.offsetWidth;
    const maxY = window.innerHeight - btnNo.offsetHeight;

    // Ensure we don't spawn it off screen
    const randomX = Math.max(0, Math.random() * maxX);
    const randomY = Math.max(0, Math.random() * maxY);

    btnNo.style.position = 'fixed';
    btnNo.style.left = randomX + 'px';
    btnNo.style.top = randomY + 'px';
    btnNo.style.zIndex = '2000'; // Make sure it stays on top of hearts
}

function celebrate() {
    document.getElementById('screen-2').style.display = 'none';
    const screen3 = document.getElementById('screen-3');
    screen3.classList.remove('hidden');
    screen3.style.display = 'flex'; // Changed to flex for centering

    // Launch confetti
    for (let i = 0; i < 100; i++) {
        createConfetti();
    }
}

function createHearts() {
    const bg = document.querySelector('.background-hearts');
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 2 + 3 + 's';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        bg.appendChild(heart);
    }
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.animationDuration = Math.random() * 2 + 1 + 's';
    document.querySelector('.confetti-container').appendChild(confetti);

    setTimeout(() => {
        confetti.remove();
    }, 3000);
}

// Start some hearts initially
createHearts();
setInterval(createHearts, 2000);

// Create lights
const colors = ['#ff0000', '#00ff00', '#ffffff', '#ffff00', '#0000ff'];
let currentAnimation = null;
let isPlaying = true;

function createLights() {
    const strings = document.querySelectorAll('.light-string');
    strings.forEach((string, rowIndex) => {
        for (let i = 0; i < 10; i++) {
            const light = document.createElement('div');
            light.className = 'christmas-light';
            light.style.backgroundColor = colors[i % colors.length];
            light.style.color = colors[i % colors.length];
            string.appendChild(light);
        }
    });
}

function createChristmasShow() {
    const timeline = anime.timeline({
        easing: 'easeInOutSine',
        loop: true
    });

    // Classic Christmas chase effect
    timeline.add({
        targets: '.light-string:nth-child(odd) .christmas-light',
        opacity: [0.3, 1],
        scale: [1, 1.3],
        duration: 600,
        delay: anime.stagger(100),
        direction: 'alternate',
        loop: true
    }, 0)
    .add({
        targets: '.light-string:nth-child(even) .christmas-light',
        opacity: [1, 0.3],
        scale: [1.3, 1],
        duration: 600,
        delay: anime.stagger(100),
        direction: 'alternate',
        loop: true
    }, 0)

    // Twinkling star effect
    .add({
        targets: '.christmas-light',
        boxShadow: [
            '0 0 20px currentColor',
            '0 0 40px currentColor',
            '0 0 20px currentColor'
        ],
        duration: 1500,
        delay: anime.stagger(200, {grid: [10, 3], from: 'random'}),
        direction: 'alternate',
        loop: true
    }, 0)

    // Christmas tree pattern
    .add({
        targets: '.light-string .christmas-light',
        translateY: function(el, i) {
            return Math.sin(i * 0.5) * 20;
        },
        translateX: function(el, i) {
            return Math.cos(i * 0.5) * 20;
        },
        duration: 2000,
        delay: anime.stagger(100, {from: 'center'}),
        direction: 'alternate',
        loop: true
    }, 0)

    // Color rotation
    .add({
        targets: '.christmas-light',
        backgroundColor: function(el, i, total) {
            return colors[(i + 1) % colors.length];
        },
        color: function(el, i, total) {
            return colors[(i + 1) % colors.length];
        },
        duration: 2000,
        delay: anime.stagger(200, {from: 'last'}),
        loop: true
    }, 0);

    return timeline;
}

function toggleShow() {
    const button = document.getElementById('startShow');
    if (isPlaying) {
        currentAnimation.pause();
        button.textContent = 'Start Show';
    } else {
        currentAnimation.play();
        button.textContent = 'Stop Show';
    }
    isPlaying = !isPlaying;
}

function resetShow() {
    if (currentAnimation) {
        currentAnimation.pause();
        currentAnimation = createChristmasShow();
        currentAnimation.play();
        isPlaying = true;
        document.getElementById('startShow').textContent = 'Stop Show';
    }
}

// Initialize and start show
createLights();
currentAnimation = createChristmasShow();
document.getElementById('startShow').textContent = 'Stop Show';
document.getElementById('startShow').addEventListener('click', toggleShow);
document.getElementById('resetShow').addEventListener('click', resetShow);
// Create lights
const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
let currentAnimation = null;

function createLights() {
    const strings = document.querySelectorAll('.light-string');
    strings.forEach(string => {
        for (let i = 0; i < 8; i++) {
            const light = document.createElement('div');
            light.className = 'christmas-light';
            light.style.backgroundColor = colors[i % colors.length];
            light.style.color = colors[i % colors.length];
            string.appendChild(light);
        }
    });
}

function startChristmasShow() {
    if (currentAnimation) {
        currentAnimation.pause();
    }

    const timeline = anime.timeline({
        easing: 'easeInOutQuad',
        loop: true
    });

    // Sequence 1: Cascade effect
    timeline.add({
        targets: '.christmas-light',
        scale: [1, 1.5],
        brightness: [1, 2],
        boxShadow: ['0 0 15px currentColor', '0 0 30px currentColor'],
        duration: 800,
        delay: anime.stagger(100, {grid: [8, 3], from: 'center'}),
        direction: 'alternate'
    })
    
    // Sequence 2: Wave pattern
    .add({
        targets: '.christmas-light',
        translateY: function(el, i) {
            return Math.sin(i * 0.35) * 15;
        },
        scale: [1, 1.2],
        duration: 1000,
        delay: anime.stagger(50, {from: 'first'}),
        direction: 'alternate'
    })
    
    // Sequence 3: Spiral dance
    .add({
        targets: '.christmas-light',
        rotate: [0, 360],
        scale: [1, 1.3],
        duration: 1500,
        delay: anime.stagger(100, {grid: [8, 3], from: 'center'}),
    })
    
    // Sequence 4: Random twinkle
    .add({
        targets: '.christmas-light',
        opacity: function() {
            return anime.random(0.4, 1);
        },
        scale: function() {
            return anime.random(0.8, 1.4);
        },
        duration: 800,
        delay: anime.stagger(100, {grid: [8, 3], from: 'random'}),
        direction: 'alternate',
        loop: 3
    })
    
    // Sequence 5: Color change
    .add({
        targets: '.christmas-light',
        backgroundColor: function(el, i) {
            return colors[(i + 1) % colors.length];
        },
        color: function(el, i) {
            return colors[(i + 1) % colors.length];
        },
        scale: [1, 1.2],
        duration: 1000,
        delay: anime.stagger(200),
        direction: 'alternate'
    });

    currentAnimation = timeline;
}

function resetShow() {
    if (currentAnimation) {
        currentAnimation.pause();
        currentAnimation = null;
    }

    anime({
        targets: '.christmas-light',
        scale: 1,
        opacity: 1,
        rotate: 0,
        translateX: 0,
        translateY: 0,
        backgroundColor: function(el, i) {
            return colors[i % colors.length];
        },
        color: function(el, i) {
            return colors[i % colors.length];
        },
        boxShadow: '0 0 15px currentColor',
        duration: 500,
        easing: 'easeOutQuad'
    });
}

// Initialize lights and event listeners
createLights();
document.getElementById('startShow').addEventListener('click', startChristmasShow);
document.getElementById('resetShow').addEventListener('click', resetShow);
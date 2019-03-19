let accCounter = 0;
let totalCount = 127;
const minDeg = 1;
const maxDeg = 72;
const particlesClasses = [
    {
        class: "pop-top"
    },
    {
        class: "pop-top-left"
    },
    {
        class: "pop-top-right"
    },
    {
        class: "pop-bottom-right"
    },
    {
        class: "pop-bottom-left"
    },
];

document.getElementById('clap').onclick = function () {
    const clap = document.getElementById('clap');
    const particles = document.getElementById('particles');
    const particles2 = document.getElementById('particles-2');
    const particles3 = document.getElementById('particles-3');
    const particles4 = document.getElementById('particles-4');
    const particles5 = document.getElementById('particles-5');
    clap.classList.add('clicked');

    if (!particles.classList.contains('animating')) {
        animateParticles(particles, 700);
    } else if (!particles2.classList.contains('animating')) {
        animateParticles(particles2, 700);
    } else if (!particles3.classList.contains('animating')) {
        animateParticles(particles3, 700);
    } else if (!particles4.classList.contains('animating')) {
        animateParticles(particles4, 700);
    } else if (!particles5.classList.contains('animating')) {
        animateParticles(particles5, 700);
    }
}

function runAnimationCycle(el, className, duration) {
    if (el && !el.classList.contains(className)) {
        el.classList.add(className);
    } else {
        el.classList.remove(className);
        void el.offsetWidth; // Trigger a reflow in between removing and adding the class name
        el.classList.add(className);
    }
}

function runParticleAnimationCycle(el, className, duration) {
    if (el && !el.classList.contains(className)) {
        el.classList.add(className);
        setTimeout(() => {
            el.classList.remove(className);
        }, duration);
    }
}

function animateParticles(particles, dur) {
    addRandomParticlesRotation(particles.id, minDeg, maxDeg);
    for (let i = 0; i < particlesClasses.length; i++) {
        runParticleAnimationCycle(particles.children[i], particlesClasses[i].class, dur);
    }
    // Boolean functionality only to activate particles2, particles3 when needed
    particles.classList.add('animating');
    setTimeout(() => {
        particles.classList.remove('animating');
    }, dur);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addRandomParticlesRotation(particlesName, minDeg, maxDeg) {
    const particles = document.getElementById(particlesName);
    const randomRotationAngle = getRandomInt(minDeg, maxDeg) + 'deg';
    particles.style.transform = `rotate(${randomRotationAngle})`;
}
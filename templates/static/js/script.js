const SLOTS_PER_REEL = 14;
const REEL_RADIUS = Math.round(149 * Math.tan(Math.PI / 12) / Math.tan(Math.PI / 14));

function createSlots(ring) {
    const slotAngle = 360 / SLOTS_PER_REEL;
    const seed = getSeed();

    for (let i = 0; i < SLOTS_PER_REEL; i++) {
        const slot = document.createElement('div');
        slot.className = 'slot';
        const transform = 'rotateX(' + (slotAngle * i) + 'deg) translateZ(' + REEL_RADIUS + 'px)';
        slot.style.transform = transform;

        const slotContent = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'][(getSeed() + i) % 14];
        slot.innerHTML = '<p>' + slotContent + '</p>';
        ring.append(slot);
    }
}

function getSeed() {
    return Math.floor(Math.random() * SLOTS_PER_REEL);
}

function spin(timer) {
    for (let i = 1; i < 3; i++) {
        const oldClass = document.getElementById('ring' + i).className;
        let seed = getSeed();
        while (oldClass.trim() === 'ring spin-' + seed) {
            seed = getSeed();
        }
        document.getElementById('ring' + i)
            .style.animation = 'back-spin 1s, spin-' + seed + ' ' + (timer + i * 0.5) + 's';
        document.getElementById('ring' + i).className = 'ring spin-' + seed;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createSlots(document.getElementById('ring1'));
    createSlots(document.getElementById('ring2'));

    document.querySelector('.go').addEventListener('click', () => {
        spin(2);
    });
});

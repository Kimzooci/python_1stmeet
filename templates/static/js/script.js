const SLOTS_PER_REEL = 14;
const REEL_RADIUS = Math.round(149 * Math.tan( Math.PI / 12) / Math.tan( Math.PI / 14));

function createSlots(ring) {
    var slotAngle = 360 / SLOTS_PER_REEL;
    var seed = getSeed();
    for (var i = 0; i < SLOTS_PER_REEL; i++) {
        var slot = document.createElement('div');
        slot.className = 'slot';
        var transform = 'rotateX(' + (slotAngle * i) + 'deg) translateZ(' + REEL_RADIUS + 'px)';
        slot.style.transform = transform;
        var slotContent = '';
        switch((seed + i) % 14) {
            case 0: slotContent = 'ㄱ'; break;
            case 1: slotContent = 'ㄴ'; break;
            case 2: slotContent = 'ㄷ'; break;
            case 3: slotContent = 'ㄹ'; break;
            case 4: slotContent = 'ㅁ'; break;
            case 5: slotContent = 'ㅂ'; break;
            case 6: slotContent = 'ㅅ'; break;
            case 7: slotContent = 'ㅇ'; break;
            case 8: slotContent = 'ㅈ'; break;
            case 9: slotContent = 'ㅊ'; break;
            case 10: slotContent = 'ㅋ'; break;
            case 11: slotContent = 'ㅌ'; break;
            case 12: slotContent = 'ㅍ'; break;
            case 13: slotContent = 'ㅎ'; break;
        }
        slot.innerHTML = '<p>' + slotContent + '</p>';
        ring.appendChild(slot);
    }
}

function getSeed() {
    return Math.floor(Math.random() * SLOTS_PER_REEL);
}

function spin(timer) {
    for (var i = 1; i < 3; i++) {
        var oldClass = document.querySelector('#ring' + i).className;
        var seed = getSeed();
        while (oldClass === 'ring spin-' + seed) {
            seed = getSeed();
        }
        var ring = document.querySelector('#ring' + i);
        ring.style.animation = 'back-spin 1s, spin-' + seed + ' ' + (timer + i * 0.5) + 's';
        ring.className = 'ring spin-' + seed;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    createSlots(document.querySelector('#ring1'));
    createSlots(document.querySelector('#ring2'));
    document.querySelector('.go').addEventListener('click', function() {
        spin(2);
    });
});

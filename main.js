function update() {
    'use strict';

    flies.forEach(function(fly) {
        fly.move();
    });

    draw();
    requestAnimationFrame(update);
}

function draw() {
    'use strict';

    ctx.drawImage(images.background, 0, 0);
    ctx.drawImage(images.poop, W / 2, H / 2);

    flies.forEach(function(fly) {
        fly.draw();
    });

    selected.forEach(function(fly) {
        fly.drawSelection();
    });

    if(Mouse.dragging) {
        Mouse.drawSelection();
    }
}

var flies = [
    new Fly(0, 250, 180),
    new Fly(1, 230, 220),
    new Fly(2, 270, 220)
];

var selected = [];

canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('contextmenu', onContextMenu);
update();

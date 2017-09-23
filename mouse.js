var Mouse = {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,

    path: undefined,
    dragging: false,

    fillStyle: 'rgba(255, 0, 255, 0.1',
    strokeStyle: 'magenta',

    drawSelection: function() {
        'use strict';

        ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = this.fillStyle;

        var width = this.endX - this.startX;
        var height = this.endY - this.startY;

        ctx.beginPath();

        ctx.rect(this.startX, this.startY, width, height);
        ctx.stroke();
        ctx.fill();

        ctx.closePath();
    }
};

function onMouseDown(evt) {
    'use strict';

    var x = evt.clientX - canvas.offsetLeft;
    var y = evt.clientY - canvas.offsetTop;

    if(evt.button == 2) { // if right click
        selected.forEach(function(fly) {
            fly.setDestination(x, y, selected.length > 1);
        });
    } else {
        Mouse.startX = x;
        Mouse.startY = y;

        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('mouseup', onMouseUp);
    }
}

function onMouseMove(evt) {
    'use strict';

    Mouse.dragging = true;

    Mouse.endX = evt.clientX - canvas.offsetLeft;
    Mouse.endY = evt.clientY - canvas.offsetTop;
}

function onMouseUp(evt) {
    'use strict';

    Mouse.endX = evt.clientX - canvas.offsetLeft;
    Mouse.endY = evt.clientY - canvas.offsetTop;

    selected = [];

    if(Mouse.dragging) {
        Mouse.path = new Path2D();
        Mouse.path.rect(Mouse.startX, Mouse.startY,
                        Mouse.endX - Mouse.startX, Mouse.endY - Mouse.startY);

        flies.forEach(function(fly) {
            if(ctx.isPointInPath(Mouse.path, fly.x, fly.y)) {
                selected.push(fly);
            }
        });
    } else {
        var x = evt.clientX - canvas.offsetLeft;
        var y = evt.clientY - canvas.offsetTop;

        flies.forEach(function(fly) {
            if(ctx.isPointInPath(fly.selection, x, y)) {
                selected.push(fly);
            }
        });
    }

    Mouse.dragging = false;
    Mouse.rightClick = false;

    canvas.removeEventListener('mousemove', onMouseMove);
    canvas.removeEventListener('mouseup', onMouseUp);
}

function onContextMenu(evt) {
    'use strict';

    // don't display context menu
    evt.preventDefault();
}

var Fly = function(type, x, y) {
    'use strict';

    // canvas coordinates
    this.x = x;
    this.y = y;

    // sprite animation
    this.sprite = images.flies;
    this.type = type;  // black, red or gold fly
    this.SIZE = 16;
    this.FRAMES = 4;
    this.MS_PER_FRAME = 30;
    this.startOfFrame = Date.now();

    // sheet coordinates
    this.sX = 0;
    this.sY = this.type * this.SIZE;

    // movement
    this.moving = false;
    this.SPEED = 1;

    // selection circle
    this.strokeStyle = 'rgb(255, 0, 255)';
    this.fillStyle = 'rgba(255, 0, 255, 0.1)';
    this.selection = new Path2D();
    this.selection.arc(this.x + this.SIZE / 2, this.y + this.SIZE / 2, this.SIZE, 0, Math.PI * 2);
};

Fly.prototype.draw = function() {
    'use strict';

    // draw fly
    ctx.drawImage(this.sprite,
                  this.sX * this.SIZE, this.sY, this.SIZE, this.SIZE,
                  this.x, this.y, this.SIZE, this.SIZE);

    // update frame
    if(Date.now() > this.startOfFrame + this.MS_PER_FRAME) {
        this.sX++;
        if(this.sX >= this.FRAMES) this.sX = 0;
        this.startOfFrame = Date.now();
    }
};

Fly.prototype.drawSelection = function() {
    'use strict';

    ctx.strokeStyle = this.strokeStyle;
    ctx.fillStyle = this.fillStyle;
    ctx.stroke(this.selection);
    ctx.fill(this.selection);
};

Fly.prototype.setDestination = function(x, y, randomize) {
    'use strict';

    var dx, dy;

    if(randomize == false || randomize == undefined) {
        dx = x - this.x;
        dy = y - this.y;
    } else {
        // if multiple flies are selected
        // randomize destinations to prevent overlapping
        var minOffset = -32;
        var maxOffset = 32;

        var offsetX = Math.floor(Math.random() * (maxOffset - minOffset)) + minOffset;
        var offsetY = Math.floor(Math.random() * (maxOffset - minOffset)) + minOffset;

        dx = x - this.x + offsetX;
        dy = y - this.y + offsetY;
    }

    var distance = Math.sqrt(dx * dx + dy * dy);

    this.moves = distance / this.SPEED;

    this.unitsX = dx / this.moves;
    this.unitsY = dy / this.moves;

    this.moving = true;
};

Fly.prototype.move = function() {
    'use strict';

    if(this.moving) {
        if(this.moves > 0) {
            // move fly
            this.x += this.unitsX;
            this.y += this.unitsY;

            // move selection circle
            this.selection = new Path2D();
            this.selection.arc(this.x + this.SIZE / 2,
                               this.y + this.SIZE / 2,
                               this.SIZE, 0, Math.PI * 2);
            this.moves--;
        }
    }
};

import { v4 as uuid } from 'uuid';
class GameObject {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }
    collidesWith(object) {
        return this.x < object.x + object.width &&
            this.x + this.width > object.x &&
            this.y < object.y + object.height &&
            this.y + this.height > object.y;
    }
}
class Assets {
    constructor() {
        this.invaderRed = new Image(40, 32);
        this.invaderYellow = new Image(40, 32);
        this.invaderGreen = new Image(40, 32);
        this.invaderRed.src = 'assets/invaderRed.png';
        this.invaderYellow.src = 'assets/invaderYellow.png';
        this.invaderGreen.src = 'assets/invaderGreen.png';
    }
}
const assets = new Assets();
class Player extends GameObject {
    constructor(x, y) {
        super(x, y, 50, 20, 7);
        this.bullets = [];
        this.maxBullets = 5;
        this.rightPressed = false;
        this.leftPressed = false;
        this.spacePressed = false;
    }
    draw(ctx) {
        ctx.fillStyle = '#0f0';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    drawUI(ctx) { }
    update() {
        if (this.rightPressed && this.x < canvas.width - this.width) {
            this.x += this.speed;
        }
        if (this.leftPressed && this.x > 0) {
            this.x -= this.speed;
        }
        if (this.spacePressed && this.bullets.length < this.maxBullets) {
            this.bullets.push(new Bullet(this.x, this.y));
        }
    }
    needsDeletion() {
        return false;
    }
    keyHandler(event, isPressed) {
        if (event.key === 'ArrowRight' || event.key === 'd') {
            this.rightPressed = isPressed;
        }
        if (event.key === 'ArrowLeft' || event.key === 'a') {
            this.leftPressed = isPressed;
        }
        if (event.code === 'Space') {
            this.spacePressed = isPressed;
        }
    }
}
class Invader extends GameObject {
    constructor(x, y, type = 'green') {
        super(x, y, Invader.invaderWidth, Invader.invaderHeight, 1);
        this.id = uuid();
        this.type = type;
        this.health = Invader.healths[type];
    }
    getId() {
        return this.id;
    }
    draw(ctx) {
        switch (this.type) {
            case 'green': {
                ctx.drawImage(assets.invaderGreen, this.x, this.y);
                break;
            }
            case 'yellow': {
                ctx.drawImage(assets.invaderYellow, this.x, this.y);
                break;
            }
            case 'red': {
                ctx.drawImage(assets.invaderRed, this.x, this.y);
                break;
            }
        }
    }
    drawUI(ctx) {
        const healthRatio = this.health / Invader.healths[this.type];
        if (healthRatio === 1.) {
            return;
        }
        const gradient = ctx.createLinearGradient(this.x, this.y - 2, this.x + this.width, this.y - 2);
        gradient.addColorStop(0, 'green');
        gradient.addColorStop(healthRatio, 'green');
        gradient.addColorStop(healthRatio, 'black');
        gradient.addColorStop(1, 'black');
        ctx.fillStyle = gradient;
        ctx.fillRect(this.x, this.y - 2 - Invader.healthbarHeight, this.width, Invader.healthbarHeight);
        ctx.fillStyle = '#000';
    }
    update() {
        this.x += this.speed;
    }
    needsDeletion() {
        return this.health <= 0;
    }
    decreaseHealth(damage) {
        this.health -= damage;
    }
}
Invader.invaderWidth = 40;
Invader.invaderHeight = 32;
Invader.healthbarHeight = 4;
Invader.healths = {
    green: 2,
    yellow: 3,
    red: 4,
};
class Bullet extends GameObject {
    constructor(x, y, damage = 1, maxCollisions = 1) {
        super(x - Bullet.bulletWidth / 2, y, Bullet.bulletWidth, 10, 7);
        this.collidedWith = new Set();
        this.damage = damage;
        this.leftCollisions = maxCollisions;
    }
    draw(ctx) {
        ctx.fillStyle = '#0ff';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    drawUI(ctx) { }
    update() {
        this.y -= this.speed;
    }
    needsDeletion() {
        return this.leftCollisions == 0 || this.y < 0;
    }
    checkCollisions() {
        if (this.leftCollisions == 0) {
            return;
        }
        for (let invader of invaders) {
            if (this.collidesWith(invader) && !this.collidedWith.has(invader.getId())) {
                invader.decreaseHealth(this.damage);
                this.collidedWith.add(invader.getId());
                this.leftCollisions -= 1;
                if (this.leftCollisions == 0) {
                    break;
                }
            }
        }
    }
}
Bullet.bulletWidth = 5;
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
let score = 0;
const player = new Player(canvas.width / 2 - 25, canvas.height - 30);
const invaders = [];
const bullets = player.bullets;
// Create invaders grid
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 10; j++) {
        invaders.push(new Invader(50 + j * 50, 50 + i * 40));
    }
}
document.addEventListener('keydown', (e) => player.keyHandler(e, true));
document.addEventListener('keyup', (e) => player.keyHandler(e, false));
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Update objects
    player.update();
    invaders.forEach((invader, index) => {
        if (invader.needsDeletion()) {
            invaders.splice(index, 1);
        }
        else {
            invader.update();
        }
    });
    bullets.forEach((bullet, index) => {
        if (bullet.needsDeletion()) {
            bullets.splice(index, 1);
        }
        else {
            bullet.update();
        }
    });
    // Check invader wall collision
    let changeDirection = false;
    invaders.forEach(invader => {
        if (invader.x <= 0 || invader.x + invader.width >= canvas.width) {
            changeDirection = true;
        }
    });
    if (changeDirection) {
        invaders.forEach(invader => {
            invader.speed *= -1;
            invader.y += 20;
        });
    }
    // Draw objects
    player.draw(ctx);
    invaders.forEach(invader => invader.draw(ctx));
    bullets.forEach(bullet => bullet.draw(ctx));
    invaders.forEach(invader => invader.drawUI(ctx));
    // Game over condition
    if (invaders.some(invader => invader.y + invader.height >= player.y)) {
        ctx.fillStyle = '#fff';
        ctx.font = '48px Arial';
        ctx.fillText('GAME OVER', canvas.width / 2 - 120, canvas.height / 2);
        return;
    }
    requestAnimationFrame(gameLoop);
}
gameLoop();

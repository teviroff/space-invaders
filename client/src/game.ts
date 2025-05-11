import { v4 as uuid } from 'uuid';

abstract class GameObject {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public speed: number
    ) { }

    abstract draw(ctx: CanvasRenderingContext2D): void;
    abstract drawUI(ctx: CanvasRenderingContext2D): void;
    abstract update(): void;
    abstract needsDeletion(): boolean;

    collidesWith(object: GameObject): boolean {
        return this.x < object.x + object.width &&
            this.x + this.width > object.x &&
            this.y < object.y + object.height &&
            this.y + this.height > object.y;
    }
}

class Assets {
    public invaderRed = new Image(40, 32);
    public invaderYellow = new Image(40, 32);
    public invaderGreen = new Image(40, 32);

    constructor() {
        this.invaderRed.src = '/static/assets/invaderRed.png';
        this.invaderYellow.src = '/static/assets/invaderYellow.png';
        this.invaderGreen.src = '/static/assets/invaderGreen.png';
    }
}

const assets = new Assets();

class Player extends GameObject {
    public bullets: Bullet[] = [];
    private maxBullets = 5;
    private lastShot: number = 0;
    private shotIntervalMs = 100;

    private rightPressed = false;
    private leftPressed = false;
    private spacePressed = false;

    constructor(x: number, y: number) {
        super(x, y, 50, 20, 7);
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = '#0f0';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    drawUI(ctx: CanvasRenderingContext2D): void { }

    update() {
        if (this.rightPressed && this.x < canvas.width - this.width) {
            this.x += this.speed;
        }
        if (this.leftPressed && this.x > 0) {
            this.x -= this.speed;
        }
        if (this.spacePressed && this.bullets.length < this.maxBullets &&
            Date.now() - this.lastShot >= this.shotIntervalMs
        ) {
            this.bullets.push(new Bullet(this.x + this.width / 2, this.y));
            this.lastShot = Date.now();
        }
    }

    needsDeletion(): boolean {
        return false;
    }

    keyHandler(event: KeyboardEvent, isPressed: boolean) {
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

type InvaderType = 'green' | 'yellow' | 'red';

class Invader extends GameObject {
    public static invaderWidth = 40;
    public static invaderHeight = 32;
    public static invaderSpeed = 2.5;
    private static healthbarHeight = 4;
    public static healths: { [type in InvaderType]: number } = {
        green: 2,
        yellow: 3,
        red: 4,
    };
    public static scoreRewards: { [type in InvaderType]: number } = {
        green: 10,
        yellow: 20,
        red: 30,
    };

    private id: string;
    private type: InvaderType;
    private health: number;

    constructor(x: number, y: number, direction: 'left' | 'right', type: InvaderType = 'green') {
        super(x, y, Invader.invaderWidth, Invader.invaderHeight,
            direction === 'right' ? Invader.invaderSpeed : -Invader.invaderSpeed);
        this.id = uuid();
        this.type = type;
        this.health = Invader.healths[type];
    }

    getId(): string {
        return this.id;
    }

    draw(ctx: CanvasRenderingContext2D) {
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

    drawUI(ctx: CanvasRenderingContext2D): void {
        const healthRatio = this.health / Invader.healths[this.type];
        if (healthRatio === 1. || healthRatio <= 0) {
            return;
        }
        const gradient = ctx.createLinearGradient(this.x, this.y - 2,
            this.x + this.width, this.y - 2);
        gradient.addColorStop(0, 'green');
        gradient.addColorStop(healthRatio, 'green');
        gradient.addColorStop(healthRatio, 'black');
        gradient.addColorStop(1, 'black');
        ctx.fillStyle = gradient;
        ctx.fillRect(this.x, this.y - 2 - Invader.healthbarHeight,
            this.width, Invader.healthbarHeight);
        ctx.fillStyle = '#000';
    }

    update() {
        this.x += this.speed;
        if (this.x < 0) {
            this.x = 0;
            this.speed *= -1;
            this.y += Invader.invaderHeight;
        } else if (this.x + this.width > canvas.width) {
            this.x = canvas.width - this.width;
            this.speed *= -1;
            this.y += Invader.invaderHeight;
        }
    }

    needsDeletion(): boolean {
        return this.health <= 0;
    }

    decreaseHealth(damage: number) {
        this.health -= damage;
    }

    getScoreReward(): number {
        return Invader.scoreRewards[this.type];
    }
}

class Bullet extends GameObject {
    public static bulletWidth = 5;

    private damage: number;
    private leftCollisions: number;
    private collidedWith: Set<string> = new Set<string>();

    constructor(x: number, y: number, damage: number = 1, maxCollisions: number = 1) {
        super(x - Bullet.bulletWidth / 2, y, Bullet.bulletWidth, 10, 7);
        this.damage = damage;
        this.leftCollisions = maxCollisions;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = '#0ff';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    drawUI(ctx: CanvasRenderingContext2D): void { }

    update() {
        this.y -= this.speed;
        this.checkCollisions();
    }

    needsDeletion(): boolean {
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

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const scoreElement = document.getElementById('game-score') as HTMLParagraphElement;
const stageElement = document.getElementById('game-stage') as HTMLParagraphElement;
const overlayElement = document.getElementById('game-overlay-container') as HTMLDivElement;
const startButton = document.getElementById('game-start-button') as HTMLButtonElement;

let score = 0;

const waveIntervalMs = 5000;
let waveDefeatTime = 0;

const player = new Player(canvas.width / 2 - 25, canvas.height - 30);
const invaders: Invader[] = [];
const bullets = player.bullets;

type WaveDifficulty = 0 | 1 | 2 | 3;

let stage: number = 1;
let waveDifficulty: WaveDifficulty = 0;

function increaseDifficulty() {
    if (waveDifficulty === 3) {
        Invader.invaderSpeed *= 1.25;
        Object.values(Invader.healths).forEach((health) => health *= 2);
        Object.values(Invader.scoreRewards).forEach((scoreReward) => scoreReward *= 2);
        waveDifficulty = 1;
        stage += 1;
        stageElement.innerText = `Stage: ${stage}`;
        return;
    }
    waveDifficulty += 1;
}

type InvaderConfig = {
    type: InvaderType,
    direction: 'left' | 'right',
};

const configs: { [key: string]: InvaderConfig[][] } = {
    easy_stage_one: [[
        { type: 'green', direction: 'left' },
        { type: 'yellow', direction: 'left' },
        { type: 'green', direction: 'left' },
        { type: 'yellow', direction: 'left' },
        { type: 'green', direction: 'right' },
        { type: 'yellow', direction: 'right' },
        { type: 'green', direction: 'right' },
    ]],
    normal_stage_one: [[
        { type: 'yellow', direction: 'left' },
        { type: 'green', direction: 'left' },
        { type: 'red', direction: 'left' },
        { type: 'green', direction: 'left' },
        { type: 'yellow', direction: 'left' },
        { type: 'yellow', direction: 'right' },
        { type: 'green', direction: 'right' },
        { type: 'red', direction: 'right' },
        { type: 'green', direction: 'right' },
        { type: 'yellow', direction: 'right' },
    ]],
    hard_stage_one: [[
        { type: 'red', direction: 'left' },
        { type: 'yellow', direction: 'left' },
        { type: 'red', direction: 'left' },
        { type: 'yellow', direction: 'left' },
        { type: 'red', direction: 'left' },
        { type: 'yellow', direction: 'right' },
        { type: 'red', direction: 'right' },
        { type: 'yellow', direction: 'right' },
        { type: 'red', direction: 'right' },
        { type: 'yellow', direction: 'right' },
    ]],
    easy_stage_three: [
        [
            { type: 'red', direction: 'left' },
            { type: 'red', direction: 'left' },
            { type: 'red', direction: 'left' },
        ],
        [
            { type: 'yellow', direction: 'right' },
            { type: 'yellow', direction: 'right' },
            { type: 'yellow', direction: 'right' },
        ],
        [
            { type: 'green', direction: 'left' },
            { type: 'green', direction: 'left' },
            { type: 'green', direction: 'left' },
        ],
    ],
    normal_stage_three: [
        [
            { type: 'red', direction: 'left' },
            { type: 'yellow', direction: 'left' },
            { type: 'red', direction: 'left' },
            { type: 'yellow', direction: 'left' },
            { type: 'red', direction: 'left' },
        ],
        [
            { type: 'red', direction: 'right' },
            { type: 'yellow', direction: 'right' },
            { type: 'red', direction: 'right' },
            { type: 'yellow', direction: 'right' },
            { type: 'red', direction: 'right' },
        ],
    ],
    hard_stage_three: [
        [
            { type: 'red', direction: 'left' },
            { type: 'red', direction: 'left' },
            { type: 'red', direction: 'left' },
        ],
        [
            { type: 'red', direction: 'left' },
            { type: 'red', direction: 'left' },
            { type: 'red', direction: 'left' },
        ],
        [
            { type: 'red', direction: 'left' },
            { type: 'red', direction: 'left' },
            { type: 'red', direction: 'left' },
        ],
    ],
};

function spawnInvadersWithConfig(config: InvaderConfig[][]) {
    config.forEach((layer, layer_index) => {
        const spacing = (canvas.width - layer.length * Invader.invaderWidth)
            / (layer.length + 1);
        layer.forEach((config, index) => {
            const offset = spacing * (index + 1) + Invader.invaderWidth * index;
            invaders.push(new Invader(offset, layer_index * Invader.invaderHeight,
                config.direction, config.type));
        });
    });
}

function generateWave() {
    increaseDifficulty();
    switch (waveDifficulty) {
        case 1: {
            if (stage < 3) {
                spawnInvadersWithConfig(configs.easy_stage_one);
            } else {
                spawnInvadersWithConfig(configs.easy_stage_three);
            }
            break;
        }
        case 2: {
            if (stage < 3) {
                spawnInvadersWithConfig(configs.normal_stage_one);
            } else {
                spawnInvadersWithConfig(configs.normal_stage_three);
            }
            break;
        }
        case 3: {
            if (stage < 3) {
                spawnInvadersWithConfig(configs.hard_stage_one);
            } else {
                spawnInvadersWithConfig(configs.hard_stage_three);
            }
            break;
        }
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update objects
    player.update();
    if (invaders.length === 0) {
        if ((Date.now() - waveDefeatTime) > waveIntervalMs) {
            generateWave();
        }
    } else {
        invaders.forEach((invader, index) => {
            if (invader.needsDeletion()) {
                invaders.splice(index, 1);
                score += invader.getScoreReward();
                scoreElement.innerText = `Score: ${score}`;
            } else {
                invader.update();
            }
        });
        if (invaders.length === 0) {
            waveDefeatTime = Date.now();
        }
    }
    bullets.forEach((bullet, index) => {
        if (bullet.needsDeletion()) {
            bullets.splice(index, 1);
        } else {
            bullet.update();
        }
    });

    // Draw objects
    player.draw(ctx);
    invaders.forEach(invader => invader.draw(ctx));
    bullets.forEach(bullet => bullet.draw(ctx));
    invaders.forEach(invader => invader.drawUI(ctx));

    // Game over condition
    if (invaders.some(invader => invader.y + invader.height >= player.y)) {
        gameOver();
        return;
    }

    requestAnimationFrame(gameLoop);
}

async function submitRecord(username: string) {
    const response = await fetch(
        '/api/record',
        {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                score: score,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }
    );
    if (response.status === 200) {
        location.href = '/scoreboard';
        return;
    }
    alert('Failed to submit record');
}

function gameOver() {
    overlayElement.classList.add('tint');
    let gameOverContainer = document.createElement('div');
    gameOverContainer.id = 'game-over-container';
    let gameOverText = document.createElement('h3');
    gameOverText.innerText = 'Game over!';
    gameOverText.classList.add('text-white');
    gameOverContainer.appendChild(gameOverText);
    let nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Username';
    gameOverContainer.appendChild(nameInput);
    let submitButton = document.createElement('button');
    submitButton.innerText = 'Submit';
    submitButton.classList.add('text-href');
    submitButton.classList.add('text-bolder');
    submitButton.disabled = true;
    gameOverContainer.appendChild(submitButton);
    submitButton.addEventListener('click', () => {
        submitButton.disabled = true;
        submitRecord(nameInput.value);
    });
    nameInput.addEventListener('input', () => {
        if (nameInput.value.match(/^[A-Za-z\d]{1,30}$/)) {
            submitButton.disabled = false;
            nameInput.classList.remove('invalid');
        } else {
            submitButton.disabled = true;
            nameInput.classList.add('invalid');
        }
    });
    overlayElement.appendChild(gameOverContainer);
}

document.addEventListener('keydown', (e) => player.keyHandler(e, true));
document.addEventListener('keyup', (e) => player.keyHandler(e, false));
startButton.addEventListener('click', () => {
    overlayElement.classList.remove('tint');
    overlayElement.innerText = '';
    gameLoop();
});

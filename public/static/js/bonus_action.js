fireball = {
    x: undefined,
    y: undefined,
    color: "red",
    radius: 10,
    blastRadius: 150,
    reload: 6,
    lastTimeCast: 60,
    speedX: 0,
    speedY: 0,
    finishX: undefined,
    finishY: undefined,
    isActive: false,
    readyToExplode: true,
    atk: 60
}

freeze = {
    x: undefined,
    y: undefined,
    color: "#007fef",
    blastRadius: 100,
    reload: 10,
    lastTimeCast: 60,
    speedX: 0,
    speedY: 0,
    finishX: undefined,
    finishY: undefined,
    isActive: false,
    readyToExplode: true,
    atk: 10
}

gameFieldClick = {
    x: 0,
    y: 0,
}

lvlBonuses = [];
compareWithGameLvlBonuses = 0;

function initBonuses() {
    bonuses = lvls[GAME.lvlCount - 1].bonuses;
    compareWithGameLvlBonuses = GAME.lvlCount;
}

function drawFireball() {
    canvasContext.fillStyle = fireball.color;
    canvasContext.beginPath();
    canvasContext.arc(fireball.x, fireball.y, fireball.radius, 0, 2 * Math.PI);
    canvasContext.closePath();
    canvasContext.fill();

    canvasContext.beginPath();
    canvasContext.strokeStyle = fireball.color;
    canvasContext.lineWidth = 2;
    canvasContext.arc(fireball.x, fireball.y, fireball.blastRadius, 0, 2 * Math.PI);
    canvasContext.stroke();
    canvasContext.closePath();
}

function drawFreeze() {
    canvasContext.beginPath();
    canvasContext.strokeStyle = freeze.color;
    canvasContext.lineWidth = 4;
    canvasContext.arc(freeze.x, freeze.y, freeze.blastRadius, 0, 2 * Math.PI);
    canvasContext.stroke();
    canvasContext.closePath();
}

function updateFireball() {
    fireball.x += fireball.speedX;
    fireball.y += fireball.speedY;
    if (GAME.stopwatch - fireball.lastTimeCast >= fireball.reload && !fireball.readyToExplode) {
        fireball.readyToExplode = true;
    }
    if (fireball.x < fireball.finishX && fireball.y > fireball.finishY) {
        fireball.x = undefined;
        fireball.y = undefined;
        monsters.forEach(monster => {
            let mstrCenterX = monster.x + monster.width / 2;
            let mstrCenterY = monster.y + monster.height / 2;
            let distance = Math.sqrt(Math.pow(mstrCenterX - fireball.finishX, 2) + Math.pow(mstrCenterY - fireball.finishY, 2));
            if (distance <= fireball.blastRadius) {
                if (monster.shield > 0) {
                    monster.shield -= fireball.atk;
                } else {
                    monster.hp -= fireball.atk;
                }
            }
        })
    }
}

function updateFreeze() {
    freeze.y += freeze.speedY;
    if (GAME.stopwatch - freeze.lastTimeCast >= freeze.reload && !freeze.readyToExplode) {
        freeze.readyToExplode = true;
    }
    if (freeze.y > freeze.finishY) {
        freeze.x = undefined;
        freeze.y = undefined;
        monsters.forEach(monster => {
            let mstrCenterX = monster.x + monster.width / 2;
            let mstrCenterY = monster.y + monster.height / 2;
            let distance = Math.sqrt(Math.pow(mstrCenterX - freeze.finishX, 2) + Math.pow(mstrCenterY - freeze.finishY, 2));
            if (distance <= freeze.blastRadius) {
                if (monster.shield > 0) {
                    monster.shield -= freeze.atk;
                } else {
                    monster.hp -= freeze.atk;
                }
                monster.speed /= 2;
            }
        })
    }
}

function resetFireball() {
    fireball.isActive = false;
    fireball.readyToExplode = true;
    fireball.x = undefined;
    fireball.y = undefined;
}

function resetFreeze() {
    freeze.isActive = false;
    freeze.readyToExplode = true;
    freeze.x = undefined;
    freeze.y = undefined;
}

function resetBonuses() {
    resetFireball();
    resetFreeze();
}

function drawBonuses() {
    drawFireball();
    drawFreeze();
    if (GAME.isPlay == 'play') {
        updateFireball();
        updateFreeze();
    } else {
        if (GAME.isPlay == 'wavepause') {
            fireball.readyToExplode = true;
            freeze.readyToExplode = true;
        }
    }
}


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

healing = {
    x: undefined,
    y: undefined,
    strokeColor: "#228413",
    color: "#28AD12",
    speed: 2,
    blastRadius: 0,
    maxRadius: 300,
    reload: 10,
    lastTimeCast: 60,
    finishX: undefined,
    finishY: undefined,
    isActive: false,
    readyToExplode: true,
    worktime: 7,
    heal: 0.2,
    castCount: 4,
}

gameFieldClick = {
    x: 0,
    y: 0,
}

lvlBonuses = [];
compareWithGameLvlBonuses = 0;

function initBonuses(choisenClass) {
    if(choisenClass == "defense") {
        bonuses = lvls[GAME.lvlCount - 1].bonusesDef;
    }
    if(choisenClass == "attack") {
        bonuses = lvls[GAME.lvlCount - 1].bonusesAtk;
    }
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

function drawHeal() {
    console.log("draw heal");
    canvasContext.beginPath();
    if(healing.x && healing.y) {
        let gradient = canvasContext.createRadialGradient(healing.x, healing.y, healing.blastRadius / 2, healing.x, healing.y, healing.blastRadius);
        gradient.addColorStop("1", healing.color);
        gradient.addColorStop("0", "rgba(255, 255, 255, 0)");
        canvasContext.fillStyle = gradient;
    }
    canvasContext.strokeStyle = healing.strokeColor;
    canvasContext.lineWidth = 4;
    canvasContext.arc(healing.x, healing.y, healing.blastRadius, 0, 2 * Math.PI);
    canvasContext.stroke();
    canvasContext.fill();
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

function updateHeal() {
    if (GAME.stopwatch - healing.lastTimeCast >= healing.reload && !healing.readyToExplode) {
        healing.readyToExplode = true;
    }
    monsters.forEach(monster => {
        let mstrCenterX = monster.x + monster.width / 2;
        let mstrCenterY = monster.y + monster.height / 2;
        let distance = Math.sqrt(Math.pow(mstrCenterX - healing.x, 2) + Math.pow(mstrCenterY -  healing.y, 2));
        if (distance <= healing.blastRadius) {
            if (monster.hp < monster.maxhp && Math.floor(((GAME.milisectimer - healing.lastTimeCast * 1000) / Math.floor(healing.worktime / healing.castCount * 1000)) * 100) % 100 == 0) {
                monster.hp += monster.maxhp * healing.heal;
                if (monster.hp > monster.maxhp) {
                    monster.hp = monster.maxhp;
                }
            }
        }
    })
    if (GAME.stopwatch - healing.lastTimeCast <= healing.worktime) {
        // console.log(GAME.stopwatch - healing.lastTimeCast, GAME.milisectimer - healing.lastTimeCast * 1000);
        if(healing.blastRadius < healing.maxRadius) {
            healing.blastRadius += healing.speed;
        }
    } else {
        healing.blastRadius -= healing.speed * 4;
        if (healing.blastRadius <= 0) {
            healing.x = undefined;
            healing.y = undefined;
        }
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

function resetHeal() {
    healing.isActive = false;
    healing.readyToExplode = true;
    healing.x = undefined;
    healing.y = undefined;
}

function resetBonuses() {
    resetFireball();
    resetFreeze();
    resetHeal();
}

function drawBonuses() {
    drawFireball();
    drawFreeze();
    drawHeal();
    if (GAME.isPlay == 'play') {
        updateFireball();
        updateFreeze();
        updateHeal();
    } else {
        if (GAME.isPlay == 'wavepause') {
            fireball.readyToExplode = true;
            freeze.readyToExplode = true;
            healing.readyToExplode = true;
        }
    }
}


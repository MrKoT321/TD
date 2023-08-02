const explosion_step_1 = new Image();
const explosion_step_2 = new Image();
const explosion_step_3 = new Image();
const ice_step_1 = new Image();
const ice_step_2 = new Image();
const ice_step_3 = new Image();
const fireballImg = new Image();
const freezeImg = new Image();
explosion_step_1.src = '../static/images/explosion_1.png';
explosion_step_2.src = '../static/images/explosion_2.png';
explosion_step_3.src = '../static/images/explosion_3.png';
fireballImg.src = '../static/images/fireball_buff.png';
ice_step_1.src = '../static/images/freeze_1.png';
ice_step_2.src = '../static/images/freeze_2.png';
ice_step_3.src = '../static/images/freeze_3.png';
freezeImg.src = '../static/images/snowball.png';

const sortSteps = (i1 = { index }, i2 = { index }) => i1 - i2;

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
    atk: 50,
    finish: false,
    steptimer: undefined,
    stepcounter: 0,
    explosionSize: 100,
    image: undefined,
    
}

const explosionSteps = [];

explosion_step_1.onload = () => { explosionSteps.push({index: 1, img: explosion_step_1}) }
explosion_step_2.onload = () => { explosionSteps.push({index: 2, img: explosion_step_2}) }
explosion_step_3.onload = () => { explosionSteps.push({index: 3, img: explosion_step_3}) }
fireballImg.onload = () => { fireball.image = fireballImg }

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
    atk: 10,
    finish: false,
    steptimer: undefined,
    stepcounter: 0,
    iceSize: 100,
    image: undefined,
    iceSteps: [],
}

ice_step_1.onload = () => { freeze.iceSteps.push({index: 1, img: ice_step_1}) }
ice_step_2.onload = () => { freeze.iceSteps.push({index: 2, img: ice_step_2}) }
ice_step_3.onload = () => { freeze.iceSteps.push({index: 3, img: ice_step_3}) }
freezeImg.onload = () => { freeze.image = freezeImg }

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
    isActive: false,
    readyToExplode: true,
    worktime: 7,
    heal: 0.2,
    castCount: 4,
}

invisible = {
    x: undefined,
    y: undefined,
    strokeColor: "#42353E",
    color: "rgba(97, 40, 124, 0.46)",
    speed: 2,
    blastRadius: 0,
    maxRadius: 150,
    reload: 10,
    lastTimeCast: 60,
    isActive: false,
    readyToExplode: true,
    worktime: 7,
    used: true,
    init: false,
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
    if(fireball.x && fireball.y) {
        canvasContext.drawImage(fireball.image, fireball.x - 100, fireball.y - 100, 200, 200);
    }
}

function drawFireballExplosion() {
    if(fireball.finish) {
        console.log("draw");
        canvasContext.drawImage(explosionSteps[fireball.stepcounter].img, fireball.finishX - fireball.explosionSize / 2, fireball.finishY - fireball.explosionSize / 2, fireball.explosionSize, fireball.explosionSize);
    }
    if(GAME.milisectimer > fireball.steptimer && fireball.stepcounter < 3) {
        explosionSteps.sort(sortSteps);
        fireball.explosionSize += 50;
        fireball.steptimer += 100;
        fireball.stepcounter += 1;
    }
    if(fireball.stepcounter == 3) {
        fireball.steptimer = undefined;
        fireball.stepcounter = 0;
        fireball.finish = false;
        fireball.explosionSize = 100;
    }
};

function drawIce() {
    if(freeze.finish) {
        console.log(freeze.stepcounter);
        canvasContext.drawImage(freeze.iceSteps[freeze.stepcounter].img, freeze.finishX - freeze.iceSize / 2, freeze.finishY - freeze.iceSize / 2, freeze.iceSize, freeze.iceSize);
    }
    if(GAME.milisectimer > freeze.steptimer && freeze.stepcounter < 3) {
        freeze.iceSteps.sort(sortSteps);
        freeze.steptimer += 350;
        freeze.stepcounter += 1;
    }
    if(freeze.stepcounter == 3) {
        freeze.steptimer = undefined;
        freeze.stepcounter = 0;
        freeze.finish = false;
    }
};

function drawFreeze() {
    if(freeze.x && freeze.y) {
        canvasContext.drawImage(freeze.image, freeze.x - 35, freeze.y - 35, 70, 70);
    }
}

function drawHeal() {
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

function drawInvisible() {
    canvasContext.beginPath();
    if(invisible.x && invisible.y) {
        let gradient = canvasContext.createRadialGradient(invisible.x, invisible.y, invisible.blastRadius / 2, invisible.x, invisible.y, invisible.blastRadius);
        gradient.addColorStop("1", invisible.color);
        gradient.addColorStop("0", "rgba(255, 255, 255, 0)");
        canvasContext.fillStyle = gradient;
    }
    canvasContext.strokeStyle = invisible.strokeColor;
    canvasContext.lineWidth = 4;
    canvasContext.arc(invisible.x, invisible.y, invisible.blastRadius, 0, 2 * Math.PI);
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
        fireball.finish = true;
        fireball.steptimer = GAME.milisectimer + 100;
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
        freeze.finish = true;
        freeze.steptimer = GAME.milisectimer + 100;
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

function updateInvisible() {
    if(invisible.init) {
        monsters.sort(function(mstrA, mstrB) {
            return mstrB.invisiblePriority - mstrA.invisiblePriority;
        });
        invisible.init = false;   
    }
    if (GAME.stopwatch - invisible.lastTimeCast >= invisible.reload && !invisible.readyToExplode) {
        invisible.readyToExplode = true;
    }
    if (GAME.stopwatch - invisible.lastTimeCast <= invisible.worktime && !invisible.used) {
        if(invisible.blastRadius <= invisible.maxRadius) {
            invisible.blastRadius += invisible.speed;
        }
        monsters.forEach(monster => {
            let mstrCenterX = monster.x + monster.width / 2;
            let mstrCenterY = monster.y + monster.height / 2;
            let distance = Math.sqrt(Math.pow(mstrCenterX - invisible.x, 2) + Math.pow(mstrCenterY - invisible.y, 2));
            if(distance <= invisible.blastRadius && !invisible.used) {
                monster.invisible = true;
                monster.invisibleStartTime = GAME.stopwatch;
                invisible.used = true;
            }
        });
    } else {
        invisible.blastRadius -= invisible.speed;
        if (invisible.blastRadius <= 0) {
            invisible.x = undefined;
            invisible.y = undefined;
        }
    }
}

function resetFireball() {
    fireball.isActive = false;
    fireball.readyToExplode = true;
    fireball.x = undefined;
    fireball.y = undefined;
    fireball.steptimer = undefined;
    fireball.stepcounter = 0;
    fireball.finish = false;
    fireball.explosionSize = 100;
}

function resetFreeze() {
    freeze.isActive = false;
    freeze.readyToExplode = true;
    freeze.x = undefined;
    freeze.y = undefined;
    freeze.steptimer = undefined;
    freeze.stepcounter = 0;
    freeze.finish = false;
}

function resetHeal() {
    healing.isActive = false;
    healing.readyToExplode = true;
    healing.x = undefined;
    healing.y = undefined;
}

function resetInvisible() {
    invisible.isActive = false;
    invisible.readyToExplode = true;
    invisible.x = undefined;
    invisible.y = undefined;
}

function resetBonuses() {
    resetFireball();
    resetFreeze();
    resetHeal();
    resetInvisible();
}

function updateBonuses() {
    if (GAME.isPlay == 'play') {
        updateFireball();
        updateFreeze();
        updateHeal();
        updateInvisible();
    } else {
        if (GAME.isPlay == 'wavepause') {
            fireball.readyToExplode = true;
            freeze.readyToExplode = true;
            healing.readyToExplode = true;
            invisible.readyToExplode = true;
        }
    }
}

function drawBonusesTop() {
    drawFireball();
    drawFireballExplosion();
    drawFreeze();
}

function drawBonusesBottom() {
    drawHeal();
    drawInvisible();
    drawIce();
}



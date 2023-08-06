const explosion_step_1 = new Image();
const explosion_step_2 = new Image();
const explosion_step_3 = new Image();
const ice_step_1 = new Image();
const ice_step_2 = new Image();
const ice_step_3 = new Image();
const destroy_step_1 = new Image();
const destroy_step_2 = new Image();
const destroy_step_3 = new Image();
const fireballImg = new Image();
const freezeImg = new Image();
const hummerImg = new Image();
explosion_step_1.src = '../static/images/explosion_1.png';
explosion_step_2.src = '../static/images/explosion_2.png';
explosion_step_3.src = '../static/images/explosion_3.png';
fireballImg.src = '../static/images/fireball_buff.png';
ice_step_1.src = '../static/images/freeze_1.png';
ice_step_2.src = '../static/images/freeze_2.png';
ice_step_3.src = '../static/images/freeze_3.png';
freezeImg.src = '../static/images/snowball.png';
destroy_step_1.src = '../static/images/destroy_explosion_1.png';
destroy_step_2.src = '../static/images/destroy_explosion_2.png';
destroy_step_3.src = '../static/images/destroy_explosion_3.png';
hummerImg.src = '../static/images/hummer.png';

const sortSteps = (i1 = { index }, i2 = { index }) => i1 - i2;
const destroyAnimationDuration = 600;
const destroyFrameTime = destroyAnimationDuration / 6;

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
    image: undefined
}

const explosionSteps = [];

explosion_step_1.onload = () => { explosionSteps.push({ index: 1, img: explosion_step_1 }) }
explosion_step_2.onload = () => { explosionSteps.push({ index: 2, img: explosion_step_2 }) }
explosion_step_3.onload = () => { explosionSteps.push({ index: 3, img: explosion_step_3 }) }
fireballImg.onload = () => { fireball.image = fireballImg }

freeze = {
    x: undefined,
    y: undefined,
    color: "#007fef",
    blastRadius: 150,
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
    iceSize: 200,
    image: undefined
}

const iceSteps = [];

ice_step_1.onload = () => { iceSteps.push({ index: 1, img: ice_step_1 }) }
ice_step_2.onload = () => { iceSteps.push({ index: 2, img: ice_step_2 }) }
ice_step_3.onload = () => { iceSteps.push({ index: 3, img: ice_step_3 }) }
freezeImg.onload = () => { freeze.image = freezeImg }

extraLife = {
    wasUsed: false
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
    isActive: false,
    readyToExplode: true,
    worktime: 7,
    heal: 0.2,
    castCount: 4
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
    init: false
}

destroy = {
    x: undefined,
    y: undefined,
    reload: 10,
    lastTimeCast: 60,
    isActive: false,
    readyToExplode: true,
    hummerImage: undefined,
    hummerAngel: -90,
    hummerSize: 200,
    step: 50,
    steptimerExplosion: undefined,
    steptimerHummer: undefined,
    stepcounter: 0,
    explosionSize: 100
}

const destroyExplosionSteps = [];

ice_step_1.onload = () => { destroyExplosionSteps.push({index: 1, img: destroy_step_1}) }
ice_step_2.onload = () => { destroyExplosionSteps.push({index: 2, img: destroy_step_2}) }
ice_step_3.onload = () => { destroyExplosionSteps.push({index: 3, img: destroy_step_3}) }
hummerImg.onload = () => { destroy.hummerImage = hummerImg }

gameFieldClick = {
    x: 0,
    y: 0
}

lvlBonuses = [];
compareWithGameLvlBonuses = 0;

function initBonuses(choisenClass) {
    if (choisenClass == "defense") {
        bonuses = lvls[GAME.lvlCount - 1].bonusesDef;
    }
    if (choisenClass == "attack") {
        bonuses = lvls[GAME.lvlCount - 1].bonusesAtk;
    }
    compareWithGameLvlBonuses = GAME.lvlCount;
}

function drawFireball() {
    if(!!fireball.x && !!fireball.y) {
        canvasContext.drawImage(fireball.image, fireball.x - 100, fireball.y - 100, 200, 200);
    }
}

function drawFireballExplosion() {
    if (fireball.finish) {
        canvasContext.drawImage(explosionSteps[fireball.stepcounter].img, fireball.finishX - fireball.explosionSize / 2, fireball.finishY - fireball.explosionSize / 2, fireball.explosionSize, fireball.explosionSize);
    }
    if (GAME.milisectimer > fireball.steptimer && fireball.stepcounter < 3) {
        explosionSteps.sort(sortSteps);
        fireball.explosionSize += 50;
        fireball.steptimer += 100;
        fireball.stepcounter += 1;
    }
    if (fireball.stepcounter == 3) {
        fireball.steptimer = undefined;
        fireball.stepcounter = 0;
        fireball.finish = false;
        fireball.explosionSize = 100;
    }
}

function drawIce() {
    if (freeze.finish) {
        canvasContext.drawImage(iceSteps[freeze.stepcounter].img, freeze.finishX - freeze.iceSize / 2, freeze.finishY - freeze.iceSize / 2, freeze.iceSize, freeze.iceSize);
    }
    if (GAME.milisectimer > freeze.steptimer && freeze.stepcounter < 3) {
        iceSteps.sort(function sortIce(ice1, ice2) { return ice1.index - ice2.index });
        freeze.steptimer += 350;
        freeze.stepcounter += 1;
    }
    if (freeze.stepcounter == 3) {
        freeze.steptimer = undefined;
        freeze.stepcounter = 0;
        freeze.finish = false;
    }
}

function drawFreeze() {
    if (freeze.x && freeze.y) {
        canvasContext.drawImage(freeze.image, freeze.x - 35, freeze.y - 35, Math.floor(freeze.iceSize * 0.4), Math.floor(freeze.iceSize * 0.4));
    }
}

function drawHeal() {
    if (!!healing.x && !!healing.y){
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
}

function drawInvisible() {
    if (!!invisible.x && !!invisible.y) {
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
}

function drawDestroyExplosion() {
    if(destroy.steptimerExplosion) {
        canvasContext.drawImage(destroyExplosionSteps[destroy.stepcounter].img, destroy.x - destroy.explosionSize / 2, destroy.y - destroy.explosionSize / 2, destroy.explosionSize, destroy.explosionSize);
    }
    if(destroy.steptimerExplosion && GAME.milisectimer > destroy.steptimerExplosion && destroy.stepcounter < 3) {
        destroyExplosionSteps.sort(function(destr1, destr2) {return destr1.index - destr2.index});
        destroy.explosionSize += 50;
        destroy.steptimerExplosion += 100;
        destroy.stepcounter += 1;
    }
    if(destroy.stepcounter == 3) {
        destroy.steptimerExplosion = undefined;
        destroy.stepcounter = 0;
        destroy.explosionSize = 100;
    }
}

function drawHummer() {
    console.log(destroy.steptimerHummer, destroyAnimationDuration)
    if(destroy.steptimerHummer && destroy.hummerAngel < 0) {
        canvasContext.save();
        canvasContext.translate(destroy.x - destroy.step, destroy.y - destroy.step);
        canvasContext.rotate(destroy.hummerAngel*Math.PI/180);
        canvasContext.drawImage(destroy.hummerImage, -destroy.hummerSize/2,  -destroy.hummerSize/2,  destroy.hummerSize,  destroy.hummerSize);
        canvasContext.restore();
    }
    if(destroy.steptimerHummer && GAME.milisectimer > destroy.steptimerHummer) {
        destroy.steptimerHummer += destroyFrameTime;
        destroy.hummerAngel += 30;
    }
    if(destroy.hummerAngel >= 0) {
        destroy.steptimerHummer = undefined;
        destroy.hummerAngel = -90;
        destroy.stepcounter = 0;
    }
}

function updateFireball() {
    if (GAME.stopwatch - fireball.lastTimeCast >= fireball.reload && !fireball.readyToExplode) {
        fireball.readyToExplode = true;
    }
    if (fireball.x && fireball.y) {
        fireball.x += fireball.speedX;
        fireball.y += fireball.speedY;
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
}

function updateFreeze() {
    if (GAME.stopwatch - freeze.lastTimeCast >= freeze.reload && !freeze.readyToExplode) {
        freeze.readyToExplode = true;
    }
    if (freeze.x && freeze.y) {
        freeze.y += freeze.speedY;
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
}

function updateHeal() {
    if (GAME.stopwatch - healing.lastTimeCast >= healing.reload && !healing.readyToExplode) {
        healing.readyToExplode = true;
    }
    if (!!healing.x && !!healing.y) {
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
}

function updateInvisible() {
    if (GAME.stopwatch - invisible.lastTimeCast >= invisible.reload && !invisible.readyToExplode) {
        invisible.readyToExplode = true;
    }
    if (!!invisible.x && !!invisible.y) {
        if(invisible.init) {
            monsters.sort(function(mstrA, mstrB) {
                return mstrB.invisiblePriority - mstrA.invisiblePriority;
            });
            invisible.init = false;
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
}

function updateDestroy() {
    if (GAME.stopwatch - destroy.lastTimeCast >= destroy.reload && !destroy.readyToExplode) {
        destroy.readyToExplode = true;
    }
    if(!!destroy.x && !!destroy.y && !destroy.used) {
        for (let i = 0; i < towers.length; i++) {
            const tower = towers[i];
            if (destroy.x >= tower.x && destroy.x <= tower.x + 100 && destroy.y >= tower.y && destroy.y <= tower.y + 100) {
                destroy.steptimerHummer = GAME.milisectimer;
                console.log("hummer init", destroy.steptimerHummer)
                setTimeout(() => {destroy.steptimerExplosion = GAME.milisectimer; console.log("explosion init", destroy.steptimerExplosion)}, destroyAnimationDuration / 2);
                setTimeout(() => {towers.splice(i, 1); console.log("tower delete", GAME.milisectimer)}, destroyAnimationDuration);
            }
        }
        destroy.used = true;
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

function resetDestroy() {
    destroy.isActive = false;
    destroy.readyToExplode = true;
    destroy.x = undefined;
    destroy.y = undefined;
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
        updateDestroy();
    } else {
        if (GAME.isPlay == 'wavepause') {
            fireball.readyToExplode = true;
            freeze.readyToExplode = true;
            healing.readyToExplode = true;
            invisible.readyToExplode = true;
            destroy.readyToExplode = true;
        }
    }
}

function drawBonusesTop() {
    drawFireball();
    drawFireballExplosion();
    drawFreeze();
    drawHummer();
    drawDestroyExplosion();
}

function drawBonusesBottom() {
    drawHeal();
    drawInvisible();
    drawIce();
}



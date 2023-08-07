const fireballBonus = document.querySelector(".fireball-buf__icon");
const fireballBonusCancel = document.querySelector(".fireball-buf__cancel");
const fireballReloadTimer = document.querySelector(".fireball-buf__reload");

const freezeBonus = document.querySelector(".freeze-buf__icon");
const freezeBonusCancel = document.querySelector(".freeze-buf__cancel");
const freezeReloadTimer = document.querySelector(".freeze-buf__reload");

const extraLifeBonus = document.querySelector(".extra-life-buf__icon");
const extraLifeBonusReload = document.querySelector(".extra-life-buf__reload");

canvas.addEventListener(
    'click',
    (event) => {
        gameFieldClick.x = event.clientX - field.x;
        gameFieldClick.y = event.clientY - field.y;
        setTimeout(initFireball, 10);
        setTimeout(initFreeze, 10);
    }
)

fireballBonus.addEventListener(
    "click",
    () => {
        if (!fireball.isActive && fireball.readyToExplode && bonuses.includes('fireball')) {
            fireballBonusCancel.classList.remove("hidden");
            fireballBonus.classList.add("buff_active");
            fireball.isActive = true;
            inActiveFreeze();
        } else {
            inActiveFireBall();
        }
    }
)

function isClickOnMap() {
    return (gameFieldClick.x > 100 && gameFieldClick.x < GAME.width - 100 && gameFieldClick.y > 100 && gameFieldClick.y < GAME.height - 100);
}

freezeBonus.addEventListener(
    "click",
    () => {
        if (!freeze.isActive && freeze.readyToExplode && bonuses.includes('freeze')) {
            freezeBonusCancel.classList.remove("hidden");
            freezeBonus.classList.add("buff_active");
            freeze.isActive = true;
            inActiveFireBall();
        } else {
            inActiveFreeze();
        }
    }
)

extraLifeBonus.addEventListener(
    "click",
    () => {
        if (!extraLife.wasUsed) {
            initExtraLife();
            inActiveFreeze();
            inActiveFireBall();
        }
    }
)

fireballBonusCancel.addEventListener("click", () => { inActiveFireBall(); })
freezeBonusCancel.addEventListener("click", () => { inActiveFreeze(); })

function drawFireballReload() {
    if (!fireball.readyToExplode) {
        fireballReloadTimer.classList.remove("hidden");
        fireballReloadTimer.innerHTML = fireball.reload - GAME.stopwatch + fireball.lastTimeCast;
    } else {
        fireballReloadTimer.innerHTML = "";
        if (!bonuses.includes('fireball')) {
            fireballReloadTimer.classList.remove("hidden");
        } else {
            fireballReloadTimer.classList.add("hidden");
        }
    }
}

function drawFreezeReload() {
    if (!freeze.readyToExplode) {
        freezeReloadTimer.classList.remove("hidden");
        freezeReloadTimer.innerHTML = freeze.reload - GAME.stopwatch + freeze.lastTimeCast;
    } else {
        freezeReloadTimer.innerHTML = "";
        if (!bonuses.includes('freeze')) {
            freezeReloadTimer.classList.remove("hidden");
        } else {
            freezeReloadTimer.classList.add("hidden");
        }
    }
}

function drawExtraLifeReload() {
    if (!extraLife.wasUsed && GAME.castleHP < 3) {
        extraLifeBonusReload.classList.add("hidden");
    } else {
        extraLifeBonusReload.classList.remove("hidden");
    }
    if (!bonuses.includes("extra_life")) {
        freezeReloadTimer.classList.remove("hidden");
    }
}

function inActiveFireBall() {
    fireballBonusCancel.classList.add("hidden");
    fireballBonus.classList.remove("buff_active");
    fireball.isActive = false;
    fireballReloadTimer.classList.remove("hidden");
    fireballReloadTimer.innerHTML = "";
}

function inActiveFreeze() {
    freezeBonusCancel.classList.add("hidden");
    freezeBonus.classList.remove("buff_active");
    freeze.isActive = false;
    freezeReloadTimer.classList.remove("hidden");
    freezeReloadTimer.innerHTML = "";
}

function inActiveExtraLife() {
    extraLifeBonusReload.classList.remove("hidden");
}

function initFireball() {
    if (fireball.isActive && isClickOnMap()) {
        inActiveFireBall();
        createFireBall();
        sendFireballStatus();
    }
}

function initFreeze() {
    if (freeze.isActive && isClickOnMap()) {
        inActiveFreeze();
        createFreeze();
        sendFreezeStatus();
    }
}

function initExtraLife() {
    createExtraLife();
    sendExtraLifeStatus();
}

function sendFireballStatus() {
    data = {
        type: 'fireball',
        fireball_bonus: fireball
    }
    json = JSON.stringify(data);
    if (typeof socket !== "undefined") {
        socket.send(json);
    }
}

function sendFreezeStatus() {
    data = {
        type: 'freeze',
        freeze_bonus: freeze
    }
    json = JSON.stringify(data);
    if (typeof socket !== "undefined") {
        socket.send(json);
    }
}

function sendExtraLifeStatus() {
    data = {
        type: 'extra_life'
    }
    json = JSON.stringify(data);
    if (typeof socket !== "undefined") {
        socket.send(json);
    }
}

function createFireBall() {
    const t = 40;
    const changePos = 500;
    fireball.finishX = gameFieldClick.x;
    fireball.finishY = gameFieldClick.y;
    fireball.x = gameFieldClick.x + changePos;
    fireball.y = gameFieldClick.y - changePos;
    fireball.speedX = -changePos / t;
    fireball.speedY = changePos / t;
    fireball.lastTimeCast = GAME.stopwatch;
    fireball.readyToExplode = false;
}

function createFreeze() {
    const t = 30;
    const changePos = 500;
    freeze.x = gameFieldClick.x;
    freeze.finishX = gameFieldClick.x;
    freeze.finishY = gameFieldClick.y;
    freeze.y = gameFieldClick.y - changePos;
    freeze.speedY = changePos / t;
    freeze.lastTimeCast = GAME.stopwatch;
    freeze.readyToExplode = false;
}

function createExtraLife() {
    extraLife.wasUsed = true;
    let bar = document.getElementById("hp-bar");
    GAME.castleHP += 1;
    bar.children[GAME.castleHP - 1].src = "../static/images/extra_life.png";
    bar.children[GAME.castleHP - 1].classList.remove("_hide");
}

function drawBonusesReload() {
    drawFireballReload();
    drawFreezeReload();
    drawExtraLifeReload();
}

function resetBonusesReload() {
    inActiveFireBall();
    inActiveFreeze();
    inActiveExtraLife();
}
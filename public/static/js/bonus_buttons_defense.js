const fireballBonus = document.querySelector(".fireball-buf__icon");
const fireballBonusCancel = document.querySelector(".fireball-buf__cancel");
const fireballReloadTimer = document.querySelector(".fireball-buf__reload");

const freezeBonus = document.querySelector(".freeze-buf__icon");
const freezeBonusCancel = document.querySelector(".freeze-buf__cancel");
const freezeReloadTimer = document.querySelector(".freeze-buf__reload");

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
            fireballBonus.style.width = "100px";
            fireballBonus.style.height = "100px";
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
            freezeBonus.style.width = "100px";
            freezeBonus.style.height = "100px";
            freeze.isActive = true;
            inActiveFireBall();
        } else {
            inActiveFreeze();
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

function inActiveFireBall() {
    fireballBonusCancel.classList.add("hidden");
    fireballBonus.style.width = "150px";
    fireballBonus.style.height = "150px";
    fireball.isActive = false;
    fireballReloadTimer.classList.remove("hidden");
    fireballReloadTimer.innerHTML = "";
}

function inActiveFreeze() {
    freezeBonusCancel.classList.add("hidden");
    freezeBonus.style.width = "150px";
    freezeBonus.style.height = "150px";
    freeze.isActive = false;
    freezeReloadTimer.classList.remove("hidden");
    freezeReloadTimer.innerHTML = "";
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

function sendFireballStatus() {
    data = {
        type: 'fireball',
        fireball_bonus: fireball
    }
    json = JSON.stringify(data);
    if (typeof socket !== "undefined"){
        socket.send(json);
    }
}

function sendFreezeStatus() {
    data = {
        type: 'freeze',
        freeze_bonus: freeze
    }
    json = JSON.stringify(data);
    if (typeof socket !== "undefined"){
        socket.send(json);
    }
}

function createFireBall() {
    const t = 30;
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

function drawBonusesReload() {
    drawFireballReload();
    drawFreezeReload();
}

function resetBonusesReload() {
    inActiveFireBall();
    inActiveFreeze();
}
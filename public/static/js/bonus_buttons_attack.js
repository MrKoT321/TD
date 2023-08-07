const healingBonus = document.querySelector(".healing-buf__icon");
const healingBonusCancel = document.querySelector(".healing-buf__cancel");
const healingReloadTimer = document.querySelector(".healing-buf__reload");

const invisibleBonus = document.querySelector(".invisible-buf__icon");
const invisibleBonusCancel = document.querySelector(".invisible-buf__cancel");
const invisibleReloadTimer = document.querySelector(".invisible-buf__reload");

const destroyBonus = document.querySelector(".destroy-buf__icon");
const destroyBonusCancel = document.querySelector(".destroy-buf__cancel");
const destroyReloadTimer = document.querySelector(".destroy-buf__reload");

var field = {
    x: 0,
    y: 0
}

window.addEventListener(
    'click',
    (event) => {
        field.x = document.querySelector(".game__field").getBoundingClientRect().x;
        field.y = document.querySelector(".game__field").getBoundingClientRect().y;
    }
)

canvas.addEventListener(
    'click',
    (event) => {
        gameFieldClick.x = event.clientX - field.x;
        gameFieldClick.y = event.clientY - field.y;
        setTimeout(initHeal(), 10);
        setTimeout(initInvisible(), 10);
        setTimeout(initDestroy(), 10);
    }
)

healingBonus.addEventListener(
    'click',
    () => {
        if (!healing.isActive && healing.readyToExplode && bonuses.includes('healing')) {
            healingBonusCancel.classList.remove("hidden");
            healingBonus.classList.add("buff_active");
            healing.isActive = true;
            inActiveInvisible();
            inActiveDestroy();
        } else {
            inActiveHealing();
        }
    }
)

destroyBonus.addEventListener(
    'click',
    () => {
        if (!destroy.isActive && destroy.readyToExplode && bonuses.includes('destroy')) {
            destroyBonusCancel.classList.remove("hidden");
            destroyBonus.classList.add("buff_active");
            destroy.isActive = true;
            inActiveHealing();
            inActiveInvisible();
        } else {
            inActiveDestroy();
        }
    }
)

invisibleBonus.addEventListener(
    'click',
    () => {
        if (!invisible.isActive && invisible.readyToExplode && bonuses.includes('invisible')) {
            invisibleBonusCancel.classList.remove("hidden");
            invisibleBonus.classList.add("buff_active");
            invisible.isActive = true;
            inActiveHealing();
            inActiveDestroy();
        } else {
            inActiveInvisible();
        }
    }
)

function isClickOnMap() {
    return (gameFieldClick.x > 100 && gameFieldClick.x < GAME.width - 100 && gameFieldClick.y > 100 && gameFieldClick.y < GAME.height - 100);
}

healingBonusCancel.addEventListener("click", () => { inActiveHealing(); })
invisibleBonusCancel.addEventListener("click", () => { inActiveInvisible(); })
destroyBonusCancel.addEventListener("click", () => { inActiveDestroy(); })

function drawHealingReload() {
    if (!healing.readyToExplode) {
        healingReloadTimer.classList.remove("hidden");
        healingReloadTimer.innerHTML = healing.reload - GAME.stopwatch + healing.lastTimeCast;
    } else {
        healingReloadTimer.innerHTML = "";
        if (!bonuses.includes('healing')) {
            healingReloadTimer.classList.remove("hidden");
        } else {
            healingReloadTimer.classList.add("hidden");
        }
    }
}

function drawInvisibleReload() {
    if (!invisible.readyToExplode) {
        invisibleReloadTimer.classList.remove("hidden");
        invisibleReloadTimer.innerHTML = invisible.reload - GAME.stopwatch + invisible.lastTimeCast;
    } else {
        invisibleReloadTimer.innerHTML = "";
        if (!bonuses.includes('invisible')) {
            invisibleReloadTimer.classList.remove("hidden");
        } else {
            invisibleReloadTimer.classList.add("hidden");
        }
    }
}

function drawDestroyReload() {
    if (!destroy.readyToExplode) {
        destroyReloadTimer.classList.remove("hidden");
        destroyReloadTimer.innerHTML = destroy.reload - GAME.stopwatch + destroy.lastTimeCast;
    } else {
        destroyReloadTimer.innerHTML = "";
        if (!bonuses.includes('destroy')) {
            destroyReloadTimer.classList.remove("hidden");
        } else {
            destroyReloadTimer.classList.add("hidden");
        }
    }
}

function inActiveHealing() {
    healingBonusCancel.classList.add("hidden");
    healingBonus.classList.remove("buff_active");
    healing.isActive = false;
    healingReloadTimer.classList.remove("hidden");
    healingReloadTimer.innerHTML = "";
}

function inActiveInvisible() {
    invisibleBonusCancel.classList.add("hidden");
    invisibleBonus.classList.remove("buff_active");
    invisible.isActive = false;
    invisibleReloadTimer.classList.remove("hidden");
    invisibleReloadTimer.innerHTML = "";
}

function inActiveDestroy() {
    destroyBonusCancel.classList.add("hidden");
    destroyBonus.classList.remove("buff_active");
    destroy.isActive = false;
    destroyReloadTimer.classList.remove("hidden");
    destroyReloadTimer.innerHTML = "";
}

function initHeal() {
    if (healing.isActive && isClickOnMap()) {
        inActiveHealing();
        createHealing();
        sendHealingStatus();
    }
}

function initInvisible() {
    if (invisible.isActive && isClickOnMap()) {
        inActiveInvisible();
        createInvisible();
        sendInvisibleStatus();
    }
}

function initDestroy() {
    if (destroy.isActive && isClickOnMap()) {
        inActiveDestroy();
        createDestroy();
        sendDestroyStatus();
    }
}

function sendHealingStatus() {
    data = {
        type: 'healing',
        healing_bonus: healing,
    }
    json = JSON.stringify(data);
    if (typeof socket !== "undefined") {
        socket.send(json);
    }
}

function sendInvisibleStatus() {
    data = {
        type: 'invisible',
        invisible_bonus: invisible,
    }
    json = JSON.stringify(data);
    if (typeof socket !== "undefined") {
        socket.send(json);
    }
}

function sendDestroyStatus() {
    data = {
        type: 'destroy',
        destroy_bonus: destroy,
    }
    json = JSON.stringify(data);
    if (typeof socket !== "undefined") {
        socket.send(json);
    }
}

function createHealing() {
    healing.x = gameFieldClick.x;
    healing.y = gameFieldClick.y;
    healing.blastRadius = 0;
    healing.lastTimeCast = GAME.stopwatch;
    healing.readyToExplode = false;
}

function createInvisible() {
    invisible.x = gameFieldClick.x;
    invisible.y = gameFieldClick.y;
    invisible.used = false;
    invisible.init = true;
    invisible.blastRadius = invisible.maxRadius;
    invisible.lastTimeCast = GAME.stopwatch;
    invisible.readyToExplode = false;
}

function createDestroy() {
    destroy.x = gameFieldClick.x;
    destroy.y = gameFieldClick.y;
    destroy.lastTimeCast = GAME.stopwatch;
    destroy.readyToExplode = false;
    destroy.used = false;
}

function drawBonusesReload() {
    drawHealingReload();
    drawInvisibleReload();
    drawDestroyReload();
}

function resetBonusesReload() {
    inActiveHealing();
    inActiveInvisible();
    inActiveDestroy();
}
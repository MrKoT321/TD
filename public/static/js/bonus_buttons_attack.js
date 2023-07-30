const healingBonus = document.querySelector(".healing-buf__icon");
const healingBonusCancel = document.querySelector(".healing-buf__cancel");
const healingReloadTimer = document.querySelector(".healing-buf__reload");

const invisibleBonus = document.querySelector(".invisible-buf__icon");
const invisibleBonusCancel = document.querySelector(".invisible-buf__cancel");
const invisibleReloadTimer = document.querySelector(".invisible-buf__reload");

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
    }
)

healingBonus.addEventListener(
    'click',
    () => {
        if (!healing.isActive && healing.readyToExplode && bonuses.includes('healing')) {
            healingBonusCancel.classList.remove("hidden");
            healingBonus.style.width = "100px";
            healingBonus.style.height = "100px";
            healing.isActive = true;
            inActiveInvisible();
        } else {
            inActiveHealing();
        }
    }
)

invisibleBonus.addEventListener(
    'click',
    () => {
        if (!invisible.isActive && invisible.readyToExplode && bonuses.includes('invisible')) {
            invisibleBonusCancel.classList.remove("hidden");
            invisibleBonus.style.width = "100px";
            invisibleBonus.style.height = "100px";
            invisible.isActive = true;
            inActiveHealing();
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

function inActiveHealing() {
    healingBonusCancel.classList.add("hidden");
    healingBonus.style.width = "150px";
    healingBonus.style.height = "150px";
    healing.isActive = false;
    healingReloadTimer.classList.remove("hidden");
    healingReloadTimer.innerHTML = "";
}

function inActiveInvisible() {
    invisibleBonusCancel.classList.add("hidden");
    invisibleBonus.style.width = "150px";
    invisibleBonus.style.height = "150px";
    invisible.isActive = false;
    invisibleReloadTimer.classList.remove("hidden");
    invisibleReloadTimer.innerHTML = "";
}

function initHeal() {
    if (healing.isActive && isClickOnMap()) {
        inActiveHealing();
        createHealing();
        sendInvisibleStatus();
    }
}

function initInvisible() {
    if (invisible.isActive && isClickOnMap()) {
        inActiveInvisible();
        createInvisible();
        sendInvisibleStatus();
    }
}

function sendHealingStatus() {
    data = {
        type: 'healing',
        healing_bonus: healing,
    }
    json = JSON.stringify(data);
    if (typeof socket !== "undefined"){
        socket.send(json);
    }
}

function sendInvisibleStatus() {
    data = {
        type: 'invisible',
        healing_bonus: invisible,
    }
    json = JSON.stringify(data);
    if (typeof socket !== "undefined"){
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

function drawBonusesReload() {
    drawHealingReload();
    drawInvisibleReload();
}

function resetBonusesReload() {
    inActiveHealing();
    inActiveInvisible();
}
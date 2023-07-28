const healingBonus = document.querySelector(".healing-buf__icon");
const healingBonusCancel = document.querySelector(".healing-buf__cancel");
const healingReloadTimer = document.querySelector(".healing-buf__reload");

// const freezeBonus = document.querySelector(".freeze-buf__icon");
// const freezeBonusCancel = document.querySelector(".freeze-buf__cancel");
// const freezeReloadTimer = document.querySelector(".freeze-buf__reload");

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
    }
)

healingBonus.addEventListener(
    "click",
    () => {
        if (!healing.isActive && healing.readyToExplode && bonuses.includes('healing')) {
            healingBonusCancel.classList.remove("hidden");
            healingBonus.style.width = "100px";
            healingBonus.style.height = "100px";
            healing.isActive = true;
            // inActiveFreeze();
        } else {
            inActiveHealing();
        }
    }
)

function isClickOnMap() {
    return (gameFieldClick.x > 100 && gameFieldClick.x < GAME.width - 100 && gameFieldClick.y > 100 && gameFieldClick.y < GAME.height - 100);
}

healingBonusCancel.addEventListener("click", () => { inActiveHealing(); })

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

function inActiveHealing() {
    healingBonusCancel.classList.add("hidden");
    healingBonus.style.width = "150px";
    healingBonus.style.height = "150px";
    healing.isActive = false;
    healingReloadTimer.classList.remove("hidden");
    healingReloadTimer.innerHTML = "";
}

function initHeal() {
    if (healing.isActive && isClickOnMap()) {
        inActiveHealing();
        createHealing();
        sendHealingStatus();
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

function createHealing() {
    console.log("create");
    healing.x = gameFieldClick.x;
    healing.y = gameFieldClick.y;
    healing.blastRadius = 0;
    healing.lastTimeCast = GAME.stopwatch;
    healing.readyToExplode = false;
}

function drawBonusesReload() {
    drawHealingReload();
}

function resetBonusesReload() {
    inActiveHealing();
}
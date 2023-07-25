const fireballBonus = document.querySelector(".fireball-buf__icon");
const fireballBonusCancel = document.querySelector(".fireball-buf__cancel");
const fireballReloadTimer = document.querySelector(".fireball-buf__reload");

const freezeBonus = document.querySelector(".freeze-buf__icon");
const freezeBonusCancel = document.querySelector(".freeze-buf__cancel");
const freezeReloadTimer = document.querySelector(".freeze-buf__reload");

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
const fireballBonus = document.querySelector(".fireball-buf__icon");
const fireballBonusCancel = document.querySelector(".fireball-buf__cancel");
const fireballReloadTimer = document.querySelector(".fireball-buf__reload");

fireball = {
    x: undefined,
    y: undefined,
    color: "red",
    radius: 10,
    blastRadius: 150,
    reload: 5,
    lastTimeCast: 60,
    speedX: 0,
    speedY: 0,
    finishX: undefined,
    finishY: undefined,
    isActive: false,
    readyToExplode: true,
    atk: 60
}

gameFieldClick = {
    x: 0,
    y: 0,
}

canvas.addEventListener(
    'click',
    (event) => {
        gameFieldClick.x = event.clientX - field.x;
        gameFieldClick.y = event.clientY - field.y;
        setTimeout(initFireball, 100);
    }
)

fireballBonus.addEventListener(
    "click",
    () => {
        if (!fireball.isActive && fireball.readyToExplode) {
            fireballBonusCancel.classList.remove("hidden");
            fireballBonus.style.width = "100px";
            fireballBonus.style.height = "100px";
            fireball.isActive = true;
        } else {
            inActiveFireBall();
        }
    }
)

fireballBonusCancel.addEventListener("click", () => { inActiveFireBall(); }
)

function inActiveFireBall() {
    fireballBonusCancel.classList.add("hidden");
    fireballBonus.style.width = "150px";
    fireballBonus.style.height = "150px";
    fireball.isActive = false;
    fireballReloadTimer.classList.remove("hidden");
    fireballReloadTimer.innerHTML = "";
}

function isClickOnMap() {
    return (gameFieldClick.x > 100 && gameFieldClick.x < GAME.width - 100 && gameFieldClick.y > 100 && gameFieldClick.y < GAME.height - 100);
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
                monster.hp -= fireball.atk;
            }
        })
    }
}

function drawFireballReload() {
    if (!fireball.readyToExplode) {
        fireballReloadTimer.classList.remove("hidden");
        fireballReloadTimer.innerHTML = fireball.reload - GAME.stopwatch + fireball.lastTimeCast;
    } else {
        fireballReloadTimer.classList.add("hidden");
        fireballReloadTimer.innerHTML = "";
    }
}

function initFireball() {
    if (fireball.isActive && isClickOnMap()) {
        inActiveFireBall();
        createFireBall();
    }
}

function drawBonuses() {
    drawFireball();
    if (GAME.isPlay == 'play') {
        updateFireball();
        drawFireballReload();
    } else {
        inActiveFireBall();
        if (GAME.isPlay == 'wavepause') {
            fireball.readyToExplode = true;
        }
    }
}
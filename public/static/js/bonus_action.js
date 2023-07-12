const fireballBonus = document.querySelector(".fireball-buf__icon");
const fireballBonusCancel = document.querySelector(".fireball-buf__cancel");

fireball = {
    x: undefined,
    y: undefined,   
    color: "red",
    radius: 10,
    blastRadius: 100,
    reload: 60,
    lastTimeCast: 60,
    speedX: 0,
    speedY: 0,
    finishX: undefined,
    finishY: undefined,
    isActive: false
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
        if (!fireball.isActive && GAME.isPlay == 'play') {
            fireballBonusCancel.classList.remove("hidden");
            fireballBonus.style.width = "75px";
            fireballBonus.style.height   = "75px";
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
    fireballBonus.style.width = "100px";
    fireballBonus.style.height   = "100px";
    fireball.isActive = false;
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
    fireball.x = gameFieldClick.x + 250;
    fireball.y = gameFieldClick.y - 250;
    fireball.speedX = -250 / t; 
    fireball.speedY = 250 / t; 
}   

function updateFireball() {
    fireball.x += fireball.speedX;
    fireball.y += fireball.speedY;
    if (fireball.x < fireball.finishX && fireball.y > fireball.finishY) {
        
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
    }
}
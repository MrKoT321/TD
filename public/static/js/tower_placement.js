var mouse = {
    x: 0,
    y: 0
}

var mouseClick = {
    x: 0,
    y: 0
}

const field = {
    x: document.querySelector(".game__field").getBoundingClientRect().x,
    y: document.querySelector(".game__field").getBoundingClientRect().y
}

const towerAbilities = document.querySelector(".tower-abilities");
const newTowerSelector = document.querySelector(".new-tower");
const deleteTowerButton = document.querySelector(".delete-tower");

const towersIcons = document.querySelector(".choise-tower");
const archerTower = document.querySelector(".archer");
const bashTower = document.querySelector(".bash");
const mortirTower = document.querySelector(".mortir");

var arrows = [];
var bullets = [];

var towersImg = {
    arrow: undefined,
    bash: undefined,
    splash: undefined
}

const archerTowerImg = new Image();
archerTowerImg.src = archer.towerImg;
archerTowerImg.onload = () => {
    towersImg.arrow = archerTowerImg;
}

const bashTowerImg = new Image();
bashTowerImg.src = bash.towerImg;
bashTowerImg.onload = () => {
    towersImg.bash = bashTowerImg;
}

const mortirTowerImg = new Image();
mortirTowerImg.src = mortir.towerImg;
mortirTowerImg.onload = () => {
    towersImg.splash = mortirTowerImg;
}

window.addEventListener(
    'mousemove',
    (event) => {
        mouse.x = event.clientX - field.x;
        mouse.y = event.clientY - field.y;
    }
)

window.addEventListener(
    'click',
    (event) => {
        mouseClick.x = event.clientX - field.x;
        mouseClick.y = event.clientY - field.y;
        if (GAME.isPlay == 'play' || GAME.isPlay == 'wavepause') {
            drawNewTowerSelector();
            drawTowerAbilities();
        }
    }
)

var towerTiles = [];
var towers = [];
var compareWithGameLvl = 0;

function isTowerOnPlace(tile) {
    let res = false;
    towers.forEach(activeTile => {
        if (activeTile.x == tile[0] && activeTile.y == tile[1]) {
            res = true;
        }
    })
    return res;
}

function isMouseOnTile(m, tile) {
    return m.x > tile[0] && m.x < tile[0] + 100 && m.y > tile[1] && m.y < tile[1] + 100;
}

function isMouseOnActiveTile(m, activeTile) {
    return m.x > activeTile.x && m.x < activeTile.x + 100 && m.y > activeTile.y && m.y < activeTile.y + 100;
}

function drawTiles(GAME, lvls) {
    if (compareWithGameLvl !== GAME.lvlCount) {
        towerTiles = [];
        towers = [];
        lvls[GAME.lvlCount - 1].towersPos.forEach(towerPos => {
            towerTiles.push([(towerPos % 16 - 1) * 100, Math.floor(towerPos / 16) * 100]);
        })
        compareWithGameLvl = GAME.lvlCount;
    }
    towerTiles.forEach(tile => {
        if (!(isTowerOnPlace(tile))) {
            canvasContext.fillStyle = "#04BC4E";
            canvasContext.fillRect(tile[0], tile[1], 100, 100);
        }
        if (isMouseOnTile(mouse, tile) && (!(isTowerOnPlace(tile)))) {
            if (GAME.isPlay == 'play' || GAME.isPlay == 'wavepause' || GAME.isPlay == 'startgame') {
                canvasContext.fillStyle = "rgba(0, 0, 0, 0.3)";
                canvasContext.fillRect(tile[0], tile[1], 100, 100);
            }
        }
    })
}

function drawTower() {
    towers.forEach(tile => {
        // canvasContext.fillStyle = tile.towerColor;
        // canvasContext.beginPath();
        // canvasContext.arc(tile.x + 50, tile.y + 50, 50, 0, 2 * Math.PI);
        // canvasContext.closePath();
        // canvasContext.fill();
        if (tile.type == "arrow") {canvasContext.drawImage(towersImg.arrow, tile.x, tile.y, 75, 75);}
        if (tile.type == "bash") {canvasContext.drawImage(towersImg.bash, tile.x, tile.y, 75, 75);}
        if (tile.type == "splash") {canvasContext.drawImage(towersImg.splash, tile.x, tile.y, 75, 75);}
       

        canvasContext.beginPath();
        canvasContext.strokeStyle = "pink";
        canvasContext.lineWidth = 2;
        canvasContext.arc(tile.x + 50, tile.y + 50, tile.radius, 0, 2 * Math.PI);
        canvasContext.stroke();
        canvasContext.closePath();
    })
}

function canBuy(tower) {
    return GAME.money >= tower.cost
}

function checkWhatCanBuy() {
    if (canBuy(archer)) {
        // archerTower 

    }
    if (canBuy(bash)) {
        // bashTower
    }
    if (canBuy(mortir)) {
        // mortirTower
    }
}

function drawNewTowerSelector() {
    let isFindDrawPos = false;
    towerTiles.forEach(tile => {
        if (isMouseOnTile(mouseClick, tile) && (!(isTowerOnPlace(tile)))) {
            let menuPosX = tile[0] - 125 + 50;
            let menuPosY = tile[1] - 125 + 50;
            newTowerSelector.style.left = menuPosX + "px";
            newTowerSelector.style.top = menuPosY + "px";
            newTowerSelector.classList.remove("hidden");
            // checkWhatCanBuy();
            isFindDrawPos = true;
        }
    })
    if (!isFindDrawPos) {
        newTowerSelector.classList.add("hidden");
    }
}

function drawTowerAbilities() {
    let isFindDrawPos = false;
    for (var i = 0; i < towers.length; i++) {
        activeTile = towers[i];
        if (isMouseOnActiveTile(mouseClick, activeTile)) {
            let menuPosX = activeTile.x - 125 + 50;
            let menuPosY = activeTile.y - 125 + 50;
            towerAbilities.style.left = menuPosX + "px";
            towerAbilities.style.top = menuPosY + "px";
            towerAbilities.classList.remove("hidden");
            isFindDrawPos = true;
        }
    }
    if (!isFindDrawPos) {
        towerAbilities.classList.add("hidden");
    }
}

deleteTowerButton.addEventListener(
    "click",
    () => {
        if (GAME.isPlay == 'play' || GAME.isPlay == 'wavepause' || GAME.isPlay == 'startgame') {
            for (var i = 0; i < towers.length; i++) {
                activeTile = towers[i];
                if (isMouseOnActiveTile(mouseClick, activeTile)) {
                    towers.splice(i, 1);
                    GAME.money += activeTile.cost / 2;
                }
            }
        }
    }
)

function pushToTowers(tower, posX, posY) {
    towers.push({
        x: posX,
        y: posY,
        cost: tower.cost,
        atk: tower.atk,
        radius: tower.radius,
        type: tower.type,
        atkspeed: tower.atkspeed,
        towerColor: tower.towerColor,
        atkColor: tower.atkColor,
        currentEnemy: -1,
        placeTime: GAME.stopwatch,
        startTime: 0
    })
}

function makeTower(tower) {
    towerTiles.forEach(tile => {
        if (isMouseOnTile(mouseClick, tile) && canBuy(tower)) {
            pushToTowers(tower, tile[0], tile[1]);
            GAME.money -= tower.cost;
        }
    })
}

archerTower.addEventListener("click", () => { makeTower(archer) })

function hittingRadius(tower, mstrCenterX, mstrCenterY) {
    let distance = Math.sqrt(Math.pow(mstrCenterX - tower.x - 50, 2) + Math.pow(mstrCenterY - tower.y - 50, 2));
    return (distance <= tower.radius);
}

function makeArrow(tower) {
    arrows.push({
        x: tower.x + 50,
        y: tower.y + 50,
        radius: 10,
        color: "black",
        towerCenterX: 0,
        towerCenterY: 0,
        speed: 5,
        atk: tower.atk,
        currentEnemy: monsters[tower.currentEnemy]
    })
}

function drawArrows() {
    arrows.forEach(flyingArrow => {
        canvasContext.fillStyle = flyingArrow.color;
        canvasContext.beginPath();
        canvasContext.arc(flyingArrow.x, flyingArrow.y, flyingArrow.radius, 0, 2 * Math.PI);
        canvasContext.closePath();
        canvasContext.fill();
    })
}

function updateArrows() {
    for(var i = 0; i < arrows.length; i++) {
        let flyingArrow = arrows[i];
        if(flyingArrow.currentEnemy && flyingArrow.currentEnemy.hp > 0) {
            let mstrCenterX = flyingArrow.currentEnemy.x + flyingArrow.currentEnemy.width/2;
            let mstrCenterY = flyingArrow.currentEnemy.y + flyingArrow.currentEnemy.height/2;
            let outMonsterX = flyingArrow.x < flyingArrow.currentEnemy.x || flyingArrow.x > flyingArrow.currentEnemy.x + flyingArrow.currentEnemy.width;
            let outMonsterY = flyingArrow.y < flyingArrow.currentEnemy.y || flyingArrow.y > flyingArrow.currentEnemy.y + flyingArrow.currentEnemy.height;
            if(outMonsterX || outMonsterY) {
                if(outMonsterX) {
                    if(flyingArrow.x >= mstrCenterX) {
                        flyingArrow.x -= flyingArrow.speed;
                    } else { 
                        flyingArrow.x += flyingArrow.speed;
                    }
                } else {
                    if(flyingArrow.x >= mstrCenterX) {
                        flyingArrow.x -= flyingArrow.currentEnemy.speed;
                    } else { 
                        flyingArrow.x += flyingArrow.currentEnemy.speed;;
                    }
                }
                if(outMonsterY) {
                    if(flyingArrow.y >= mstrCenterY) {
                        flyingArrow.y -= flyingArrow.speed;
                    } else { 
                        flyingArrow.y += flyingArrow.speed;
                    }
                } else {
                    if(flyingArrow.y >= mstrCenterY) {
                        flyingArrow.y -= flyingArrow.currentEnemy.speed;
                    } else { 
                        flyingArrow.y += flyingArrow.currentEnemy.speed;
                    }
                }
            } else {
                flyingArrow.currentEnemy.hp -= flyingArrow.atk;
                arrows.splice(i, 1);
            }
        } else {
            arrows.splice(i, 1);
        }
    }
}

function attackArcher(GAME) {
    towers.forEach(tower => {
        if (tower.type == "arrow") {
            tower.currentEnemy = -1;
            for (let i = 0; i < monsters.length; i++) {
                let mstrCenterX = monsters[i].x + monsters[i].width / 2;
                let mstrCenterY = monsters[i].y + monsters[i].height / 2;
                if (hittingRadius(tower, mstrCenterX, mstrCenterY)) {
                    tower.currentEnemy = i;
                    if (tower.startTime <= 0) {
                      tower.startTime = GAME.stopwatch;
                    }
                    break;
                }
            }
            if (tower.currentEnemy == -1) {
                tower.startTime = 0;
            } else {
                if(!((GAME.stopwatch - tower.startTime) % tower.atkspeed == 0)) {
                    tower.hit = false;
                }
                if(!tower.hit && (GAME.stopwatch - tower.startTime) % tower.atkspeed == 0) {
                    tower.hit = true;
                    makeArrow(tower);
                }
            }
        }
    });
}

function makeBullet(tower, mstrCenterX, mstrCenterY) {
    bullets.push({
        x: tower.x + 50,
        y: tower.y + 50,
        radius: 20,
        blastRadius: 70,
        init: true,
        color: "black",
        radiusColor: "red",
        acceleration: 2,
        finishX: mstrCenterX,
        finishY: mstrCenterY,
        speedX: 0,
        speedY: 0,
        atk: tower.atk
    });
}

function drawBullets() {
    bullets.forEach(flyingBullet => {
        canvasContext.fillStyle = flyingBullet.color;
        canvasContext.beginPath();
        canvasContext.arc(flyingBullet.x, flyingBullet.y, flyingBullet.radius, 0, 2 * Math.PI);
        canvasContext.closePath();
        canvasContext.fill();

        canvasContext.beginPath();
        canvasContext.strokeStyle = flyingBullet.radiusColor;
        canvasContext.lineWidth = 2;
        canvasContext.arc(flyingBullet.x, flyingBullet.y, flyingBullet.blastRadius, 0, 2 * Math.PI);
        canvasContext.stroke();
        canvasContext.closePath();
    })
}

function updateBullets() {
    const t = 30;
    for (var i = 0; i < bullets.length; i++) {
        let bullet = bullets[i];
        if(bullet.init) {
            bullet.init = false;
            bullet.speedX = (bullet.finishX - bullet.x) / t;
            bullet.speedY = (2 * (bullet.finishY - bullet.y) - bullet.acceleration * Math.pow(t, 2)) / (2 * t);
        } else {
            bullet.x += bullet.speedX;
            bullet.y += bullet.speedY;
            bullet.speedY += bullet.acceleration;
            if (bullet.speedY > 0 && bullet.y > bullet.finishY) {
                monsters.forEach(monster => {
                    let mstrCenterX = monster.x + monster.width / 2;
                    let mstrCenterY = monster.y + monster.height / 2;
                    let distance = Math.sqrt(Math.pow(mstrCenterX - bullet.finishX, 2) + Math.pow(mstrCenterY - bullet.finishY, 2));
                    if(distance <= bullet.blastRadius) {
                        monster.hp -= bullet.atk;
                    }
                })
                bullets.splice(i, 1);
            }
        } 
    }
}

function attackMortir(GAME) {
    towers.forEach(tower => {
        if(tower.type == "splash") {
            let mstrCenterX, mstrCenterY;
            tower.currentEnemy = -1
            for (let i = 0; i < monsters.length; i++) {
                mstrCenterX = monsters[i].x + monsters[i].width / 2;
                mstrCenterY = monsters[i].y + monsters[i].height / 2;
                if (hittingRadius(tower, mstrCenterX, mstrCenterY)) {
                    tower.currentEnemy = i;
                    if (tower.startTime <= 0) {
                        tower.startTime = GAME.stopwatch;
                    }
                    break;
                }
            }
            if (tower.currentEnemy == -1) {
                tower.startTime = 0;
            } else {
                if(!((GAME.stopwatch - tower.startTime) % tower.atkspeed == 0)) {
                    tower.hit = false;
                }
                if((GAME.stopwatch - tower.startTime) % tower.atkspeed == 0 && !tower.hit) {
                    tower.hit = true;
                    makeBullet(tower, mstrCenterX, mstrCenterY);
                }
            }
        }
    });
}

mortirTower.addEventListener("click", () => { makeTower(mortir) })

function attackBash() {
    towers.forEach(tower => {
        if (tower.type == "bash") {
            monsters.forEach(monster => {
                lineToMonster = Math.sqrt(Math.pow(monster.x + (monster.width / 2) - tower.x - 50, 2) + Math.pow(monster.y + (monster.height / 2) - tower.y - 50, 2));
                if (!((GAME.stopwatch - tower.placeTime + 1) % tower.atkspeed == 0)) {
                    monster.hit = false;
                    tower.hit = false;
                }
                if (lineToMonster <= tower.radius && (GAME.stopwatch - tower.placeTime + 1) % tower.atkspeed == 0 && !monster.hit && !tower.hit) {
                    monster.hp -= tower.atk;
                    monster.hit = true;
                }
            })
            if (!tower.hit && (GAME.stopwatch - tower.placeTime + 1) % tower.atkspeed == 0) {
                tower.hit = true;
            }
        }
    })
}

bashTower.addEventListener("click", () => { makeTower(bash) })

function attackTowers(GAME) {
    attackArcher(GAME);
    attackBash(GAME);
    attackMortir(GAME);
}

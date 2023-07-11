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

// var moneyValue = Math.floor(document.querySelector(".count-s 
var arrow = {
    x: 0,
    y: 0,
    radius: 10,
    exist: false,
    color: "black",
    towerCenterX: 0,
    towerCenterY: 0,
    speed: 5,
    atk: 0
}

var bullet = {
    x: 0,
    y: 0,
    radius: 20,
    blastRadius: 70,
    exist: false,
    hit: true,
    init: false,
    color: "black",
    radiusColor: "red",
    acceleration: 2,
    towerCenterX: 0,
    towerCenterY: 0,
    speed: 2,
    cos: 0,
    atk: 0
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
    return res
}

function isMouseOnTile(m, tile) {
    return m.x > tile[0] && m.x < tile[0] + 100 && m.y > tile[1] && m.y < tile[1] + 100
}

function isMouseOnActiveTile(m, activeTile) {
    return m.x > activeTile.x && m.x < activeTile.x + 100 && m.y > activeTile.y && m.y < activeTile.y + 100
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
        canvasContext.fillStyle = tile.towerColor;
        canvasContext.beginPath();
        canvasContext.arc(tile.x + 50, tile.y + 50, 50, 0, 2 * Math.PI);
        canvasContext.closePath();
        canvasContext.fill();

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

function addMoneyForTower(cost) {
    let moneyInfo = document.querySelector(".count-coin__value");
    GAME.money += cost / 2;
    moneyInfo.innerHTML = String(Math.floor(GAME.money));
}

deleteTowerButton.addEventListener(
    "click",
    () => {
        if (GAME.isPlay == 'play' || GAME.isPlay == 'wavepause' || GAME.isPlay == 'startgame') {
            for (var i = 0; i < towers.length; i++) {
                activeTile = towers[i];
                if (isMouseOnActiveTile(mouseClick, activeTile)) {
                    towers.splice(i, 1);
                    addMoneyForTower(activeTile.cost);
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
        placeTime: GAME.stopwatch
    })
}

function makeTower(tower) {
    let moneyInfo = document.querySelector(".count-coin__value");
    towerTiles.forEach(tile => {
        if (isMouseOnTile(mouseClick, tile) && canBuy(tower)) {
            pushToTowers(tower, tile[0], tile[1]);
            GAME.money -= tower.cost;
            moneyInfo.innerHTML = String(Math.floor(GAME.money));
        }
    })
}

archerTower.addEventListener("click", () => { makeTower(archer) })

// mortirTower.addEventListener(
//     "click",
//     () => {
//         towerTiles.forEach(tile => {
//             if (isMouseOnTile(mouseClick, tile)) {
//                 pushToTowers(mortir, tile[0], tile[1]);
//             }
//         })
//     }
// )

function hittingRadius(tower, mstrCenterX, mstrCenterY) {
    let distance = Math.sqrt(Math.pow(mstrCenterX - tower.x - 50, 2) + Math.pow(mstrCenterY - tower.y - 50, 2));
    return (distance <= tower.radius);
}

function drawArrow() {
    if(arrow.exist) {
        canvasContext.fillStyle = arrow.color;
        canvasContext.beginPath();
        canvasContext.arc(arrow.x, arrow.y, arrow.radius, 0, 2 * Math.PI);
        canvasContext.closePath();
        canvasContext.fill();
    }
}

function updateArrow() {
    if(arrow.exist && arrow.currentEnemy && arrow.currentEnemy.hp > 0) {
        let mstrCenterX = arrow.currentEnemy.x + arrow.currentEnemy.width/2;
        let mstrCenterY = arrow.currentEnemy.y + arrow.currentEnemy.height/2;
        let outMonsterX = arrow.x < arrow.currentEnemy.x || arrow.x > arrow.currentEnemy.x + arrow.currentEnemy.width;
        let outMonsterY = arrow.y < arrow.currentEnemy.y || arrow.y > arrow.currentEnemy.y + arrow.currentEnemy.height;
        if(outMonsterX || outMonsterY) {
            if(outMonsterX) {
                if(arrow.x >= mstrCenterX) {
                    arrow.x -= arrow.speed;
                } else { 
                    arrow.x += arrow.speed;
                }
            } else {
                if(arrow.x >= mstrCenterX) {
                    arrow.x -= arrow.currentEnemy.speed;
                } else { 
                    arrow.x += arrow.currentEnemy.speed;;
                }
            }
            if(outMonsterY) {
                if(arrow.y >= mstrCenterY) {
                    arrow.y -= arrow.speed;
                } else { 
                    arrow.y += arrow.speed;
                }
            } else {
                if(arrow.y >= mstrCenterY) {
                    arrow.y -= arrow.currentEnemy.speed;
                } else { 
                    arrow.y += arrow.currentEnemy.speed;
                }
            }
        } else {
            arrow.exist = false;
            arrow.currentEnemy.hp -= arrow.atk;
        }
    }
}

function attackArcher(GAME) {
    towers.forEach(tower => {
        if (tower.type == "arrow") {
            for (let i = 0; i < monsters.length; i++) {
                if (monsters[i].hp == 0) {
                    tower.currentEnemy = -1;
                    tower.startTime = -1;
                }
                let mstrCenterX = monsters[i].x + monsters[i].width / 2;
                let mstrCenterY = monsters[i].y + monsters[i].height / 2;
                if (tower.currentEnemy == -1 && hittingRadius(tower, mstrCenterX, mstrCenterY)) {
                    tower.currentEnemy = i;
                    tower.startTime = GAME.stopwatch;
                }
                if(!((GAME.stopwatch - tower.startTime) % tower.atkspeed == 0)) {
                    tower.hit = false;
                }
                if(tower.currentEnemy == i && hittingRadius(tower, mstrCenterX, mstrCenterY) && tower.hit == false && (GAME.stopwatch - tower.startTime) % tower.atkspeed == 0) {
                    arrow.exist = true;
                    arrow.x = tower.x + 50;
                    arrow.y = tower.y + 50;
                    arrow.towerCenterX = arrow.x;
                    arrow.towerCenterY = arrow.y;
                    arrow.atk = tower.atk;
                    tower.hit = true;
                    arrow.currentEnemy = monsters[tower.currentEnemy]
                }
            }
        }
    });
}

function drawBullet() {
    if(bullet.exist) {
        canvasContext.fillStyle = bullet.color;
        canvasContext.beginPath();
        canvasContext.arc(bullet.x, bullet.y, bullet.radius, 0, 2 * Math.PI);
        canvasContext.closePath();
        canvasContext.fill();

        canvasContext.beginPath();
        canvasContext.strokeStyle = bullet.radiusColor;
        canvasContext.lineWidth = 2;
        canvasContext.arc(bullet.x, bullet.y, bullet.blastRadius, 0, 2 * Math.PI);
        canvasContext.stroke();
        canvasContext.closePath();
    }
}

const t = 60;
var speedBulletY = 0;

function updateBullet() {
    if(bullet.exist) {
        if(bullet.init) {
            bullet.init = false;
            let dir;
            if(bullet.finishY < bullet.towerCenterY) {
                dir = -1;
            } else {
                dir = 1;
            }
            let tg = ((2 * (bullet.finishY - bullet.towerCenterY) - bullet.acceleration * Math.pow(t, 2))) / ((bullet.finishX - bullet.towerCenterX) * 2);
            console.log(tg);
            bullet.cos = 1 / (1 + Math.pow(tg, 2));
            console.log(bullet.cos);
            bullet.speed = (bullet.finishX - bullet.towerCenterX) / (bullet.cos * dir * t);
            console.log(bullet.speed);
            console.log(bullet.speed * bullet.cos)
        }
        if(bullet.x != bullet.finishX && bullet.y != bullet.finishY) {
            bullet.x += bullet.speed * bullet.cos;
            // bullet.y += bullet.speed * Math.sqrt(1 - Math.pow(bullet.cos, 2)) * t + bullet.acceleration * Math.pow(t, 2) / 2;
            // bullet.y += bullet.speed * Math.sqrt(1 - Math.pow(bullet.cos, 2)) * bullet.acceleration;
        } else {
            bullet.exist = false;
            monsters.forEach(monster => {
                let mstrCenterX = monster.x + monster.width/2;
                let mstrCenterY = monster.y + monster.height/2;
                let distance = Math.sqrt(Math.pow(mstrCenterX - bullet.finishX, 2) + Math.pow(mstrCenterY - bullet.finishY, 2));
                if(distance <= bullet.radius) {
                    monster.hp -= bullet.atk;
                }
            })
        }
    }
}

function attackMortir(GAME) {
    towers.forEach(tower => {
        if(tower.type == "splash") {
            monsters.forEach(monster => {
                let mstrCenterX = monster.x + monster.width/2;
                let mstrCenterY = monster.y + monster.height/2;
                tower.hit = !bullet.hit;
                // console.log(!tower.hit, bullet.hit);
                if(hittingRadius(tower, mstrCenterX, mstrCenterY) && tower.placeTime % tower.atkspeed == 0 && !tower.hit){
                    bullet.exist = true;
                    bullet.init = true;
                    bullet.finishX = mstrCenterX;
                    bullet.finishY = mstrCenterY;
                    bullet.towerCenterX = tower.x + 50;
                    bullet.x = tower.x + 50;
                    bullet.towerCenterY = tower.y + 50;
                    bullet.y = tower.y + 50;
                    bullet.atk = tower.atk;
                    bullet.hit = false;
                }
            })
        }
    });
}

bashTower.addEventListener("click", () => { makeTower(bash) })

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
            if ((GAME.stopwatch - tower.placeTime + 1) % tower.atkspeed == 0 && !tower.hit) {
                tower.hit = true;
            }
        }
    })
}

function attackTowers(GAME) {
    attackArcher(GAME);
    attackBash(GAME);
    attackMortir(GAME);
}

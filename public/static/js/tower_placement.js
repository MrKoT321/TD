var mouse = {
    x: 0,
    y: 0
}

var mouseClick = {
    x: 0,
    y: 0
}

var field = {
    x: 0,
    y: 0
}

const towerAbilities = document.querySelector(".tower-abilities");
const newTowerSelector = document.querySelector(".new-tower");
const deleteTowerButton = document.querySelector(".delete-tower__img");
const upgradeTowerButton = document.querySelector(".upgrade-tower__img");
const deleteTowerMoneyInfo = document.querySelector(".delete-tower-info__cost");
const upgradeTowerMoneyInfo = document.querySelector(".upgrade-tower-info__cost");

const towersIcons = document.querySelector(".choise-tower");
const archerTower = document.querySelector(".archer");
const bashTower = document.querySelector(".bash");
const mortirTower = document.querySelector(".mortir");

window.addEventListener(
    'mousemove',
    (event) => {
        field.x = document.querySelector(".game__field").getBoundingClientRect().x;
        field.y = document.querySelector(".game__field").getBoundingClientRect().y;
        
        mouse.x = event.clientX - field.x;
        mouse.y = event.clientY - field.y;
    }
)

window.addEventListener(
    'click',
    (event) => {
        field.x = document.querySelector(".game__field").getBoundingClientRect().x;
        field.y = document.querySelector(".game__field").getBoundingClientRect().y;

        mouseClick.x = event.clientX - field.x;
        mouseClick.y = event.clientY - field.y;
        drawNewTowerSelector();
        drawTowerAbilities();
    }
)

var towerTiles = [];
var towers = [];
var compareWithGameLvlTiles = 0;

function initBullets() {
    arrows = [];
    bullets = [];
}

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
    if (compareWithGameLvlTiles !== GAME.lvlCount) {
        towerTiles = [];
        towers = [];
        lvls[GAME.lvlCount - 1].towersPos.forEach(towerPos => {
            towerTiles.push([(towerPos % 16 - 1) * 100, Math.floor(towerPos / 16) * 100]);
        })
        compareWithGameLvlTiles = GAME.lvlCount;
    }
    towerTiles.forEach(tile => {
        if (!(isTowerOnPlace(tile))) {
            canvasContext.fillStyle = "#04BC4E";
            canvasContext.fillRect(tile[0], tile[1], 100, 100);
        }
        if (isMouseOnTile(mouse, tile) && (!(isTowerOnPlace(tile)))) {
            if (GAME.isPlay == 'play' || GAME.isPlay == 'wavepause') {
                canvasContext.fillStyle = "rgba(0, 0, 0, 0.3)";
                canvasContext.fillRect(tile[0], tile[1], 100, 100);
            }
        }
    })
}

function canBuy(tower) {
    return GAME.money >= tower.cost
}

function drawNewTowerSelector() {
    let isFindDrawPos = false;
    towerTiles.forEach(tile => {
        if (isMouseOnTile(mouseClick, tile) && (!(isTowerOnPlace(tile)))) {
            let menuPosX = tile[0] - 150 + 50;
            let menuPosY = tile[1] - 150 + 50;
            newTowerSelector.style.left = menuPosX + "px";
            newTowerSelector.style.top = menuPosY + "px";
            newTowerSelector.classList.remove("hidden");
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
            let menuPosX = activeTile.x - 150 + 50;
            let menuPosY = activeTile.y - 150 + 75;
            towerAbilities.style.left = menuPosX + "px";
            towerAbilities.style.top = menuPosY + "px";
            towerAbilities.classList.remove("hidden");
            deleteTowerMoneyInfo.innerHTML = '+' + Math.floor(activeTile.cost * 0.5);
            upgradeTowerMoneyInfo.innerHTML = Math.floor(activeTile.cost * 1.6);
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
        for (var i = 0; i < towers.length; i++) {
            activeTile = towers[i];
            if (isMouseOnActiveTile(mouseClick, activeTile)) {
                towers.splice(i, 1);
                GAME.money += Math.floor(activeTile.cost / 2);
            }
        }
        sendNewTowerPlace();
    }
);

upgradeTowerButton.addEventListener(
    "click",
    () => {
        for (var i = 0; i < towers.length; i++) {
            activeTile = towers[i];
            if (isMouseOnActiveTile(mouseClick, activeTile) && GAME.money >= Math.floor(activeTile.cost * 1.6)) {
                GAME.money -= Math.floor(activeTile.cost * 1.3);
                activeTile.cost = Math.floor(activeTile.cost * 2);
                activeTile.atk = Math.floor(activeTile.atk * 2);
                activeTile.radius += 50;
            }
        }
        sendNewTowerPlace();
    }
)

function removeTowerSelectors() {
    newTowerSelector.classList.add("hidden");
    towerAbilities.classList.add("hidden");
}

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

function sendNewTowerPlace() {
    data = {
        type: 'tower_add',
        towers: towers,
        money: GAME.money
    }
    json = JSON.stringify(data);
    if (typeof socket !== "undefined"){
        socket.send(json);
    }
}

function makeTower(tower) {
    towerTiles.forEach(tile => {
        if (isMouseOnTile(mouseClick, tile)) {
            if (canBuy(tower)){
                pushToTowers(tower, tile[0], tile[1]);
                GAME.money -= tower.cost;
                sendNewTowerPlace();
            }
        }
    })
}

archerTower.addEventListener("click", () => { makeTower(archer); });
mortirTower.addEventListener("click", () => { makeTower(mortir); });
bashTower.addEventListener("click", () => { makeTower(bash); })
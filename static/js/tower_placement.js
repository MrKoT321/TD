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

var lvl = lvl1;

const towerAbilities = document.querySelector(".tower-abilities");
const newTowerSelector = document.querySelector(".new-tower");
const deleteTowerButton = document.querySelector(".delete-tower");

const arrowTower = document.querySelector(".tower1");
const bashTower = document.querySelector(".tower2");
const mortirTower = document.querySelector(".tower3");

window.addEventListener(
    'mousemove',
    (event) => {
        mouse.x = event.clientX - field.x;
        mouse.y = event.clientY - field.y;
    }
)

window.addEventListener (
    'click',
    (event) => {
        mouseClick.x = event.clientX - field.x;
        mouseClick.y = event.clientY - field.y;
        drawNewTowerSelector();       
        drawTowerAbilities();  
    }
)

var towerTiles = [];
var towers = [];

lvl.towersPos.forEach(towerPos => {
    towerTiles.push([(towerPos % 16 - 1) * 100, Math.floor(towerPos / 16) * 100])
})

function isTowerOnPlace(tile) {
    let res = false;
    towers.forEach(activeTile => {
        if(activeTile.x == tile[0] && activeTile.y == tile[1]) {
            res = true;
        }
    })
    return res
}

function drawTiles() {
    towerTiles.forEach(tile => {
        if (!(isTowerOnPlace(tile))) {
            canvasContext.fillStyle = "#04BC4E";
            canvasContext.fillRect(tile[0], tile[1], 100, 100);
        }
        if (
            mouse.x > tile[0] && mouse.x < tile[0] + 100 && mouse.y > tile[1] && mouse.y < tile[1] + 100 && (!(isTowerOnPlace(tile)))
        ) {
            canvasContext.fillStyle = "rgba(0, 0, 0, 0.3)";
            canvasContext.fillRect(tile[0], tile[1], 100, 100);
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
    })
}

function drawNewTowerSelector() {
    let isFindDrawPos = false;
    towerTiles.forEach(tile => {
        if (
            mouseClick.x > tile[0] && mouseClick.x < tile[0] + 100 && mouseClick.y > tile[1] && mouseClick.y < tile[1] + 100 && (!(isTowerOnPlace(tile)))
        ) {
            let menuPosX = tile[0] - 125 + 50;
            let menuPosY = tile[1] - 125 + 50;
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
        tile = towers[i]; 
        if (
            mouseClick.x > tile.x && mouseClick.x < tile.x + 100 && mouseClick.y > tile.y && mouseClick.y < tile.y + 100
        ) {
            let menuPosX = tile.x - 125 + 50;
            let menuPosY = tile.y - 125 + 50;
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
        for(var i = 0; i < towers.length; i++) {
            activeTile = towers[i];
            if (mouseClick.x > activeTile.x && mouseClick.x < activeTile.x + 100 && mouseClick.y > activeTile.y && mouseClick.y < activeTile.y + 100) {
                towers.splice(i, 1);
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
        atkColor: tower.atkColor
    })
}

arrowTower.addEventListener(
    "click",
    () => {
        towerTiles.forEach(tile => {
            if (
                mouseClick.x > tile[0] && mouseClick.x < tile[0] + 100 && mouseClick.y > tile[1] && mouseClick.y < tile[1] + 100 
            ) {
                pushToTowers(tower1, tile[0], tile[1])
            }
        })
    }
)

bashTower.addEventListener(
    "click",
    () => {
        towerTiles.forEach(tile => {
            if (
                mouseClick.x > tile[0] && mouseClick.x < tile[0] + 100 && mouseClick.y > tile[1] && mouseClick.y < tile[1] + 100
            ) {
                pushToTowers(tower2, tile[0], tile[1])
            }
        })
    }
)

mortirTower.addEventListener(
    "click",
    () => {
        towerTiles.forEach(tile => {
            if (
                mouseClick.x > tile[0] && mouseClick.x < tile[0] + 100 && mouseClick.y > tile[1] && mouseClick.y < tile[1] + 100
            ) {
                pushToTowers(tower3, tile[0], tile[1])
            }
        })
    }
)
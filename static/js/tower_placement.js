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

const archerTower = document.querySelector(".archer");
const bashTower = document.querySelector(".bash");
const mortirTower = document.querySelector(".mortir");

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
        if(GAME.isPlay == 'play' || GAME.isPlay == 'wavepause'){
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
        if(activeTile.x == tile[0] && activeTile.y == tile[1]) {
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
        if (isMouseOnTile(mouse, tile) && (!(isTowerOnPlace(tile)))) 
        {
            if(GAME.isPlay == 'play' || GAME.isPlay == 'wavepause' || GAME.isPlay == 'startgame'){
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

function drawNewTowerSelector() {
    let isFindDrawPos = false;
    towerTiles.forEach(tile => {
        if (isMouseOnTile(mouseClick, tile) && (!(isTowerOnPlace(tile)))) {
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

function addMoney(cost) {
    let moneyValue = Math.floor(document.querySelector(".count-coin__value").innerHTML);
    let moneyInfo = document.querySelector(".count-coin__value");
    moneyInfo.innerHTML = String(Math.floor(moneyValue + (cost / 2)));  
}

deleteTowerButton.addEventListener(
    "click",
    () => {
        if(GAME.isPlay == 'play' || GAME.isPlay == 'wavepause' || GAME.isPlay == 'startgame'){
            for(var i = 0; i < towers.length; i++) {
                activeTile = towers[i];
                if (isMouseOnActiveTile(mouseClick, activeTile)) {
                    towers.splice(i, 1);
                    addMoney(activeTile.cost);
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
        currentEnemy: -1
    })
}

function makeTower(tower) {
    let moneyValue = Math.floor(document.querySelector(".count-coin__value").innerHTML);
    let moneyInfo = document.querySelector(".count-coin__value");
    towerTiles.forEach(tile => {
        if (isMouseOnTile(mouseClick, tile) && moneyValue >= tower.cost) {
            pushToTowers(tower, tile[0], tile[1]);
            moneyInfo.innerHTML = moneyValue - tower.cost;
        }
    })
}

archerTower.addEventListener("click", () => { makeTower(archer) })

mortirTower.addEventListener(
    "click",
    () => {
        towerTiles.forEach(tile => {
            if (isMouseOnTile(mouseClick, tile)) {
                pushToTowers(mortir, tile[0], tile[1]);
            }
        })
    }
)

function hittingRadius(tower, mstrX, mstrY) {
    return Math.sqrt(Math.pow(mstrX - tower.x + 50, 2) + Math.pow(mstrY - tower.y + 50, 2)) <= tower.radius;
}

function attackArcher() {
    towers.forEach(tower => {
        if(tower.type == "arrow") {
            for(let i = 0; i < monsters.length; i++){
                // if(tower.currentEnemy == -1) {
                //     tower.currentEnemy = i;
                // }
                if(  hittingRadius(tower, monsters[i].x, monsters[i].y)) {
                    //стрела
                    // createArrow();
                    // while(arrow.x != mstrCenterX && arrow.y != mstrCenterY) {
                    //     if(mstrCenterX < tower.x) {
                    //         if(mstrCenterY < tower.y) {
        
                    //         }
                    //     }
                    // }
                    monsters[i].hp -= tower.atk;
                    console.log(monsters[i].hp)
                }
            }
        }
    })
}
bashTower.addEventListener("click", () => { makeTower(bash) })

mortirTower.addEventListener("click", () => { makeTower(mortir) })

function attackBash(GAME) {
    towers.forEach(tower => {
        if(tower.type = "bash") {
            towerCenterX = tower.x + 50;
            towerCenterY = tower.y + 50;
            lvls[GAME.lvlCount - 1].monsters.forEach(monster => {

                lineToMonster = Math.sqrt(Math.pow(monster.x - tower.x, 2) + Math.pow(monster.y - tower.y, 2));
                if (lineToMonster <= tower.radius) {
                    monster.hp -= tower.atk;
                }
                // if (monster.x <= towerCenterX + tower.radius && monster.y == towerCenterY) {
                //     monster.hp -= tower.atk;
                // }
            })
        }
    })
}

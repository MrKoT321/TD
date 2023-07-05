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

var towerAbilities = document.querySelector(".tower-abilities");
var newTowerSelector = document.querySelector(".new-tower");
var deleteTowerButton = document.querySelector(".delete-tower");

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
        makeTower();
    }
)

var towerTiles = [];
var towerTilesActive = [];

lvl.towers.forEach(towerPos => {
    towerTiles.push([(towerPos % 16 - 1) * 100, Math.floor(towerPos / 16) * 100])
})

function isTowerOnPlace(tile) {
    let res = false;
    towerTilesActive.forEach(activeTile => {
        if(activeTile[0] == tile[0] && activeTile[1] == tile[1]) {
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

function makeTower() {
    towerTiles.forEach(tile => {
        if (
            mouseClick.x > tile[0] && mouseClick.x < tile[0] + 100 && mouseClick.y > tile[1] && mouseClick.y < tile[1] + 100 && (!(isTowerOnPlace(tile)))
        ) {
            towerTilesActive.push([tile[0], tile[1]]);
        }
    })
}

function drawTower() {
    towerTilesActive.forEach(tile => {
        canvasContext.fillStyle = "blue";
        canvasContext.beginPath();
        canvasContext.arc(tile[0] + 50, tile[1] + 50, 50, 0, 2 * Math.PI);
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
    for (var i = 0; i < towerTilesActive.length; i++) {
        tile = towerTilesActive[i];
        if (
            mouseClick.x > tile[0] && mouseClick.x < tile[0] + 100 && mouseClick.y > tile[1] && mouseClick.y < tile[1] + 100 && isTowerOnPlace(tile)
        ) {
            let menuPosX = tile[0] - 125 + 50;
            let menuPosY = tile[1] - 125 + 50;
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
        for(var i = 0; i < towerTilesActive.length; i++) {
            activeTile = towerTilesActive[i];
            if (mouseClick.x > activeTile[0] && mouseClick.x < activeTile[0] + 100 && mouseClick.y > activeTile[1] && mouseClick.y < activeTile[1] + 100) {
                towerTilesActive.splice(i, 1);
            }
        }
    }
)
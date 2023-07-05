var mouse = {
    x: undefined,
    y: undefined
}

var mouseClick = {
    x: undefined,
    y: undefined
}

var lvl = lvl1;

var towerSelector = document.querySelector(".tower-selection");

window.addEventListener(
    'mousemove',
    (event) => {
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight
        mouse.x = event.clientX - ((windowWidth - GAME.width) / 2) + 100;
        mouse.y = event.clientY - ((windowHeight - GAME.height) / 2);
    }
)

window.addEventListener (
    'click',
    (event) => {
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight
        mouseClick.x = event.clientX - ((windowWidth - GAME.width) / 2) + 100;
        mouseClick.y = event.clientY - ((windowHeight - GAME.height) / 2);
        makeTower();
        drawTowerSelector();
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
            console.log(towerTilesActive)
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
        // canvasContext.fillRect(tile[0], tile[1], 100, 100);
    })
}

function drawTowerSelector() {
    let isFindDrawPos = false;
    towerTiles.forEach(tile => {
        if (
            mouseClick.x > tile[0] && mouseClick.x < tile[0] + 100 && mouseClick.y > tile[1] && mouseClick.y < tile[1] + 100 
        ) {
            let menuPosX = tile[0] - 125 + 50;
            let menuPosY = tile[1] - 125 + 50;
            towerSelector.style.left = menuPosX + "px";
            towerSelector.style.top = menuPosY + "px";
            towerSelector.classList.remove("hidden");
            isFindDrawPos = true;
        }
    })
    if (!isFindDrawPos) {
        towerSelector.classList.add("hidden");
    }
}

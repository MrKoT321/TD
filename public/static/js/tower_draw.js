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

function drawTower() {
    towers.forEach(tile => {
        if (tile.type == "arrow" && towersImg.arrow) { canvasContext.drawImage(towersImg.arrow, tile.x, tile.y, 100, 100); }
        if (tile.type == "bash" && towersImg.bash) { canvasContext.drawImage(towersImg.bash, tile.x, tile.y, 100, 100); }
        if (tile.type == "splash" && towersImg.splash) { canvasContext.drawImage(towersImg.splash, tile.x, tile.y, 100, 100); }

        canvasContext.beginPath();
        canvasContext.strokeStyle = "pink";
        canvasContext.lineWidth = 2;
        canvasContext.arc(tile.x + 50, tile.y + 50, tile.radius, 0, 2 * Math.PI);
        canvasContext.stroke();
        canvasContext.closePath();
    })
}
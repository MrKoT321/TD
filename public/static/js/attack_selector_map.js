let map = {
    scale: 0.6,
    width: 960,
    height: 600,
    images: [],
    towers: [],
}

let lvls = [lvl1, lvl2, lvl3, lvl4];

let map1 = new Image();
let map2 = new Image();
let map3 = new Image();
let map4 = new Image();
let archerImg = new Image();
let bashImg = new Image();
let mortirImg = new Image();
map1.src = '../static/images/MAP1-ALT.png';
map2.src = '../static/images/MAP2-ALT.png';
map3.src = '../static/images/MAP3-ALT.png';
map4.src = '../static/images/MAP4-ALT.png';
archerImg.src = '../static/images/archer_tower.png';
bashImg.src = '../static/images/bash_tower.png';
mortirImg.src = '../static/images/mortir_tower.png';

map1.onload = () => {
    map.images.push({index: 1, body: map1})
}
map2.onload = () => {
    map.images.push({index: 2, body: map2})
}
map3.onload = () => {
    map.images.push({index: 3, body: map3})
}
map4.onload = () => {
    map.images.push({index: 4, body: map4})
}
archerImg.onload = () => {
    map.towers.push(archerImg)
}
bashImg.onload = () => {
    map.towers.push(bashImg)
}
mortirImg.onload = () => {
    map.towers.push(mortirImg)
}

let canvasMap = document.getElementById("canvas-map");
let ctxM = canvasMap.getContext("2d");

canvasMap.width = map.width;
canvasMap.height = map.height;

function drawTowers(currWave, positions) {
    let waveTowers = map.towers[currWave - 1];
    let towerImg;
    for(i=0;i<waveTowers.length;i++) {
        let tower = waveTowers[i];
        switch(tower.type) {
            case "arrow":
                towerImg = archerImg;
                break;
            case "bash":
                towerImg = bashImg;
                break;
            case "splash":
                towerImg = mortirImg;
                break;
        }
        ctxM.drawImage(towerImg, (positions[i] % 16 - 1) * 100 * map.scale, Math.floor(positions[i] / 16) * 100 * map.scale, 100 * map.scale, 100 * map.scale);
    }
}

function drawMap(currLvl, currWave) {
    canvasMap.parentNode.classList.remove("not_exist");
    console.log(currLvl, currWave);
    map.images.sort((mapFirst, mapSecond) => mapFirst.index - mapSecond.index);
    ctxM.drawImage(map.images[currLvl - 1].body, 0, 0, map.width, map.height);
    map.towers = lvls[currLvl - 1].atk_towers;
    drawTowers(currWave, lvls[currLvl - 1].towersPos);
}

function clearMap() {
    canvasMap.parentNode.classList.add("not_exist");
    ctxM.clearRect(canvasMap.width/2 - map.width/2, canvasMap.height/2 - map.height/2, map.width, map.height);
}
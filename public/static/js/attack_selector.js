var GAME = {
    width: 1800,
    height: 1000,
    money: 100,
    score: 0,
    lvlCount: 1,
    currwave: 'wave1'
}

// monster = {
//     amount
//     x
//     y
//     image
// }

var wave1 = [mob1_1, mob2_1, mob3_1, mob4_1, mob5_1];
var wave2 = [mob1_2, mob2_2, mob3_2, mob4_2, mob5_2];
var wave3 = [mob1_3, mob2_3, mob3_3, mob4_3, mob5_3];

var curr_mob = {};

var selected_count = 0;

var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");

const background = new Image();
background.src = "../static/images/background_selector.png";

background.onload = () => {
    GAME.background = background;
}

function drawBackground() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    if (GAME.background) {
        canvasContext.drawImage(GAME.background, 0, 0, GAME.width, GAME.height)
    }
}

function updateMoney() {
    let moneyInfo = document.querySelector(".count-coin");
    moneyInfo.innerHTML = String(Math.floor(GAME.money));
}

mob1_selector.addEventListener(
    "click",
    () => {
        curr_mob = monster1;
        addMobsToWaves();
    }
)

mob2_selector.addEventListener(
    "click",
    () => {
        curr_mob = monster2;
        addMobsToWaves();
    }
)

mob3_selector.addEventListener(
    "click",
    () => {
        curr_mob = monster3;
        addMobsToWaves();
    }
)

mob4_selector.addEventListener(
    "click",
    () => {
        curr_mob = monster4;
        addMobsToWaves();
    }
)

mob5_selector.addEventListener(
    "click",
    () => {
        curr_mob = monster5;
        addMobsToWaves();
    }
)

function addMobToWave(wave) {
    if (selected_count == 0){
        wave[selected_count].image = curr_mob.image;
        wave[selected_count].name = curr_mob.name; 
        selected_count += 1;
    }
    if (wave[selected_count - 1].name == curr_mob.name) {
        wave[selected_count - 1].amount += 1;
    } else {
        wave[selected_count].image = curr_mob.image;
        wave[selected_count].name = curr_mob.name;
        selected_count += 1;
        }
}

function addMobsToWaves() {
    if (GAME.currwave == 'wave1') {
        addMobToWave(wave1);
    }
    if (GAME.currwave == 'wave2') {
        addMobToWave(wave2);
    }
    if (GAME.currwave == 'wave3') {
        addMobToWave(wave3);
    }
}

function drawWaves() {
    for (let mob of wave1) {
        if (mob.image != null) {
            canvasContext.drawImage(mob.image, mob.x, mob.y)
        }
    }
    for (let mob of wave2) {
        if (mob.image != null) {
            canvasContext.drawImage(mob.image, mob.x, mob.y)
        }
    }
    for (let mob of wave3) {
        if (mob.image != null) {
            canvasContext.drawImage(mob.image, mob.x, mob.y)
        }
    }
}

function drawMobAmount(){
    for (let count of mob_count){
        count.innerHTML = String(0);
    }
}

function play() {
    updateMoney();
    drawBackground();
    drawWaves();

    requestAnimationFrame(play);
}

play();
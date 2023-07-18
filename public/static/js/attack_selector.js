var GAME = {
    width: 1800,
    height: 1000,
    money: 100,
    score: 0,
    lvlCount: 1,
    currwave: 'wave1'
}

var lvlcount = 1;

var wave1 = [mob1_1, mob2_1, mob3_1, mob4_1, mob5_1];
var wave2 = [mob1_2, mob2_2, mob3_2, mob4_2, mob5_2];
var wave3 = [mob1_3, mob2_3, mob3_3, mob4_3, mob5_3];

var curr_mob = {
    name: "?",
    icon: null
};

var count_sell = 0;

var selected_count_wave1 = 0;
var selected_count_wave2 = 0;
var selected_count_wave3 = 0;

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

var isNewMonster = 'no';

function addMobToWave(wave, selected_count) {
    if (selected_count == 0) {
        wave[selected_count].image = curr_mob.icon;
        wave[selected_count].name = curr_mob.name;
        wave[selected_count].amount += 1;
        selected_count += 1;
    } else {
        for (let i = 0; i < selected_count; i++) {
            if (wave[i].name == curr_mob.name) {
                wave[i].amount += 1;
                isNewMonster = 'no';
                break
            } else {
                isNewMonster = 'yes'
            }
        }
    }
    if (isNewMonster == 'yes') {
        wave[selected_count].image = curr_mob.icon;
        wave[selected_count].name = curr_mob.name;
        wave[selected_count].amount += 1;
        selected_count += 1;
        isNewMonster = 'no';
    }
    return(selected_count)
}

function addMobsToWaves() {
    if (GAME.currwave == 'wave1') {
        selected_count_wave1 = addMobToWave(wave1, selected_count_wave1);
    }
    if (GAME.currwave == 'wave2') {
        selected_count_wave2 = addMobToWave(wave2, selected_count_wave2);
    }
    if (GAME.currwave == 'wave3') {
        selected_count_wave3 = addMobToWave(wave3, selected_count_wave3);
    }
}

function drawWaves() {
    for (let mob of wave1) {
        if (mob.image != null && mob.amount > 0) {
            canvasContext.drawImage(mob.image, mob.x, mob.y)
        }
    }
    for (let mob of wave2) {
        if (mob.image != null && mob.amount > 0) {
            canvasContext.drawImage(mob.image, mob.x, mob.y)
        }
    }
    for (let mob of wave3) {
        if (mob.image != null && mob.amount > 0) {
            canvasContext.drawImage(mob.image, mob.x, mob.y)
        }
    }
}

function showMobInfo() {
    for (let i = 0; i < mob_count.length; i++) {
        if (mob_count[i].innerHTML > 0) {
            mob_info[i].classList.remove('hidden');
            mob_info[i].classList.add('visible');
        }
        if (mob_count[i].innerHTML == 0) {
            mob_info[i].classList.remove('visible');
            mob_info[i].classList.add('hidden');
        }
    }
}

function updateMonsterCountsWave1() {
    for (let i = 0; i <= 4; i++) {
        mob_count[i].innerHTML = String(wave1[i].amount);
    }
}

function updateMonsterCountsWave2() {
    for (let i = 5, j = 0; i <= 9; i++, j++) {
        mob_count[i].innerHTML = String(wave2[j].amount);
    }
}

function updateMonsterCountsWave3() {
    for (let i = 10, j = 0; i <= 14; i++, j++) {
        mob_count[i].innerHTML = String(wave3[j].amount);
    }
}

function updatePosMonsters() {
    for (let i = 0; i < wave1.length - 1; i++) {
        if (wave1[i].amount == 0 && wave1[i + 1].amount != 0) {
            wave1[i].amount = wave1[i + 1].amount;
            wave1[i + 1].amount = 0;
            wave1[i].image = wave1[i + 1].image;
            wave1[i + 1].image = null;
            wave1[i].name = wave1[i + 1].name;
            wave1[i + 1].name = "?";
            console.log(count_sell)
            if(count_sell == 0){
                selected_count_wave1 -= 1;
                count_sell = 1
            }
        }
    }
    for (let i = 0; i < wave2.length - 1; i++) {
        if (wave2[i].amount == 0 && wave2[i + 1].amount != 0) {
            wave2[i].amount = wave2[i + 1].amount;
            wave2[i + 1].amount = 0;
            wave2[i].image = wave2[i + 1].image;
            wave2[i + 1].image = null;
            wave2[i].name = wave2[i + 1].name;
            wave2[i + 1].name = "?";
            if(count_sell == 0){
                selected_count_wave2 -= 1;
                count_sell = 1;
            }
        }
    }
    for (let i = 0; i < wave3.length - 1; i++) {
        if (wave3[i].amount == 0 && wave3[i + 1].amount != 0) {
            wave3[i].amount = wave3[i + 1].amount;
            wave3[i + 1].amount = 0;
            wave3[i].image = wave3[i + 1].image;
            wave3[i + 1].image = null;
            wave3[i].name = wave3[i + 1].name;
            wave3[i + 1].name = "?";
            if(count_sell == 0){
                selected_count_wave3 -= 1;
                count_sell = 1
            }
        }
    }
}

wave_minus.addEventListener(
    "click",
    () => {
        if (GAME.currwave == 'wave2') {
            GAME.currwave = 'wave1';
            wave_minus.classList.add('hidden');
            wave_2.classList.add('hidden');
            wave_1.classList.remove('hidden');
        }
        if (GAME.currwave == 'wave3') {
            GAME.currwave = 'wave2';
            wave_plus.classList.remove('hidden');
            wave_2.classList.remove('hidden');
            wave_3.classList.add('hidden');
        }
    }
)

wave_plus.addEventListener(
    "click",
    () => {
        if (GAME.currwave == 'wave2') {
            GAME.currwave = 'wave3';
            wave_plus.classList.add('hidden');
            wave_2.classList.add('hidden');
            wave_3.classList.remove('hidden');
        }
        if (GAME.currwave == 'wave1') {
            GAME.currwave = 'wave2';
            wave_minus.classList.remove('hidden');
            wave_1.classList.add('hidden');
            wave_2.classList.remove('hidden');
        }
    }
)

function play() {
    updateMoney();
    updateMonsterCountsWave1();
    updateMonsterCountsWave2();
    updateMonsterCountsWave3();
    drawBackground();
    updatePosMonsters();
    drawWaves();
    showMobInfo();

    requestAnimationFrame(play);
}

play();
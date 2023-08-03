var GAME = {
    width: 1800,
    height: 1000,
    money: 0,
    score: 0,
    lvl: 1,
    currwave: 'wave1',
    gameId: gameIdResponse.innerHTML
}

var lvlcount = 1;

var mobs_unlock = ['monster1', 'monster2'];
var mobs_unlock_buy =[];

var maxcostwave1 = 100;
var maxcostwave2 = 150;
var maxcostwave3 = 200;

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

let animationId;
function spendMoneyError() {
    let moneyInfo = document.querySelector(".count-coin");
    clearTimeout(animationId);
    moneyInfo.classList.add("error");
    animationId = setTimeout(() => { moneyInfo.classList.remove("error"); }, 800);
}


var isNewMonster = 'no';

function addMobToWave(wave, selected_count) {
    if (selected_count == 0) {
        wave[selected_count].image = curr_mob.icon;
        wave[selected_count].name = curr_mob.name;
        wave[selected_count].amount += 1;
        wave[selected_count].cost = curr_mob.cost;
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
        wave[selected_count].cost = curr_mob.cost;
        selected_count += 1;
        isNewMonster = 'no';
    }
    return (selected_count)
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
            wave1[i].cost = wave1[i + 1].cost;
            if (count_sell == 0) {
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
            wave2[i].cost = wave2[i + 1].cost;
            if (count_sell == 0) {
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
            wave3[i].cost = wave3[i + 1].cost;
            if (count_sell == 0) {
                selected_count_wave3 -= 1;
                count_sell = 1
            }
        }
    }
}

function updateWavesMoney() {
    money_wave1.innerHTML = String(maxcostwave1);
    money_wave2.innerHTML = String(maxcostwave2);
    money_wave3.innerHTML = String(maxcostwave3);
}

function updateWaveMoney() {
    if (GAME.currwave == 'wave1') {
        maxcostwave1 -= curr_mob.cost
    }
    if (GAME.currwave == 'wave2') {
        maxcostwave2 -= curr_mob.cost
    }
    if (GAME.currwave == 'wave3') {
        maxcostwave3 -= curr_mob.cost
    }
}

function sendWaves(wave1_send, wave2_send, wave3_send) {
    for (mob of wave1) {
        if(mob.name != '?'){
            while (mob.amount != 0){
                wave1_send.push(mob.name);
                mob.amount -= 1
            }
        }
    }
    for (mob of wave2) {
        if(mob.name != '?'){
            while (mob.amount != 0){
                wave2_send.push(mob.name);
                mob.amount -= 1
            }
        }
    }
    for (mob of wave3) {
        if(mob.name != '?'){
            while (mob.amount != 0){
                wave3_send.push(mob.name);
                mob.amount -= 1
            }
        }
    }
}

function unblockMonsters(){
    for(mob of mobs_unlock){
        if(mob == 'monster3'){
            unlock_monster3.classList.add('hidden');
            mob3_selector.classList.remove('hidden');
        }
        if(mob == 'monster4'){
            unlock_monster4.classList.add('hidden');
            mob4_selector.classList.remove('hidden');
        }
        if(mob == 'monster5'){
            unlock_monster5.classList.add('hidden');
            mob5_selector.classList.remove('hidden');
        }
    }
}

function canStart(){
    if (wave1[0].amount != 0 && wave2[0].amount != 0 && wave3[0].amount != 0) {
        start_button.classList.remove('hidden');
        start_lock.classList.add('hidden')
    } else{
        start_lock.classList.remove('hidden');
        start_button.classList.add('hidden') 
    }
}

function initParams(){
    if(lvl_take.innerHTML != 0){
        GAME.money = parseInt(money_take.innerHTML);
        GAME.score = parseInt(score_send.innerHTML);
        GAME.id = parseInt(id_take.innerHTML);
        GAME.lvl = parseInt(lvl_take.innerHTML);
        mobs_unlock = (mobsUnlock_take.innerHTML).split(',');
    }
}

function closeLoading() {
    load.classList.add('hidden');
    loading_text.classList.add('hidden');
    loading_bg.classList.add('hidden');
    loading_image.classList.add('hidden');
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function transformMobsUnlock() {
    for(let mob of mobs_unlock){
        if(mob == 'monster1'){
            mobs_unlock_buy.push(monster1);
        }
        if(mob == 'monster2'){
            mobs_unlock_buy.push(monster2);
        }
        if(mob == 'monster3'){
            mobs_unlock_buy.push(monster3);
        }
        if(mob == 'monster4'){
            mobs_unlock_buy.push(monster4);
        }
        if(mob == 'monster5'){
            mobs_unlock_buy.push(monster5);
        }
    }
}

function clearWave(wave) {
    for(let mob of wave) {
        mob.amount = 0;
        mob.name = '?'
    }
}

function randomWave(wave, randomcostwave) {
    clearWave(wave);
    transformMobsUnlock();
    let canbuymonsters = mobs_unlock_buy;
    let pushcount = 0;
    for(randomcostwave; randomcostwave >= monster1.cost;){
        canbuymonsters = canbuymonsters.filter(value => value.cost <= randomcostwave)
        let currbuymonster = canbuymonsters[getRandomInt(getRandomInt(canbuymonsters.length))];
        randomcostwave -= currbuymonster.cost;
        let isMonsterInWave = 'no';
        for(let mob of wave){
            if(mob.name == currbuymonster.name){
                mob.amount += 1;
                isMonsterInWave = 'yes';
                break
            }
            else{
                isMonsterInWave = 'no'
            }
        }
        if(isMonsterInWave == 'no'){
            wave[pushcount].name = currbuymonster.name;
            wave[pushcount].image = currbuymonster.icon;
            wave[pushcount].amount += 1;
            wave[pushcount].cost = currbuymonster.cost;
            pushcount += 1;
        }
    }
}

function play() {
    unblockMonsters();
    updateMoney();
    updateWavesMoney();
    updateMonsterCountsWave1();
    updateMonsterCountsWave2();
    updateMonsterCountsWave3();
    drawBackground();
    updatePosMonsters();
    drawWaves();
    showMobInfo();
    canStart();

    requestAnimationFrame(play);
}

initParams();
setTimeout(() => { closeLoading() }, 5000)
setTimeout(() => { play() }, 5000)
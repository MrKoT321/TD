mob1_selector.addEventListener(
    "click",
    () => {
        curr_mob = monster1;
        if ((GAME.currwave == 'wave1' && maxcostwave1 - curr_mob.cost >= 0) || (GAME.currwave == 'wave2' && maxcostwave2 - curr_mob.cost >= 0) || (GAME.currwave == 'wave3' && maxcostwave3 - curr_mob.cost >= 0)) {
            addMobsToWaves();
            updateWaveMoney();
        }
    }
)

mob1_selector.addEventListener(
    "mouseover",
    () => {
        mob1_info.classList.remove('hidden')
    }
)

mob1_selector.addEventListener(
    "mouseout",
    () => {
        mob1_info.classList.add('hidden')
    }
)

mob1_info.addEventListener(
    "mouseover",
    () => {
        mob1_info.classList.remove('hidden')
    }
)

mob1_info.addEventListener(
    "mouseout",
    () => {
        mob1_info.classList.add('hidden');
    }
)

mob2_selector.addEventListener(
    "click",
    () => {
        curr_mob = monster2;
        if ((GAME.currwave == 'wave1' && maxcostwave1 - curr_mob.cost >= 0) || (GAME.currwave == 'wave2' && maxcostwave2 - curr_mob.cost >= 0) || (GAME.currwave == 'wave3' && maxcostwave3 - curr_mob.cost >= 0)) {
            addMobsToWaves();
            updateWaveMoney();
        }
    }
)

mob2_selector.addEventListener(
    "mouseover",
    () => {
        mob2_info.classList.remove('hidden')
    }
)

mob2_selector.addEventListener(
    "mouseout",
    () => {
        mob2_info.classList.add('hidden')
    }
)

mob2_info.addEventListener(
    "mouseover",
    () => {
        mob2_info.classList.remove('hidden')
    }
)

mob2_info.addEventListener(
    "mouseout",
    () => {
        mob2_info.classList.add('hidden');
    }
)

mob3_selector.addEventListener(
    "click",
    () => {
        curr_mob = monster3;
        if ((GAME.currwave == 'wave1' && maxcostwave1 - curr_mob.cost >= 0) || (GAME.currwave == 'wave2' && maxcostwave2 - curr_mob.cost >= 0) || (GAME.currwave == 'wave3' && maxcostwave3 - curr_mob.cost >= 0)) {
            addMobsToWaves();
            updateWaveMoney();
        }
    }
)

mob3_selector.addEventListener(
    "mouseover",
    () => {
        mob3_info.classList.remove('hidden')
    }
)

mob3_selector.addEventListener(
    "mouseout",
    () => {
        mob3_info.classList.add('hidden')
    }
)

mob3_info.addEventListener(
    "mouseover",
    () => {
        mob3_info.classList.remove('hidden')
    }
)

mob3_info.addEventListener(
    "mouseout",
    () => {
        mob3_info.classList.add('hidden');
    }
)

if (mob4_selector) {
    mob4_selector.addEventListener(
        "click",
        () => {
            curr_mob = monster4;
            if ((GAME.currwave == 'wave1' && maxcostwave1 - curr_mob.cost >= 0) || (GAME.currwave == 'wave2' && maxcostwave2 - curr_mob.cost >= 0) || (GAME.currwave == 'wave3' && maxcostwave3 - curr_mob.cost >= 0)) {
                addMobsToWaves();
                updateWaveMoney();
            }
        }
    )
    mob4_selector.addEventListener(
        "mouseover",
        () => {
            mob4_info.classList.remove('hidden')
        }
    )

    mob4_selector.addEventListener(
        "mouseout",
        () => {
            mob4_info.classList.add('hidden')
        }
    )

    mob4_info.addEventListener(
        "mouseover",
        () => {
            mob4_info.classList.remove('hidden')
        }
    )

    mob4_info.addEventListener(
        "mouseout",
        () => {
            mob4_info.classList.add('hidden');
        }
    )
}

mob5_selector.addEventListener(
    "click",
    () => {
        curr_mob = monster5;
        if ((GAME.currwave == 'wave1' && maxcostwave1 - curr_mob.cost >= 0) || (GAME.currwave == 'wave2' && maxcostwave2 - curr_mob.cost >= 0) || (GAME.currwave == 'wave3' && maxcostwave3 - curr_mob.cost >= 0)) {
            addMobsToWaves();
            updateWaveMoney();
        }
    }
)

mob5_selector.addEventListener(
    "mouseover",
    () => {
        mob5_info.classList.remove('hidden')
    }
)

mob5_selector.addEventListener(
    "mouseout",
    () => {
        mob5_info.classList.add('hidden')
    }
)

mob5_info.addEventListener(
    "mouseover",
    () => {
        mob5_info.classList.remove('hidden')
    }
)

mob5_info.addEventListener(
    "mouseout",
    () => {
        mob5_info.classList.add('hidden');
    }
)

sell1_1.addEventListener(
    "click",
    () => {
        maxcostwave1 += wave1[0].cost;
        wave1[0].amount -= 1;
        count_sell = 0;
    }
)

sell2_1.addEventListener(
    "click",
    () => {
        maxcostwave1 += wave1[1].cost;
        wave1[1].amount -= 1;
        count_sell = 0;
    }
)

sell3_1.addEventListener(
    "click",
    () => {
        maxcostwave1 += wave1[2].cost;
        wave1[2].amount -= 1;
        count_sell = 0;
    }
)

sell4_1.addEventListener(
    "click",
    () => {
        maxcostwave1 += wave1[3].cost;
        wave1[3].amount -= 1;
        count_sell = 0;
    }
)

sell5_1.addEventListener(
    "click",
    () => {
        maxcostwave1 += wave1[4].cost;
        wave1[4].amount -= 1;
        count_sell = 0;
    }
)

sell1_2.addEventListener(
    "click",
    () => {
        maxcostwave2 += wave2[0].cost;
        wave2[0].amount -= 1;
        count_sell = 0;
    }
)

sell2_2.addEventListener(
    "click",
    () => {
        maxcostwave2 += wave2[1].cost;
        wave2[1].amount -= 1;
        count_sell = 0;
    }
)

sell3_2.addEventListener(
    "click",
    () => {
        maxcostwave2 += wave2[2].cost;
        wave2[2].amount -= 1;
        count_sell = 0;
    }
)

sell4_2.addEventListener(
    "click",
    () => {
        maxcostwave2 += wave2[3].cost;
        wave2[3].amount -= 1;
        count_sell = 0;
    }
)

sell5_2.addEventListener(
    "click",
    () => {
        maxcostwave2 += wave2[4].cost;
        wave2[4].amount -= 1;
        count_sell = 0;
    }
)

sell1_3.addEventListener(
    "click",
    () => {
        maxcostwave3 += wave3[0].cost;
        wave3[0].amount -= 1;
        count_sell = 0;
    }
)

sell2_3.addEventListener(
    "click",
    () => {
        maxcostwave3 += wave3[1].cost;
        wave3[1].amount -= 1;
        count_sell = 0;
    }
)

sell3_3.addEventListener(
    "click",
    () => {
        maxcostwave3 += wave3[2].cost;
        wave3[2].amount -= 1;
        count_sell = 0;
    }
)

sell4_3.addEventListener(
    "click",
    () => {
        maxcostwave3 += wave3[3].cost;
        wave3[3].amount -= 1;
        count_sell = 0;
    }
)

sell5_3.addEventListener(
    "click",
    () => {
        maxcostwave3 += wave3[4].cost;
        wave3[4].amount -= 1;
        count_sell = 0;
    }
)

map_button.addEventListener(
    "click",
    () => {
        popup_map_bg.classList.remove("hidden");
        popup_map_show.classList.remove("hidden");
        drawMap(GAME.lvl, parseInt(GAME.currwave.split('e')[1]));
    }
)

popup_map_bg.addEventListener(
    "click",
    () => {
        popup_map_bg.classList.add("hidden");
        popup_map_show.classList.add("hidden");
        clearMap();
    }
)

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

unlock_monster3.addEventListener(
    "click",
    () => {
        if (GAME.money >= 200) {
            GAME.money -= 200;
            mobs_unlock.push('monster3');
        } else {
            spendMoneyError()
        }
    }
)

unlock_monster4.addEventListener(
    "click",
    () => {
        if (GAME.money >= 300) {
            GAME.money -= 300;
            mobs_unlock.push('monster4');
        } else {
            spendMoneyError()
        }
    }
)

unlock_monster5.addEventListener(
    "click",
    () => {
        if (GAME.money >= 400) {
            GAME.money -= 400;
            mobs_unlock.push('monster5');
        } else {
            spendMoneyError()
        }
    }
)

start_lock.addEventListener(
    "mouseover",
    () => {
        start_info.classList.remove('hidden')
    }
)

start_lock.addEventListener(
    "mouseout",
    () => {
        start_info.classList.add('hidden')
    }
)

start_button.addEventListener(
    "click",
    () => {
        let wave1_to_send = [], wave2_to_send = [], wave3_to_send = []
        sendWaves(wave1_to_send, wave2_to_send, wave3_to_send);
        wave1_send.value = String(wave1_to_send);
        wave2_send.value = String(wave2_to_send);
        wave3_send.value = String(wave3_to_send);
        mobs_unlock_send.value = String(mobs_unlock);
        money_send.value = GAME.money;
        gameId_send.value = GAME.gameId;
        currentLvl_send.value = GAME.lvl;
        score_send.value = GAME.score;
        // jsonInput.value = '{"wave_data": {"wave1": {"monster1": {"count": 2},"monster2": {"count": 50}},"wave2": {"monster3": {"count": 4},"monster1": {"count": 25}}}}';
        $('#form').attr('action', '../send_waves.php');
    }
)

random1.addEventListener(
    "click",
    () => {
        let randomcostwave1 = 100
        randomWave(wave1, randomcostwave1);
        for(let mob of wave1){
            if(mob.amount > 0){
                randomcostwave1 -= mob.cost * mob.amount;
            }
        }
        maxcostwave1 = randomcostwave1
    }
)

random2.addEventListener(
    "click",
    () => {
        let randomcostwave2 = 150
        randomWave(wave2, randomcostwave2);
        for(let mob of wave2){
            if(mob.amount > 0){
                randomcostwave2 -= mob.cost * mob.amount;
            }
        }
        maxcostwave2 = randomcostwave2
    }
)

random3.addEventListener(
    "click",
    () => {
        let randomcostwave3 = 200
        randomWave(wave3, costwave3);
        for(let mob of wave3){
            if(mob.amount > 0){
                randomcostwave3 -= mob.cost * mob.amount;
            }
        }
        maxcostwave3 = randomcostwave3
    }
)
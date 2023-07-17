mob1_selector.addEventListener(
    "click",
    () => {
        curr_mob = monster1;
        addMobsToWaves();
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
        addMobsToWaves();
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
        addMobsToWaves();
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
            addMobsToWaves();
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
        addMobsToWaves();
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
        wave1[0].amount -= 1;
        count_sell = 0;
    }
)

sell2_1.addEventListener(
    "click",
    () => {
        wave1[1].amount -= 1;
        count_sell = 0;
    }
)

sell3_1.addEventListener(
    "click",
    () => {
        wave1[2].amount -= 1;
        count_sell = 0;
    }
)

sell4_1.addEventListener(
    "click",
    () => {
        wave1[3].amount -= 1;
        count_sell = 0;
    }
)

sell5_1.addEventListener(
    "click",
    () => {
        wave1[4].amount -= 1;
        count_sell = 0;
    }
)

sell1_2.addEventListener(
    "click",
    () => {
        wave2[0].amount -= 1;
        count_sell = 0;
    }
)

sell2_2.addEventListener(
    "click",
    () => {
        wave2[1].amount -= 1;
        count_sell = 0;
    }
)

sell3_2.addEventListener(
    "click",
    () => {
        wave2[2].amount -= 1;
        count_sell = 0;
    }
)

sell4_2.addEventListener(
    "click",
    () => {
        wave2[3].amount -= 1;
        count_sell = 0;
    }
)

sell5_2.addEventListener(
    "click",
    () => {
        wave2[4].amount -= 1;
        count_sell = 0;
    }
)

sell1_3.addEventListener(
    "click",
    () => {
        wave3[0].amount -= 1;
        count_sell = 0;
    }
)

sell2_3.addEventListener(
    "click",
    () => {
        wave3[1].amount -= 1;
        count_sell = 0;
    }
)

sell3_3.addEventListener(
    "click",
    () => {
        wave3[2].amount -= 1;
        count_sell = 0;
    }
)

sell4_3.addEventListener(
    "click",
    () => {
        wave3[3].amount -= 1;
        count_sell = 0;
    }
)

sell5_3.addEventListener(
    "click",
    () => {
        wave3[4].amount -= 1;
        count_sell = 0;
    }
)

map_button.addEventListener(
    "click",
    () => {
        popup_map_show.classList.remove('hidden');
        if (lvlcount == 1) {
            popup_map.classList.add(maps[lvlcount - 1]);
        } else {
            popup_map.classList.remove(maps[lvlcount - 2]);
            popup_map.classList.add(maps[lvlcount - 1])
        }
    }
)
const lvl1 = {
    start_x: -100,
    start_y: 700,
    finish_cells: [62, 63, 46, 47],
    towersPos: [66, 87, 140],
    road: [36, 37, 38, 39, 40, 41, 42, 52, 53, 54, 55, 56, 57, 58, 68, 69, 73, 74, 78, 79, 84, 85, 89, 90, 91, 92, 93, 94, 95, 97, 98, 99, 100, 101, 105, 106, 107, 108, 109, 110, 111, 113, 114, 115, 116, 117],
    castleHP: 3,
    castle_x: 1198,
    castle_y: 0,
    castle_w: 386,
    castle_h: 400,
    money: 100,
    start_dir: 'r',
    waves: [[monster1, monster5], [monster1, monster1, monster3, monster2], [monster2, monster1, monster1, monster1, monster1]],
    atk_towers: [[archer], [archer, bash], [bash, archer]],
    bonuses: ["fireball"],
    back_src:  "../static/images/MAP1.png",
    castle_src:  "../static/images/CASTLE.png",
};

const lvl2 = {
    start_x: 1200,
    start_y: -100,
    finish_cells: [66, 67, 82, 83],
    towersPos: [59, 103, 108],
    road: [12, 13, 24, 25, 26, 27, 28, 29, 40, 41, 42, 43, 44, 45, 56, 57, 72, 73, 74, 75, 76, 77, 78, 79, 88, 89, 90, 91, 92, 93, 94, 95, 98, 99, 110, 111, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143],
    castleHP: 3,
    castle_x: 7,
    castle_y: 202,
    castle_w: 386,
    castle_h: 400,
    money: 200,
    start_dir: 'r',
    waves: [[monster1, monster2], [monster2, monster1, monster2, monster1], [monster1, monster1, monster1, monster1, monster1], [monster1, monster1, monster1, monster1, monster1, monster1, monster1]],
    atk_towers: [[bash], [archer, bash], [archer, bash, archer]],
    bonuses: ["fireball"],
    back_src:  "../static/images/MAP2.png",
    castle_src:  "../static/images/CASTLE.png" 
    
}

const lvl3 = {
    start_x: 200,
    start_y: 1050,
    finish_cells: [46, 47, 62, 63],
    towersPos: [68, 90, 125, 132],
    road: [40, 41, 42, 43, 44, 56, 57, 58, 59, 60, 72, 73, 75, 76, 78, 79, 82, 83, 84, 85, 86, 88, 89, 91, 92, 93, 94, 95, 98, 99, 100, 101, 102, 104, 105, 107, 108, 109, 110, 111, 114, 115, 117, 118, 119, 120, 121, 130, 131, 133, 134, 135, 136, 137, 146, 147],
    castleHP: 3, 
    castle_x: 1207,
    castle_y: 0,
    castle_w: 386,
    castle_h: 400,   
    money: 100,
    start_dir: 'r',
    atk_towers: [[bash, archer], [bash, archer, bash], [archer, bash, mortir]],
    waves: [[monster1, monster1], [monster1, monster1, monster1, monster1], [monster1, monster1, monster1, monster1, monster1]],
    bonuses: [],
    back_src: "../static/images/MAP3.png",
    castle_src:  "../static/images/CASTLE.png"
}

const lvl4 = {
    start_x: 1400,
    start_y: 1050,
    finish_cells: [50, 51, 66, 67],
    towersPos: [59, 93, 102, 105],
    road: [24, 25, 26, 27, 28, 29, 30, 31, 40, 41, 42, 43, 44, 45, 46, 47, 56, 57, 62, 63, 72, 73, 74, 75, 76, 78, 79, 82, 83, 88, 89, 90, 91, 92, 94, 95, 98, 99, 107, 108, 110, 111, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 126, 127, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 142, 143, 158, 159],
    castleHP: 3, 
    castle_x: 7,
    castle_y: 100,
    castle_w: 386,
    castle_h: 400,   
    money: 100,
    start_dir: 'u',
    waves: [[monster1, monster1], [monster1, monster1, monster1, monster1], [monster1, monster1, monster1, monster1, monster1]],
    atk_towers: [[bash, bash, archer], [archer, mortir, bash], [mortir, bash, mortir]],
    bonuses: [],
    back_src: "../static/images/MAP4.png",
    castle_src:  "../static/images/CASTLE.png"
}

const lvl5 = {
    start_x: 1400,
    start_y: 1050,
    finish_cells: [50, 51, 66, 67],
    towersPos: [59, 93, 102, 105],
    road: [24, 25, 26, 27, 28, 29, 30, 31, 40, 41, 42, 43, 44, 45, 46, 47, 56, 57, 62, 63, 72, 73, 74, 75, 76, 78, 79, 82, 83, 88, 89, 90, 91, 92, 94, 95, 98, 99, 107, 108, 110, 111, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 126, 127, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 142, 143, 158, 159],
    castleHP: 3, 
    castle_x: 7,
    castle_y: 100,
    castle_w: 386,
    castle_h: 400,   
    money: 100,
    start_dir: 'r',
    waves: [[monster1, monster1], [monster1, monster1, monster1, monster1], [monster1, monster1, monster1, monster1, monster1]],
    bonuses: [],
    back_src: "../static/images/MAP4.png",
    castle_src:  "../static/images/CASTLE.png"
}
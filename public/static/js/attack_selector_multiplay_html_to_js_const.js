const wave_minus = document.querySelector('.wave-selector__wave-minus');
const wave_plus = document.querySelector('.wave-selector__wave-plus');
const wave_1 = document.querySelector('.wave-selector__1');
const wave_2 = document.querySelector('.wave-selector__2');
const wave_3 = document.querySelector('.wave-selector__3');

const mob1_selector = document.getElementById('mob1');
const mob2_selector = document.getElementById('mob2');
const mob3_selector = document.getElementById('mob3');
const mob4_selector = document.getElementById('mob4');
const mob5_selector = document.getElementById('mob5');

const mob1_1_selected = document.getElementById('mob1-1-selected');
const mob2_1_selected = document.getElementById('mob2-1-selected');
const mob3_1_selected = document.getElementById('mob3-1-selected');
const mob4_1_selected = document.getElementById('mob4-1-selected');
const mob5_1_selected = document.getElementById('mob5-1-selected');
const sell1_1  = document.getElementById('sell1-1');
const sell2_1  = document.getElementById('sell2-1');
const sell3_1  = document.getElementById('sell3-1');
const sell4_1  = document.getElementById('sell4-1');
const sell5_1  = document.getElementById('sell5-1');
const mob1_1_count = document.getElementById('mob1-1-count');
const mob2_1_count = document.getElementById('mob2-1-count');
const mob3_1_count = document.getElementById('mob3-1-count');
const mob4_1_count = document.getElementById('mob4-1-count');
const mob5_1_count = document.getElementById('mob5-1-count');


const mob1_2_selected = document.getElementById('mob1-2-selected');
const mob2_2_selected = document.getElementById('mob2-2-selected');
const mob3_2_selected = document.getElementById('mob3-2-selected');
const mob4_2_selected = document.getElementById('mob4-2-selected');
const mob5_2_selected = document.getElementById('mob5-2-selected');
const sell1_2  = document.getElementById('sell1-2');
const sell2_2  = document.getElementById('sell2-2');
const sell3_2  = document.getElementById('sell3-2');
const sell4_2  = document.getElementById('sell4-2');
const sell5_2  = document.getElementById('sell5-2');
const mob1_2_count = document.getElementById('mob1-2-count');
const mob2_2_count = document.getElementById('mob2-2-count');
const mob3_2_count = document.getElementById('mob3-2-count');
const mob4_2_count = document.getElementById('mob4-2-count');
const mob5_2_count = document.getElementById('mob5-2-count');

const mob1_3_selected = document.getElementById('mob1-3-selected');
const mob2_3_selected = document.getElementById('mob2-3-selected');
const mob3_3_selected = document.getElementById('mob3-3-selected');
const mob4_3_selected = document.getElementById('mob4-3-selected');
const mob5_3_selected = document.getElementById('mob5-3-selected');
const sell1_3 = document.getElementById('sell1-3');
const sell2_3  = document.getElementById('sell2-3');
const sell3_3  = document.getElementById('sell3-3');
const sell4_3  = document.getElementById('sell4-3');
const sell5_3  = document.getElementById('sell5-3');
const mob1_3_count = document.getElementById('mob1-3-count');
const mob2_3_count = document.getElementById('mob2-3-count');
const mob3_3_count = document.getElementById('mob3-3-count');
const mob4_3_count = document.getElementById('mob4-3-count');
const mob5_3_count = document.getElementById('mob5-3-count');

var mob_count = [mob1_1_count, mob2_1_count, mob3_1_count, mob4_1_count, mob5_1_count, mob1_2_count, mob2_2_count, mob3_2_count, mob4_2_count, mob5_2_count, mob1_3_count, mob2_3_count, mob3_3_count, mob4_3_count, mob5_3_count];
var mob_info = [mob1_1_selected, mob2_1_selected, mob3_1_selected, mob4_1_selected, mob5_1_selected, mob1_2_selected, mob2_2_selected, mob3_2_selected, mob4_2_selected, mob5_2_selected, mob1_3_selected, mob2_3_selected, mob3_3_selected, mob4_3_selected, mob5_3_selected];

const map_button = document.querySelector('.map-button');
const popup_map_show = document.querySelector('.popup-map');
const popup_map = document.querySelector('.popup-map__field');
const popup_map_bg = document.querySelector('.popup-map__bg');

const mob1_info = document.querySelector('.mob1-info');
const mob2_info = document.querySelector('.mob2-info');
const mob3_info = document.querySelector('.mob3-info');
const mob4_info = document.querySelector('.mob4-info');
const mob5_info = document.querySelector('.mob5-info');

const money_wave1 = document.getElementById('money-wave1');
const money_wave2 = document.getElementById('money-wave2');
const money_wave3 = document.getElementById('money-wave3');

const unlock_monster3 = document.getElementById('unlock-monster3');
const unlock_monster4 = document.getElementById('unlock-monster4');
const unlock_monster5 = document.getElementById('unlock-monster5');

const score_send = document.getElementById('score');
const wave1_send = document.getElementById('wave1');
const wave2_send = document.getElementById('wave2');
const wave3_send = document.getElementById('wave3');
const mobs_unlock_send = document.getElementById('mobs_unlock');
const money_send = document.getElementById('money');
const currentLvl_send = document.getElementById('currentLvl');
const playerId_send = document.getElementById('player_id');

const start_lock = document.getElementById('start-lock');
const start_button = document.getElementById('start-unlock');
const start_info = document.querySelector('.popup-start');

const playerId_take = document.getElementById('game-info-playerId');
const money_take = document.getElementById('game-info-money');
const score_take = document.getElementById('game-info-score');
const lvl_take = document.getElementById('game-info-currLvl');
const mobsUnlock_take = document.getElementById('game-info-mobsUnlock');

const loading_text = document.querySelector('.loading-text');
const loading_score1 = document.getElementById('load-score1');
const loading_score2 = document.getElementById('load-score2');
const loading_score3 = document.getElementById('load-score3');
const load = document.querySelector('.load');
const loading_bg = document.querySelector('.loading-bg');
const loading_image = document.querySelector('.loading-image');

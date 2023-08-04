<?php
/**
 * @var App\Model\Game $game
 */
?>

<!DOCTYPE html>
<html lang="ru">

<head>
    <title><?= htmlspecialchars($game->getNickName()) ?>'s Game</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="../static/css/defense.css">
    <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
</head>

<body>
    <span id="nick-name" class="hidden"><?= htmlspecialchars($game->getNickName()) ?></span>
    <span id="game-id" class="hidden"><?= $gameId ?></span>
    <div class="decoration">
        <div class="decoration__back"></div>
        <div class="decoration__front"></div>
    </div>
    <div class="game">
        <div class="game__field field">
            <canvas id='canvas'></canvas>
            <div class="count-coin">
                <span class="count-coin__value">0</span>
                <img src="../static/images/coin.png" alt="coin" class="count-coin__img">
            </div>
            <div class="count-score">
                <span class="count-score__value">0</span>
                <img src="../static/images/score.png" alt="score" class="count-score__img">
            </div>
            <div class = "wave-info">
                <div class = "wave-info__block" id = 'info-block1'>
                    <img src = "../static/images/monster1_info_wave.png" />
                    <span class = "wave-info__text">x</span>
                    <span class = "wave-info__text" id = 'wave-mob1-count'>0</span>
                </div>
                <div class = "wave-info__block" id = 'info-block2'>
                    <img src = "../static/images/monster2_info_wave.png" />
                    <span class = "wave-info__text">x</span>
                    <span class = "wave-info__text" id = 'wave-mob2-count'>0</span>
                </div>
                <div class = "wave-info__block" id = 'info-block3'>
                    <img src = "../static/images/monster3_info_wave.png" />
                    <span class = "wave-info__text">x</span>
                    <span class = "wave-info__text" id = 'wave-mob3-count'>0</span>
                </div>
                <div class = "wave-info__block" id = 'info-block4'>
                    <img src = "../static/images/monster4_info_wave.png" />
                    <span class = "wave-info__text">x</span>
                    <span class = "wave-info__text" id = 'wave-mob4-count'>0</span>
                </div>
                <div class = "wave-info__block" id = 'info-block5'>
                    <img src = "../static/images/monster5_info_wave.png" />
                    <span class = "wave-info__text">x</span>
                    <span class = "wave-info__text" id = 'wave-mob5-count'>0</span>
                </div>
            </div>
            <div class="tower-selection new-tower hidden">
                <div class="choise-towers">
                    <div class="archer selector">
                        <img src="../static/images/archer_tower.png" class="choise-tower" />
                        <img src="../static/images/archer_cost.png" class="cost-for-tower" />
                    </div>
                    <div class="electric selector">
                        <img src="../static/images/electric_tower.png" class="choise-tower" />
                        <img src="../static/images/electric_cost.png" class="cost-for-tower" />
                    </div>
                    <div class="mortir selector">
                        <img src="../static/images/mortir_tower.png" class="choise-tower" />                        
                        <img src="../static/images/mortir_cost.png" class="cost-for-tower" />
                    </div>
                </div>
            </div>
            <div class="tower-selection tower-abilities hidden">
                <div class="choice-abilitie">
                    <div class="upgrade-tower">
                        <img src="../static/images/upgrade_button.png" class="upgrade-tower__img" />
                        <div class="upgrade-tower-info">
                            <span class="upgrade-tower-info__cost">30</span>
                            <img src="../static/images/coin.png" class="upgrade-tower-info__coin-img" />
                        </div>
                    </div>
                    <div class="delete-tower">
                        <img src="../static/images/cancel_button.png"  class="delete-tower__img" />
                        <div class="delete-tower-info">
                            <span class="delete-tower-info__cost">+20</span>
                            <img src="../static/images/coin.png" class="delete-tower-info__coin-img" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="field__hp-bar hp-bar" id="hp-bar">
                <img src="../static/images/hp.png" alt="hp1" class="hp-bar__hp">
                <img src="../static/images/hp.png" alt="hp2" class="hp-bar__hp">
                <img src="../static/images/hp.png" alt="hp3" class="hp-bar__hp">
            </div>
        </div>
        <div class="game__bar bar">
            <div class="bar__bufs">
                <div class="fireball-buf buf-slot">
                    <img src="../static/images/fireball_buff.png" class="fireball-buf__icon" />
                    <img src="../static/images/cancel_button.png"  class="fireball-buf__cancel hidden" />
                    <span class="fireball-buf__reload"></span>
                </div>
                <div class="freeze-buf buf-slot">
                    <img src="../static/images/freeze_buff.png" class="freeze-buf__icon" />
                    <img src="../static/images/cancel_button.png"  class="freeze-buf__cancel hidden" />
                    <span class="freeze-buf__reload"></span>
                </div>
                <div class="extra-life-buf buf-slot">
                    <img src="../static/images/extra_life_buff.png" class="extra-life-buf__icon" />
                    <span class="extra-life-buf__reload"></span>
                </div>
                <div class="bar-game-info">
                    <div class="game-info-lvl game-info-slot">
                        <span class="game-info-lvl__title">LVL:</span>
                        <span id="current-lvl">1</span>
                        <span>/</span>
                        <span id="total-lvl"></span>
                    </div>
                    <div class="game-info-wave game-info-slot">
                        <span class="">WAVE:</span>
                        <span id="current-wave">1</span>
                        <span>/</span>
                        <span id="total-wave"></span>
                    </div>
                </div>
            </div>
            <div class="bar__menu">
                <div class="bar-start">
                    <span class="bar-start__start-btn" id="startwave">START</span>
                </div>
                <div class="bar__pause pause">
                    <div class="pause__btn pause" id="pausegame">
                        <span class="bar bar-1"></span>
                        <span class="bar bar-2"></span>
                    </div>
                </div>
                <div class="bar__out">
                    <div class="bar__icon" id="game-menu-btn">
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
        <img src='../static/images/loading-bg.png' class='loading-image' />
        <div class='loading-bg'></div>
        <div class="load">
            <span class='loading-text'>LOADING LEVELS</span>
            <div></div> 
            <div class="loading"></div>
        </div>
    </div>
    <div class="popupover__bg">
        <div class="popupover">
            <h1 class="over">GAME OVER</h1>
            <div class="score">
                <span class="score__title">Score:</span>
                <span class="score__value"></span>
            </div>
            <div class="overbuttons">
                <img class="restart" src="../static/images/restart.png" id="restartgame"/>
                <a href="../pages/menu.html" class="menua">
                    <img class="menu__img" src="../static/images/menu.png" id="back-to-menu" />
                </a>
                <img class="restart hidden" src="../static/images/cancel_button.png" id="cancel"/>
                <a href="../pages/menu.html" class="menua">
                    <img class="menu__img hidden" src="../static/images/confirm_button.png" id="back-to-menu-alt" />
                </a>
            </div>
        </div>
    </div>
    <div class="popupcomplete__bg">
        <div class="popupcomplete">
            <h1 class="complete">LEVEL COMPLETE</h1>
            <div class="next-lvl-container">
                <button class="next-lvl-btn" id="next-lvl-btn">Next level</button>
            </div>
        </div>
    </div>
    <script type="application/javascript" src="../static/js/prev_selection.js"></script>
    <script type="application/javascript" src="../static/js/monsters.js"></script>
    <script type="application/javascript" src="../static/js/towers.js"></script>
    <script type="application/javascript" src="../static/js/lvls.js"></script>
    <script type="application/javascript" src="../static/js/monster_movement.js"></script>
    <script type="application/javascript" src="../static/js/bonus_buttons_defense.js"></script>
    <script type="application/javascript" src="../static/js/bonus_action.js"></script>
    <script type="application/javascript" src="../static/js/tower_draw.js"></script>
    <script type="application/javascript" src="../static/js/tower_placement.js"></script>
    <script type="application/javascript" src="../static/js/tower_attack.js"></script>
    <script type="application/javascript" src="../static/js/defense_play.js"></script>
</body>

</html>
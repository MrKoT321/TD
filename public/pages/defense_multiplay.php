<?php
/**
 * @var App\Model\MultiplayGame $game
 */
?>

<!DOCTYPE html>
<html lang="ru">

<head>
    <title><?= htmlspecialchars($game->getNickName()) ?>'s Game</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="../static/css/defense.css">
    <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet">

</head>

<body>
    <span id="nick-name" class="hidden"><?= htmlspecialchars($game->getNickName()) ?></span>
    <span class="hidden" id="game-info-roomId"><? echo($roomId) ?></span>
    <span id="game-id" class="hidden"><?= $gameId ?></span>
    <div class="game">
        <div class="game__field field">
            <canvas id='canvas'></canvas>
            <div class="count-coin">
                <span class="count-coin__value"></span>
                <img src="../static/images/coin.png" alt="coin" class="count-coin__img">
            </div>
            <div class="count-score-multi">
                <span class="count-score__value-defense">0</span>
                <span>:</span>
                <span class="count-score__value-attack">0</span>
            </div>
            <div class="tower-selection new-tower hidden">
                <div class="choise-towers">
                    <div class="archer selector">
                        <img src="../static/images/archer_tower.png" class="choise-tower" />
                        <img src="../static/images/archer_cost.png" class="cost-for-tower" />
                    </div>
                    <div class="bash selector">
                        <img src="../static/images/bash_tower.png" class="choise-tower" />
                        <img src="../static/images/bash_cost.png" class="cost-for-tower" />
                    </div>
                    <div class="mortir selector">
                        <img src="../static/images/mortir_tower.png" class="choise-tower" />                        
                        <img src="../static/images/mortir_cost.png" class="cost-for-tower" />
                    </div>
                </div>
            </div>
            <div class="tower-selection tower-abilities hidden">
                <div class="choice-abilitie">
                    <img src="../static/images/cancel_button.png"  class="delete-tower" />
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
                <div class="buf-slot"></div>
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
                    <div class="pause__btn pause" id="pausegame"></div>
                </div>
                <div class="bar__out">
                    <div class="bar__icon">
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="popupover__bg">
        <div class="popupover">
            <h1 class="over"></h1>
            <div class="score">
                <span class="score__text" id="score-value-defense"></span>
                <span class="score__text">:</span>
                <span class="score__text" id="score-value-attack"></span>
            </div>
            <div class="overbuttons">
                <a href="../pages/menu.html" class="menua">
                    <img class="menu__img" src="../static/images/menu.png" id="back-to-menu" />
                </a>
            </div>
        </div>
    </div>
    </div>
    <div class="waiting-screen">
        <div class="waiting-opponent-screen">
            <img src="../static/images/waiting_opponent_screen.png" alt="">
        </div>
    </div>
    <img src='../static/images/loading-bg.png' class='loading-image' />
    <div class='loading-bg'></div>
    <div class="load">
        <span class='loading-text'>LOADING LEVEL</span>
        <div class="load__score">
            <span class="loading-score" id = "load-score1">0</span>
            <span class="loading-score" id = "load-score2">:</span>
            <span class="loading-score" id = "load-score3">0</span>
        </div>    
        <div class="loading"></div>
    </div>
    <script type="application/javascript" src="../static/js/monsters.js"></script>
    <script type="application/javascript" src="../static/js/towers.js"></script>
    <script type="application/javascript" src="../static/js/lvls.js"></script>
    <script type="application/javascript" src="../static/js/monster_movement.js"></script>
    <script type="application/javascript" src="../static/js/bonus_action.js"></script>
    <script type="application/javascript" src="../static/js/bonus_buttons_defense.js"></script>
    <script type="application/javascript" src="../static/js/tower_draw.js"></script>
    <script type="application/javascript" src="../static/js/tower_placement.js"></script>
    <script type="application/javascript" src="../static/js/tower_attack.js"></script>
    <script type="application/javascript" src="../static/js/defense_multiplay.js"></script>
</body>

</html>
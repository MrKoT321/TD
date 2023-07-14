<?php
/**
 * @var App\Model\Record $user
 */
?>

<!DOCTYPE html>
<html lang="ru">

<head>
    <title><?= htmlspecialchars($score->getNickName()) ?>'s Game</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="../static/css/defense.css">
    <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet">

</head>

<body>
    <div class="game">
        <div class="game__field field">
            <canvas id='canvas'></canvas>
            <div class="count-coin">
                <span class="count-coin__value">100</span>
                <img src="../static/images/coin.png" alt="coin" class="count-coin__img">
            </div>
            <div class="count-score">
                <span class="count-score__value">0</span>
                <img src="../static/images/score.png" alt="score" class="count-score__img">
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
                <div class="buf-slot"></div>
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
            </div>
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
    <script type="application/javascript" src="../static/js/monsters.js"></script>
    <script type="application/javascript" src="../static/js/lvls.js"></script>
    <script type="application/javascript" src="../static/js/towers.js"></script>
    <script type="application/javascript" src="../static/js/monster_movement.js"></script>
    <script type="application/javascript" src="../static/js/bonus_action.js"></script>
    <script type="application/javascript" src="../static/js/tower_placement.js"></script>
    <script type="application/javascript" src="../static/js/defense.js"></script>
</body>

</html>
<?php
/**
 * @var App\Model\AttackInfo $gameInfo
 */
?>

<!DOCTYPE html>
<html lang="ru">

<head>
    <title><?= htmlspecialchars($gameInfo->getNickName()) ?>'s game</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="../static/css/defense.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet">
</head>

<body>
    <div class="game">
        <div class="hidden game-info">
            <span class="game-info__gameId" id="game-info-gameid"><?= $gameInfo->getGameId() ?></span>
            <span class="game-info__gameId" id="game-info-wave-1"><?= $gameInfo->getWave1() ?></span>
            <span class="game-info__gameId" id="game-info-wave-2"><?= $gameInfo->getWave2() ?></span>
            <span class="game-info__gameId" id="game-info-wave-3"><?= $gameInfo->getWave3() ?></span>
            <span class="game-info__gameId" id="game-info-money"><?= $gameInfo->getMoney() ?></span>
            <span class="game-info__gameId" id="game-info-score"><?= $gameInfo->getScore() ?></span>
            <span class="game-info__gameId" id="game-info-currLvl"><?= $gameInfo->getCurrentLvl() ?></span>
            <span class="game-info__gameId" id="game-info-mobsUnlock"><?= $gameInfo->getMobsUnlock() ?></span>
        </div>
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
                <div class="healing-buf buf-slot">
                    <img src="../static/images/healing_buff.png" class="healing-buf__icon" />
                    <img src="../static/images/cancel_button.png"  class="healing-buf__cancel hidden" />
                    <span class="healing-buf__reload"></span>
                </div>
                <div class="invisible-buf buf-slot">
                    <img src="../static/images/invisible_buff.png" class="invisible-buf__icon" />
                    <img src="../static/images/cancel_button.png"  class="invisible-buf__cancel hidden" />
                    <span class="invisible-buf__reload"></span>
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
            <h1 class="over">GAME OVER</h1>
            <div class="score">
                <span class="score__title">Score:</span>
                <span class="score__value"></span>
            </div>
            <div class="overbuttons">
            <form method="POST" enctype="multipart/form-data" id="form-restart">
                <input type="text" name="gameId" class="hidden" />
                <input type="text" name="money" class="hidden" />
                <input type="text" name="score" class="hidden" />
                <input type="text" name="currentLvl" class="hidden" />
                <input type="text" name="mobsUnlock" class="hidden" />
                <label>
                    <img class="restart" src="../static/images/restart.png" id="restartgame"/>
                    <input class="restart hidden" type="submit" id="restartgame" value="" />
                </label>
            </form>
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
            <form method="POST" enctype="multipart/form-data" id="form">
                <input type="text" name="gameId" class="hidden" />
                <input type="text" name="money" class="hidden" />
                <input type="text" name="score" class="hidden" />
                <input type="text" name="currentLvl" class="hidden" />
                <input type="text" name="mobsUnlock" class="hidden" />
                <input class="next-lvl-btn" id="next-lvl-btn" type="submit" value="Next level" />

                <div class="next-lvl-container">
                    <!-- <input class="next-lvl-btn" id="next-lvl-btn" type="submit" value="Next level" /></div> -->
                </div>
            </form>
        </div>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script type="application/javascript" src="../static/js/monsters.js"></script>
    <script type="application/javascript" src="../static/js/towers.js"></script>
    <script type="application/javascript" src="../static/js/lvls.js"></script>
    <script type="application/javascript" src="../static/js/monster_movement.js"></script>
    <script type="application/javascript" src="../static/js/bonus_buttons_attack.js"></script>
    <script type="application/javascript" src="../static/js/bonus_action.js"></script>
    <script type="application/javascript" src="../static/js/tower_attack_config.js"></script>
    <script type="application/javascript" src="../static/js/tower_draw.js"></script>
    <script type="application/javascript" src="../static/js/tower_attack.js"></script>
    <script type="application/javascript" src="../static/js/attack_play.js"></script>
</body>

</html>
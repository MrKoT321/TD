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
    <link rel="stylesheet" href="../static/css/attack_selector.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet">
</head>

<body>
<div class="game">
    <div class="hidden game-info">
        <span class="game-info__gameId" id="game-info-gameid"><?= $gameInfo->getGameId() ?></span>
        <span class="game-info__gameId" id="game-info-money"><?= $gameInfo->getMoney() ?></span>
        <span class="game-info__gameId" id="game-info-score"><?= $gameInfo->getScore() ?></span>
        <span class="game-info__gameId" id="game-info-currLvl"><?= $gameInfo->getCurrentLvl() ?></span>
        <span class="game-info__gameId" id="game-info-mobsUnlock"><?= $gameInfo->getMobsUnlock() ?></span>
    </div>
    <div class="hidden game-info">  
        <span class="game-info__gameId"><?= $gameInfo->getGameId() ?></span>
        <span class="game-info__gameId" id="game-info-money"><?= $gameInfo->getMoney() ?></span>
        <span class="game-info__gameId" id="game-info-score"><?= $gameInfo->getScore() ?></span>
        <span class="game-info__gameId" id="game-info-currLvl"><?= $gameInfo->getCurrentLvl() ?></span>
        <span class="game-info__gameId" id="game-info-mobsUnlock"><?= $gameInfo->getMobsUnlock() ?></span>
    </div>
        <div class="game__field field">
            <div class="monsters-selector">
                <div>
                    <img src="../static/images/monster1_selector.png" id="mob1" class="monster-selector"/>
                    <strong class="mob1-info hidden">
                        <span class="info-cost">30</span>
                        <span class="info-hp">100</span>
                    </strong>
                </div>
                <div>
                    <img src="../static/images/monster2_selector.png" id="mob2" class="monster-selector"/>
                    <strong class="mob2-info hidden">
                        <span class="info-cost">40</span>
                        <span class="info-hp">75</span>
                    </strong>
                </div>
                <div>
                    <img src="../static/images/monster3_selector.png" id="mob3" class="monster-selector hidden"/>
                    <img src="../static/images/lock_selector3.png" class="monster-selector-lock" id="unlock-monster3"/>
                    <strong class="mob3-info hidden"></strong>
                </div>
                <div>
                    <img src="../static/images/monster4_selector.png" id="mob4" class="monster-selector hidden"/>
                    <img src="../static/images/lock_selector4.png" class="monster-selector-lock" id="unlock-monster4"/>
                    <strong class="mob4-info hidden"></strong>
                </div>
                <div>
                    <img src="../static/images/monster5_selector.png" id="mob5" class="monster-selector hidden"/>
                    <img src="../static/images/lock_selector5.png" class="monster-selector-lock" id="unlock-monster5"/>
                    <strong class="mob5-info hidden"></strong>
                </div>
            </div>
            <div class="money-info-wave1">
                <span class="money-wave-count" id="money-wave1"></span>
                <span class="money-text">coins left</span>
            </div>
            <div class="monsters-selected wave1">
                <div class="mob-info hidden" id="mob1-1-selected">
                    <span id="mob1-1-count" class="mob-count"></span>
                    <img src="../static/images/sell_button.png" id="sell1-1" class="sell"/>
                </div>
                <div class="mob-info hidden" id="mob2-1-selected">                    
                    <span id="mob2-1-count" class="mob-count"></span>
                    <img src="../static/images/sell_button.png" id="sell2-1" class="sell"/>
                </div>
                <div class="mob-info hidden" id="mob3-1-selected">                    
                    <span id="mob3-1-count"  class="mob-count"></span>
                    <img src="../static/images/sell_button.png" id="sell3-1" class="sell"/>
                </div>
                <div class="mob-info hidden" id="mob4-1-selected">                    
                    <span id="mob4-1-count"  class="mob-count"></span>
                    <img src="../static/images/sell_button.png" id="sell4-1" class="sell"/>
                </div>
                <div class="mob-info hidden" id="mob5-1-selected">                    
                    <span id="mob5-1-count"  class="mob-count"></span>
                    <img src="../static/images/sell_button.png" id="sell5-1" class="sell"/>
                </div>
            </div>
            <div class="money-info-wave2">
                <span class="money-wave-count" id="money-wave2"></span>
                <span class="money-text">coins left</span>
            </div>
            <div class="monsters-selected wave2">
                <div class="mob-info hidden" id="mob1-2-selected">                    
                    <span id="mob1-2-count" class="mob-count"></span>
                    <img src="../static/images/sell_button.png" id="sell1-2" class="sell"/>
                </div>
                <div class="mob-info hidden" id="mob2-2-selected">                    
                    <span id="mob2-2-count" class="mob-count"></span>
                    <img src="../static/images/sell_button.png" id="sell2-2" class="sell"/>
                </div>
                <div class="mob-info hidden" id="mob3-2-selected">                    
                    <span id="mob3-2-count"  class="mob-count"></span>
                    <img src="../static/images/sell_button.png" id="sell3-2" class="sell"/>
                </div>
                <div class="mob-info hidden" id="mob4-2-selected">                    
                    <span id="mob4-2-count"  class="mob-count"></span>
                    <img src="../static/images/sell_button.png" id="sell4-2" class="sell"/>
                </div>
                <div class="mob-info hidden" id="mob5-2-selected">                    
                    <span id="mob5-2-count"  class="mob-count"></span>
                    <img src="../static/images/sell_button.png" id="sell5-2" class="sell"/>
                </div>
            </div>
            <div class="money-info-wave3">
                <span class="money-wave-count" id="money-wave3"></span>
                <span class="money-text">coins left</span>
            </div>
            <div class="monsters-selected wave3">
                <div class="mob-info hidden"id="mob1-3-selected">                    
                    <span id="mob1-3-count" class="mob-count"></span>
                    <img src="../static/images/sell_button.png" id="sell1-3" class="sell"/>
                </div>
                <div class="mob-info hidden" id="mob2-3-selected">
                    <span id="mob2-3-count" class="mob-count"></span>
                    <img src="../static/images/sell_button.png" id="sell2-3" class="sell"/>
                </div>
                <div class="mob-info hidden" id="mob3-3-selected">                    
                    <span id="mob3-3-count"  class="mob-count"></span>
                    <img src="../static/images/sell_button.png" id="sell3-3" class="sell"/>
                </div>
                <div class="mob-info hidden" id="mob4-3-selected">                    
                    <span id="mob4-3-count"  class="mob-count"></span>
                    <img src="../static/images/sell_button.png" id="sell4-3" class="sell"/>
                </div>
                <div class="mob-info hidden" id="mob5-3-selected">
                    <span id="mob5-3-count"  class="mob-count"></span>
                    <img src="../static/images/sell_button.png" id="sell5-3" class="sell"/>
                </div>
            </div>
            <div class="wave-selector">
                <img src="../static/images/wave-.png" class="wave-selector__wave-minus hidden"/>
                <img src="../static/images/1.png" class="wave-selector__1"/>
                <img src="../static/images/2.png" class="wave-selector__2 hidden"/>
                <img src="../static/images/3.png" class="wave-selector__3 hidden"/>
                <img src="../static/images/wave+.png" class="wave-selector__wave-plus"/>
            </div>
            <img src="../static/images/start_lock.png" class="start-button" id="start-lock" />
            <span class="popup-start hidden">Add at least one monster per wave</span>
            <form method="POST" enctype="multipart/form-data" id="form" class="form">
                <input type="submit" class="start-button" id="start-unlock" value="" />
                <input type="text" class="hidden" name="gameId" id="gameId"/>
                <input type="text" class="hidden" name="money" id="money"/>
                <input type="text" class="hidden" name="score" id="score"/>
                <input type="text" class="hidden" name="currentLvl" id="currentLvl"/>
                <input type="text" class="hidden" name="wave1" id="wave1"/>
                <input type="text" class="hidden" name="wave2" id="wave2"/>
                <input type="text" class="hidden" name="wave3" id="wave3"/>
                <input type="text" class="hidden" name="mobsUnlock" id="mobs_unlock"/>
            </form>
            <img src="../static/images/map-button.png" class="map-button"/>
            <span class="count-coin"></span>
            
            <span class="mob2-info hidden"></span>
            <span class="mob3-info hidden"></span>
            <span class="mob4-info hidden"></span>
            <span class="mob5-info hidden"></span>
            <div class="popup-map hidden">
                <span class="popup-map__bg"></span>
                <span class="popup-map__field"></span>
            </div>
            <canvas id='canvas'></canvas>
        </div>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script type="application/javascript" src="../static/js/monsters.js"></script>
    <script type="application/javascript" src="../static/js/attack_selector_html_to_js_const.js"></script>
    <script type="application/javascript" src="../static/js/selector_params.js"></script>
    <script type="application/javascript" src="../static/js/attack_selector_events.js"></script>
    <script type="application/javascript" src="../static/js/attack_selector.js"></script>
</body>

</html>
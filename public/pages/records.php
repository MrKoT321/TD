<?php
/**
 * @var App\Model\Record $record
 */
?>

<!DOCTYPE html>
<html lang="ru">
    <head>
        <title>Records</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="../static/css/record.css">
    </head>
    <body>
        <div class="buttons">
            <a href="../" class="back-to-menu">
                <img src="../static/images/back_arrow.png" class="back-to-menu__img" />
            </a>
        </div>
        <div class="records">
            <div class="records-title">Top scores</div>
            <? foreach($records as $score):?>
                <div class="record">
                    <div class="record-nickname"><?= htmlspecialchars($score->getNickName()) ?></div>
                    <div class="record-choisenclass"><?= $score->getChoisenClass() ?></div>
                    <div class="record-score"><?= $score->getScore() ?></div>
                </div>
            <? endforeach; ?>
        </div>
    </body>
</html>
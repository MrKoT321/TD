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
        <div class="records">
            <span class="records-title">Top scores</span>
            <? foreach($records as $score):?>
                <span><?= htmlspecialchars($score->getNickName()) ?></span>
                <span><?= $score->getChoisenClass() ?></span>
                <span><?= $score->getScore() ?></span>
                <span></span>
            <? endforeach; ?>
        </div>
    </body>
</html>
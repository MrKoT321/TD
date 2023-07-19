<?php

declare(strict_types=1);

namespace App\Controller;

use App\Database\ConnectionProvider;
use App\Database\GameTable;
use App\Model\Game;
use App\Model\AttackInfo;

class ServerController
{
    private const HTTP_STATUS_303_SEE_OTHER = 303;

    private GameTable $gameTable;

    public function __construct()
    {
        $connection = ConnectionProvider::connectDatabase();
        $this->gameTable = new GameTable($connection);
    }

    public function addRecord(): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->writeRedirectSeeOther('/');
            return;
        }
        if ($_SERVER["CONTENT_TYPE"] == 'application/json') {
            $this->writeRedirectSeeOther('/');
            return;
        }

        $postData = file_get_contents('php://input');
        $data = json_decode($postData, true);

        $record = new Game(
            null,
            $data['nickName'],
            $data['choisenClass'],
            (int) $data['score']
        );
        $this->gameTable->add($record);
        return;
    }

    public function showRecords(): void
    {
        $records = $this->gameTable->show();
        if (!$records) {
            $this->writeRedirectSeeOther('/');
            exit();
        }

        require __DIR__ . '/../../public/pages/records.php';
    }

    public function createGame(): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST')
        {
            $this->writeRedirectSeeOther('/');
            return;
        }

        $postData = file_get_contents('php://input');
        $data = json_decode($postData, true);

        $game = new Game(
            null, 
            $data['nick_name'], 
            $data['choisen_class'], 
            null
        );
        $gameId = $this->gameTable->create($game);
        $this->writeRedirectSeeOther("/single_game_defense.php?game_id=$gameId");
    }

    public function singleGameDefense(array $queryParams): void
    {
        $gameId = (int)$queryParams['game_id'];
        if (!$gameId) {
            $this->writeRedirectSeeOther('/');
            exit();
        }
        $game = $this->gameTable->find($gameId);
        if (!$game)
        {
            $this->writeRedirectSeeOther('/');  
            exit();
        }
        require __DIR__ . '/../../public/pages/defense.php';
    }

    public function singleGameAttack(array $queryParams): void
    {
        $userNickName = $queryParams['nick_name'];
        if (!$userNickName) {
            $this->writeRedirectSeeOther('/');
            exit();
        }

        $score = new Game(
            null,
            $userNickName,
            'defense',
            null
        );
        require __DIR__ . '/../../public/pages/attack_selector.php';
    }

    //---------------------------------------------------   
    public function sendWaves(): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->writeRedirectSeeOther('/');
            return;
        }
        if ($_SERVER["CONTENT_TYPE"] == 'application/json') {
            $this->writeRedirectSeeOther('/');
            return;
        }

        $postData = file_get_contents('php://input');
        $data = json_decode($postData, true);

        if (!empty($data['nickname'])) {
            $nickname = $data['nickname'];
        } else {
            $nickname = '';
        }
        if (!empty($data['money'])) {
            $money = $data['money'];
        } else {
            $money = '';
        }
        if (!empty($data['score'])) {
            $score = $data['score'];
        } else {
            $score = '';
        }
        if (!empty($data['waves'])) {
            $waves = $data['waves'];
        } else {
            $waves = [];
        }

        $infoFromLvl = new AttackInfo(
            $nickname,
            $money,
            $score,
            null,
            $waves
        );

        require __DIR__ . '/../../public/pages/attack.php';
    }

    public function makeWaves(): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->writeRedirectSeeOther('/');
            return;
        }
        if ($_SERVER["CONTENT_TYPE"] == 'application/json') {
            $this->writeRedirectSeeOther('/');
            return;
        }

        $postData = file_get_contents('php://input');
        $data = json_decode($postData, true);

        if (!empty($data['nickname'])) {
            $nickname = $data['nickname'];
        } else {
            $nickname = '';
        }
        if (!empty($data['money'])) {
            $money = $data['money'];
        } else {
            $money = '';
        }
        if (!empty($data['score'])) {
            $score = $data['score'];
        } else {
            $score = '';
        }
        if (!empty($data['currLvl'])) {
            $currLvl = $data['currLvl'];
        } else {
            $currLvl = '';
        }

        $infoFromLvl = new AttackInfo(
            $nickname,
            $money,
            $score,
            $currLvl,
            null
        );

        require __DIR__ . '/../../public/pages/attack_selector.php';
    }

    public function index(): void
    {
        require __DIR__ . '/../../public/pages/menu.html';
    }

    private function writeRedirectSeeOther(string $url): void
    {
        header('Location: ' . $url, true, self::HTTP_STATUS_303_SEE_OTHER);
    }
}
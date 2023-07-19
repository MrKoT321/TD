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
            (int) $data['gameId'],
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

    public function createSingleGame(array $requestData): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->writeRedirectSeeOther('/');
            return;
        }

        $game = new Game(
            null,
            $requestData['username'],
            $requestData['choisenClass'],
            null
        );
        $gameId = $this->gameTable->create($game);
        if ($requestData['choisenClass'] === 'defense') {
            $this->writeRedirectSeeOther("/single_game_defense.php?game_id=$gameId");
            exit();
        }
        $this->writeRedirectSeeOther("/single_game_attack.php?game_id=$gameId");
    }

    public function singleGameDefense(array $queryParams): void
    {
        $gameId = (int) $queryParams['game_id'];
        if (!$gameId) {
            $this->writeRedirectSeeOther('/');
            exit();
        }
        $game = $this->gameTable->find($gameId);
        if (!$game) {
            $this->writeRedirectSeeOther('/');
            exit();
        }
        require __DIR__ . '/../../public/pages/defense.php';
    }

    public function singleGameAttack(array $queryParams): void
    {
        $gameId = (int) $queryParams['game_id'];
        if (!$gameId) {
            $this->writeRedirectSeeOther('/');
            exit();
        }
        $game = $this->gameTable->find($gameId);
        if (!$game) {
            $this->writeRedirectSeeOther('/');
            exit();
        }
        require __DIR__ . '/../../public/pages/attack_selector.php';
    }

    //--/\------------------------------------------------- 
    //  ||   поменять gameTable на requestTable
    public function sendWaves(array $requestData): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->writeRedirectSeeOther('/');
            return;
        }

        $info = new AttackInfo(
            null,
            $requestData['gameId'],
            $requestData['money'],
            $requestData['score'],
            $requestData['currLvl'],
            $requestData['wave1'],
            $requestData['wave2'],
            $requestData['wave3'],
            $requestData['mobsUnlock']
        );
        $gameId = $requestData['gameId'];
        $this->writeRedirectSeeOther("/attack.php?game_id=$gameId");
    }

    public function makeWaves(array $requestData): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->writeRedirectSeeOther('/');
            return;
        }

        $info = new AttackInfo(
            null,
            $requestData['gameId'],
            $requestData['money'],
            $requestData['score'],
            $requestData['currLvl'],
            null,
            null,
            null,
            $requestData['mobsUnlock']
        );
        $gameId = $requestData['gameId'];
        $this->writeRedirectSeeOther("/attack_selector.php?game_id=$gameId");
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
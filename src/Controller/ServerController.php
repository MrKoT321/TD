<?php

declare(strict_types=1);

namespace App\Controller;

use App\Database\ConnectionProvider;
use App\Database\GameTable;
use App\Database\RequestTable;
use App\Model\Game;
use App\Model\AttackInfo;

class ServerController
{
    private const HTTP_STATUS_303_SEE_OTHER = 303;

    private GameTable $gameTable;
    private RequestTable $requestTable;

    public function __construct()
    {
        $connection = ConnectionProvider::connectDatabase();
        $this->gameTable = new GameTable($connection);
        $this->requestTable = new RequestTable($connection);
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

        $game = new Game (
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
        if (empty($queryParams['game_id'])) {
            if (empty($queryParams['request_id'])) {
                $this->writeRedirectSeeOther('/');
                exit();
            } else {
                $requestId = (int) $queryParams['request_id'];
                $requestStatus = $this->requestTable->getStatus($requestId);
                // if (!$requestStatus) {
                //     $this->writeRedirectSeeOther('/');
                //     exit();
                // }
                $gameInfo = $this->requestTable->find($requestId);
                if ($requestStatus == 'send') {
                    require __DIR__ . '/../../public/pages/attack.php';
                    exit();
                } else {
                    require __DIR__ . '/../../public/pages/attack_selector.php';
                }
            } 
        } else {
            $gameId = (int) $queryParams['game_id'];
            $userName = $this->requestTable->getNickNameByGameId($gameId);
            if (is_null($userName)) {
                $this->writeRedirectSeeOther('/');
                return;
            }
            $startLvl = '0';
            $gameInfo = new AttackInfo (
                null,
                'start',
                $gameId,
                $userName,
                null,
                null,
                $startLvl,
                null,
                null,
                null,
                null
            );
    
            require __DIR__ . '/../../public/pages/attack_selector.php';
        }
        
    }

    //--------------------------------------------------- 

    public function sendWaves(array $requestData): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->writeRedirectSeeOther('/');
            return;
        }

        $userName = $this->requestTable->getNickNameByGameId((int) $requestData['gameId']);
        if (is_null($userName)) {
            $this->writeRedirectSeeOther('/');
            return;
        }
        $gameInfo = new AttackInfo(
            null,
            'send',
            (int) $requestData['gameId'],
            $userName,
            (int) $requestData['money'],
            (int) $requestData['score'],
            $requestData['currentLvl'],
            $requestData['wave1'],
            $requestData['wave2'],
            $requestData['wave3'],
            $requestData['mobsUnlock']
        );
        $requestId = $this->requestTable->publish($gameInfo);
        $this->writeRedirectSeeOther("/single_game_attack.php?request_id=$requestId");
    }

    public function makeWaves(array $requestData): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->writeRedirectSeeOther('/');
            return;
        }

        $userName = $this->requestTable->getNickNameByGameId((int) $requestData['gameId']);
        if (is_null($userName)) {
            $this->writeRedirectSeeOther('/');
            return;
        }
        $gameInfo = new AttackInfo(
            null,
            'make',
            (int) $requestData['gameId'],
            $userName,
            (int) $requestData['money'],
            (int) $requestData['score'],
            $requestData['currentLvl'],
            null,
            null,
            null,
            $requestData['mobsUnlock']
        );
        $requestId = $this->requestTable->publish($gameInfo);
        $this->writeRedirectSeeOther("/single_game_attack.php?request_id=$requestId");
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
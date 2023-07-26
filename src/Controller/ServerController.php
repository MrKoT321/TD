<?php

declare(strict_types=1);

namespace App\Controller;

use App\Database\ConnectionProvider;
use App\Database\GameTable;
use App\Database\RequestTable;
use App\Model\Game;
use App\Model\AttackInfo;
use App\Model\MultiplayGame;

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
                if (!$requestStatus) {
                    $this->writeRedirectSeeOther('/');
                    exit();
                }
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
            $userName = $this->gameTable->getNickNameByGameId($gameId);
            if (is_null($userName)) {
                $this->writeRedirectSeeOther('/');
                return;
            }
            $startLvl = '0';
            $gameInfo = new AttackInfo (
                null,
                'start',
                $gameId,
                null,
                $userName,
                null,
                null,
                $startLvl,
                null,
                null,
                null,
                null
            );
            // $data = '{"wave_data": {"wave1": {"monster1": {"count": 2},"monster2": {"count": 50}},"wave2": {"monster3": {"count": 4},"monster1": {"count": 25}}}}';
            // $parsedJson = json_decode($data, true);
    
            require __DIR__ . '/../../public/pages/attack_selector.php';
        }        
    }

    public function createMultiplayGame(array $requestData) : void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->writeRedirectSeeOther('/');
            return;
        }
        $roomId = (int) $requestData['roomId'];
        $game = new MultiplayGame (
            null,
            $requestData['username'],
            $requestData['choisen_class'],
            'game_start',
            $roomId
        );
        $playerId = $this->gameTable->createMultiplayGame($game);
        if ($requestData['choisen_class'] === 'defense') {
            $this->writeRedirectSeeOther("/multiplay_game_defense.php?player_id=$playerId");
            exit();
        }
        $this->writeRedirectSeeOther("/multiplay_game_attack.php?player_id=$playerId");
    }

    public function multiplayGameDefense(array $queryParams): void
    {
        $playerId = (int) $queryParams['player_id'];
        if (!$playerId) {
            $this->writeRedirectSeeOther('/');
            exit();
        }
        $roomId = $this->gameTable->getRoomIdByPlayerId($playerId);
        $game = $this->gameTable->findPlayer($playerId);
        if (!$game) {
            $this->writeRedirectSeeOther('/');
            exit();
        }
        require __DIR__ . '/../../public/pages/defense_multiplay.php';
    }


    public function multiplayGameAttack(array $queryParams): void
    {
        if (!empty($queryParams['player_id'])) {
            $playerId = (int) $queryParams['player_id'];
            if (!empty($queryParams['request_id'])) {
                $requestId = (int) $queryParams['request_id'];
                $roomId = $this->gameTable->getRoomIdByRequestId($requestId);
                $requestStatus = $this->requestTable->getStatus($requestId);
                if (!$requestStatus) {
                    $this->writeRedirectSeeOther('/');
                    exit();
                }
                $gameInfo = $this->requestTable->find($requestId);
                if (is_null($gameInfo)) {
                    $this->writeRedirectSeeOther('/');
                    return;
                }
                if ($requestStatus == 'send') {
                    require __DIR__ . '/../../public/pages/attack_multiplay.php';
                    exit();
                } else {
                    require __DIR__ . '/../../public/pages/attack_selector_multiplay.php';
                }
            } else {
                $userName = $this->gameTable->getNickNameByPlayerId($playerId);
                $roomId = $this->gameTable->getRoomIdByPlayerId($playerId);
                if (is_null($userName)) {
                    $this->writeRedirectSeeOther('/');
                    return;
                }
                $startLvl = '0';
                $gameInfo = new AttackInfo (
                    null,
                    'start',
                    null,
                    $playerId,
                    $userName,
                    null,
                    null,
                    $startLvl,
                    null,
                    null,
                    null,
                    null
                );
                require __DIR__ . '/../../public/pages/attack_selector_multiplay.php';
            }
        } else {
            $this->writeRedirectSeeOther('/');
            return;
        }        
    }

    //---------------------------------------------------

    public function sendWaves(array $requestData): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->writeRedirectSeeOther('/');
            return;
        }

        $userName = $this->gameTable->getNickNameByGameId((int) $requestData['gameId']);
        if (is_null($userName)) {
            $this->writeRedirectSeeOther('/');
            return;
        }
        $gameInfo = new AttackInfo(
            null,
            'send',
            (int) $requestData['gameId'],
            null,
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

    public function sendWavesMultiplay(array $requestData): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->writeRedirectSeeOther('/');
            return;
        }

        $playerId = (int) $requestData['playerId'];
        $userName = $this->gameTable->getNickNameByPlayerId($playerId);
        if (is_null($userName)) {
            $this->writeRedirectSeeOther('/');
            return;
        }
        
        $gameInfo = new AttackInfo(
            null,
            'send',
            null,
            $playerId,
            $userName,
            (int) $requestData['money'],
            null,
            $requestData['currentLvl'],
            $requestData['wave1'],
            $requestData['wave2'],
            $requestData['wave3'],
            $requestData['mobsUnlock']
        );
        $requestId = $this->requestTable->publish($gameInfo);
        $this->writeRedirectSeeOther("/multiplay_game_attack.php?request_id=$requestId&player_id=$playerId");
    }

    public function makeWaves(array $requestData): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->writeRedirectSeeOther('/');
            return;
        }

        $userName = $this->gameTable->getNickNameByGameId((int) $requestData['gameId']);
        if (is_null($userName)) {
            $this->writeRedirectSeeOther('/');
            return;
        }
        $gameInfo = new AttackInfo(
            null,
            'make',
            (int) $requestData['gameId'],
            null,
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

    public function makeWavesMultiplay(array $requestData): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->writeRedirectSeeOther('/');
            return;
        }

        $playerId = (int) $requestData['playerId'];
        $userName = $this->gameTable->getNickNameByPlayerId($playerId);
        if (is_null($userName)) {
            $this->writeRedirectSeeOther('/');
            return;
        }
        
        $gameInfo = new AttackInfo(
            null,
            'make',
            null,
            $playerId,
            $userName,
            (int) $requestData['money'],
            null,
            $requestData['currentLvl'],
            $requestData['wave1'],
            $requestData['wave2'],
            $requestData['wave3'],
            $requestData['mobsUnlock']
        );
        $requestId = $this->requestTable->publish($gameInfo);
        $this->writeRedirectSeeOther("/multiplay_game_attack.php?request_id=$requestId&player_id=$playerId");
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
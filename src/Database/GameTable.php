<?php
declare(strict_types=1);

namespace App\Database;

use App\Model\Game;
use App\Model\MultiplayGame;
use FFI\Exception;
use PDOException;

class GameTable
{
    private \PDO $connection;

    public function __construct(\PDO $connection)
    {
        $this->connection = $connection;
    }

    public function create(Game $game): int
    {
        $query = "INSERT INTO `games` (`nick_name`, `choisen_class`) VALUES (:nick_name, :choisen_class)";
        $statement = $this->connection->prepare($query);
        try {
            $statement->execute([
                ':nick_name' => $game->getNickName(),
                ':choisen_class' => $game->getChoisenClass(),
            ]);
        } catch (PDOException $err) {
            echo "Database Error: The user could not be able added. <br />" . $err->getMessage();
        } catch (Exception $err) {
            echo "General Error: The user could not be able added. <br />" . $err->getMessage();
        }

        return (int) $this->connection->lastInsertId();
    }

    public function find(int $gameId): ?Game
    {
        $query = "SELECT game_id, nick_name, choisen_class, score FROM games WHERE game_id = $gameId";
        $statement = $this->connection->query($query);
        if ($row = $statement->fetch(\PDO::FETCH_ASSOC)) {
            return $this->createGameFromRow($row);
        }
        return null;
    }

    public function show(): array
    {
        $query = "SELECT game_id, nick_name, choisen_class, score FROM games WHERE score > 0 ORDER BY score DESC LIMIT 10";
        $score_stack = [];
        if ($statement = $this->connection->query($query)) {
            foreach ($statement as $row) {
                $score = $this->createGameFromRow($row);
                array_push($score_stack, $score);
            }
            return $score_stack;
        }
        return [];
    }

    private function createGameFromRow(array $row): Game
    {
        return new Game(
            (int) $row['game_id'],
            $row['nick_name'],
            $row['choisen_class'],
            (int) $row['score']
        );
    }

    public function add(Game $record): void
    {
        $query = "UPDATE games SET score = :score WHERE game_id = :game_id";
        $statement = $this->connection->prepare($query);
        try {
            $statement->execute([
                ':score' => $record->getScore(),
                ':game_id' => $record->getGameId()
            ]);
        } catch (PDOException $err) {
            echo "Database Error: The record could not be able added. <br />" . $err->getMessage();
        } catch (Exception $err) {
            echo "General Error: The record could not be able added. <br />" . $err->getMessage();
        }

        return;
    }

    public function createMultiplayGame(MultiplayGame $multiplayGame) : int
    {
        $query = "INSERT INTO `multiplay_games` (`nick_name`, `choisen_class`, `game_status`, `room_id`) VALUES (:nick_name, :choisen_class, :game_status, :room_id)";
        $statement = $this->connection->prepare($query);
        try {
            $statement->execute([
                ':nick_name' => $multiplayGame->getNickName(),
                ':choisen_class' => $multiplayGame->getChoisenClass(),
                ':room_id' => $multiplayGame->getRoomId(),
                ':game_status' => $multiplayGame->getGameStatus(),

            ]);
        } catch (PDOException $err) {
            echo "Database Error: The user could not be able added. <br />" . $err->getMessage();
        } catch (Exception $err) {
            echo "General Error: The user could not be able added. <br />" . $err->getMessage();
        }
        return (int) $this->connection->lastInsertId();
    }

    public function findPlayer(int $playerId): ?MultiplayGame
    {
        $query = "SELECT player_id, nick_name, choisen_class, game_status, room_id FROM multiplay_games WHERE player_id = $playerId";
        $statement = $this->connection->query($query);
        if ($row = $statement->fetch(\PDO::FETCH_ASSOC)) {
            return $this->createMultiplayGameFromRow($row);
        }
        return null;
    }

    private function createMultiplayGameFromRow(array $row): MultiplayGame
    {
        return new MultiplayGame(
            (int) $row['player_id'],
            $row['nick_name'],
            $row['choisen_class'],
            $row['game_status'],
            (int) $row['room_id']
        );
    }

    public function getNickNameByGameId(int $gameId): ?string
    {
        $query = "SELECT nick_name FROM games WHERE game_id = $gameId";
        $statement = $this->connection->query($query);
        if ($row = $statement->fetch(\PDO::FETCH_ASSOC)) {
            return $row['nick_name'];
        }
        return null;
    }

    public function getNickNameByPlayerId(int $playerId): ?string
    {
        $query = "SELECT nick_name FROM multiplay_games WHERE player_id = $playerId";
        $statement = $this->connection->query($query);
        if ($row = $statement->fetch(\PDO::FETCH_ASSOC)) {
            return $row['nick_name'];
        }
        return null;
    }

    public function getRoomIdByPlayerId(int $playerId): ?int
    {
        $query = "SELECT room_id FROM multiplay_games WHERE player_id = $playerId";
        $statement = $this->connection->query($query);
        if ($row = $statement->fetch(\PDO::FETCH_ASSOC)) {
            return $row['room_id'];
        }
        return null;
    }

    public function getRoomIdByRequestId(int $requestId): ?int
    {
        $query = "SELECT room_id FROM multiplay_games WHERE player_id = (SELECT player_id FROM attack_requests WHERE request_id = $requestId)";
        $statement = $this->connection->query($query);
        if ($row = $statement->fetch(\PDO::FETCH_ASSOC)) {
            return $row['room_id'];
        }
        return null;
    }
}
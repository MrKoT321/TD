<?php
declare(strict_types=1);

namespace App\Database;

use App\Model\Game;
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
}
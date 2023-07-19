<?php
declare(strict_types=1);

namespace App\Database;

use App\Model\AttackInfo;
use FFI\Exception;
use PDOException;

class RequestTable
{
    private \PDO $connection;

    public function __construct(\PDO $connection)
    {
        $this->connection = $connection;
    }

    public function publish(AttackInfo $request): int 
    {
        $query = "
            INSERT INTO 
                attack_requests (request_type, game_id, money, score, current_lvl, wave1, wave2, wave3, mobs_unlock) 
            VALUES
                (:request_type, :game_id, :money, :score, :current_lvl, :wave1, :wave2, :wave3, :mobs_unlock)
            ";
        $statement = $this->connection->prepare($query);
        try {
            $statement->execute([
                ':request_type' => $request->getRequestStatus(),
                ':game_id' => $request->getGameId(),
                ':money' => $request->getMoney(),
                ':score' => $request->getScore(),
                ':current_lvl' => $request->getCurrentLvl(),
                ':wave1' => $request->getWave1(),
                ':wave2' => $request->getWave2(),
                ':wave3' => $request->getWave3(),
                ':mobs_unlock' => $request->getMobsUnlock(),
            ]);
        } catch (PDOException $err) {
            echo "Database Error: The record could not be able added. <br />" . $err->getMessage();
        } catch (Exception $err) {
            echo "General Error: The record could not be able added. <br />" . $err->getMessage();
        }
        return (int) $this->connection->lastInsertId();
    }

    public function find(int $requestId): ?AttackInfo 
    {
        $query = "SELECT game_id, money, score, current_lvl, wave1, wave2, wave3, mobs_unlock FROM attack_requests WHERE request_id = $requestId";
        $statement = $this->connection->query($query);
        if ($row = $statement->fetch(\PDO::FETCH_ASSOC)) {
            return $this->createRequestFromRow($row);
        }
        return null;
    }

    private function createRequestFromRow(array $row): AttackInfo {
        return new AttackInfo (
            null,
            null,
            (int)$row['game_id'],
            (int)$row['money'],
            (int)$row['score'],
            $row['current_lvl'],
            $row['wave1'],
            $row['wave2'],
            $row['wave3'],
            $row['mobs_unlock']
        );
    }

    public function getStatus(int $requestId): ?string 
    {
        $query = "SELECT request_type FROM attack_requests WHERE request_id = $requestId";
        $statement = $this->connection->query($query);
        if ($row = $statement->fetch(\PDO::FETCH_ASSOC)) {
            return $row['request_type'];
        }
        return null;
    }
}
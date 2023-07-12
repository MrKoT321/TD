<?php
declare(strict_types=1);

namespace App\Database;

use App\Model\Record;
use FFI\Exception;
use PDOException;

class RecordTable {
    private \PDO $connection;

    public function __construct(\PDO $connection) {
        $this->connection = $connection;
    }

    public function show(): array {
        $query = "SELECT user_id, nick_name, choisen_class, score FROM records ORDER BY score LIMIT 10";
        $score_stack = [];
        if ($statement = $this->connection->query($query)) {
            foreach($statement as $row) {
                $score = $this->createRecordFromRow($row);
                array_push($score_stack, $score);
            }
            return $score_stack;
        }
        return [];
    }

    private function createRecordFromRow(array $row): Record {
        return new Record (
            (int)$row['user_id'],
            $row['nick_name'],
            $row['choisen_class'],
            (int)$row['score']
        );
    }

    public function add(Record $record): void {
        $query = <<<SQL
        INSERT INTO records (nick_name, choisen_class, score)
        VALUES (:nick_name, :choisen_class, :score)
        SQL;
        $statement = $this->connection->prepare($query);
        try 
        {
            $statement->execute([
                ':nick_name' => $record->getNickName(),
                ':choisen_class' => $record->getChoisenClass(),
                ':score' => $record->getScore()
            ]);
        }
        catch (PDOException $err)
        {
            echo "Database Error: The record could not be able added. <br />".$err->getMessage();
        }
        catch (Exception $err)
        {
            echo "General Error: The record could not be able added. <br />".$err->getMessage();
        }
        
        return;
    }
}
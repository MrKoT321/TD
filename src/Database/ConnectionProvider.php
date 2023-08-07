<?php
declare(strict_types=1);

namespace App\Database;

class ConnectionProvider {
    public static function connectDatabase(): \PDO
    {
        $dsn = 'mysql:host=localhost:3306;dbname=TD;charset=utf8';
        $user = 'root';
        $password = 'pdb7325fdah45';
        try {
            $dbh = new \PDO($dsn, $user, $password);
        }
        catch (\PDOException $e) {
            $dsn = 'mysql:host=mysql:3306;dbname=TD;charset=utf8';
            return new \PDO($dsn, $user, $password);
        }
        return $dbh;
    }
}
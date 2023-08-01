<?php
declare(strict_types=1);

namespace App\Database;

class ConnectionProvider {
    public static function connectDatabase(): \PDO
    {
        $dsn = 'mysql:host=mysql:3306;dbname=TD;charset=utf8';
        $user = 'root';
        $password = '1234';
        return new \PDO($dsn, $user, $password);
    }
}
<?php
use Doctrine\DBAL\Configuration;
use Doctrine\DBAL\DriverManager;
use Doctrine\DBAL\Logging\Middleware;

require_once __DIR__ . '/../../vendor/autoload.php';

// $config = (new Configuration())->setMiddlewares([new Middleware()]);

$connection = DriverManager::getConnection([
    'dbname' => 'TD',
    'user' => 'root',
    'password' => 'P@ssw0rd',
    'driver' => 'pdo_mysql',
]);

var_dump($connection->createSchemaManager()->listDatabases());

$connection->close();
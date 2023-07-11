<?php
use Ratchet\Server\IoServer;
use MyApp\Chat;

    require dirname(__DIR__) . '/vendor/autoload.php';

    $server = IoServer::factory(
        new HttpServer(
            new WsServer(
                new Socket()
            )
        ),
        8080
    );
    $server->run();

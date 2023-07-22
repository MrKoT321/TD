<?php

require __DIR__ . '/../../vendor/autoload.php';

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\WebSocket\WsServer;
use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;

// Создаем класс обработчика сообщений WebSocket
class WebSocketHandler implements MessageComponentInterface {
  protected $clients;

  public function __construct() {
    $this->clients = new \SplObjectStorage;
  }

  // Обработчик нового подключения клиента
  public function onOpen(ConnectionInterface $conn) {
    $lastConnId = 0;
    foreach ($this->clients as $client) {
      $lastConnId = $lastConnId ^ $client->connId;
    }
    if ($lastConnId != 0) {
      $conn->connId = $lastConnId;
    } else {
      $conn->connId = $conn->resourceId;
    }
    $this->clients->attach($conn);
    echo "-- New client connected: {$conn->resourceId} {$conn->connId}" . PHP_EOL;
  }

  // Обработчик получения сообщения от клиента
  public function onMessage(ConnectionInterface $from, $msg) {
    foreach ($this->clients as $client) {
        if ($client->connId == $from->connId && $client->resourceId !== $from->resourceId) {
          $client->send($msg);
        }
    }
  }


  // Обработчик закрытия соединения клиента
  public function onClose(ConnectionInterface $conn) {
    $this->clients->detach($conn);
    echo "Client disconnected: {$conn->resourceId}" . PHP_EOL;
    foreach ($this->clients as $client) {
      if ($client->connId == $conn->connId) {
        // $client->send("Your opponent has passed out");
        $this->clients->detach($client);
        echo "Client disconnected: {$client->resourceId}" . PHP_EOL;
      }
  }
  }

  // Обработчик ошибок соединения
  public function onError(ConnectionInterface $conn, \Exception $e) {
    echo "An error has occurred: {$e->getMessage()}" . PHP_EOL;
    $conn->close();
  }
}

  // Создаем новый WebSocket-сервер на порту 8080
$server = IoServer::factory(
new HttpServer(
  new WsServer(
    new WebSocketHandler()
  )
),
8080
);

// Запускаем сервер
echo "WebSocket server started" . PHP_EOL;
$server->run();
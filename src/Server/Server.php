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
    // $lastConnId = 0;
    // foreach ($this->clients as $client) {
    //   $lastConnId = $lastConnId ^ $client->connId;
    // }
    // if ($lastConnId != 0) {
    //   $conn->connId = $lastConnId;
    // } else {
    //   $conn->connId = $conn->resourceId;
    // }
    $conn->gameStatus = 'menu';
    $this->clients->attach($conn);
    echo "-- New client connected: {$conn->resourceId}" . PHP_EOL;
  }

  // Обработчик получения сообщения от клиента
  public function onMessage(ConnectionInterface $from, $msg) {
    $data = json_decode($msg);
    if ($data->type == 'add_to_search') {
      $this->findOpponent($from, $data);
    } else {
      if ($data->type == 'remove_from_search') {
        $from->gameStatus = 'menu';
      }
    }
  }

  // Обработчик закрытия соединения клиента
  public function onClose(ConnectionInterface $conn) {
    $this->clients->detach($conn);
    echo "Client disconnected: {$conn->resourceId}" . PHP_EOL;
    // foreach ($this->clients as $client) {
    //   if ($client->connId == $conn->connId) {
    //     // $client->send("Your opponent has passed out");
    //     $this->clients->detach($client);
    //     echo "Client disconnected: {$client->resourceId}" . PHP_EOL;
    //   }
    // }
  }

  private function findOpponent(ConnectionInterface $from, $data) {
    $from->gameStatus = 'search';
    $from->class = $data->choisen_class;
    foreach ($this->clients as $client) {
      if ($client->resourceId !== $from->resourceId && $client->gameStatus == 'search' && $client->class !== $from->class) {
        $client->gameStatus = 'ready_to_play';
        $from->gameStatus = 'ready_to_play';
        echo '--- Connection success! Both players ready to play' . PHP_EOL;
        $data->type = 'find';
        $from->send(json_encode($data));
        if ($data->choisen_class = 'attack') {
          $data->choisen_class = 'defense';
        } else {
          $data->choisen_class = 'attack';
        }
        $client->send(json_encode($data));
        break;
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
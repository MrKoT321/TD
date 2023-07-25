<?php

require __DIR__ . '/../../vendor/autoload.php';

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\WebSocket\WsServer;
use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;

// Создаем класс обработчика сообщений WebSocket

class WebSocketHandler implements MessageComponentInterface
{
  protected $clients;

  public function __construct()
  {
    $this->clients = new \SplObjectStorage;
  }

  // Обработчик нового подключения клиента
  public function onOpen(ConnectionInterface $conn)
  {
    $lastConnId = 0;
    foreach ($this->clients as $client) {
      $lastConnId = $lastConnId ^ $client->connId;
    }
    if ($lastConnId !== 0) {
      $conn->connId = $lastConnId;
    } else {
      $conn->connId = $conn->resourceId;
    }
    $conn->gameStatus = 'menu';
    $this->clients->attach($conn);
    echo "-- New client connected: {$conn->resourceId}\n";
    $lastConnId = 0;
  }

  // Обработчик получения сообщения от клиента
  public function onMessage(ConnectionInterface $from, $msg)
  {
    foreach ($this->clients as $client) {
      if ($client->resourceId !== $from->resourceId && $client->connId === $from->connId) {
        $client->send($msg);
      } 
    }
  }

  // Обработчик закрытия соединения клиента
  public function onClose(ConnectionInterface $conn)
  {
    $this->clients->detach($conn);
    echo "Client disconnected: {$conn->resourceId}\n";
  }

  // Обработчик ошибок соединения
  public function onError(ConnectionInterface $conn, \Exception $e)
  {
    echo "An error has occurred: {$e->getMessage()}\n";
    $conn->close();
  }
}

// Создаем новый WebSocket-сервер на порту 8090
$server = IoServer::factory(
  new HttpServer(
    new WsServer(
      new WebSocketHandler()
    )
  ),
  8090
);

// Запускаем сервер
echo "WebSocket server started\n";
$server->run();
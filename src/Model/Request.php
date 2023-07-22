<?php
declare(strict_types=1);

namespace App\Model;

class Game
{
    private ?int $requestId;
    private ?int $gameId;
    private string $nickName;
    private int $money;
    private ?int $currentLvl;
    private ?string $waves;

    public function __construct
    (
        ?int $requestId,
        int $gameId,
        string $nickName,
        int $money,
        ?int $currentLvl,
        ?string $waves
    ) {
        $this->requestId = $requestId;
        $this->gameId = $gameId;
        $this->nickName = $nickName;
        $this->money = $money;
        $this->currentLvl = $currentLvl;
        $this->waves = $waves;

    }

    public function getRequestId(): ?int
    {
        return $this->requestId;
    }

    public function getGameId(): int
    {
        return $this->gameId;
    }

    public function getNickName(): string
    {
        return $this->nickName;
    }

    public function getMoney(): ?int
    {
        return $this->money;
    }

    public function getCurrentLvl(): ?int
    {
        return $this->currentLvl;
    }

    public function getwaves(): ?int
    {
        return $this->waves;
    }
}
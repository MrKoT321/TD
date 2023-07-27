<?php
declare(strict_types=1);

namespace App\Model;

class MultiplayGame
{
    public function __construct
    (
        private ?int $playerId,
        private string $nickName,
        private string $choisenClass,
        private ?string $gameStatus,
        private ?int $roomId
    ) 
    {}

    public function getPlayerId(): ?int
    {
        return $this->playerId;
    }

    public function getNickName(): string
    {
        return $this->nickName;
    }

    public function getChoisenClass(): string
    {
        return $this->choisenClass;
    }

    public function getGameStatus(): ?string
    {
        return $this->gameStatus;
    }

    public function getRoomId(): ?int
    {
        return $this->roomId;
    }
}
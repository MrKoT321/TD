<?php
declare(strict_types=1);

namespace App\Model;

class Game
{
    public function __construct
    (
        private ?int $gameId,
        private string $nickName,
        private string $choisenClass,
        private ?int $score
    ) {}

    public function getGameId(): ?int
    {
        return $this->gameId;
    }

    public function getNickName(): string
    {
        return $this->nickName;
    }

    public function getChoisenClass(): string
    {
        return $this->choisenClass;
    }

    public function getScore(): ?int
    {
        return $this->score;
    }
}
<?php
declare(strict_types=1);

namespace App\Model;

class Game
{
    private ?int $gameId;
    private string $nickName;
    private string $choisenClass;
    private ?int $score;

    public function __construct
    (
        ?int $gameId,
        string $nickName,
        string $choisenClass,
        ?int $score
    ) {
        $this->gameId = $gameId;
        $this->nickName = $nickName;
        $this->choisenClass = $choisenClass;
        $this->score = $score;
    }

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
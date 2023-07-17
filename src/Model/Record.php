<?php
declare(strict_types=1);

namespace App\Model;

class Record
{
    private ?int $userId;
    private string $nickName;
    private string $choisenClass;
    private int $score;

    public function __construct
    (
        ?int    $userId,
        string  $nickName,
        string  $choisenClass,
        int $score
    )
    {
        $this->userId = $userId;
        $this->nickName = $nickName;
        $this->choisenClass = $choisenClass;
        $this->score = $score;
    }

    public function getUserId(): ?int
    {
        return $this->userId;
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
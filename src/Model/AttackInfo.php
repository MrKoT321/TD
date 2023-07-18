<?php
declare(strict_types=1);

namespace App\Model;

class AttackInfo
{
    private ?string $nickName;
    private ?int $money;
    private ?int $score;    
    private ?int $currLvl;
    private ?array $waves;

    public function __construct
    (
        ?string  $nickName,
        ?int  $money,
        ?int $score,
        ?int $currLvl,
        ?array $waves,
    )
    {
        $this->nickName = $nickName;
        $this->money = $money;
        $this->score = $score;
        $this->currLvl = $currLvl;
        $this->waves = $waves;
    }

    public function getNickName(): ?string
    {
        return $this->nickName;
    }

    public function getMoney(): ?int
    {
        return $this->money;
    }

    public function getScore(): ?int
    {
        return $this->score;
    }

    public function getCurrentLvl(): ?int
    {
        return $this->currLvl;
    }

    public function getWaves(): ?array
    {
        return $this->waves;
    }
}
<?php
declare(strict_types=1);

namespace App\Model;

class AttackInfo
{
    private ?string $nickName;
    private ?string $money;
    private ?string $score;    
    private ?string $currLvl;
    private ?array $waves;

    public function __construct
    (
        ?string  $nickName,
        ?string  $money,
        ?string $score,
        ?string $currLvl,
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

    public function getMoney(): ?string
    {
        return $this->money;
    }

    public function getScore(): ?string
    {
        return $this->score;
    }

    public function getCurrentLvl(): ?string
    {
        return $this->currLvl;
    }

    public function getWaves(): ?array
    {
        return $this->waves;
    }
}
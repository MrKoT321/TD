<?php
declare(strict_types=1);

namespace App\Model;

class AttackInfo
{
    private ?int $requestId;
    private ?string $requestStatus;
    private ?int $gameId;
    private ?int $playerId;
    private string $nickName;
    private ?int $money;
    private ?int $score;
    private ?string $currLvl;
    private ?string $wave1;
    private ?string $wave2;
    private ?string $wave3;
    private ?string $mobsUnlock;
    public function __construct
    (
        ?int $requestId,
        ?string $requestStatus,
        ?int $gameId,
        ?int $playerId,
        string $nickName,
        ?int $money,
        ?int $score,
        ?string $currLvl,
        ?string $wave1,
        ?string $wave2,
        ?string $wave3,
        ?string $mobsUnlock
    ) {
        $this->requestId = $requestId;
        $this->requestStatus = $requestStatus;
        $this->gameId = $gameId;
        $this->playerId = $playerId;
        $this->nickName = $nickName;
        $this->money = $money;
        $this->score = $score;
        $this->currLvl = $currLvl;
        $this->wave1 = $wave1;
        $this->wave2 = $wave2;
        $this->wave3 = $wave3;
        $this->mobsUnlock = $mobsUnlock;
    }

    public function getRequestId(): ?int
    {
        return $this->requestId;
    }

    public function getRequestStatus(): ?string
    {
        return $this->requestStatus;
    }

    public function getGameId(): ?int
    {
        return $this->gameId;
    }

    public function getPlayerId(): ?int
    {
        return $this->playerId;
    }

    public function getNickName(): string
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

    public function getCurrentLvl(): ?string
    {
        return $this->currLvl;
    }

    public function getWave1(): ?string
    {
        return $this->wave1;
    }

    public function getWave2(): ?string
    {
        return $this->wave2;
    }

    public function getWave3(): ?string
    {
        return $this->wave3;
    }

    public function getMobsUnlock(): ?string
    {
        return $this->mobsUnlock;
    }
}
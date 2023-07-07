<?php

class ServerController
{
    private const HTTP_STATUS_303_SEE_OTHER = 303;
    public function index(): void
    {
        require __DIR__ . '/menu.html';
    }

    public function singleGame(): void 
    {
        require __DIR__ . '/TD.php';
    }

    private function writeRedirectSeeOther(string $url): void
    {
        header('Location: ' . $url, true, self::HTTP_STATUS_303_SEE_OTHER);
    }
}
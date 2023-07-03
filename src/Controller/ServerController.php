<?php

class ServerController
{
    private const HTTP_STATUS_303_SEE_OTHER = 303;
    public function index(): void
    {
        require __DIR__ . '/../public/TD.html';
    }

    private function writeRedirectSeeOther(string $url): void
    {
        header('Location: ' . $url, true, self::HTTP_STATUS_303_SEE_OTHER);
    }
}
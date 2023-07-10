<?php

declare(strict_types=1);

namespace App\Controller;
class ServerController
{
    private const HTTP_STATUS_303_SEE_OTHER = 303;
    public function index(): void
    {
        require __DIR__ . '/../../public/pages/menu.html';
    }

    public function singleGame(): void 
    {
        $this->writeRedirectSeeOther("/../../pages/TD.html");
    }

    private function writeRedirectSeeOther(string $url): void
    {
        header('Location: ' . $url, true, self::HTTP_STATUS_303_SEE_OTHER);
    }
}
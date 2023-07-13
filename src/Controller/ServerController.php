<?php

declare(strict_types=1);

namespace App\Controller;

use App\Database\ConnectionProvider;
use App\Database\RecordTable;
use App\Model\Record;

class ServerController
{
    private const HTTP_STATUS_303_SEE_OTHER = 303;

    private RecordTable $recordTable;

    public function __construct()
    {
        $connection = ConnectionProvider::connectDatabase();
        $this->recordTable = new RecordTable($connection);
    }

    public function addRecord(): void 
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST')
        {
            $this->writeRedirectSeeOther('/');
            return;
        }
        if ($_SERVER["CONTENT_TYPE"] ==  'application/json')
        {
            $this->writeRedirectSeeOther('/');
            return;
        }

        $postData = file_get_contents('php://input');
        $data = json_decode($postData, true);

        $record = new Record(
            null, 
            $data['nickName'], 
            $data['choisenClass'], 
            (int)$data['score']
        );
        $this->recordTable->add($record);
        return;
    }

    public  function showRecords(): void 
    {
        $records = $this->recordTable->show();
        if (!$records)
        {
            $this->writeRedirectSeeOther('/');
            exit();
        }

        require __DIR__ . '/../../public/pages/records.php';
    }

    public function singleGame(): void 
    {
        $this->writeRedirectSeeOther("/../../pages/defense.html");
    }

    public function index(): void
    {
        require __DIR__ . '/../../public/pages/menu.html';
    }

    private function writeRedirectSeeOther(string $url): void
    {
        header('Location: ' . $url, true, self::HTTP_STATUS_303_SEE_OTHER);
    }
}
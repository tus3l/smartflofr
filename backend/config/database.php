<?php

declare(strict_types=1);

final class Database
{
    private string $host = '127.0.0.1';
    private string $database = 'smart_lost_found';
    private string $username = 'root';
    private string $password = '';

    public function connect(): PDO
    {
        $dsn = sprintf(
            'mysql:host=%s;dbname=%s;charset=utf8mb4',
            $this->host,
            $this->database
        );

        return new PDO(
            $dsn,
            $this->username,
            $this->password,
            [
                PDO::ATTR_ERRMODE =>
                    PDO::ERRMODE_EXCEPTION,

                PDO::ATTR_DEFAULT_FETCH_MODE =>
                    PDO::FETCH_ASSOC,

                PDO::ATTR_EMULATE_PREPARES =>
                    false
            ]
        );
    }
}
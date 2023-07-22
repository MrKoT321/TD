CREATE TABLE test_requests
(
    request_id INT UNSIGNED AUTO_INCREMENT,
    request_type VARCHAR(10) NOT NULL,
    game_id INT UNSIGNED,
    request_body JSON,
    PRIMARY KEY (request_id),
    FOREIGN KEY (game_id) REFERENCES games(game_id)
) ENGINE=INNODB;


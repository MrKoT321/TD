CREATE TABLE games
(
    game_id INT UNSIGNED AUTO_INCREMENT,
    nick_name VARCHAR(200) NOT NULL,
    choisen_class VARCHAR(200) NOT NULL,
    score INT,
    PRIMARY KEY (game_id)
);
 
CREATE TABLE attack_requests
(
    request_id INT UNSIGNED AUTO_INCREMENT,
    game_id INT UNSIGNED,
    nick_name VARCHAR(200) NOT NULL,
    money VARCHAR(200) NOT NULL,
    current_lvl VARCHAR(200) NOT NULL,
    waves VARCHAR(200) NOT NULL,
    PRIMARY KEY (request_id),
    FOREIGN KEY (game_id) REFERENCES games(game_id)
) ENGINE=INNODB;


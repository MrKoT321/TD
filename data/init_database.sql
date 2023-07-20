CREATE TABLE games
(
    game_id INT UNSIGNED AUTO_INCREMENT,
    nick_name VARCHAR(20) NOT NULL,
    choisen_class VARCHAR(10) NOT NULL,
    score INT,
    PRIMARY KEY (game_id)
);
 
CREATE TABLE attack_requests
(
    request_id INT UNSIGNED AUTO_INCREMENT,
    request_type VARCHAR(10) NOT NULL,
    game_id INT UNSIGNED,
    money INT UNSIGNED,
    score SMALLINT,
    current_lvl VARCHAR(200) NOT NULL,
    wave1 VARCHAR(200) NOT NULL,
    wave2 VARCHAR(200) NOT NULL,
    wave3 VARCHAR(200) NOT NULL,
    mobs_unlock VARCHAR(200) NOT NULL,
    PRIMARY KEY (request_id),
    FOREIGN KEY (game_id) REFERENCES games(game_id)
) ENGINE=INNODB;


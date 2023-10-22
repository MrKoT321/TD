CREATE DATABASE IF NOT EXISTS TD;
USE TD;

DROP TABLE IF EXISTS attack_requests;
DROP TABLE IF EXISTS multiplay_games;
DROP TABLE IF EXISTS games;

CREATE TABLE games
(
    game_id INT UNSIGNED AUTO_INCREMENT,
    nick_name VARCHAR(20) NOT NULL,
    choisen_class VARCHAR(10) NOT NULL,
    score INT,
    PRIMARY KEY (game_id)
);

CREATE TABLE multiplay_games
(
    player_id INT UNSIGNED AUTO_INCREMENT,
    nick_name VARCHAR(20) NOT NULL,
    choisen_class VARCHAR(10),
    game_status VARCHAR(20),
    room_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (player_id)
);
 
CREATE TABLE attack_requests
(
    request_id INT UNSIGNED AUTO_INCREMENT,
    request_type VARCHAR(10) NOT NULL,
    game_id INT UNSIGNED DEFAULT NULL,
    player_id INT UNSIGNED DEFAULT NULL,
    money INT UNSIGNED DEFAULT NULL,
    score SMALLINT DEFAULT NULL,
    current_lvl VARCHAR(4) NOT NULL,
    wave1 VARCHAR(200) DEFAULT NULL,
    wave2 VARCHAR(200) DEFAULT NULL,
    wave3 VARCHAR(200) DEFAULT NULL,
    mobs_unlock VARCHAR(200) NOT NULL,
    PRIMARY KEY (request_id),
    FOREIGN KEY (player_id) REFERENCES multiplay_games(player_id),
    FOREIGN KEY (game_id) REFERENCES games(game_id)
) ENGINE=INNODB;



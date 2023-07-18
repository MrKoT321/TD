CREATE TABLE records
(
    user_id INT UNSIGNED AUTO_INCREMENT,
    nick_name VARCHAR(200) NOT NULL,
    choisen_class VARCHAR(200) NOT NULL,
    score INT,
    PRIMARY KEY (user_id)
);
 
-- CREATE TABLE attack_requests
-- (
--     request_id INT UNSIGNED AUTO_INCREMENT,
--     nick_name VARCHAR(200) NOT NULL,
--     money VARCHAR(200) NOT NULL,
--     current_lvl VARCHAR(200) NOT NULL,
--     waves VARCHAR(200) NOT NULL,
--     PRIMARY KEY (user_id)
-- );


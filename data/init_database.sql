CREATE TABLE records
(
    user_id INT UNSIGNED AUTO_INCREMENT,
    nick_name VARCHAR(200) NOT NULL,
    choisen_class VARCHAR(200) NOT NULL,
    score INT,
    PRIMARY KEY (user_id)
);
 
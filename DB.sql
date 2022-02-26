CREATE DATABASE tp1;
USE tp1;

CREATE TABLE userAccount(
    useridx INT NOT NULL AUTO_INCREMENT,
    userlevel INT NOT NULL,
    id VARCHAR(10) NOT NULL ,
    pw VARCHAR(10) NOT NULL,
    name VARCHAR(10) NOT NULL,
    nickname VARCHAR(10) NOT NULL,
    birth DATE,
    gender CHAR(1),
    phone VARCHAR(11),
    mobile VARCHAR(11) NOT NULL,
    PRIMARY KEY(useridx),
    UNIQUE KEY(nickname)
);

CREATE TABLE boardData(
    idx INT NOT NULL AUTO_INCREMENT,
    subject VARCHAR(40) NOT NULL,
    nickname VARCHAR(10) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    content TEXT,
    hit INT DEFAULT 0 NOT NULL,
    PRIMARY KEY(idx)
);

ALTER TABLE userAccount MODIFY mobile CHAR(11) UNIQUE;
ALTER TABLE userAccount MODIFY phone CHAR(11) UNIQUE;
ALTER TABLE userAccount MODIFY id VARCHAR(10) UNIQUE;


INSERT INTO userAccount (id, pw, name, nickname, birth, gender, phone, mobile, userlevel) Values('admin','admin', 'admin','admin','19930101', 'F', '11111111111', '11111111111',1);
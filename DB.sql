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
    active INT NOT NULL DEfAULT 1,
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
INSERT INTO userAccount (id, pw, name, nickname, birth, gender, phone, mobile, userlevel) Values('Yuna','1234', 'Yuna','김연아','19900905', 'F', '22', '22',3);
INSERT INTO userAccount (id, pw, name, nickname, birth, gender, phone, mobile, userlevel) Values('IU','1234', 'IU','아이유','19930516', 'F', '33', '33',3);
INSERT INTO userAccount (id, pw, name, nickname, birth, gender, phone, mobile, userlevel) Values('Jehoon','1234', 'Jehoon','이제훈','19840704', 'M', '44', '44',3);
INSERT INTO userAccount (id, pw, name, nickname, birth, gender, phone, mobile, userlevel) Values('Heain','1234', 'Heain','정해인','19880401', 'M', '55', '55',3);
INSERT INTO userAccount (id, pw, name, nickname, birth, gender, phone, mobile, userlevel) Values('Teachan','1234', 'Teachan','꼬마돌','19950101', 'M', '66', '66',3);
INSERT INTO userAccount (id, pw, name, nickname, birth, gender, phone, mobile, userlevel) Values('web7722','1234', 'Ingoo','In9','19890101', 'M', '77', '77',3);
INSERT INTO userAccount (id, pw, name, nickname, birth, gender, phone, mobile, userlevel) Values('kong-dev','1234', 'Donghoon','kong-dev','19840704', 'M', '99', '99',3);
INSERT INTO userAccount (id, pw, name, nickname, birth, gender, phone, mobile, userlevel) Values('Hancoco','1234', 'Hyunjin','Hancoco','19840704', 'F', '11111', '1111',3);
INSERT INTO userAccount (id, pw, name, nickname, birth, gender, phone, mobile, userlevel) Values('O-haa','1234', 'Haeun','O-haa','19840704', 'F', '101010', '10101',3);
INSERT INTO userAccount (id, pw, name, nickname, birth, gender, phone, mobile, userlevel) Values('bitkunst','1234', 'Jaewon','bitkunst','19840704', 'M', '102343242', '123401',3);
INSERT INTO userAccount (id, pw, name, nickname, birth, gender, phone, mobile, userlevel) Values('easy-young','1234', 'Jihyoung','easy-young','19840704', 'F', '14542', '1234401',3);
INSERT INTO userAccount (id, pw, name, nickname, birth, gender, phone, mobile, userlevel) Values('helpkim','1234', 'Help','helpkim','19840704', 'M', '1023423242', '123423401',3);
INSERT INTO userAccount (id, pw, name, nickname, birth, gender, phone, mobile, userlevel) Values('redbellboy','1234', 'Jongnam','redbellboy','19840704', 'M', '12342342', '1232341',3);


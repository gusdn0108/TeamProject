USE teamProject1;

-- CREATE TABLE userAccount(
--     useridx INT NOT NULL,
--     userlevel INT NOT NULL,
--     id VARCHAR(10) NOT NULL,
--     pw VARCHAR(10) NOT NULL,
--     name VARCHAR(10) NOT NULL,
--     nickname VARCHAR(10) NOT NULL,
--     birth DATE,
--     gender CHAR(1),
--     phone VARCHAR(11),
--     mobile VARCHAR(11) NOT NULL,
--     PRIMARY KEY(useridx, id, nickname, mobile)
-- );

-- CREATE TABLE boardData(
--     idx INT NOT NULL,
--     subject VARCHAR(20) NOT NULL,
--     nickname VARCHAR(10) NOT NULL,
--     date TIMESTAMP NOT NULL,
--     content TEXT,
--     hit INT NOT NULL,
--     PRIMARY KEY(idx)
-- );

-- INSERT INTO boardData(
--     idx, subject, nickname, date, content, hit
-- ) VALUES(
--     2, '공지사항-꼭 읽어주세요', '최고관리자', '2022-02-21', '테스트하는중', '1'
-- )

ALTER TABLE userAccount DROP PRIMARY KEY;
ALTER TABLE userAccount ADD PRIMARY KEY(useridx);
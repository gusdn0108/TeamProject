const SQL = {
    boardList : 'SELECT idx, subject, nickname, date, hit FROM boardData',
    boardWrite : 'INSERT INTO boardData (idx, subject, nickname, date, content, hit) Values (3,?,?,?,now(),?,1)',
    boardView : 'SELECT subject, nickname, date, content, idx FROM boardData',
    // boardDelete : 'DELETE FROM boardData WHERE idx = ${idx} ;',
    // boardUpdate : 'UPDATE boardData SET 컬럼1=값1, 컬럼2=값2 WHERE idx = ${idx}'
    getAdminUserList: 'SELECT * FROM userAccount',
    getAdminUserOne: 'SELECT * FROM WHERE useridx=? userAccount',

    // user

    loginSql : `select * from userAccount where id = ? and pw = ?;`,
    profileCheck : `select * from userAccount where id = ?`,
    checkId : `select * from userAccount where id=? or phone=? or mobile=?`,
    addData : `insert into userAccount(id, pw, name, nickname, birth, gender, phone, mobile, userlevel) values(?,?, ?, ?,?, ?, ?, ?,3)`,
}


module.exports = SQL
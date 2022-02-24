const SQL = {
    boardList : 'SELECT * FROM boardData',
    boardWrite : 'INSERT INTO boardData (subject, nickname, content) Values (?,?,?)',
    boardView : 'SELECT * FROM boardData WHERE idx = ?',
    boardHit: 'UPDATE boardData SET hit = ?',
    boardDelete : 'DELETE FROM boardData WHERE idx = ?',
    boardUpdate : 'UPDATE boardData SET subject=?, content=? WHERE idx = ?',
    getAdminUserList: 'SELECT * FROM userAccount',
    getAdminUserOne: 'SELECT * FROM userAccount WHERE useridx=?',
    // getDate: 'SELECT date_format(timestamp, `%Y-%m-%d`) FROM `boardData` WHERE id=8'
    loginSql : `select * from userAccount where id = ? and pw = ?;`,
    profileCheck : `select * from userAccount where id = ?`,
    checkId : `select * from userAccount where id=? or nickname=? or phone=? or mobile=?`,
    addData : `insert into userAccount(id, pw, name, nickname, birth, gender, phone, mobile, userlevel) values(?,?, ?, ?,?, ?, ?, ?,3)`,
}

//list에 있는 hit는 셀렉으로 가져오기도 하면서 겟 도달 시 +1해서 업뎃으로 디비 반영도 해야함


module.exports = SQL
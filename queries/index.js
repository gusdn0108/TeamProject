//DB  컬럼 따로 빼서 변수에 담기 >>사용하는 SQL 구문이 적어서 가능한 방법
//실제 업무 시에는 SQL 구문 그대로 적는 것이 좋다고 하심

const param = `idx,subject,nickname,hit,content`
const date = `DATE_FORMAT(date, '%Y-%m-%d') AS date`
const timestamp = `DATE_FORMAT(date, '%Y-%m-%d %p %h:%i') AS date`


const SQL = {
    boardList : `SELECT ${param},${date} FROM boardData`,
    boardListPost : `SELECT ${param},${date} FROM boardData WHERE nickname LIKE ? OR idx LIKE ? OR subject LIKE ?`,

    boardWrite : 'INSERT INTO boardData (subject, nickname, content) Values (?,?,?)',
    boardView : `SELECT ${param},${timestamp} FROM boardData WHERE idx = ?`,
    boardHit: 'UPDATE boardData SET hit = ? WHERE idx = ?',
    boardDelete : 'DELETE FROM boardData WHERE idx = ?',
    boardUpdate : 'UPDATE boardData SET subject=?, content=? WHERE idx = ?',
    //
    getAdminUserList: 'SELECT * FROM userAccount',
    getAdminUserOne: 'SELECT * FROM userAccount WHERE useridx=?',

    loginSql : `select * from userAccount where id = ? and pw = ?`,
    profileCheck : `select * from userAccount where id = ?`,
    checkId : `select * from userAccount where id=? or nickname=? or phone=? or mobile=?`,
    addData : `insert into userAccount(id, pw, name, nickname, birth, gender, phone, mobile, userlevel, active) values(?,?, ?, ?,?, ?, ?, ?,3,1)`,
    userResign : `DELETE from userAccount WHERE id =?`,
    setAdminUserUpdate:'UPDATE userAccount SET userlevel=?, name=?, mobile=?  WHERE id = ?',
    setAdminDeleteUser : 'UPDATE userAccount SET active=0 WHERE useridx =?',
    setAdminReactiveUser : 'UPDATE userAccount SET active=1 WHERE useridx = ?'
}


module.exports = SQL
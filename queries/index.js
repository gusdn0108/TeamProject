const SQL = {
    boardList : 'SELECT * FROM boardData',
    boardWrite : 'INSERT INTO boardData (subject, nickname, date, content, hit) Values (?,?,now(),?,1)',
    boardView : 'SELECT * FROM boardData WHERE idx = ?',
    boardDelete : 'DELETE FROM boardData WHERE idx = ?',
    boardUpdate : 'UPDATE boardData SET subject=?, content=? WHERE idx = ?',
    getAdminUserList: 'SELECT * FROM userAccount',
    getAdminUserOne: 'SELECT * FROM userAccount WHERE useridx=?',
    setAdminUserUpdate:'UPDATE userAccount SET userlevel=?, name=?, mobile=?  WHERE id = ?'
}


//view에 있는 hit는 셀렉으로 가져오기도 하면서 겟 도달 시 +1해서 업뎃으로 디비 반영도 해야함





module.exports = SQL
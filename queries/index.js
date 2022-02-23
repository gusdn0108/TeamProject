const SQL = {
    boardList : 'SELECT idx, subject, nickname, date, hit FROM boardData',
    boardWrite : 'INSERT INTO boardData (idx, subject, nickname, date, content, hit) Values (3,?,?,now(),?,1)',
    boardView : 'SELECT subject, nickname, date, content, idx FROM boardData',
    // boardDelete : 'DELETE FROM boardData WHERE idx = ${idx} ;',
    // boardUpdate : 'UPDATE boardData SET 컬럼1=값1, 컬럼2=값2 WHERE idx = ${idx}'
    }


module.exports = SQL
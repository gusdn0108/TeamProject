// const alertmove

let addUser = function(id, pw, name, nickname, birth, gender, phone, mobile) {
    pool.getConnection((err,conn) => {

        let checkId = `select * from members where id = '${id}';`
        let checkNick = `select * from members where nickname = '${nickname}';`
        let joinForm = `insert into members(id, pw, name, nickname, birth, gender, phone, mobile) values('${id}', 
        '${pw}', '${name}', ${birthday}, '${gender}', ${phone}, ${mobile});`

        conn.query(checkId,
            (err, result) => {
                if(!err) {
                console.log('이미 사용중인 아이디입니다.')
                conn.release()
                }

                else {
                conn.query(checkNick,
                    (err, result) => {
                        if(!err) {
                            console.log('이미 사용중인 닉네임입니다.')
                            conn.release()
                        }
                    }
                )}
            })

        conn.query(joinForm,
            (err, result) => {
                if(!err) {console.log(result)}
                else { throw err }
            }
        )
        conn.release();
    })
    
    console.log('데이터 추가됨')
}

module.exports = {
    addUser
}
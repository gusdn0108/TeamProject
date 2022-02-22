
let addUser = function(id, pw, name, nickname, birth, gender, phone, mobile) {
    pool.getConnection((err,conn) => {
        conn.query(`insert into members(id, pw, name, nickname, birth, gender, phone, mobile) values('${id}', 
        ${pw}, ${name}, ${birthday}, ${gender}, ${phone}, ${mobile})`,
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
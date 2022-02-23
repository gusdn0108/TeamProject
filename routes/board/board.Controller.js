const SQL = require(`../../queries/`)
const mysql = require(`mysql`)
const pool = require(`../../db.js`)
const {alertmove} = require(`../util/alertmove.js`)

let idx,subject, nickname,date,hit

let list

exports.list =
    (req,res) =>{
        pool.getConnection((err,conn)=>{
            conn.query(SQL.boardList,(error,result)=>{
                if(!error) {
                    result.forEach(v=>{date = v.date
                    console.log(date)
                    })
                    res.render(`board/board_list`,{
                        result
                    })
                }else throw error ;
                })
            conn.release();
            })
        }


exports.write =
    (req,res) =>{
        res.render(`board/board_write`)
    }


exports.writePost =
    (req,res) =>{
        const {subject,content} = req.body
        let param = [`${subject}`,`jane`,`${content}`]
        pool.getConnection((err,conn)=>{
            conn.query(SQL.boardWrite,param,(error,result)=>{
                if(!error) {
                    console.log(`excute Insert into query`)
                    res.send(alertmove('/board/view','글작성을 완료하였습니다.'));
                }else { 
                    throw error ;
                    res.send(alertmove('/board/list','글작성을 실패하였습니다.'))}
                })
            conn.release() ;
            })
    }



exports.view =
    (req,res) =>{
        pool.getConnection((err,conn)=>{
            conn.query(SQL.boardView,(error,result)=>{
                if(!error) {
                    result.forEach(v=>{date = v.date
                    console.log(date)
                    })
                    res.render(`board/board_view`,{
                        result
                    })
                }else throw error ;
                })
            conn.release();
            })
        }

exports.deletePost =
    (req,res) =>{
    }



exports.update =
    (req,res) =>{
        res.render(`board/board_update`)
    }


exports.updatePost =
    (req,res) =>{
        res.render(`board/board_update`)
    }



//const {subject,nickname,date,content,idx} = req.body




const SQL = require(`../../queries/`)
const mysql = require(`mysql`)
const pool = require(`../../db.js`)
const {alertmove} = require(`../util/alertmove.js`)


let idx,subject, nickname,date,hit
let list



exports.list =
    (req,res) =>{
        let {user} = req.session
        pool.getConnection((err,conn)=>{
            conn.query(SQL.boardList,(error,result)=>{
                if(!error) {
                    // result.forEach(v=>{date = v.date
                    // })
                    res.render(`board/board_list`,{
                        result ,user
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
                    res.send(alertmove('/board/list','글작성을 완료하였습니다.'));
                }else { 
                    throw error ;
                    res.send(alertmove('/board/list','글작성을 실패하였습니다.'))}
                })
            conn.release() ;
            })
    }



exports.view =
    (req,res) =>{
        const {idx} = req.query
        pool.getConnection((err,conn)=>{
            conn.query(SQL.boardView,idx,(error,result)=>{
                if(!error) {
                    res.render(`board/board_view`,{
                        item: result[0]
                    })
                }else throw error ;
            })
        conn.release();
        })
    }



exports.deletePost =
    (req,res) =>{
        const {idx} = req.body
        pool.getConnection((err,conn)=>{
            conn.query(SQL.boardDelete,idx,(error,result)=>{
                if(!error) {
                    res.send(alertmove('/board/list','글삭제를 완료하였습니다.'));
                }else throw error ;
                })
            conn.release();
            })
        }




exports.update =
    (req,res) =>{
        const {idx} = req.query
        pool.getConnection((err,conn)=>{
            conn.query(SQL.boardView,idx,(error,result)=>{
                if(!error) {
                    res.render(`board/board_update`,{
                        item:result[0]
                    })
                }else throw error ;
                })
            conn.release();
            })
        }


exports.updatePost =
//작업하기1 - 업데이트포스트부분
//작업하기2 - date 가공하기
    (req,res) =>{
        const {subject,content, idx} = req.body
        console.log(subject,content,idx)
        let param = [`${subject}`,`${content}`,idx]
        console.log(param)
        pool.getConnection((err,conn)=>{
            conn.query(SQL.boardUpdate,param,(error,result)=>{
                if(!error) {
                    console.log(`excute Insert into query`)
                    res.send(alertmove('/board/view','글수정을 완료하였습니다.'));
                }else { 
                    throw error ;
                    res.send(alertmove('/board/list','글수정에 실패하였습니다.'))}
                })
            conn.release() ;
            })
        }





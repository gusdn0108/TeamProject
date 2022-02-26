const SQL = require(`../../queries/`)
const pool = require(`../../db.js`)
const { alertmove } = require(`../util/alertmove.js`)


exports.list =
    (req, res) => {
        try {
            pool.getConnection((err, conn) => {
                conn.query(SQL.boardList, (error, result) => {
                    if (!error) {
                        res.render(`board/board_list`, {
                            result
                        })
                    } else throw error;
                })
                conn.release();
            })
        } catch (error) {
            console.log(`게시판 페이지 에러 발생:  `, error)
            res.send(alertmove("/", `알 수 없는 이유로 접근이 불가능합니다. 관리자에게 문의해주세요.`))
        }
    }


exports.write =
    (req, res) => {
        try {
            res.render(`board/board_write`)
        } catch (error) {
            console.log(`게시판 글쓰기 페이지 에러 발생:  `, error)
            res.send(alertmove("/", `알 수 없는 이유로 접근이 불가능합니다. 관리자에게 문의해주세요.`))
        }
    }


exports.writePost =
    (req, res) => {
        try {
            const { subject, content } = req.body
            const { nickname } = req.session.user
            let param = [subject, nickname, content]

            pool.getConnection((err, conn) => {
                conn.query(SQL.boardWrite, param, (error, result) => {
                    if (!error) {
                        res.send(alertmove('/board/list', '글작성을 완료하였습니다.'));
                    } else {
                        throw error;
                        res.send(alertmove('/board/list', '글작성에 실패하였습니다.'))
                    }
                })
                conn.release();
            })
        } catch (error) {
            console.log(`글쓰기 에러 발생:  `, error)
            res.send(alertmove("/", `알 수 없는 이유로 글작성이 불가능합니다. 관리자에게 문의해주세요.`))
        }
    }



exports.view =
    (req, res) => {
        try {
            const { idx, hit } = req.query
            const param = [hit, idx]
            pool.getConnection((err, conn) => {
                conn.query(SQL.boardView, idx, (error, result) => {
                    if (!error) {
                        conn.query(SQL.boardHit, param, (error, result) => { })
                        res.render(`board/board_view`, {
                            item: result[0],
                            hit
                        })
                    } else throw error;
                })
                conn.release();
            })
        } catch (error) {
            console.log(`게시판 페이지 에러 발생:  `, error)
            res.send(alertmove("/", `알 수 없는 이유로 접근이 불가능합니다. 관리자에게 문의해주세요.`))
        }
    }



exports.deletePost =
    (req, res) => {
        try {
            const { idx } = req.body
            pool.getConnection((err, conn) => {
                conn.query(SQL.boardDelete, idx, (error, result) => {
                    if (!error) {
                        res.send(alertmove('/board/list', '글삭제를 완료하였습니다.'));
                    } else throw error;
                })
                conn.release();
            })
        } catch (error) {
            console.log(`글삭제 에러 발생:  `, error)
            res.send(alertmove("/", `알 수 없는 이유로 글삭제가 불가능합니다. 관리자에게 문의해주세요.`))
        }
    }




exports.update =
    (req, res) => {
        try {
            const { idx } = req.query
            pool.getConnection((err, conn) => {
                conn.query(SQL.boardView, idx, (error, result) => {
                    if (!error) {
                        res.render(`board/board_update`, {
                            item: result[0]
                        })
                    } else throw error;
                })
                conn.release();
            })
        } catch (error) {
            console.log(`글수정 페이지 에러 발생:  `, error)
            res.send(alertmove("/", `알 수 없는 이유로 접근이 불가능합니다. 관리자에게 문의해주세요.`))
        }
    }


exports.updatePost =
    (req, res) => {
        try {
            const { subject, content, idx } = req.body
            let param = [subject, content, idx]
            pool.getConnection((err, conn) => {
                conn.query(SQL.boardUpdate, param, (error, result) => {
                    if (!error) {
                        res.send(alertmove(`/board/view?idx=${idx}`, '글수정을 완료하였습니다.'));
                    } else {
                        throw error;
                        res.send(alertmove('/board/list', '글수정에 실패하였습니다.'))
                    }
                })
                conn.release();
            })
        } catch (error) {
            console.log(`글수정 에러 발생:  `, error)
            res.send(alertmove("/", `알 수 없는 이유로 글수정이 불가능합니다. 관리자에게 문의해주세요.`))
        }
    }

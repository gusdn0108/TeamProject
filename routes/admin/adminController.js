const SQL = require(`../../queries/`);
const pool = require(`../../db.js`);
const moment = require("moment");
const { alertmove } = require("../util/alertmove");

const isAdminHandler = (user) => {
  if (user) {
    if (user.userlevel === 1) { return true }
    else { return false }
  } else {
    return false
  }
}

/**
 * 유저리스트페이지 : 유저리스트를 요청하는자가 운영자가 아닐경우 메인페이지로 이동
 * @param {*} req 
 * @param {*} res
 */

exports.list = (req, res) => {
  try {
    const admin = req.session.user;
    let { user } = req.session;
    if (isAdminHandler(admin)) {
      pool.getConnection((err, conn) => {
        conn.query(SQL.getAdminUserList, (error, result) => {
          if (!error) {

            //콜백 이슈
            // const value = result.map((v,i)=>{
            //   const element = v
            //   console.log(element)
            //   result.splice(i, 1, {
            //     ...element,
            //     button: `/admin/update?useridx=${element.useridx}`,
            //   });
            //   return element;
            // })

            for (let i = 0; i < result.length; i++) {
              const element = result[i];
              result.splice(i, 1, {
                ...element,
                button: `/admin/update?useridx=${element.useridx}`,
              });
            }

            conn.query(SQL.boardList, (error2, result2) => {
              if (!error) {
                res.render(`admin/admin_list`, {
                  result,
                  user,
                  boardData: result2,
                });
              } else throw error;
            });
          } else throw error;
        });
        conn.release();
      });
    } else {
      res.send(alertmove("/", "최고관리자 권한이 없습니다."));
    }
  } catch (error) {
    console.log( `어드민 유저관리 페이지 에러 발생:  `,error)
    res.send(alertmove("/", `알 수 없는 이유로 접근이 불가능합니다. 관리자에게 문의해주세요.`))
  }
};

/**
 * 유저 업데이트 페이지 : 유저 정보를 요청하는자가 운영자가 아닐경우 메인페이지로 이동.
 * @param {*} req
 * @param {*} res
 */
exports.update = (req, res) => {
  try {
    const { useridx } = req.query;
    const admin = req.session.user;
    if (isAdminHandler(admin)) {
      pool.getConnection((err, conn) => {
        conn.query(SQL.getAdminUserOne, useridx, (error, result) => {
          if (!error) {
            let birth = moment(result[0].birth).format("YYYY년MM월DD일")
            delete result[0].pw //pw는 비공개라서 삭제 후 패킹
            let user = {
              ...result[0],
              birth: birth
            }
            res.render("admin/admin_update", {
              user,
            });
          } else throw error;
        });
        conn.release();
      });
    } else {
      res.send(alertmove("/", "최고관리자 권한이 없습니다."));
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * 유저정보 수정 쿼리 : 유저정보를 수정하는자가 운영자가 아닐경우 메인페이지로 이동. 조건이 맞으면 유저정보 수정
 * @param {*} req
 * @param {*} res
 */
exports.updateAction = (req, res) => {
  try {
    const admin = req.session.user;
    const { userlevel, name, mobile, id } = req.body;
    const param = [userlevel, name, mobile, id]

    if (isAdminHandler(admin)) {
      pool.getConnection((err, conn) => {
        conn.query(SQL.setAdminUserUpdate, param, (error, result) => {
          if (!error) {
            res.send(alertmove("/admin", "회원정보 수정을 완료하였습니다."));
          } else {
            console.log(error);
            res.send(alertmove("/admin", "회원정보 수정을 실패하였습니다."));
          }
        });
        conn.release();
      });
    } else {
      res.send(alertmove("/", "최고관리자 권한이 없습니다."));
    }
  } catch (error) {
    res.send(alertmove("/admin", "회원정보 수정을 실패하였습니다."));
  }
};

exports.userDelete = (req, res) => {
  try {
    const { useridx } = req.body;
    const admin = req.session.user;
    if (isAdminHandler(admin)) {
      pool.getConnection((err, conn) => {
        conn.query(SQL.setAdminDeleteUser, useridx, (error, result) => {
          if (!error) {
            res.send(alertmove("/admin", "회원정보 삭제 하였습니다."));
          } else {
            res.send(alertmove("/admin", "회원정보 삭제에 실패하였습니다."));
          }
        });
        conn.release();
      });
    } else {
      res.send(alertmove("/", "최고관리자 권한이 없습니다."));
    }
  } catch (error) {
    console.log(`어드민 유저관리 페이지 유저 등급 변경 에러 발생:  `, error)
    res.send(alertmove("/", `알 수 없는 이유로 등급 변경이 불가능합니다. 콘솔창의 에러 내용을 확인해주세요`))
  }
};

exports.boardList = (req, res) => {
  try {
    const admin = req.session.user;
    if (isAdminHandler(admin)) {
      pool.getConnection((err, conn) => {
        conn.query(SQL.boardList, (error, result) => {
          if (!error) {
            const _result = [];
            for (let i = 0; i < result.length; i++) {
              const element = result[i];
              element.writeDate = moment().format("YYYY-MM-DD");
              _result.push(element);
            }
            res.render(`board/board_list`, {
              result,
            });
          } else throw error;
        });
        conn.release();
      });
    } else {
      res.send(alertmove("/", "최고관리자 권한이 없습니다."));
    }
  } catch (error) {
    console.log(`어드민 유저관리 페이지 게시판 리스트 에러 발생:  `, error)
    res.send(alertmove("/", `알 수 없는 이유로 게시판 리스트 보기가 불가능합니다. 콘솔창의 에러 내용을 확인해주세요`))
  }
};

exports.postDelete = (req, res) => {
  try {
    const admin = req.session.user;
    const { idx } = req.body;

    if (isAdminHandler(admin)) {
      pool.getConnection((err, conn) => {
        conn.query(SQL.boardDelete, idx, (error, result) => {
          if (!error) {
            res.send(alertmove("/admin", "글삭제를 완료하였습니다."));
          } else throw error;
        });
        conn.release();
      });
    } else {
      res.send(alertmove("/", "최고관리자 권한이 없습니다."));
    }
  } catch (error) {
    console.log(`어드민 유저관리 페이지 글삭제 에러 발생:  `, error)
    res.send(alertmove("/", `알 수 없는 이유로 글삭제가 불가능합니다. 콘솔창의 에러 내용을 확인해주세요`))
  }
};

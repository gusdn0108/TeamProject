const SQL = require(`../../queries/`);
const pool = require(`../../db.js`);
const moment = require("moment");
const { alertmove } = require("../util/alertmove");

const isAdminHandler = (user) => {
  if (user) {
    if (user.userlevel === 1) return true;
    else return false;
  } else {
    return false;
  }
};

/**
 * 유저리스트페이지 : 유저리스트를 요청하는자가 운영자가 아닐경우 메인페이지로 이동
 * @param {*} req
 * @param {*} res
 */
exports.list = (req, res) => {
  try {
    // const isAdmin = req.session.user.id==='admin'?true:false
    const admin = req.session.user;
    let { user } = req.session;
    if (isAdminHandler(admin)) {
      pool.getConnection((err, conn) => {
        conn.query(SQL.getAdminUserList, (error, result) => {
          if (!error) {
            // const _result = Array.from(result)
            for (let i = 0; i < result.length; i++) {
              const element = result[i];
              result.splice(i, 1, {
                ...element,
                button: `/admin/update?useridx=${element.useridx}`,
              });
            }
            //
            conn.query(SQL.boardList, (error2, result2) => {
              if (!error) {
                const _result = [];

                res.render(`admin/admin_list`, {
                  result,
                  user,
                  boardData: result2,
                });
              } else throw error;
            });

            //
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
        conn.query(SQL.getAdminUserOne, [useridx], (error, result) => {
          if (!error) {
            let temp = {
              useridx: useridx,
              id: result[0].id,
              userlevel: result[0].userlevel,
              name: result[0].name,
              gender: result[0].gender,
              phone: result[0].phone,
              mobile: result[0].mobile,
              nickname: result[0].nickname,
              birth: moment(result[0].birth).format("YYYY년MM월DD일"),
            };

            res.render("admin/admin_update", {
              user: temp,
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
    const userData = req.body;
    if (isAdminHandler(admin)) {
      pool.getConnection((err, conn) => {
        conn.query(
          SQL.setAdminUserUpdate,
          [userData.userlevel, userData.name, userData.mobile, userData.id],
          (error, result) => {
            if (!error) {
              res.send(alertmove("/admin", "회원정보 수정을 완료하였습니다."));
            } else {
              console.log(error);
              res.send(alertmove("/admin", "회원정보 수정을 실패하였습니다."));
              // throw error ;
            }
          }
        );
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
  const { useridx } = req.body;
  const admin = req.session.user;
  if (isAdminHandler(admin)) {
    pool.getConnection((err, conn) => {
      conn.query(SQL.setAdminDeleteUser, [useridx], (error, result) => {
        if (!error) {
          res.send(alertmove("/admin", "회원정보 삭제 하였습니다."));
        } else {
          res.send(alertmove("/admin", "회원정보 삭제에 실패하였습니다."));
          // throw error ;
        }
      });
      conn.release();
    });
  } else {
    res.send(alertmove("/", "최고관리자 권한이 없습니다."));
  }
};

exports.boardList = (req, res) => {
  const admin = req.session.user;
  if (isAdminHandler(admin)) {
    pool.getConnection((err, conn) => {
      conn.query(SQL.boardList, (error, result) => {
        if (!error) {
          const _result = [];
          // result.forEach(v=>{date = v.date
          // })
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
};

exports.postDelete = (req, res) => {
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
};

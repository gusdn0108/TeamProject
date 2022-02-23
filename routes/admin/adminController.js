const SQL = require(`../../queries/`)
const pool = require(`../../db.js`)



exports.list= (req,res) =>{
    try {
        pool.getConnection((err,conn)=>{
            conn.query(SQL.getAdminUserList,(error,result)=>{
                if(!error) {
                   
                    // const _result = Array.from(result)
                    for (let i = 0; i < result.length; i++) {
                        const element = result[i];                       
                        result.splice(i,1,{...element,button:`/admin/update?useridx=${element.useridx}`})
                       
                    }
            
                    res.render(`admin/admin_list`,{
                        result
                    })
                }else throw error ;
                })
            conn.release();
            })
    } catch (error) {
        console.log(error)
    }
  
    }

exports.update =(req,res)=>{
    try {
        const {useridx} = req.param
        console.log(useridx)
        res.render(`admin/admin_update`)
        // pool.getConnection((err,conn)=>{
        //     conn.query(SQL.getAdminUserOne,"",(error,result)=>{
        //         if(!error) {

        //             res.render(`admin/admin_update`,{
        //                 result
        //             })
        //         }else throw error ;
        //         })
        //     conn.release();
        //     })
    } catch (error) {
        console.log(error)
    }


    
}

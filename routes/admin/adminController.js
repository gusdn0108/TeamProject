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
        const {useridx} = req.query
        pool.getConnection((err,conn)=>{
            conn.query(SQL.getAdminUserOne,[useridx],(error,result)=>{
                if(!error) {   
                    
                    let temp = { id: result[0].id, name: result[0].name, gender:result[0].gender, 
                        phone:result[0].phone, mobile:result[0].mobile, nickname:result[0].nickname, birth:result[0].birth }                
                  
                        res.render('admin/admin_update', {
                            user:temp
                        }) 
                }else throw error ;
                })
            conn.release();
            })
    } catch (error) {
        console.log(error)
    }


    
}

exports.updateAction =(req,res)=>{
    try {
        const userData = req.body
        console.log(userData)
        res.send()
    } catch (error) {
        console.log(error)
    }
}
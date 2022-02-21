const express = require(`express`)
const router = express.Router()
const boardController = require(`./board.Controller`)


router.get(`/list`,boardController.list)


router.get(`/write`,boardController.write)
router.post(`/write`,(req,res)=>{
    
})


router.get(`/view`,boardController.view)



router.get(`/delete`,(req,res)=>{
    
})

router.get(`/update`,boardController.update)
router.post(`/update`,(req,res)=>{
    
})


module.exports = router
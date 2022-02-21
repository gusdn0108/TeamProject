exports.list =
    (req,res) =>{
        res.render(`board/board_list`)
    }

exports.write =
(req,res) =>{
    res.render(`board/board_write`)
}

exports.view =
(req,res) =>{
    res.render(`board/board_view`)
}

exports.update =
(req,res) =>{
    res.render(`board/board_update`)
}


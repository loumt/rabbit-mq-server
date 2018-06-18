
class PageController{}

/**
 * Main Page
 */
PageController.toHome = (req, res, next)=>{
    res.render('home')
}


/**
 * 发送消息
 */
PageController.toMessagePage = (req, res, next)=>{
    res.render('message')
}




module.exports = PageController;
const express = require('express')
const router = express.Router()
const handleRouter = require("./controller/handle.js")
const uploadRouter = require("./controller/upload.js")
const cMockRouter = require("./controller/cMock.js")
const devWatchRouter = require("./controller/devWatch.js")



const runShellRouter = require("./controller/runShell.js")
const { getIPAdress, getClientIp} = require("./model/func")

function isMe(req, res, next){
    if (getIPAdress() !== getClientIp(req)) {
        res.send({ "state": 0, "info": 'err：该操作只支持本地服务' }); return
    }
    next()
}
  
// 业务功能接口
router.get('/', handleRouter.renderIndex)
router.post('/api/creact_template_api', isMe, handleRouter.creactTemplate)
//ui静态仓库
router.get('/:urlId/*', handleRouter.warehouse)
// router.post('/fwatch', isMe, devWatchRouter.fWatch)
devWatchRouter.fWatch()

// 文件上传
router.get('/upload', uploadRouter.uploadRender)
router.post('/upload', isMe, uploadRouter.upload)



// mock
router.use('/mock/*', cMockRouter.api) 
// run shell
router.post('/shell/ide_open_item', isMe, runShellRouter.ideOpenItem) 

module.exports = router
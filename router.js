const express = require('express');
const router = express.Router();
const mocRouter = require("./controller/mock.js")
const handleRouter = require("./controller/handle.js")
const func = require("./models/func")


const isMy = (req, res, next) => {
    if (func.getIPAdress() !== func.getClientIp(req)) {
        res.send({ "state": 0, "info": 'err：该操作只支持本地服务' });
        return
    }
    next()
}

// mock交互接口
router.get('/mock/get', mocRouter.get)
router.post('/mock/post', mocRouter.post)

// 业务功能接口
router.get('/', handleRouter.renderIndex)
router.post('/creact_go', isMy , handleRouter.creactGo)
//ui静态仓库
router.get('/:urlId/*', handleRouter.warehouse)
// router.post('/merge', handleRouter.merge)
// router.post('/staticv', handleRouter.staticv)

module.exports = router;
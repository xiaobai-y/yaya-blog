// 路由模块
const express = require('express')
const router = express.Router()
// 导入index逻辑处理
const controller = require('../controller/index.js')
router.get('/',controller.handleIndexGet)
// 导出
module.exports = router
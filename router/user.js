const express = require('express')
const router = express.Router()

const bodyParser = require('body-parser')
// 注册body-parser中间件，注册之后才能使用req.body获取客户端提交的表单数据
router.use(bodyParser.urlencoded({extended:false}))


// 引入处理用户登录注册逻辑的user.js模块
const controller = require('../controller/user.js')
// 注册页面
router.get('/register',controller.handleRegisterGet)
// 登录页面
router.get('/login',controller.handleLoginGet)
// 注册新用户
router.post('/register',controller.handleRegisterPost)
// 用户登录
router.post('/login',controller.handleLoginPost)
router.get('/logout',controller.handleLogoutGet)
module.exports = router
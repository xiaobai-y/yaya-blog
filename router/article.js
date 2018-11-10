const express = require('express')
const router = express.Router()

// 引入逻辑处理模块
const article = require('../controller/article.js')

const bodyParser = require('body-parser')
// 注册body-parser中间件，注册之后才能使用req.body获取客户端提交的表单数据
router.use(bodyParser.urlencoded({extended:false}))

router.get('/article/addInfo',article.handleAddInfoGet)
router.post('/article/addInfo',article.handleAddInfoPost)
router.get('/article/detail/:id',article.handleDetailGet)
router.get('/article/editInfo/:id',article.handleEditGet)
router.post('/article/editInfo',article.handleEditPost)
module.exports = router
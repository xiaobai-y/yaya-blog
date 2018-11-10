const express = require('express')
const app = express()

// 设置默认的模板引擎
app.set('view engine','ejs')
// 设置模板页面的存放路径,将来模板页面都相对于此路径
app.set('views','./views')
// 导入express-session中间件
const session = require('express-session')
// 注册express-session中间件,以后就能在req中访问session了 req.session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }))
// 导入首页路由模块
const indexrouter = require('./router/index.js')
app.use(indexrouter)
// 导入用户路由模块
const userrouter = require('./router/user.js')
app.use(userrouter)
// 导入article路由模块
const articlerouter = require('./router/article.js')
app.use(articlerouter)
// 把node-modules文件夹，托管为静态文件目录
app.use('/node_modules',express.static('./node_modules'))

app.listen(80,() => {
    console.log('http://127.0.0.1:80')
})
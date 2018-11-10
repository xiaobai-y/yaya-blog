const mysql = require('mysql')
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog'
});

//   导入加密的包
const bcrypt = require('bcrypt')
const saltRounds = 10

// 引入moment.js格式化时间
const moment = require('moment')

module.exports = {
    handleRegisterGet(req, res) {
        res.render('./user/register.ejs', {})
    },
    handleLoginGet(req, res) {
        res.render('./user/login.ejs', {})
    },
    handleRegisterPost(req, res) {

        const user = req.body
        // 判断表单数据是否为空
        if (user.username.trim().length === 0 || user.password.trim().length === 0 || user.nickname.trim().length === 0)
            return res.status(400).send({
                status: 400,
                msg: '请完整填写表单后，再重试'
            })
        // 判断用户名是否重复
        const sql = 'select count(*) as count from userinfo where username = ?'
        conn.query(sql, user.username, (err, result) => {
            // console.log(result)
            if (err) return res.status(500).send({
                status: 500,
                msg: '用户名查询失败',
                data: null
            })
            if (result[0].count != 0) return res.send({
                status: 400,
                msg: '用户名重复，请重试',
                data: null
            })
            // 加密的方法
            bcrypt.hash(user.password, saltRounds, (err, pwdCryped) => {
                // console.log(pwdCryped)
                user.password = pwdCryped
                console.log(user)
                // 用户名不重复的话插入用户到数据库   
                // 增加ctime
                const insertSql = 'insert into userinfo set ?'
                user.ctime = moment().format('YYYY-MM-DD HH:mm:ss');
                // console.log(user)
                conn.query(insertSql, user, (err, result) => {
                    if (err) return res.send({
                        msg: '新增用户失败,请重试',
                        status: 400
                    })
                    res.send({
                        msg: 'ok',
                        status: 200
                    })
                })
            })


        })
    },
    handleLoginPost(req, res) {
        const user = req.body
        // 判断用户名，
        const sql = 'select * from userinfo where username = ?'
        conn.query(sql, [user.username], (err, result) => {
            // console.log(result)
            if (err) return res.send({
                msg: '登录错误，请重试',
                status: 500
            })
            // 密码是否正确
            bcrypt.compare(user.password, result[0].password, function (err, Compareres) {
                if (err) return res.send({
                    msg: '用户名或密码错误，请重试',
                    status: 400
                });
                if (Compareres === true) {
                    // 将登录状态存储到session中
                    user.ctime = moment().format('YYYY-MM-DD HH:mm:ss');
                    req.session.user = result[0]
                    req.session.isLogin = true
                    // 设置cookie的过期时间
                    let hour = 1000 * 60 * 60 * 24 * 30
                    req.session.cookie.expires = new Date(Date.now() + hour)
                    res.send({
                        msg: 'ok',
                        status: 200,
                        data: {
                            'user': req.session.user,
                            'isLogin': req.session.isLogin
                        }
                    })
                }

            })


        })
    },
    handleLogoutGet(req, res) {
        req.session.destroy(function (err) {
            // cannot access session here
            if (err) return res.send({
                msg: '退出登录失败',
                status: 500
            })
            res.redirect('/')
        })
    }
}
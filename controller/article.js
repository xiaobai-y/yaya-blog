const mysql = require('mysql')
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog'
});
// 引入moment.js格式化时间
const moment = require('moment')
const marked = require('marked')


module.exports = {
    handleAddInfoGet(req, res) {
        // 登录拦截,如果未登录不让查看发表文章页面,直接重定向到首页
        if (!req.session.isLogin) res.redirect('/')
        res.render('./article/addInfo.ejs', {
            user: req.session.user,
            isLogin: req.session.isLogin
        })
    },
    handleAddInfoPost(req, res) {
        const article = req.body
        const sql = 'insert into articleInfo set ?'
        article.ctime = moment().format('YYYY-MM-DD HH:mm:ss');
        article.authod_id = req.session.user.id
        // console.log(article)
        conn.query(sql, article, (err, result) => {
            if (err) return res.send({
                msg: '发表文章失败试',
                status: 500
            });
            // console.log(article)
            res.send({
                msg: 'ok',
                status: 200,
                articleId: result.insertId
            })

        })
    },
    handleDetailGet(req, res) {
        const id = req.params.id
        // console.log(id)
        const sql = 'select * from articleInfo where id = ?'
        conn.query(sql, id, (err, result) => {
            // console.log(result)
            // 如果出现错误或者查不到文章 就返回404页面
            if (err || result.length !== 1) return res.render('./404.ejs', {
                user: req.session.user,
                isLogin: req.session.isLogin
            })
            if (!req.session.isLogin) {
                res.redirect('/login')
            } else {
                // 如果找到文章就将文章转换为HTML标签
                result[0].content = marked(result[0].content)

                res.render('./article/detail.ejs', {
                    user: req.session.user,
                    isLogin: req.session.isLogin,
                    article: result[0]
                })
            }

        })

    },
    handleEditGet(req, res) {
        const id = req.params.id
        const sql = 'select * from articleInfo where id = ?'
        conn.query(sql, id, (err, result) => {
            // console.log(result)
            if (err || result.length !== 1) return res.render('./404.ejs', {
                user: req.session.user,
                isLogin: req.session.isLogin
            })
            if (!req.session.isLogin) {
                res.redirect('/login')
            } else {
            res.render('./article/editInfo.ejs', {
                user: req.session.user,
                isLogin: req.session.isLogin,
                article: result[0]
            })
            }
        })
      
    },
    handleEditPost(req,res) {
        const article = req.body
        // console.log(article)
        const sql = 'update articleinfo set ? where id = ?'
        conn.query(sql,[article,article.id],(err,result) => {
            // console.log(result)
            if(err || result.affectedRows !== 1) return res.send({msg:'保存文章失败',status:500})
            res.send({
                msg:'编辑成功',
                status:200,
                user: req.session.user,
                isLogin: req.session.isLogin,
                article: article,
                articleId:article.id
            })
        })
    }
}
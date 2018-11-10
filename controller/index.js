const mysql = require('mysql')
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog',
    multipleStatements: true
})
// function handleIndexGet(req,res){
//     res.render('./index.ejs',{})
// }
// module.exports = {
//     handleIndexGet
// }
// 上面的写法可以简写成如下,直接挂载在module身上
module.exports = {
    // 在对象身上挂载方法的简洁写法
    handleIndexGet(req,res){
        const pageSize = 4
        let currentPage = parseInt(req.query.page) || 1
        
        // 在渲染页面时将用户的信息一起传到index.ejs页面中,为了在index.ejs页面中获取用户的登录状态
        // limit 第一个参数表示从该参数的下一条数据开始，第二个参数表示每次返回的数据条数。
        const sql = `select a.title,a.ctime,u.nickname from articleinfo as a LEFT JOIN userinfo as u on a.authod_id = u.id order by ctime desc limit ${(currentPage-1)*pageSize},${pageSize};
        select count(*) as count from articleInfo `
        conn.query(sql,(err,result) => {
            const totalPage = Math.ceil(result[1][0].count / pageSize)
            res.render('./index.ejs/',{
                user:req.session.user,
                isLogin:req.session.isLogin,
                data:result[0],
                pageSize:pageSize,
                totalPage:totalPage,
                currentPage:currentPage
            })
            // console.log(currentPage)            
        })
        
        
    }
}

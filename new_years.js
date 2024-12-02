const express = require('express');
const { engine } = require('express-handlebars');
const { insertWish, getWishes } = require('./db'); // 引入数据库模块
const path = require('path');

const app = express();
const PORT = 3000;

// 配置中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public'))); // 提供静态文件

// 配置 Handlebars 模板引擎
app.engine("handlebars", engine({ defaultLayout: false }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views')); // 设置模板文件夹

// 首页路由
app.get('/', function (req, res) {
    // 获取愿望列表并显示
    getWishes(0, 10) // 获取前10个愿望
        .then(wishes => {
            res.render('index', { title: '新年愿望墙', wishes: wishes });
        })
        .catch(error => {
            console.error('获取愿望失败:', error);
            res.status(500).send('无法获取愿望数据');
        });
});

// 提交愿望路由
app.post('/submit-wish', function (req, res) {
    const wish = req.body.wish;
    if (!wish) {
        res.status(400).json({ success: false, message: '愿望不能为空！' });
        return;
    }
    insertWish(wish)
        .then(function (wishId) {
            res.json({ success: true, wishId: wishId });
        })
        .catch(function (error) {
            console.error('提交愿望出错:', error);
            res.status(500).json({ success: false, message: error });
        });
});

// 获取愿望路由
app.get('/get-wishes', function (req, res) {
    const page = parseInt(req.query.page || 1, 10);
    const pageSize = parseInt(req.query.pageSize || 10, 10);
    const offset = (page - 1) * pageSize;

    getWishes(offset, pageSize)
        .then(function (wishes) {
            res.json({ wishes: wishes });
        })
        .catch(function (error) {
            console.error('获取愿望出错:', error);
            res.status(500).json({ success: false, message: error });
        });
});

// 启动服务器
app.listen(PORT, function () {
    console.log(`Server is running on http://localhost:${PORT}`);
});

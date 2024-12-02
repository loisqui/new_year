const sqlite3 = require('sqlite3').verbose();

// 创建 SQLite 数据库连接（如果文件不存在则会创建）
const db = new sqlite3.Database('./new_year_wishes.db', (err) => {
    if (err) {
        console.error('数据库打开失败:', err.message);
    } else {
        console.log('已成功连接到 SQLite 数据库.');
    }
});

// 创建愿望表（如果不存在的话）
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS wishes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
});

// 插入愿望
function insertWish(wish) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('INSERT INTO wishes (content) VALUES (?)');
        stmt.run(wish, function (err) {
            if (err) {
                reject('插入愿望失败:', err.message);
            } else {
                resolve(this.lastID); // 返回插入的愿望 ID
            }
        });
        stmt.finalize(); // 完成 SQL 语句
    });
}

// 获取愿望（分页）
function getWishes(offset, limit) {
    return new Promise((resolve, reject) => {
        db.all('SELECT content FROM wishes ORDER BY created_at DESC LIMIT ? OFFSET ?', [limit, offset], (err, rows) => {
            if (err) {
                reject('获取愿望失败:', err.message);
            } else {
                resolve(rows); // 返回查询的结果
            }
        });
    });
}

module.exports = { insertWish, getWishes };

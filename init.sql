-- 创建数据库
CREATE DATABASE new_year_wishes;

-- 切换到新创建的数据库
\c new_year_wishes;

-- 创建愿望表
CREATE TABLE wishes (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

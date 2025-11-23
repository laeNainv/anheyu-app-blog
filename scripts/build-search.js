/* build-search.js
 生成一个用于前端本地搜索的 JSON 索引文件（`public/search-index.json`）。
 用法: `node scripts/build-search.js`
 说明: 脚本读取 `content/posts/*.md` 的 front-matter 与正文，生成简化的索引对象数组。
*/
const fs = require('fs');
const glob = require('glob');
const matter = require('gray-matter');


const files = glob.sync('content/posts/*.md');
const index = [];


for (const file of files) {
const raw = fs.readFileSync(file, 'utf-8');
const parsed = matter(raw);


index.push({
title: parsed.data.title,
date: parsed.data.date,
tags: parsed.data.tags || [],
excerpt: parsed.content.slice(0, 120) + '...',
path: file.replace('content/', '').replace('.md', '')
});
}


fs.writeFileSync('public/search-index.json', JSON.stringify(index, null, 2));
console.log('search-index.json 已生成');
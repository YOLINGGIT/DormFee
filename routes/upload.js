var express = require('express');
var router = express.Router();
const { formidable } = require('formidable');
const fs = require('fs');
const path = require('path');
const public = path.resolve(__dirname, '../public/build/images')

router.post('/upload', (req, res, next) => {
    const form = formidable({ uploadDir: public, keepExtensions: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log('文件处理错误', err);
            res.json({code:1500,msg:'文件处理错误'});
            return;
        }
        // res.json({ fields, files });
        // console.log(fields);//存放着一般字段,一般字段就是除了文件上传以外的字段,比如text
        // console.log(files);//存放着文件字段
        //获取文件路径
        const imgURL = '/images/' + files.DormPicture[0].newFilename
        // console.log(imgURL);
        // 后端改成这样
        res.json({ message: 'OK', filename: files.DormPicture[0].newFilename });
    });
})
router.get('/imgNames', (req, res) => {
    fs.readdir(public, (err, data) => {
        if (err) {
            res.json({code:1500,msg:'文件查看错误'});
            return
        }
        const fileData = data.map(item=>{
            return {filename:item,id:item.split('.')[0],alt:'imgs'}
        })
            res.json(fileData);

    })
})

module.exports = router;

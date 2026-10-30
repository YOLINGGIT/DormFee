const crypto = require('crypto');
const key = Buffer.from('11193qX16h3G933g', 'utf8');
/*
加密形式:
算法：AES
模式：ECB
填充：Pkcs7
密钥：11193qX16h3G933g
密钥编码：UTF-8
输出：Base64 字符串
*/
function decryptPassword(cipherBase64) {
    const decipher = crypto.createDecipheriv('aes-128-ecb', key, null);
    decipher.setAutoPadding(true);

    const decrypted = Buffer.concat([
        decipher.update(cipherBase64, 'base64'),
        decipher.final()
    ]);

    return decrypted.toString('utf8');
}

function encryptByECB(text) {
    // 1. 定义密钥，必须是 Buffer

    // 2. 创建加密器
    // 'aes-128-ecb': 对应 AES 算法，128位密钥，ECB 模式
    const cipher = crypto.createCipheriv('aes-128-ecb', key, null);

    // 3. 设置自动填充 (Node.js 默认就是 Pkcs7，这里显式声明更清晰)
    cipher.setAutoPadding(true);

    // 4. 执行加密
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    return encrypted;
}
module.exports = {
    decryptPassword, encryptByECB
}
// 测试
// const en = encryptByECB("Hello World")
// console.log(en);
// console.log(decryptPassword(en));
const server = require("./server");


// POST /kbp/auth/userLogout
module.exports = function Logout(Authorization) {
    const url = '/kbp/auth/userLogout';

    return server({
        url,
        method: 'POST',
        headers: {
            'Authorization': Authorization,
            'Accept': '*/*',
            'Origin': 'https://zwdk.gdxzzy.edu.cn',
            'Referer': 'https://zwdk.gdxzzy.edu.cn/h5/',
        },
    })

}



// /*
// * POST /kbp/auth/userLogout HTTP/2
// * Host: zwdk.gdxzzy.edu.cn
// * Content-Length: 0
// * User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63090a13) UnifiedPCWindowsWechat(0xf2541f0d) XWEB/25715 Flue
// * Content-Type: application/x-www-form-urlencoded
// * Authorization: eyJhbGciOiJIUzUxMiJ9.eyJyb2xlQ29kZXMiOltdLCJuYW1lIjoi6KO05rC45p6XIiwidG9rZW5UeXBlIjoiQ29tcHV0ZXIiLCJqdGkiOiIxMTcyOTUwMSIsInN1YiI6IjI1MjAzMDUwMjM0IiwiZXhwIjoxODA3NDQ1OTA5fQ.yd2Xyeh-5o-Yw1PZEJB9cT6QBCGUAmNXpk8U9NLjtuZLOn8yicnh_VQv_dHU4y0rFPyJyGjZJMUTevdW-NI8Ng
// * Accept: */*
// * Origin: https://zwdk.gdxzzy.edu.cn
// * Sec-Fetch-Site: same-origin
// * Sec-Fetch-Mode: cors
// * Sec-Fetch-Dest: empty
// * Referer: https://zwdk.gdxzzy.edu.cn/h5/
// * Accept-Encoding: gzip, deflate, br
// * Accept-Language: zh-CN,zh;q=0.9
// * Priority: u=1, i
// *
//  * /
const server = require("./server");

module.exports = async function getAccent() {
    try {
        const res = await server({
            url: '/kbp/auth/app/userLogin',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Origin': 'https://zwdk.gdxzzy.edu.cn',
                'Referer': 'https://zwdk.gdxzzy.edu.cn/h5/',
            },
            data: {
                username: "25203050234",
                password: "4jiKPPmmQLL1H5eW35RiLg==",
                loginType: 1
            },
        });
        // 只有 code === 200 且拿到 accessToken 才算登录成功；失败返回 false，不进入缓存
        const { data } = res.data || {};
        return res.data && res.data.code === 200 && data && data.accessToken ? data.accessToken : false;
    } catch (e) {
        console.log('依赖接口错误获取凭证出错', e.message);
        return false;
    }
};

/**
 * 登录获取 密钥
 */


// POST /kbp/auth/app/userLogin HTTP/2
// Host: zwdk.gdxzzy.edu.cn
// Content-Length: 78
// User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63090a13) UnifiedPCWindowsWechat(0xf2541f0d) XWEB/25715 Flue
// Content-Type: application/json
// Accept: */*
// Origin: https://zwdk.gdxzzy.edu.cn
// Sec-Fetch-Site: same-origin
// Sec-Fetch-Mode: cors
// Sec-Fetch-Dest: empty
// Referer: https://zwdk.gdxzzy.edu.cn/h5/
// Accept-Encoding: gzip, deflate, br
// Accept-Language: zh-CN,zh;q=0.9
// Priority: u=1, i

// {"username":"25203050234","password":"4jiKPPmmQLL1H5eW35RiLg==","loginType":1}


/*
主要获取数据的地址

*/
// HTTP/2 200 OK
// Server: GFW
// Date: Tue, 13 Oct 2026 07:02:34 GMT
// Content-Type: application/json
// Access-Control-Allow-Origin: https://zwdk.gdxzzy.edu.cn
// Access-Control-Allow-Credentials: true
// Access-Control-Expose-Headers: *
// Access-Control-Max-Age: 18000L

// {"code":200,"msg":"操作成功","data":{"accessToken":"9GfuOJiSDsJr5r-6VKuZWthhtxuEC4GxLppA",
// "userInfo":{"userId":11729501,
// "username":"25203050234",
// "name":"裴永林","
// status":1,
// "password":"23a6420bcd1e7a600e0a4f81e6a64629",
// "remark":null,"roleCodes":[],"isVisitor":false,
// "personType":0,"isMortal":0,"serviceList":[],
// "startDate":null,"endDate":null,
// "loginApp":null,"promptChangePassword":null},"openId":null}}


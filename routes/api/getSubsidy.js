const server = require("./server");


module.exports = async function getSubsidy(Authorization) {

    const url = '/kbp/ele/wechat/ele/subsidyPage';

    const payload = { "pageNumber": 1, "pageSize": 15, "username": "25203050234", "name": "裴永林", "roomCode": "BY_4D_1_135", "useEleType": 1 };

    try {
        const res = await server({
            url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Authorization,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': '*/*',
                'Origin': 'https://zwdk.gdxzzy.edu.cn',
                'Referer': 'https://zwdk.gdxzzy.edu.cn/h5/',
            },
            data: payload,
        })
        // 上游 code !== 200（如 token 失效）视为失败，返回 false 不落缓存
        return res.data && res.data.code === 200 ? res.data : false;
    } catch (e) {
        console.log('依赖接口获取补贴错误', e.message);
        return false
    }
}
// POST /kbp/ele/wechat/ele/subsidyPage HTTP/2
// Host: zwdk.gdxzzy.edu.cn
// Content-Length: 95
// User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63090a13) UnifiedPCWindowsWechat(0xf2541f0d) XWEB/25715 Flue
// Content-Type: application/json
// Authorization: eyJhbGciOiJIUzUxMiJ9.eyJyb2xlQ29kZXMiOltdLCJuYW1lIjoi6KO05rC45p6XIiwidG9rZW5UeXBlIjoiQ29tcHV0ZXIiLCJqdGkiOiIxMTcyOTUwMSIsInN1YiI6IjI1MjAzMDUwMjM0IiwiZXhwIjoxODA3ODY1NDgxfQ.fIG3srimiYfHlHbsOJ9GAEeCQ0kIN8BLodJI4XJCsY_jAl5Hnrl_QE2r_dh2vRVD5I0uSOVBLt1qF7Bb6ZoUCg
// Accept: */*
// Origin: https://zwdk.gdxzzy.edu.cn
// Sec-Fetch-Site: same-origin
// Sec-Fetch-Mode: cors
// Sec-Fetch-Dest: empty
// Referer: https://zwdk.gdxzzy.edu.cn/h5/
// Accept-Encoding: gzip, deflate, br
// Accept-Language: zh-CN,zh;q=0.9
// Priority: u=1, i

// {"pageNumber":1,"pageSize":15,"username":"25203050234","roomCode":"BY_4D_1_135","useEleType":1}

// HTTP/2 200 OK
// Server: GFW
// Date: Sun, 18 Oct 2026 08:57:46 GMT
// Content-Type: application/json;charset=UTF-8
// Access-Control-Allow-Origin: https://zwdk.gdxzzy.edu.cn
// Access-Control-Allow-Credentials: true
// Access-Control-Expose-Headers: *
// Access-Control-Max-Age: 18000L

// {"code":200,"msg":"操作成功","data":{"records":[{"id":"111181","amount":0.40,"status":1,"cancelStatus":0,"errorMsg":"补贴","issueTime":"2026-09-17 16:17:28"},{"id":"94641","amount":33.48,"status":1,"cancelStatus":0,"errorMsg":"补贴","issueTime":"2026-09-17 16:07:49"},{"id":"80361","amount":33.48,"status":1,"cancelStatus":0,"errorMsg":"补贴","issueTime":"2026-10-15 09:13:30"},{"id":"52721","amount":334.80,"status":1,"cancelStatus":0,"errorMsg":"补贴","issueTime":"2025-11-25 10:14:02"},{"id":"36301","amount":334.80,"status":1,"cancelStatus":0,"errorMsg":"补贴","issueTime":"2024-09-20 18:30:50"}],"total":5,"size":15,"current":1,"orders":[],"optimizeCountSql":true,"searchCount":true,"countId":null,"maxLimit":null,"pages":1}}

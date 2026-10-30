const server = require("./server");


module.exports = async function getParticular(Authorization, id) {
    // GET /kbp/ele/wechat/pay/deduction/get/10210841
    const url = `/kbp/ele/wechat/pay/deduction/get/${id}`;

    try {
        const res = await server({
            url,
            method: 'GET',
            headers: {
                'Authorization': Authorization,
                'Accept': '*/*',
                'Origin': 'https://zwdk.gdxzzy.edu.cn',
                'Referer': 'https://zwdk.gdxzzy.edu.cn/h5/',
            },
        })
        // 上游 code !== 200（如 token 失效）视为失败，返回 false 不落缓存
        return res.data && res.data.code === 200 ? res.data : false;

    } catch (e) {
        console.log('依赖接口错误获取详细失败', e.message);
        return false
    }
}







/**
 * 获取详细数据
 *
 */


// GET /kbp/ele/wechat/pay/deduction/get/10210841 HTTP/2
// Host: zwdk.gdxzzy.edu.cn
// User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63090a13) UnifiedPCWindowsWechat(0xf2541f0d) XWEB/25715 Flue
// Authorization: eyJhbGciOiJIUzUxMiJ9.eyJyb2xlQ29kZXMiOltdLCJuYW1lIjoi6KO05rC45p6XIiwicGVyc29uVHlwZSI6MCwidG9rZW5UeXBlIjoiTW9iaWxlIiwicGFzc3dvcmQiOiJAUHlsMDgxMyIsImp0aSI6IjExNzI5NTAxIiwic3ViIjoiMjUyMDMwNTAyMzQiLCJleHAiOjE4MDc0MjY5NTN9.4o88THTjHyQi9H8KceX1GDAzmi2WU3DUveL09B60ZQxAFJCB17YGfuOJiSDsJr5r-6VKuZWthhtxuEC4GxLppA
// Accept: */*
// Sec-Fetch-Site: same-origin
// Sec-Fetch-Mode: cors
// Sec-Fetch-Dest: empty
// Referer: https://zwdk.gdxzzy.edu.cn/h5/
// Accept-Encoding: gzip, deflate, br
// Accept-Language: zh-CN,zh;q=0.9
// Priority: u=1, i

// HTTP/2 200 OK
// Server: GFW
// Date: Tue, 13 Oct 2026 07:26:58 GMT
// Content-Type: application/json

// {"code":200,"msg":"操作成功","data":{
// "id":"10210841",
// "consumeSum":10.60,
// "consumeAmount":17.1
// ,"consumeTime":"2026-10-13 00:07:10",
// "consumeTypeName":"预付费扣费",
// "consumeChannelName":"系统代扣",
// "statusName":"交易成功",
// "roomName":"白云校区->4栋->135"
// ,"lastReportTime":"2026-10-12 00:01:57",
// "reportTime":"2026-10-13 00:04:40"
// ,"lastReportElectric":5921.21,
// "reportElectric":5938.31,"beforeBalance":11.90,
// "afterBalance":1.29,
// "calculateTimeDiff":"1天0小时2分",
// "remark":null}}






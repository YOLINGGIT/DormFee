
const server = require("./server");


module.exports = async function getConsumer(Authorization) {

    const url = '/kbp/ele/wechat/ele/rechargePage';

    const payload ={"pageNumber":1,"pageSize":15,"username":"25203050234","name":"裴永林","roomCode":"BY_4D_1_135","useEleType":1};

    try {
        const res = await server({url, 
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
        console.log('依赖接口获取消费数据错误',e.message);
        return false
    }
}
// POST /kbp/ele/wechat/ele/rechargePage HTTP/2
// Host: zwdk.gdxzzy.edu.cn
// Content-Length: 114
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

// {"pageNumber":1,"pageSize":15,"username":"25203050234","name":"裴永林","roomCode":"BY_4D_1_135","useEleType":1}


// HTTP/2 200 OK
// Server: GFW
// Date: Sun, 18 Oct 2026 08:53:50 GMT
// Content-Type: application/json;charset=UTF-8
// Access-Control-Allow-Origin: https://zwdk.gdxzzy.edu.cn
// Access-Control-Allow-Credentials: true
// Access-Control-Expose-Headers: *
// Access-Control-Max-Age: 18000L

// {"code":200,"msg":"操作成功","data":{"records":[{"id":"753761","username":"25203050234","name":"裴永林","outTradeNo":"75892026100310261790172950114731","rechargeStatus":2,"rechargeSum":150.00,"rechargeChannelName":null,"rechargeMethodName":null,"rechargeStatusName":"已充值","errorMsg":"充值","rechargeTime":"2026-10-03 10:26:18","receiptFile":null},{"id":"671601","username":"25203050234","name":"裴永林","outTradeNo":"75892026082012493751472950122273","rechargeStatus":2,"rechargeSum":580.00,"rechargeChannelName":null,"rechargeMethodName":null,"rechargeStatusName":"已充值","errorMsg":"充值","rechargeTime":"2026-08-20 12:49:38","receiptFile":null},{"id":"669861","username":"25203050234","name":"裴永林","outTradeNo":"75892026082008042326672950107561","rechargeStatus":2,"rechargeSum":20.00,"rechargeChannelName":null,"rechargeMethodName":null,"rechargeStatusName":"已充值","errorMsg":"充值","rechargeTime":"2026-08-20 08:04:23","receiptFile":null},{"id":"630261","username":"25203050234","name":"裴永林","outTradeNo":"75892026071311320931572950110743","rechargeStatus":2,"rechargeSum":60.00,"rechargeChannelName":null,"rechargeMethodName":null,"rechargeStatusName":"已充值","errorMsg":"充值","rechargeTime":"2026-07-13 11:32:09","receiptFile":null},{"id":"609981","username":"25203050234","name":"裴永林","outTradeNo":"75892026070808332861272950182166","rechargeStatus":2,"rechargeSum":90.00,"rechargeChannelName":null,"rechargeMethodName":null,"rechargeStatusName":"已充值","errorMsg":"充值","rechargeTime":"2026-07-08 08:33:29","receiptFile":null},{"id":"564941","username":"25203050234","name":"裴永林","outTradeNo":"75892026062610021228772950199806","rechargeStatus":2,"rechargeSum":270.00,"rechargeChannelName":null,"rechargeMethodName":null,"rechargeStatusName":"已充值","errorMsg":"充值","rechargeTime":"2026-06-26 10:02:12","receiptFile":null},{"id":"495491","username":"25203050234","name":"裴永林","outTradeNo":"75892026052909272836872950156015","rechargeStatus":2,"rechargeSum":300.00,"rechargeChannelName":null,"rechargeMethodName":null,"rechargeStatusName":"已充值","errorMsg":"充值","rechargeTime":"2026-05-29 09:27:28","receiptFile":null},{"id":"442741","username":"25203050234","name":"裴永林","outTradeNo":"75892026042919551301572950190295","rechargeStatus":2,"rechargeSum":260.00,"rechargeChannelName":null,"rechargeMethodName":null,"rechargeStatusName":"已充值","errorMsg":"充值","rechargeTime":"2026-04-29 19:55:13","receiptFile":null},{"id":"442731","username":"25203050234","name":"裴永林","outTradeNo":"75892026042919503135872950115595","rechargeStatus":3,"rechargeSum":20.00,"rechargeChannelName":null,"rechargeMethodName":null,"rechargeStatusName":"充值关闭","errorMsg":"订单状态查询异常，请联系管理员~","rechargeTime":"2026-04-29 19:50:31","receiptFile":null},{"id":"442721","username":"25203050234","name":"裴永林","outTradeNo":"75892026042919494051972950172286","rechargeStatus":2,"rechargeSum":20.00,"rechargeChannelName":null,"rechargeMethodName":null,"rechargeStatusName":"已充值","errorMsg":"充值","rechargeTime":"2026-04-29 19:49:41","receiptFile":null},{"id":"442711","username":"25203050234","name":"裴永林","outTradeNo":"75892026042919490336572950107369","rechargeStatus":2,"rechargeSum":20.00,"rechargeChannelName":null,"rechargeMethodName":null,"rechargeStatusName":"已充值","errorMsg":"充值","rechargeTime":"2026-04-29 19:49:03","receiptFile":null}],"total":11,"size":15,"current":1,"orders":[],"optimizeCountSql":true,"searchCount":true,"countId":null,"maxLimit":null,"pages":1}}
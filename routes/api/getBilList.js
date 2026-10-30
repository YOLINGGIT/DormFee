const server = require("./server");


module.exports = async function getBillList(Authorization, Pagination) {

    const url = '/kbp/ele/wechat/pay/deduction/list';

    const payload = JSON.stringify({
        username: '25203050234',
        roomCode: 'BY_4D_1_135',
        useEleType: 1,
        ...Pagination
    });

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
        console.log('依赖接口错误获取账单',e.message);
        return false
    }
}



/*
获取账单数据
*/

// POST /kbp/ele/wechat/pay/deduction/list HTTP/2
// Host: zwdk.gdxzzy.edu.cn
// Content-Length: 95
// User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63090a13) UnifiedPCWindowsWechat(0xf2541f0d) XWEB/25715 Flue
// Content-Type: application/json
// Authorization: eyJhbGciOiJIUzUxMiJ9.eyJyb2xlQ29kZXMiOltdLCJuYW1lIjoi6KO05rC45p6XIiwicGVyc29uVHlwZSI6MCwidG9rZW5UeXBlIjoiTW9iaWxlIiwicGFzc3dvcmQiOiJAUHlsMDgxMyIsImp0aSI6IjExNzI5NTAxIiwic3ViIjoiMjUyMDMwNTAyMzQiLCJleHAiOjE4MDc0MjY5NTN9.4o88THTjHyQi9H8KceX1GDAzmi2WU3DUveL09B60ZQxAFJCB17YGfuOJiSDsJr5r-6VKuZWthhtxuEC4GxLppA
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


// HTTP / 2 200 OK
// Server: GFW
// Date: Tue, 13 Oct 2026 07: 17: 32 GMT
// Content - Type: application / json; charset = UTF - 8
// Access - Control - Allow - Origin: https://zwdk.gdxzzy.edu.cn
// Access - Control - Allow - Credentials: true
// Access - Control - Expose - Headers: *
//     Access - Control - Max - Age: 18000L
// {"code":200,"msg":"操作成功",
// "data":{"records":[{"calculateTimeDiff":"1天0小时2分","
// list":[{"id":"10210841",
// "consumeSum":10.60,  //消费价格
// "consumeAmount":17.1," //消费电量
// consumeTime":"2026-10-13 00:07:10", //消费时间
// consumeTypeName":"预付费扣费", //消费类型
// "consumeChannelName":null,
// "statusName":"交易成功",
// "roomName":null,
// "lastReportTime":"2026-10-12 00:01:57",
// "reportTime":"2026-10-13 00:04:40",
// "lastReportElectric":5921.21,
// "reportElectric":5938.31,
// "beforeBalance":1190,
// "afterBalance":129,
// "calculateTimeDiff":null,
// "remark":null}]},
// {"calculateTimeDiff":"1天0小时5分","list":[{"id":"10197531","consumeSum":11.93,"consumeAmount":19.24,"consumeTime":"2026-10-12 00:07:22","consumeTypeName":"预付费扣费","consumeChannelName":null,"statusName":"交易成功","roomName":null,"lastReportTime":"2026-10-10 23:56:13","reportTime":"2026-10-12 00:01:57","lastReportElectric":5901.97,"reportElectric":5921.21,"beforeBalance":1340,"afterBalance":147,"calculateTimeDiff":null,"remark":null}]},{"calculateTimeDiff":"0天23小时52分","list":[{"id":"10183981","consumeSum":8.20,"consumeAmount":13.23,"consumeTime":"2026-10-11 00:07:10","consumeTypeName":"预付费扣费","consumeChannelName":null,"statusName":"交易成功","roomName":null,"lastReportTime":"2026-10-10 00:04:12","reportTime":"2026-10-10 23:56:13","lastReportElectric":5888.74,"reportElectric":5901.97,"beforeBalance":986,"afterBalance":166,"calculateTimeDiff":null,"remark":null}]},{"calculateTimeDiff":"1天0小时2分","list":[{"id":"10170331","consumeSum":9.58,"consumeAmount":15.45,"consumeTime":"2026-10-10 00:07:28","consumeTypeName":"预付费扣费","consumeChannelName":null,"statusName":"交易成功","roomName":null,"lastReportTime":"2026-10-09 00:01:51","reportTime":"2026-10-10 00:04:12","lastReportElectric":5873.29,"reportElectric":5888.74,"beforeBalance":1137,"afterBalance":179,"calculateTimeDiff":null,"remark":null}]},{"calculateTimeDiff":"1天0小时5分","list":[{"id":"10155911","consumeSum":5.81,"consumeAmount":9.38,"consumeTime":"2026-10-09 00:07:20","consumeTypeName":"预付费扣费","consumeChannelName":null,"statusName":"交易成功","roomName":null,"lastReportTime":"2026-10-07 23:56:23","reportTime":"2026-10-09 00:01:51","lastReportElectric":5863.91,"reportElectric":5873.29,"beforeBalance":776,"afterBalance":194,"calculateTimeDiff":null,"remark":null}]},{"calculateTimeDiff":"0天23小时52分","list":[{"id":"10141491","consumeSum":5.83,"consumeAmount":9.4,"consumeTime":"2026-10-08 00:07:25","consumeTypeName":"预付费扣费","consumeChannelName":null,"statusName":"交易成功","roomName":null,"lastReportTime":"2026-10-07 00:03:52","reportTime":"2026-10-07 23:56:23","lastReportElectric":5854.51,"reportElectric":5863.91,"beforeBalance":786,"afterBalance":204,"calculateTimeDiff":null,"remark":null}]},{"calculateTimeDiff":"1天0小时1分","list":[{"id":"10127621","consumeSum":2.81,"consumeAmount":4.53,"consumeTime":"2026-10-07 00:07:17","consumeTypeName":"预付费扣费","consumeChannelName":null,"statusName":"交易成功","roomName":null,"lastReportTime":"2026-10-06 00:01:53","reportTime":"2026-10-07 00:03:52","lastReportElectric":5849.98,"reportElectric":5854.51,"beforeBalance":494,"afterBalance":213,"calculateTimeDiff":null,"remark":null}]},{"calculateTimeDiff":"0天23小时58分","list":[{"id":"10114961","consumeSum":0.99,"consumeAmount":1.59,"consumeTime":"2026-10-06 00:07:21","consumeTypeName":"预付费扣费","consumeChannelName":null,"statusName":"交易成功","roomName":null,"lastReportTime":"2026-10-05 00:03:41","reportTime":"2026-10-06 00:01:53","lastReportElectric":5848.39,"reportElectric":5849.98,"beforeBalance":317,"afterBalance":218,"calculateTimeDiff":null,"remark":null}]},{"calculateTimeDiff":"1天0小时2分","list":[{"id":"10103051","consumeSum":5.14,"consumeAmount":8.29,"consumeTime":"2026-10-05 00:07:25","consumeTypeName":"预付费扣费","consumeChannelName":null,"statusName":"交易成功","roomName":null,"lastReportTime":"2026-10-04 00:01:22","reportTime":"2026-10-05 00:03:41","lastReportElectric":5840.10,"reportElectric":5848.39,"beforeBalance":734,"afterBalance":219,"calculateTimeDiff":null,"remark":null}]},{"calculateTimeDiff":"0天23小时57分","list":[{"id":"10091401","consumeSum":11.63,"consumeAmount":18.76,"consumeTime":"2026-10-04 00:07:35","consumeTypeName":"预付费扣费","consumeChannelName":null,"statusName":"交易成功","roomName":null,"lastReportTime":"2026-10-03 00:04:22","reportTime":"2026-10-04 00:01:22","lastReportElectric":5821.34,"reportElectric":5840.10,"beforeBalance":1391,"afterBalance":228,"calculateTimeDiff":null,"remark":null}]},{"calculateTimeDiff":"1天0小时3分","list":[{"id":"10079711","consumeSum":13.26,"consumeAmount":21.39,"consumeTime":"2026-10-03 00:07:30","consumeTypeName":"预付费扣费","consumeChannelName":null,"statusName":"交易成功","roomName":null,"lastReportTime":"2026-10-02 00:00:28","reportTime":"2026-10-03 00:04:22","lastReportElectric":5799.95,"reportElectric":5821.34,"beforeBalance":1331,"afterBalance":5,"calculateTimeDiff":null,"remark":null}]},{"calculateTimeDiff":"1天0小时3分","list":[{"id":"10067241","consumeSum":17.12,"consumeAmount":27.61,"consumeTime":"2026-10-02 00:07:20","consumeTypeName":"预付费扣费","consumeChannelName":null,"statusName":"交易成功","roomName":null,"lastReportTime":"2026-09-30 23:57:27","reportTime":"2026-10-02 00:00:28","lastReportElectric":5772.34,"reportElectric":5799.95,"beforeBalance":1738,"afterBalance":26,"calculateTimeDiff":null,"remark":null}]},{"calculateTimeDiff":"1天0小时2分","list":[{"id":"10053451","consumeSum":14.55,"consumeAmount":23.47,"consumeTime":"2026-10-01 00:07:25","consumeTypeName":"预付费扣费","consumeChannelName":null,"statusName":"交易成功","roomName":null,"lastReportTime":"2026-09-29 23:54:56","reportTime":"2026-09-30 23:57:27","lastReportElectric":5748.87,"reportElectric":5772.34,"beforeBalance":1509,"afterBalance":54,"calculateTimeDiff":null,"remark":null}]},{"calculateTimeDiff":"0天23小时56分","list":[{"id":"10038311","consumeSum":19.04,"consumeAmount":30.71,"consumeTime":"2026-09-30 00:07:15","consumeTypeName":"预付费扣费","consumeChannelName":null,"statusName":"交易成功","roomName":null,"lastReportTime":"2026-09-28 23:58:39","reportTime":"2026-09-29 23:54:56","lastReportElectric":5718.16,"reportElectric":5748.87,"beforeBalance":1981,"afterBalance":77,"calculateTimeDiff":null,"remark":null}]},{"calculateTimeDiff":"1天0小时3分","list":[{"id":"10023081","consumeSum":16.88,"consumeAmount":27.22,"consumeTime":"2026-09-29 00:07:31","consumeTypeName":"预付费扣费","consumeChannelName":null,"statusName":"交易成功","roomName":null,"lastReportTime":"2026-09-27 23:55:13","reportTime":"2026-09-28 23:58:39","lastReportElectric":5690.94,"reportElectric":5718.16,"beforeBalance":1796,"afterBalance":108,"calculateTimeDiff":null,"remark":null}]}],"total":152,"size":15,"current":1,"orders":[],"optimizeCountSql":true,"searchCount":true,"countId":null,"maxLimit":null,"pages":11}}

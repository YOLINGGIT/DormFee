const server = require("./server")

module.exports = async function getBalance(Authorization) {
    const payload = {
        "useEleType": "1", "roomCode": "BY_4D_1_135"
    }
    const url = '/kbp/ele/wechat/ele/eleBalance'
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
        console.log('依赖接口错误获取余额失败', e.message);
        return false
    }
}
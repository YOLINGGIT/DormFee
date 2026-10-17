var express = require('express');
var router = express.Router();
const { getCachedData } = require('./cache');
const getBilList = require('./api/getBilList');
const getAccent = require('./api/getAccent');
const getParticular = require('./api/getParticular');
const getBalance = require('./api/getBalance');

/**
 * 单独获取并缓存 access token
 * token 通常有效期较长（如 2h / 24h），单独缓存可以避免每次请求都重新获取，
 * 也不会把 token 和分页数据混在一起。
 */
async function getAccessToken() {
    return await getCachedData('access_token', async () => {
        console.log('enter door acce');
        const res = await getAccent();
        const { data } = res;
        // 这里返回 token 字符串，缓存层会把它存起来
        return data.accessToken;
    });
}

router.get('/bill', async (req, res) => {
    const { pageNumber, pageSize } = req.query;

    // 分页数据单独一个 key，和 token 互不影响
    const cacheKey = `bill:list:${pageNumber}:${pageSize}`;

    // 1. 从缓存取 token，过期才重新请求
    const token = await getAccessToken();

    // 2. 用 token 拉取当前页的账单数据
    const data = await getCachedData(cacheKey, async () => {
        const resbill = await getBilList(token, {
            pageNumber,
            pageSize,
        });
        return resbill;
    });
    if (data) {
        res.json(data);

    } else {
        res.status(500).json({ code: 500, msg: '获取账单数据失败' });
    }

});
router.get('/particular/:id', async (req, res) => {
    const { id } = req.params;
    // 分页数据单独一个 key，和 token 互不影响
    const cacheKey = `particular:id:${id}`;
    // 1. 从缓存取 token，过期才重新请求
    const token = await getAccessToken();

    // 2. 用 token 拉取当前页的账单数据
    const data = await getCachedData(cacheKey, async () => {
        const res = await getParticular(token, id);

        return res;
    });
    if (data) {
        res.json(data);
    } else {
        res.status(500).json({ code: 500, msg: '获取详细账单数据失败' });
    }


});
router.get('/balance', async (req, res) => {
    const token = await getAccessToken();
    const cacheKey = 'balance'
    // 2. 用 token 拉取当前页的账单数据
    const data = await getCachedData(cacheKey, async () => {
        const res = await getBalance(token);
        return res;
    });
    if (data) {
        res.json(data);
    } else {
        res.status(500).json({ code: 500, msg: '获取余额数据失败' });
    }

})
module.exports = router;
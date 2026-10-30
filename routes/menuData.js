var express = require('express');
var router = express.Router();
const { getCachedData, deleteCache } = require('./cache');
const getBilList = require('./api/getBilList');
const getAccent = require('./api/getAccent');
const getParticular = require('./api/getParticular');
const getBalance = require('./api/getBalance');
const getconsumer = require('./api/getConsumer');
const getSubsidy = require('./api/getSubsidy');

/**
 * 单独获取并缓存 access token
 * token 通常有效期较长（如 2h / 24h），单独缓存可以避免每次请求都重新获取，
 * 也不会把 token 和分页数据混在一起。
 * 登录失败返回 false，缓存层不会缓存失败结果，下次请求会重新登录。
 */
async function getAccessToken() {
    return await getCachedData('access_token', async () => {
        // getAccent 内部已判断上游 code：成功返回 accessToken 字符串，失败返回 false
        return await getAccent();
    });
}

/**
 * 带认证的数据获取。
 * 账号密码是多人共用的：别人在其他网站登录后，服务器会签发新 token 作废旧 token，
 * 我们缓存的 token 随之失效，上游请求失败（api 模块统一返回 false）。
 * 失败时：清除 access_token 缓存强制重新登录，并清除业务数据缓存，用新 token 重试一次。
 * 上游 code 的判断在各 api 模块内部完成，这里只有成功数据（truthy）才会进入缓存。
 */
async function fetchWithAuth(cacheKey, fetchFn) {
    const attempt = () => {
        return getCachedData(cacheKey, async () => {
            const token = await getAccessToken();
            return await fetchFn(token);
        });
    };

    let data = await attempt();
    if (!data) {
        // token 可能已被其他登录替换 → 清缓存重新登录，再试一次
        deleteCache('access_token');
        deleteCache(cacheKey);
        data = await attempt();
        console.log('有人在网站外登录');
    }
    return data;
}

router.get('/bill', async (req, res) => {
    const { pageNumber, pageSize } = req.query;

    // 分页数据单独一个 key，和 token 互不影响
    const cacheKey = `bill:list:${pageNumber}:${pageSize}`;

    const data = await fetchWithAuth(cacheKey, (token) =>
        getBilList(token, { pageNumber, pageSize })
    );

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

    const data = await fetchWithAuth(cacheKey, (token) =>
        getParticular(token, id)
    );

    if (data) {
        res.json(data);
    } else {
        res.status(500).json({ code: 500, msg: '获取详细账单数据失败' });
    }


});
router.get('/balance', async (req, res) => {
    const cacheKey = 'balance'

    const data = await fetchWithAuth(cacheKey, (token) =>
        getBalance(token)
    );

    if (data) {
        res.json(data);
    } else {
        res.status(500).json({ code: 500, msg: '获取余额数据失败' });
    }

})
router.get('/consumer', async (req, res) => {
    const cacheKey = 'Consumer'

    const data = await fetchWithAuth(cacheKey, (token) =>
        getconsumer(token)
    );

    if (data) {
        res.json(data);
    } else {
        res.status(500).json({ code: 500, msg: '获取消费数据失败' });
    }

})
router.get('/subsidy', async (req, res) => {
    const cacheKey = 'Subsidy'

    const data = await fetchWithAuth(cacheKey, (token) =>
        getSubsidy(token)
    );

    if (data) {
        res.json(data);
    } else {
        res.status(500).json({ code: 500, msg: '获取补贴数据失败' });
    }

})
module.exports = router;

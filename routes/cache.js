// cache.js
const caches = new Map();
const pending = new Map(); // key -> 进行中的 fetch Promise，同 key 并发只触发一次请求
const DEFAULT_TTL = 100 * 60 * 1000; // 100分钟
const CLEANUP_INTERVAL = 60 * 1000; // 每1分钟清理一次

let cleanupTimer = null;

function startCleanup() {
  if (cleanupTimer) return; // 防止重复启动
  cleanupTimer = setInterval(() => {
    const now = Date.now();
    let cleaned = 0;
    for (const [key, cached] of caches.entries()) {
      // 完全过期且不在后台刷新中的数据，直接删除
      if (now - cached.timestamp > DEFAULT_TTL && !cached.refreshing) {
        caches.delete(key);
        cleaned++;
      }
    }
    if (cleaned > 0) {
      console.log(`[Cache] 清理了 ${cleaned} 条过期缓存，当前缓存数: ${caches.size}`);
    }
  }, CLEANUP_INTERVAL);
}

// 模块加载时自动启动清理
startCleanup();

// 主动清除某条缓存（token 被替换失效时使用）
function deleteCache(key) {
  caches.delete(key);
}

async function getCachedData(key, fetchFn, ttl = DEFAULT_TTL) {
  const now = Date.now();
  const cached = caches.get(key);

  if (cached && now - cached.timestamp < ttl) {
    // 半过期时后台刷新
    if (now - cached.timestamp > ttl * 0.7 && !cached.refreshing) {
      cached.refreshing = true;
      fetchFn().then(newData => {
        if (newData) {
          caches.set(key, { data: newData, timestamp: Date.now(), refreshing: false });
        } else {
          // 刷新失败：保留旧数据，下次请求再尝试刷新
          cached.refreshing = false;
        }
      }).catch(() => {
        cached.refreshing = false;
      });
    }
    return cached.data;
  }

  // 无缓存或已完全过期：同 key 的并发请求共用一个 fetch（单飞），避免重复调上游
  if (pending.has(key)) {
    return pending.get(key);
  }

  const p = fetchFn()
    .then(newData => {
      pending.delete(key);
      // 失败（falsy）结果不写缓存，让下次请求重试
      if (newData) {
        caches.set(key, { data: newData, timestamp: Date.now(), refreshing: false });
      }
      return newData;
    })
    .catch(err => {
      pending.delete(key);
      throw err;
    });
  pending.set(key, p);
  return p;
}

module.exports = { getCachedData, deleteCache };

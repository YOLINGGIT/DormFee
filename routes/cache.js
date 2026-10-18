// cache.js
const caches = new Map();
const DEFAULT_TTL = 100 * 60 * 1000; // 5分钟
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

async function getCachedData(key, fetchFn, ttl = DEFAULT_TTL) {
  const now = Date.now();
  const cached = caches.get(key);

  if (cached && now - cached.timestamp < ttl) {
    // 半过期时后台刷新
    if (now - cached.timestamp > ttl * 0.7 && !cached.refreshing) {
      cached.refreshing = true;
      fetchFn().then(newData => {
        caches.set(key, { data: newData, timestamp: Date.now(), refreshing: false });
      }).catch(() => {
        cached.refreshing = false;
      });
    }
    return cached.data;
  }

  // 无缓存或已完全过期，同步拉取
  const newData = await fetchFn();
  caches.set(key, { data: newData, timestamp: Date.now(), refreshing: false });
  return newData;
}

module.exports = { getCachedData };
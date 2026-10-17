const axios = require('axios').default;
module.exports =  axios.create({
  baseURL: 'https://zwdk.gdxzzy.edu.cn',
  timeout: 10000,
});



//let netUrl = 'http://www.lvjiayuan.net/public/index.php/api/';
let localUrl = 'http://127.0.0.1:8000/index.php/api/'
let netUrl = 'http://www.lvjiayuan.net/public/index.php/api/';
//let localUrl = 'http://10.1.237.10/shop_api_1912/public/index.php/api/'

module.exports = {
    devServer: {
      proxy: localUrl
    }
  }
  
  
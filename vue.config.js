
//let netUrl = 'http://www.lvjiayuan.net/public/index.php/api/';
let localUrl = 'http://127.0.0.1:8000/index.php/api/'
module.exports = {
    devServer: {
      proxy: localUrl
    }
  }
  
  
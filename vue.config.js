
let localUrl = 'http://127.0.0.1:8000/index.php/api/'
let netUrl = 'http://www.lvjiayuan.net/public/index.php/api/';

// vuecli 包含量webpack 关于vue开发环境的很多默认配置; 
// 修改默认配置，新的配置项写到vue.config.js文件里来覆盖默认配置;

module.exports = {
   
    devServer: {
      proxy: netUrl
    },
    
    publicPath:'./',
    
    // 链式配置
    chainWebpack:config=>{
      
      //发布模式
      config.when(process.env.NODE_ENV === 'production',config=>{
          config.plugin('html').tap(args=>{
              args[0].isProd = true
              return args
          })
          config.set('externals',{
            vue:'Vue',
            'element-ui':'ELEMENT'
          })
          config.entry('app').clear().add('./src/main-prod.js')
      })

    //开发模式
    config.when(process.env.NODE_ENV === 'development',config=>{
        config.plugin('html').tap(args=>{
          args[0].isProd = false
          return args
        })
        config.entry('app').clear().add('./src/main-dev.js')
    })
  }

}


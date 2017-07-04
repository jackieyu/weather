# weather
angular 天气预报

# 简介
主要使用的是angularjs、nodejs、阿凡达数据的公共API，简单的实现天气预报和新闻的展示与获取，可直接clone到本地运行，
gulp用于自动构建


# 使用
1. 首先安装所需要的包: npm install
2. 添加运行所需要的js库，譬如angular-ui-router : 
    bower install 
3. 启动本地服务器，用于获取天气预报的数据 :
  npm run server
4. 启动客户端 :
  npm run client
5. 简单的构建发布版本(压缩合并) :
  npm run client:build

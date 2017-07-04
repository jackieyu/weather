
const http 		    = require('http');
const queryString 	= require('query-string')
const re 			= require('superagent');
const url 			= require('url')

// 需要替换为自己的阿凡达数据的天气预报key
const weatherkey = "cb5ae15cfa494067836de73709ba4e25";

//需要替换为自己的阿凡达数据的新闻key
const newskey = "26ce86f7c93d48939a6216c199ab19c8";


let data ="";
var getWeather = function (cityname, response){
	data = "";
	re.get('http://api.avatardata.cn/Weather/Query')
		.query({key:weatherkey,
				cityname:cityname || "北京"})
		.end(function(err, res){
			data = JSON.stringify(res.body);
			response.writeHeader(200, {'Content-Type':'text/html;charset=utf-8'});
			response.write(data);
			response.end();
		})
}

var getNews = function(params,response){
	data = "";
	re.get('http://api.avatardata.cn/TravelNews/Query')
		.query({
			key: newskey,
			rows: params.rows,
			page: params.page
		})
		.end(function(err, res){
			if(err){
				console.warn(err)
			}else{
				console.log(res);
				data = JSON.stringify(res.body);
				response.writeHeader(200, {'Content-Type':'text/html; charset=utf-8'})
				response.write(data);
				response.end();
			}
		})
}


let server = http.createServer(function(req, res){
	res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	
	let pathname = url.parse(req.url).pathname;
	let params = url.parse(req.url, true).query;
	if(pathname === "/weather"){
		//获取天气的数据
		getWeather(params.cityname, res);
	}else if(pathname === "/news"){
		getNews(params, res);
	}
})

server.listen("8808", function(){
	console.log("running server at localhost:8808")
})





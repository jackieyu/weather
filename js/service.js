angular.module('serviceModule', [])
	.service('weatherService', ['$http','$q', 'Config', function($http, $q, Config){
		var self = {
			weatherResult: null,
			requestWeatherResource: function(palcename){
				if(palcename && palcename.length < 1 ){
					palcename = null;
				}
				var deferred = $q.defer();
				$http({
					method:'get',
					url: Config.serverurl + "/weather",//'./js/weather.json',
					params: {
						cityname: palcename
					}
				}).then(function(data){
					if(data.data.error_code === 0){
						self.weatherResult = data.data.result;
						deferred.resolve();
					}else{
						deferred.reject(data);
					}
				}, function(err){
					deferred.reject(err);
				})
				return deferred.promise;
			}
		}

		return self;
	}])

	.service('newsService', ['$http','$q','Config', function($http, $q, Config){
		var self = {
			newsResult: null,
			page: 1,
			rows: 10,
			isLoadMore: false,
			hasMore: true,
			requestLocalNews: function(){
				//新闻类的数据有可能在维护中,当取不到最新的新闻，就取本地的新闻json	
				var deferred = $q.defer();
				$http({
					method:'get',
					url: './js/news.json'
				}).then(function(data){
					deferred.resolve(data);
				},function(err){
					console.log(err);
				})
				return deferred.promise;
			},
			requestNewsResource: function(){
				var deferred = $q.defer();
				$http({
					method:'get',
					url: Config.serverurl + "/news", //'./js/news.json',
					params:{
						page:self.page,
						rows: self.rows
					}
				}).then(function(data){
					if(data.data.error_code === 0){
						if(data.data.result){
							self.newsResult = self.isLoadMore ? self.newsResult.concat(data.data.result) : data.data.result;
						}else{
							self.hasMore = false;

							if (!self.newsResult){
								self.requestLocalNews().then(function(data){
									self.newsResult = data.data.result;
									deferred.resolve();
								},function(){
									deferred.reject("获取数据失败");
								})
							}
						}
						deferred.resolve();
					}else{
						deferred.reject();
					}
					self.isLoadMore = false;
				}, function(err){
					deferred.reject();
				})
				return deferred.promise;
			},
			loadMore: function(){
				self.isLoadMore = true;
				self.page ++ ;
				var deferred = $q.defer();
				self.requestNewsResource().then(function(){
					deferred.resolve();
				}, function(err){
					deferred.reject(err);
				})
				return deferred.promise;
			}
		}

		return self;
	}])
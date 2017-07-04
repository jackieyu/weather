angular.module('controllerModule', ['serviceModule'])
	.controller('weatherController', ['$scope', 'weatherService','$filter','$timeout', function($scope, weatherService, $filter, $timeout){
		$scope.weatherService = weatherService;
		$scope.data = {};
		$scope.searchWeather = function(){
			$scope.data.placename = $scope.data.placename || weatherService.cityname;
			$scope.weatherService.requestWeatherResource($scope.data.placename).then(function(){
				//获取天气数据成功
				//获取天气的图标
				$scope.data.errmsg = null;
				$scope.weatherService.cityname = $scope.data.placename;
				$scope.weatherService.weatherResult.iconid = $filter('weathericon')($scope.weatherService.weatherResult.realtime.weather.info);
			},function(data){
				//获取失败
				$scope.data.errmsg = "暂未收录该城市的天气状况";
				$timeout(function(){
					$scope.data.errmsg = null
				}, 5000)
			})
		}

		$scope.searchWeather();
	}])
	.controller('newsController', ['$scope',  'newsService', function($scope, newsService){
		$scope.newsService = newsService;
		$scope.newsService.requestNewsResource().then(function(){

		},function(err){
			console.warn(err);
		})

		$scope.loadMore = function(){
			$scope.newsService.loadMore().then(function(){

			}, function(err){

			})
		}
	}])
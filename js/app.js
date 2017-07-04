angular.module('app', ['ngRoute', 'ui.router', 'controllerModule', 'directiveModule', 'filterModule', 'app.Config', 'templates']).config([
  '$routeProvider',
  '$httpProvider',
  '$stateProvider',
  '$urlRouterProvider',

  function ($routeProvider, $httpProvider, $stateProvider, $urlRouterProvider) {
  	$stateProvider
  		.state('weather', {
  			url: '/weather',
  			templateUrl: 'views/weather.html',
  			controller: 'weatherController'
  		})
  		.state('news', {
  			url: '/news',
  			templateUrl: 'views/news.html',
  			controller: 'newsController'
  		})

  	$urlRouterProvider.when('', '/weather')
  		.otherwise('/weather');

    // $routeProvider.when('/', { template: '<h1>This is an inline template</h1>' }).when('/login', { template: '<div>login</div>' }).when('/home', {
    //   templateUrl: 'views/home.html',
    //   controller: 'HomeController',
    //   resolve: {
    //     'data': function () {
    //       return 'test resolve property';
    //     }
    //   }
    // }).otherwise({ redirectTo: '#!/home' });
  }
])
	// $http.jsonp('http://api.avatardata.cn/Weather/Query?key=cb5ae15cfa494067836de73709ba4e25&cityname=武汉&callback=JSONP_CALL_BACK')
	// 	.then(function(data){
	// 		console.log("data",data);
	// 	})
	// $http({
	// 	method:"get",
	// 	url: "http://api.avatardata.cn/Weather/Query?key=cb5ae15cfa494067836de73709ba4e25&cityname=武汉"//"http://api.openweathermap.org/data/2.5/weather",
	// 	// params:{
	// 	// 	q: 'Waizi',
	// 	// 	APPID: 'd2ac0d779982be38d8c69ff26d8e9871'
	// 	// }
	// }).then(function(data){
	// 	console.log("success>>>");
	// }, function(data){
	// 	console.log("error>>>>")
	// })

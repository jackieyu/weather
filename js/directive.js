angular.module('directiveModule', [])
	.directive('weatherDirective',[function(){
		return {
			restrict: 'E',
			scope:{
				result: '=',
				weatherIcon: '&'
			},
			templateUrl: 'template/weather.html',
			// link: function(scope){
			// 	var ele = document.getElementById('weather');
			// 	var iEle = document.createElement('i');
			// 	console.log(iEle);
			// 	console.log(ele);
			// 	iEle.style.fontSize = "1rem";
			// 	console.log(">>>", scope.result.iconid)
			// 	iEle.className = scope.result.iconid;
			// 	ele.appendChild(iEle);
			// 	// ele.innerHTML = "<i class='" + scope.result.iconid + "' style='font-size:1rem;'></i>"
			// 	// angular.element('#weather');
			// }
		}
	}])

	.directive('newsDirective', [function(){
		return {
			restrict: 'E',
			scope: {
				result: '=',
				loadMore: '&'
			},
			templateUrl: 'template/news.html',
			link: function(scope){
				scope.open = function(url){
					window.open(url, '_blank')
				}
			}
		}
	}])
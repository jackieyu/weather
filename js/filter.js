

angular.module('filterModule', [])
	.filter('formatlife', function(){
		return function(lifeinfo){
			var result = lifeinfo
			angular.forEach(filterItem.lifeinfo, function(item, index){
				if(lifeinfo == item.id) {
					result = item.text;
				}
			})
			return result;
		}
	})

	.filter('weathericon', function(){
		return function(weather){
			var icon = ''
			angular.forEach(filterItem.weatherIcon, function(item, index){
				if(item.text == weather){
					icon = item.icon_id;
				}
			})

			return icon
		}
	})
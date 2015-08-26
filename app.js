//  weather app
var weatherApp= angular.module('weatherApp',['ngRoute', 'ngResource','ngMessages']);

//Route
weatherApp.config(function($routeProvider){
    
                  $routeProvider
                  
                  .when( '/', {
                      templateUrl: "pages/home.html",
                      controller: 'maincontroller'
                      })
                  
                  
                  .when('/second',{
                      templateUrl: 'pages/forecast.html',
                      controller: 'secondcontroller'
                      })
                  
                  
                  
                 
});

//Custom Service
weatherApp.service('cityService',function(){
this.city="New York";
this.days= "";    
}); 


weatherApp.controller('maincontroller',['$scope','$location','$resource','cityService', function($scope,$location, $resource, cityService){
    $scope.city= cityService.city;
    $scope.days= cityService.days;
    $scope.$watch('city',function(){
        cityService.city=$scope.city;
       
        ;
        })
     $scope.$watch('days',function(){
        cityService.days=$scope.days;
       
        ;
        })
     
    $scope.submit= function(){
     
   $location.path("/second");
     
     
        }
}]);

weatherApp.controller('secondcontroller',['$scope','$location','$resource','cityService', function($scope, $location, $resource, cityService){
$scope.city= cityService.city;
 $scope.days= cityService.days;

    $scope.weatherapi = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",{callback: "JSON_CALLBACK"},{get:{method: "JSONP"}});
    
    $scope.weatherResult= $scope.weatherapi.get({q:$scope.city, cnt: $scope.days});
    
    $scope.convertToFarheniet = function(K){
    
        
return Math.round((K - 273.15)* 1.8000 + 32.00);
    };
    
    $scope.convertToCelcius = function(K){
    
        
return Math.round(K - 273.15);
    };
    
    
    $scope.convertToDate= function(date){
    
    return new Date(date * 1000);
    
    };


     
}]);
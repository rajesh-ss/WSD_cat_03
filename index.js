
var app = angular.module('myApp');
app.controller('stctrl', function($scope, $http) {
    $http.get('http://localhost:3000/')
    .success(function(response)
    {
    $scope.st_record=response;
    console.log($scope.st_record)
    });
    });
(function() {
  "use strict";
  angular.module("myApp", ['ngRoute', 'mgcrea.ngStrap'])
  .config(function($routeProvider){
    $routeProvider
    .when('/', {
      templateUrl: "views/table.html",
      controller: "AmazonController",
      controllerAs: "aC"
    })
    .when('/new', {
      templateUrl: "views/form.html",
      controller: "AmazonController",
      controllerAs: "aC"
    })
  })
  .controller("AmazonController", function($http){
    var vm = this;
    $http.get("https://nsswishlist.firebaseio.com/Wishes.json")
    .success(function(data){
      vm.Wishes = data;
      console.log("it works!");
    })
    .error(function(err){
      console.log(err);
    })
    vm.addNewWish = function(){
      var url = "https://nsswishlist.firebaseio.com/Wishes.json";
      $http.post(url, vm.newWish)
      .success(function(data){
        vm.Wishes[data.name] = vm.newWish;
        vm.newWish = null;
        console.log("it works!");
      })
      .error(function(err){
        console.log(err);
      })
    }
    vm.deleteWish = function(wishId){
      var url = "https://nsswishlist.firebaseio.com/Wishes/" + wishId + ".json";
      $http.delete(url)
      .success(function(){
        delete vm.Wishes[wishId]
        console.log("it works!");
      })
      .error(function(err){
        console.log(err);
      })
    }
  })
}());

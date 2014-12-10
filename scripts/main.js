(function() {
  "use strict";
  angular.module("myApp", ['ngRoute', 'mgcrea.ngStrap'])
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

  })
}());

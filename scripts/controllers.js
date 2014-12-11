(function() {
  "use strict";
  angular.module("myApp")

  .controller("ShowController", function($routeParams, WishFactory) {
    var vm = this,
        id = $routeParams.id;
    WishFactory.getWish(id, function(data) {
      vm.wish = data;
    });

    vm.removeWish = function(id) {
      WishFactory.removeWish(id, function() {
        delete vm.Wishes[id];
      })
    };
  })
  .controller("EditWishController", function($routeParams, WishFactory) {
    var vm = this,
        id = $routeParams.id;

    WishFactory.getWish(id, function(data) {
      vm.newWish = data;
    })

    vm.addNewWish = function() {
      WishFactory.editWish(id, vm.newWish)
    };
  })
  .controller("AmazonController", function($http, WishFactory) {
    var vm = this;
    WishFactory.getAllWishes(function(data) {
      vm.Wishes = data;
    })
    vm.addNewWish = function() {
      WishFactory.addNewWish(vm.newWish, function(data) {
        vm.Wishes[data.name] = vm.newWish;
      });
    };
    vm.removeWish = function(wishId) {
      WishFactory.removeWish(wishId, function() {
        delete vm.Wishes[wishId];
      })
    };

  })
}());

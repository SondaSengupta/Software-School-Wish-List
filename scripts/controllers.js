(function() {
  "use strict";
  angular.module("myApp")
  .controller("LoginController", function($scope, $location, authFactory) {
    var vm = this;
     vm.login = function() {
        authFactory.login(vm.email, vm.password, function() {
          $location.path("/");
          $scope.$apply();

        });
      };

    vm.register = function() {
      authFactory.register(vm.email, vm.password, function() {
          vm.login();
        });
    }

    vm.forgotPassword = function() {
      authFactory.resetPassword(vm.email)
    };

  })

  .controller("LogoutController", function($scope, $location) {
      var ref = new Firebase("https://sondansswishlist.firebaseio.com/");

      ref.unauth(function() {
        $location.path("/");
        $scope.$apply();
        var whoIsUser = ref.getAuth();
        console.log( "The user logged in right now is " + whoIsUser );
      });
    })

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

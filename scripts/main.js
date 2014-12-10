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
    .when('/:id', {
      templateUrl: "views/show.html",
      controller: "ShowController",
      controllerAs: "show"
    })
    .otherwise({redirectTo: '/'});
  })
  .factory("WishFactory", function($http, $location){

    function getWish(id, cb){
      var url = "https://nsswishlist.firebaseio.com/Wishes/"+id+".json"
      $http.get(url)
      .success(function(data){
        cb(data);
      })
      .error(function(err){
        console.log(err);
      });
    }
    function editWish(id, wish){
      var url = "https://nsswishlist.firebaseio.com/Wishes/" + wishId + ".json"
      $http.put(url, wish)
      .success(function(data){
        $location.path('/');
      })
      .error(function(err){
        console.log(err);
      });
    }
    function getAllWishes(cb){
      $http.get("https://nsswishlist.firebaseio.com/Wishes.json")
      .success(function(data){
        cb(data);
      })
      .error(function(err){
        console.log(err);
      });
    }
    function addNewWish(wish, cb){
      $http.post("https://nsswishlist.firebaseio.com/Wishes.json", wish)
      .success(function(data){
        cb(data);
      })
      .error(function(err){
        console.log(err);
      });
    }
    function removeWish(wishId, cb){
      var url = "https://nsswishlist.firebaseio.com/Wishes/" + wishId + ".json";
      $http.delete(url)
      .success(function(data){
        cb()
      })
      .error(function(err){
        console.log(err);
      });
    }
    return {
      getWish: getWish,
      editWish: editWish,
      getAllWishes: getAllWishes,
      addNewWish: addNewWish,
      removeWish: removeWish

    }
  })
  .controller("EditWish", function($routeParams, WishFactory){
    var vm = this;
    var id = $routeParams.id;

    WishFactory.getWish(id, function(data){
      vm.newWish = data;
    })

    vm.addNewWish = function(){
      WishFactory.editWish(id, vm.newWish)
    };
  })
  .controller("AmazonController", function($http, WishFactory){
    var vm = this;
    WishFactory.getAllWishes(function(data){
      vm.Wishes = data;
    })
    vm.addNewWish = function(){
      WishFactory.addNewWish(vm.newWish, function(data){
        vm.Wishes[data.name] = vm.newWish;
      });
    };
    vm.removeWish = function(wishId){
      WishFactory.removeWish(wishId, function(){
        delete vm.Wishes[wishId];
      })
    };
    // $http.get("https://nsswishlist.firebaseio.com/Wishes.json")
    // .success(function(data){
    //   vm.Wishes = data;
    //   console.log("it works!");
    // })
    // .error(function(err){
    //   console.log(err);
    // })
    // vm.addNewWish = function(){
    //   var url = "https://nsswishlist.firebaseio.com/Wishes.json";
    //   $http.post(url, vm.newWish)
    //   .success(function(data){
    //     vm.Wishes[data.name] = vm.newWish;
    //     vm.newWish = null;
    //     console.log("it works!");
    //   })
    //   .error(function(err){
    //     console.log(err);
    //   })
    // }
    // vm.deleteWish = function(wishId){
    //   var url = "https://nsswishlist.firebaseio.com/Wishes/" + wishId + ".json";
    //   $http.delete(url)
    //   .success(function(){
    //     delete vm.Wishes[wishId]
    //     console.log("it works!");
    //   })
    //   .error(function(err){
    //     console.log(err);
    //   })
  // }
})
}());

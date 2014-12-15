(function() {
  "use strict";
  angular.module("myApp")
  .factory("WishFactory", function($http, $location) {

    function getWish(id, cb) {
      var url = "https://sondansswishlist.firebaseio.com/" + id + ".json"
      $http.get(url)
      .success(function(data) {
        cb(data);
      })
      .error(function(err) {
        console.log(err);
      });
    }
    function editWish(id, wish) {
      var url = "https://sondansswishlist.firebaseio.com/" + id + ".json"
      $http.put(url, wish)
      .success(function(data) {
        // $location.path("/");
      })
      .error(function(err) {
        console.log(err);
      });
    }
    function getAllWishes(cb) {
      $http.get("https://sondansswishlist.firebaseio.com/.json")
      .success(function(data) {
        cb(data);
      })
      .error(function(err) {
        console.log(err);
      });
    }
    function addNewWish(wish, cb) {
      $http.post("https://sondansswishlist.firebaseio.com/.json", wish)
      .success(function(data) {
        $location.path("/");
        cb(data);
      })
      .error(function(err) {
        console.log(err);
      });
    }
    function removeWish(wishId, cb) {
      var url = "https://sondansswishlist.firebaseio.com/" + wishId + ".json";
      $http.delete(url)
      .success(function(data) {
        cb()
      })
      .error(function(err) {
        console.log(err);
      });
    }
    return {
      getWish: getWish,
      editWish: editWish,
      getAllWishes: getAllWishes,
      addNewWish: addNewWish,
      removeWish: removeWish

    };
  })

}());

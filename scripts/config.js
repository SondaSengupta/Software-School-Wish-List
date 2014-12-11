(function() {
  "use strict";
  angular.module("myApp")
  .config(function($routeProvider) {
    $routeProvider
    .when("/", {
      templateUrl: "views/table.html",
      controller: "AmazonController",
      controllerAs: "aC"
    })
    .when("/new", {
      templateUrl: "views/form.html",
      controller: "AmazonController",
      controllerAs: "aC"
    })
    .when("/:id", {
      templateUrl: "views/show.html",
      controller: "ShowController",
      controllerAs: "show"
    })
    .when("/:id/edit", {
      templateUrl: "views/form.html",
      controller: "EditWishController",
      controllerAs: "aC"
    })
    .otherwise({ redirectTo: "/" } );
  })

}());

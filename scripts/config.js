(function() {
  "use strict";
  angular.module("myApp")
  .config(function($routeProvider) {
    $routeProvider
    .when("/", {
      templateUrl: "views/landing.html"
    })
     .when("/login", {
        templateUrl: "views/login.html",
        controller: "LoginController",
        controllerAs: "login"
      })
    .when("/wishes", {
      templateUrl: "views/table.html",
      controller: "AmazonController",
      controllerAs: "aC"
    })
    .when("/wishes/new", {
      templateUrl: "views/form.html",
      controller: "AmazonController",
      controllerAs: "aC"
    })
    .when("/wishes/:id", {
      templateUrl: "views/show.html",
      controller: "ShowController",
      controllerAs: "show"
    })
    .when("/wishes/:id/edit", {
      templateUrl: "views/form.html",
      controller: "EditWishController",
      controllerAs: "aC"
    })
    .otherwise({ redirectTo: "/" } );
  })

}());

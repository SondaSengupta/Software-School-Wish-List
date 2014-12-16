;(function() {
  "use strict";
  angular.module("myApp")
  .factory("authFactory", function() {
    var factory = {},
            ref = new Firebase("https://sondansswishlist.firebaseio.com/")

    factory.login = function(email, password, cb) {
      ref.authWithPassword({
        email: email,
        password: password
      }, function(error, authData) {
        if (error === null) {
          console.log(email + " has logged in successfully", authData);
          cb();
        } else {
          console.log("Error logging in user", error);
        }
      });
    }

    factory.register = function(email, password, cb) {
      ref.createUser({
        email: email,
        password: password
      }, function(error, authData) {
        if (error === null) {
          console.log( email + " has been created successfully", authData);
          cb();
        } else {
          console.log("Error creating user", error);
        }
      });
    }

    factory.resetPassword = function(email) {
      ref.resetPassword({
          email: email
        }, function(error) {
        if (error === null) {
          alert("Password reset successful. Please check email for temporary password");
        } else {
          console.log("Error sending password reset email. Try again.", error);
        }
      });
    }

    return factory;
  })

}());

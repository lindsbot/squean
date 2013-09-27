'use strict';

$(document).ready(function(){
  var userRoles = routesConfig.userRoles;

  $("#registerForm").on('submit', function(e){
    e.preventDefault();
    var confirmPass = function(pass, conf) {
      if (pass !== conf) {
        alert("Passwords don't match");
        return false;
      }
      else {
        return true;
      }
    }
    var pass = $('#registerPassword').val();
    var confirm = $('#registerConfirm').val();
    var email = $('#registerEmail').val();

    if (confirmPass(pass, confirm)) {
      var userData = JSON.stringify({username: email, password: pass, role: userRoles.public});
      $.ajax({
        type: "POST",
        url: "/register",
        contentType: 'application/json',
        data: userData,
        success: function(data){
          window.location = data.redirect;
        },
        error: function(err){
          console.log("This error occurred ", err);
        }
      });
    }

  });

  $("#loginForm").on('submit', function(e){
    e.preventDefault();

    var pass = $('#loginPassword').val();
    var email = $('#loginEmail').val();

    var userData = JSON.stringify({username: email, password: pass, role: userRoles.public});

    $.ajax({
      type:'POST',
      url:'/login',
      contentType:'application/json',
      data: userData,
      success: function(data){
        window.location = data.redirect;
        console.log("success!");
      },
      error: function(err){
        console.log("ERROR :",err);
      }
    });
  });


});
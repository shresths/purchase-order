
 $(document).ready(function(){

let email = $("#email").val();
let password = $("#password").val();

$("#login").click(function(){
    console.log("login");
    let email = $("#email").val();
    let password = $("#password").val();
    console.log("in", email, password);
    let data = {
        "email": email,
        "password": password
    }
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/login",
        data: data,
        success: function(response) {
          console.log("success",response);
          localStorage.setItem("token", response["token"]);
          M.toast({html: "User logged in"});
          location.href = './index.html'
        },
        error: function(request, status, error) {
            console.log(error);
            if(error) {
                M.toast({html: "User Not found"});
            }
        },  
        dataType: 'json'
      });

})

 });
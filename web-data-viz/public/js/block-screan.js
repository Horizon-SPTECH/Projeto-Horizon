function sessao(){
    var email = sessionStorage.getItem("EMAIL");
    var token = sessionStorage.getItem("TOKEN");

    if(email == null || token == null){
        window.location.href = "login.html";
    }
}

function sessaoEmail(){
    var email = sessionStorage.getItem("EMAIL");


    if(email == null){
        window.location.href = "login.html";
    }
}
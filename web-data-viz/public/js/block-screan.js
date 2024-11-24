function acessar(){

    var ativo = sessionStorage.getItem("ATIVO");
    var ativoEmpresa = sessionStorage.getItem("ATIVO_EMPRESA");

    if(ativo == null || ativo == 0 || ativoEmpresa == null || ativoEmpresa == 0){
       window.location.href = "login.html"; 
    }
}


function cargo(){
    var tipocargo = sessionStorage.getItem("ID_TIPO");

    if(tipocargo == 1){
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Esta conta não tem acesso a essa página!',
            showConfirmButton: false
        });
    
        setTimeout(function() {
            window.location.href = "dashboard.html";
        }, 2000);
    }

   
}

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

function limparSession(){
    sessionStorage.clear();
}


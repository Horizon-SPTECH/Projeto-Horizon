function verSenha() {
    const senhaInput = document.getElementById('senha'); 
    const olho = document.getElementById('viewSenha');

    if (senhaInput.type === 'password') {
        senhaInput.type = 'text'; 
        olho.src = 'assets/olho-fechado.png';
    } else {
        senhaInput.type = 'password';
        olho.src = 'assets/olho.png';
    }
}

function verSenh2() {
    const senhaInput = document.getElementById('confirmacao_senha'); 
    const olho = document.getElementById('viewSenha-confirmar');

    if (senhaInput.type === 'password') {
        senhaInput.type = 'text'; 
        olho.src = 'assets/olho-fechado.png';
    } else {
        senhaInput.type = 'password';
        olho.src = 'assets/olho.png';
    }
}
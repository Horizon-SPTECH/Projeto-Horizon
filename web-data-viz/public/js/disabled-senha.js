function verSenha(inputId, imgElement) {
    const input = document.getElementById(inputId);
    const isPasswordVisible = input.type === "text";
    input.type = isPasswordVisible ? "password" : "text";
    imgElement.src = isPasswordVisible ? "assets/olho.png" : "assets/olho-fechado.png";
    imgElement.alt = isPasswordVisible ? "Mostrar senha" : "Ocultar senha";
}


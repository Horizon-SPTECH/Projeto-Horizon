// var ambiente_processo = 'producao';
var ambiente_processo = "desenvolvimento";

var caminho_env = ambiente_processo === "producao" ? ".env" : ".env.dev";
// Acima, temos o uso do operador ternário para definir o caminho do arquivo .env
// A sintaxe do operador ternário é: condição ? valor_se_verdadeiro : valor_se_falso

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var medidasRouter = require("./src/routes/medidas");
var empresasRouter = require("./src/routes/empresas");
var parametrosRouter = require("./src/routes/parametros");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/medidas", medidasRouter);
app.use("/empresas", empresasRouter);
app.use("/parametros", parametrosRouter);

const transporter = nodemailer.createTransport({
    host:"smtp-relay.gmail.com",
    service: 'gmail',
    port:587,
    auth: {
        user: 'horizonContateNos@gmail.com',
        pass: 'wxfg vjdw ybis qlmg'
    }
});


app.post('/send-emailContact', (req, res) => {
 const { nome, email, mensagem} = req.body;

 let mailOptions = {
 from: email, 
 to: 'horizonContateNos@gmail.com',
 replyTo:email,
 subject: `Mensagem de ${nome}`,
 text: `Nome: ${nome}\n
 Email: ${email}\n
 Mensagem: ${mensagem}`
};


transporter.sendMail(mailOptions, (error, info) => {
if (error) {
  res.status(500).send('Erro ao enviar e-mail');
  return console.log('Erro ao enviar e-mail:', error);
}
res.status(200).send('E-mail enviado com sucesso');
console.log('E-mail enviado: ' + info.response);
});
});



app.listen(PORTA_APP, function () {
  console.log(`
    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######  
    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##  
    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##   
    ## # ##  ####     #####    ######   ##  ##   ######     ##     ######   ######   ##  ##     ##       ##    
    #######  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##      ##     
    ### ###  ##       ##  ##            ## ##    ##  ##     ##     ##  ##             ####      ##     ##      
    ##   ##  ######   #####             ####     ##  ##     ##     ##  ##              ##      ####    ######  
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});

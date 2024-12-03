
# Projeto Pesquisa e Inovação - Grupo 6

Um serviço de coleta e análise de dados de furtos no Espírito Santo, com o objetivo de identificar padrões e otimizar a alocação de recursos policiais, promovendo maior segurança em áreas vulneráveis.

## 📋 Visão Geral

Este projeto visa integrar ferramentas de desenvolvimento e análise de dados para fornecer soluções eficazes de visualização e suporte à tomada de decisões na área de segurança pública. Focado na aplicação prática, o sistema oferece uma interface intuitiva, um backend robusto e um ambiente de implantação simplificado.

## ✨ Principais Funcionalidades

- **Visualização de Dados:** Apresenta estatísticas e padrões de furtos por meio de gráficos e mapas interativos.
- **API Backend:** Oferece dados processados em tempo real para o frontend e outros consumidores.
- **Gerenciamento de Dados:** Armazena e organiza informações relevantes em um banco de dados estruturado.
- **Implantação Simples:** Utiliza Docker para configurar e executar o ambiente de forma consistente.
- **Colaboração e Controle de Versão:** Integrado com Git e GitHub para gerenciamento do código e trabalho em equipe.

## 🛠️ Tecnologias Utilizadas

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Java
- **Banco de Dados:** MySQL
- **DevOps:** Docker, Docker Compose
- **Gerenciamento de Dependências:** NPM
- **Controle de Versão:** Git, GitHub

## 📦 Estrutura do Projeto

```plaintext
|
├── .github/workflows/    # Configurações de CI/CD
├── .idea/                # Configurações do IDE
├── .vscode/              # Configurações do Visual Studio Code
├── Java/                 # Código-fonte backend em Java
├── web-data-viz/         # Código frontend (HTML, CSS, JS)
├── dockerfile            # Configuração para o container Docker
├── package-lock.json     # Controle de dependências do frontend
└── README.md             # Documentação principal
````
## 🚀 Como Usar
### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas no seu sistema:

- [Java 11+](https://www.oracle.com/java/technologies/javase-downloads.html)
- [Node.js e NPM](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- [Docker e Docker Compose](https://www.docker.com/)


## Clone o repositório:
```
git clone https://github.com/Horizon-SPTECH/Projeto-Horizon.git
cd Projeto-Horizon
```
Configure o arquivo .env.dev substituindo as variáveis com as suas próprias credenciais, para que o projeto possa ser executado localmente.
Não esqueça de ir no app.js e comentar a linha de "produção" e deixar apenas funcionando o "desenvolvimento"
### env.dev
```
AMBIENTE_PROCESSO=desenvolvimento

# Configurações de conexão com o banco de dados
DB_HOST=localhost
DB_DATABASE='projetoHorizon'
DB_USER=''
DB_PASSWORD=''
DB_PORT=3306

# Configurações do servidor de aplicação
APP_PORT=3333
APP_HOST=localhost
```
### Para criar o banco de dados, acesse o script SQL dentro do caminho:

`Projeto-Horizon/web-data-viz/src/database/script-horizon.sql`

Ou utilize o link abaixo, para acessar o script:

[SCRIPT SQL](https://github.com/Horizon-SPTECH/Projeto-Horizon/blob/main/web-data-viz/src/database/script-horizon.sql)

Após isso, visite o [repositório do Java do Projeto](https://github.com/Horizon-SPTECH/Horizon-Java) para que você possa utilizar o nosso back-end.

Após clonar o repositório, Java funcionando, e script do banco inicializado localmente no seu MySQL Workbench, você deve entar dentro da pasta do projeto `Projeto-Horizon/web-data-viz/`, e a partir disso você deve executar os seguintes comandos

Instalação de dependências:
```
npm install
```

Inicialização do ambiente:
```
npm start
```

#### Após isso você já deve ter acesso ao nosso site, podendo criar um cadastro de uma nova empresa com seu respectivo responsável, podendo a partir disso acessar a sua dashboard, com os dados extráidos e tratados da base de dados de furtos do estado do Espirito Santo


## 📊 Exemplos de Uso

- **Mapas Interativos:** Identifique áreas com maior incidência de furtos por meio de visualizações geográficas.
- **Dashboard Interativa:** Visualize KPIs relevantes, como taxas de furtos, tendências sazonais e áreas mais afetadas, tudo em uma interface clara e intuitiva para facilitar a tomada de decisões.
- **Simulações:** Ajuste estratégias de segurança baseadas nos insights obtidos.


## 👥 Equipe do Projeto

- [@Gabriel Nogueira](https://github.com/GabrielNogueira33)
- [@Igor Daniel](https://github.com/zack-css)
- [@Isabela Rosa de Lima](https://github.com/isabelarosalima)
- [@Kauan Paschoal](https://github.com/KauanPaschoal)
- [@Matheus Oliveira](https://github.com/mathwusoliveira78)


📝 Licença
Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais informações.

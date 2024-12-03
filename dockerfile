# Usar a imagem oficial do Node.js como base
FROM node:20

# Define o diretório de trabalho no container
WORKDIR /app

# Copia apenas arquivos essenciais para instalação de dependências
COPY web-data-viz/package*.json ./web-data-viz/

# Instala as dependências do projeto
RUN cd web-data-viz && npm install

# Copia o restante do código para o container
COPY . .

# Define o diretório de trabalho correto para execução
WORKDIR /app/web-data-viz

# Exponha a porta que o aplicativo utiliza
EXPOSE 8080

# Comando de inicialização
CMD ["npm", "start"]

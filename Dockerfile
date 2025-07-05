# Use uma imagem oficial do Node.js como imagem base.
# A versão Alpine é usada por ser menor.
FROM node:14-alpine

# O sqlite3 precisa de algumas ferramentas para compilar seu módulo nativo no Alpine.
RUN apk add --no-cache python3 make g++

# Define o diretório de trabalho dentro do contêiner.
WORKDIR /usr/src/app

# Copia os arquivos de dependências para aproveitar o cache do Docker.
COPY package*.json ./

# Instala as dependências do projeto.
RUN npm install

# Copia o restante do código da aplicação.
COPY . .

# Expõe a porta em que a aplicação será executada.
EXPOSE 3000

# Comando para iniciar a aplicação.
CMD [ "node", "src/server.js" ]
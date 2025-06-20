# Imagem base
FROM node:22

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos do backend
COPY package*.json ./
RUN npm install

COPY . .

# Expõe a porta usada pela aplicação
EXPOSE 5000

# Comando para iniciar o backend
CMD ["npm", "run", "dev"]

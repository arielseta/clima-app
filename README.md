# 🌤️ Clima App

Aplicação full stack para previsão do tempo, com autenticação de usuários e histórico de buscas, construída como desafio técnico.

---

## 🧭 Visão Geral | Overview

O Clima App permite que usuários registrados consultem a previsão do tempo em qualquer cidade, salvem as últimas 5 buscas e visualizem essas informações de forma rápida e responsiva.

Clima App is a full stack weather forecast platform that allows registered users to check weather in any city, save the last 5 searches, and visualize the data in a clean and responsive interface.

---

## 🚀 Tecnologias Utilizadas | Technologies Used

### 🖥️ Frontend
- React
- Vite
- Tailwind CSS
- React Router DOM
- Context API
- Axios
- Vitest + Testing Library

### 🔧 Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT for authentication
- Express Rate Limit
- In-memory caching
- Vitest for unit testing

---

## 📦 Como Executar | How to Run Locally

### Pré-requisitos | Prerequisites
- Node.js 18+
- Docker + Docker Compose
- (Optional) MongoDB local

### 1. Clonar o projeto | Clone the project
```bash
git clone https://github.com/seuusuario/clima-app.git
cd clima-app
```

### 2. Iniciar o backend com Docker | Start backend with Docker
```bash
docker-compose up --build
```

### 3. Configurar variáveis de ambiente do backend | Set environment variables
Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/clima-app
JWT_SECRET=your_secret_key
OPENWEATHER_API_KEY=your_openweather_key
```

### 4. Executar o frontend | Start frontend
```bash
cd frontend
npm install
npm run dev
```

Acesse | Visit: [http://localhost:5173](http://localhost:5173)

---

## 🔐 Autenticação | Authentication

- Registro e login com JWT
- Token salvo no localStorage
- Logout automático quando o token expira
- Rotas protegidas com middleware

---

## ☁️ Funcionalidades | Features

- Busca de clima por cidade ou localização atual
- Histórico das últimas 5 buscas por usuário
- Interface moderna e responsiva com Tailwind CSS
- Ícones, temperatura, descrição do clima
- Histórico clicável para reconsultar

---

## 🧪 Testes Automatizados | Automated Tests

- Vitest + Testing Library no frontend
- Vitest no backend (ex: cache, serviços)

```bash
# frontend
cd frontend
npx vitest

# backend
cd backend
npx vitest
```

---

## 📂 Estrutura de Pastas | Folder Structure

```
clima-app/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── middlewares/
│   └── utils/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── api/
│   │   └── utils/
├── clima-app.postman_collection.json
└── docker-compose.yml
```

---

## 🙌 Autor | Author

**Ariel Seta**  
- 🔗 [LinkedIn](https://br.linkedin.com/in/arielseta)
- 💻 [Portfólio](https://arielseta.github.io/)

---

## 📄 Licença | License

Projeto desenvolvido como parte de um desafio técnico. Livre para uso educacional e profissional com os devidos créditos.
Developed as part of a technical challenge. Free for educational and professional use with due credits.

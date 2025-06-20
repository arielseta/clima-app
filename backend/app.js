const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const historyRoutes = require('./routes/historyRoutes');
const weatherRoutes = require('./routes/weatherRoutes');


const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/weather', weatherRoutes);


app.get('/', (req, res) => {
  res.send('Clima App Backend rodando!');
});

module.exports = app;


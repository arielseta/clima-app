const express = require('express');
const router = express.Router();
const { getWeather, getWeatherByCoords } = require('../controllers/weatherController');
const authMiddleware = require('../middlewares/authMiddleware');
const rateLimiter = require('../middlewares/rateLimiter');

router.get('/', authMiddleware, rateLimiter, getWeather);
router.get('/coords', authMiddleware, rateLimiter, getWeatherByCoords);

module.exports = router;

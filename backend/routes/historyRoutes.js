const express = require('express');
const router = express.Router();
const { saveSearch, getHistory } = require('../controllers/historyController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware); // Todas as rotas exigem login

router.post('/', saveSearch);
router.get('/', getHistory);

module.exports = router;

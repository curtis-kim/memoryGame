const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();




router.get('/play-game', userController.displayGame)

router.post('/summary', userController.summaryPage)

router.post('/leaderboard', userController.leaderboard)

module.exports = router;

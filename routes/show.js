const express = require('express')
const showController = require('../controllers/show');

const showRouter = express.Router();
showRouter.post('/', showController.getShows);

module.exports = showRouter;
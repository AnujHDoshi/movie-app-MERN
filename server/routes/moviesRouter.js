const express = require('express');
const router = express.Router();

const movieController = require('../controller/movieController');

router.get('/', movieController.listAllMovie);
router.get('/:movieId',movieController.findMovieById);
router.post('/add', movieController.addMovie);
router.delete('/delete', movieController.deleteMovie);
module.exports = router;

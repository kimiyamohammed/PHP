const express = require('express');
const moviesController = require('../controllers/movies.controller');
const actorsController = require('../controllers/actors.controller');
const productionController = require('../controllers/production.controller');
const router = express.Router();

router.route('/movies')
    .get(moviesController.getAll)
    .post(moviesController.addOne)
    ;
router.route('/movies/:movieId')
    .get(moviesController.getOne)
    .put(moviesController.fullUpdateOne)
    .patch(moviesController.partialUpdateOne)
    .delete(moviesController.removeOne)
    ;
router.route('/movies/:movieId/actors')
    .get(actorsController.getAll)
    .post(actorsController.addOne)
    ;
router.route('/movies/:movieId/actors/:actorId')
    .get(actorsController.getOne)
    .put(actorsController.fullUpdateOne)
    .patch(actorsController.partialUpdateOne)
    .delete(actorsController.removeOne)
    ;

router.route('/movies/:movieId/production')
    // .get(productionController.getAll)
    .post(productionController.addOne)
    ;
router.route('/movies/:movieId/production/:productionId')
    .get(productionController.getOne)
    .put(productionController.fullUpdateOne)
    .patch(productionController.partialUpdateOne)
    .delete(productionController.removeOne)
    ;

module.exports = router;
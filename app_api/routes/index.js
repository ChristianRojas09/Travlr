const express = require('express');
const router = express.Router();

//declare trips controller
const tripsController = require('../controllers/trips');

//define a route to take a request for trips and pass it to the controller
router
    .route('/trips')
    .get(tripsController.tripsList);

    module.exports = router;
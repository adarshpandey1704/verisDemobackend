const express = require('express');

const userControllers = require('../Controllers/event-controllers');

const router = express.Router();

router.post('/createevent', userControllers.CreateEvent);
router.get('/eventlist',userControllers.list);

module.exports = router;
const express = require('express');

const userControllers = require('../Controllers/user-controllers');
const checkAdminLogin = require('../Middleware/check-admin-login');

const router = express.Router();

router.post('/signup', userControllers.signup);
router.get('/login',userControllers.login);

router.use(checkAdminLogin);

router.get('/list', userControllers.list);

module.exports = router;
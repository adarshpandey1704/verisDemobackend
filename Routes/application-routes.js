const express = require('express');

const checkUserAuth = require('../Middleware/check-user-login')
const checkAdminAuth = require('../Middleware/check-admin-login')
const Song = require('../models/song-model');
const songController = require('../Controllers/song-controllers');
const fileUpload = require('../Middleware/fileUpload');

const router = express.Router();

router.use(checkUserAuth);

router.get('/list', songController.list);
router.get('/details/:songId', songController.details);
router.post('/like/:songId', songController.like);
router.post('/dislike/:songId', songController.dislike);
router.get('/likedsongs', songController.likedsongs);

router.use(checkAdminAuth);

router.post('/deletesong/:songId', songController.deletesong);
router.post('/add', songController.add);
router.post('/addpath/:songId', fileUpload.single("path"), songController.addpath);

module.exports = router;
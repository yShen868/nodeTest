// src/routes/api.js

const express = require('express');
const router = express.Router();
const changeController = require('../controllers/changeController');

// 定义用户路由
router.get('/simpleChange', changeController.simpleChange)
    .post('/simpleChange', changeController.simpleChange)
    .get('/getToken', changeController.getToken)
    .get('/motionRunner', changeController.motionRunner)
;

module.exports = router;
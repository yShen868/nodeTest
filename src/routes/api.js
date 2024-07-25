// src/routes/api.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// 定义用户路由
router.get('/user', userController.getUser);

module.exports = router;
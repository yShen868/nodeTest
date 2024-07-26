// src/routes/api.js

const express = require('express');
const {getUser} = require("../controllers/userController");
const router = express.Router();

// 定义用户路由
router.get('/user', getUser);

module.exports = router;
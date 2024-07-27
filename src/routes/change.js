// src/routes/api.js

const express = require('express');
const {simpleChange, getToken, motionRunner} = require("../controllers/changeController");
const router = express.Router();

// 定义用户路由
router.get('/simpleChange', simpleChange)
    .post('/simpleChange', simpleChange)
    .get('/getToken', getToken)
    .get('/motionRunner', motionRunner)
;

module.exports = router;
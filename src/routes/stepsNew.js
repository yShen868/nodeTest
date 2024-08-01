// routes/steps.js
const express = require('express');
const {Step: Steps} = require('../models/stepIndex');
const ResponseFactory = require("../models/response");
const {create, update, list, deleteStep, getStepLogs} = require("../controllers/stepController");
const {post} = require("axios");
const router = express.Router();


// 定义用户路由
router.post('/create', create)
    .post('/update', update)
    .get('/list', list)
    .get('/delete', deleteStep)
    .post('/getStepLogs', getStepLogs)
;


module.exports = router;
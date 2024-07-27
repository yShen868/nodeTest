// routes/steps.js
const express = require('express');
const {Step: Steps} = require('../models/stepIndex');
const ResponseFactory = require("../models/response");
const {create, update, list, deleteStep} = require("../controllers/stepController");
const router = express.Router();


// 定义用户路由
router.post('/create', create)
    .post('/update', update)
    .get('/list', list)
    .get('/delete', deleteStep)
;


module.exports = router;
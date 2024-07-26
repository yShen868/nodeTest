// src/controllers/userController.js

const userService = require('../services/userService');
const ResponseFactory = require('../models/response');

const getUser = (req, res, next) => {
    try {
        const userData = userService.getUserData();
        console.log('getUser')
        res.json(ResponseFactory.success(userData));
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getUser
};
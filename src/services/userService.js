// src/services/userService.js

const User = require("../models/user");
const getUserData = () => {
    // 模拟获取用户数据

    return new User(1, 'John Doe', 'john.doe@example.com');


};

module.exports = {
    getUserData
};
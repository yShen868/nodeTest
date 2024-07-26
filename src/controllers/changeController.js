const changeService = require('../services/changeService');
const ResponseFactory = require('../models/response');
const Result = require("../models/result");

const simpleChange = (req, res, next) => {
    try {
        console.log(req.query)
        console.log(req.body)
        const result = changeService.simpleChange(req.query);
        res.json(ResponseFactory.success(result));
    } catch (err) {
        next(err);
    }
};

const getToken = (req, res, next) => {
    try {
        changeService.login(req.query).then(result => {
            console.log("getToken", result)
            res.json(ResponseFactory.success(new Result(result)));
        }).catch(err => {
            res.json(ResponseFactory.failure(err));
        })

    } catch (err) {
        next(err);
    }
};

/**
 * 简单的更新步数方法 账号 密码 步数
 * @param req
 * @param res
 * @param next
 */
const motionRunner = (req, res, next) => {
    try {
        changeService.motionRunner(req.query.user, req.query.password,req.query.step).then(result => {
            console.log("motionRunner", result)
            res.json(ResponseFactory.success(new Result("result")));
        }).catch(err => {
            console.error("motionRunner", err)
            res.json(ResponseFactory.failure(err));
        })

    } catch (err) {
        next(err);
    }
};

/**
 * 更新步数方法
 * 账号
 * 密码
 * 步数范围 list
 * 时间范围
 * 星期范围
 * @param req
 * @param res
 * @param next
 */

const motionRunnerV2 = (req, res, next) => {
    try {
        changeService.motionRunner(req.query.user, req.query.password,req.query.step).then(result => {
            console.log("motionRunner", result)
            res.json(ResponseFactory.success(new Result("result")));
        }).catch(err => {
            console.error("motionRunner", err)
            res.json(ResponseFactory.failure(err));
        })

    } catch (err) {
        next(err);
    }
};



module.exports = {
    simpleChange,
    getToken,
    motionRunner
};
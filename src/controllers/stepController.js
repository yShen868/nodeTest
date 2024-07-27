const changeService = require('../services/changeService');
const stepService = require('../services/stepService');
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

/**
 * 简单的更新步数方法 账号 密码 步数
 * @param req
 * @param res
 * @param next
 */
const motionRunner = (req, res, next) => {
    try {
        console.log("req.query", req.query)
        changeService.motionRunner(req.query.username, req.query.password, req.query.step).then(result => {
            console.log("motionRunner", result)
            res.json(ResponseFactory.success("更新成功"));
        }).catch(err => {
            console.error("motionRunner", err)
            res.json(ResponseFactory.failure("更新失败"));
        })
        // res.json(ResponseFactory.success(new Result("result")));

    } catch (err) {
        next(err);
    }
};

const create = (req, res, next) => {
    try {
        console.log("req.query", req.query, "body", req.body, "req.params", req.params)
        stepService.create(req.body).then(result => {
            console.log("create suc", result)
            res.json(result);
        }).catch(err => {
            console.error("create err", err)
            res.status(500).json(ResponseFactory.failure("操作失败"));
        })
    } catch (err) {
        next(err);
    }
};
const update = (req, res, next) => {
    try {
        console.log("req.query", req.query, "body", req.body, "req.params", req.params)
        stepService.update(req.query.id, req.body).then(result => {
            console.log("update suc", result)
            res.json(result);
        }).catch(err => {
            console.error("create err", err)
            res.status(500).json(ResponseFactory.failure("操作失败"));
        })
    } catch (err) {
        next(err);
    }
};
const list = (req, res, next) => {
    try {
        console.log("req.query", req.query, "body", req.body, "req.params", req.params)
        stepService.list(req.query.page, req.query.limit).then(result => {
            console.log("list suc", result)
            res.json(result);
        }).catch(err => {
            console.error("list err", err)
            res.status(500).json(ResponseFactory.failure("操作失败"));
        })
    } catch (err) {
        next(err);
    }
};
const deleteStep = (req, res, next) => {
    try {
        console.log("req.query", req.query, "body", req.body, "req.params", req.params)
        stepService.deleteStep(req.query.id, req.body).then(result => {
            console.log("delete suc", result)
            res.json(result);
        }).catch(err => {
            console.error("delete err", err)
            res.json(ResponseFactory.failure("操作失败"));
        })
    } catch (err) {
        next(err);
    }
};


module.exports = {
    simpleChange,
    create,
    list,
    update,
    deleteStep
};